import { buildPrompt } from './prompt';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';

/**
 * Calls the Gemini API with a resume and returns parsed JSON of interview questions
 * @param {string} resumeText - The resume content
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {Error} If API call fails or JSON parsing fails
 */
export async function generateQuestions(resumeText) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Missing API key. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.'
    );
  }

  const prompt = buildPrompt(resumeText);
  
  const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Gemini API error: ${response.status} ${response.statusText}. ${
        errorData.error?.message || ''
      }`
    );
  }

  const data = await response.json();

  // Extract text from Gemini response
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('No text returned from Gemini API');
  }

  // Parse JSON from response
  return parseGeminiJSON(text);
}

/**
 * Attempts to parse JSON from Gemini's response, handling common formatting issues.
 * @param {string} text - Raw text response from Gemini
 * @returns {Object} Parsed JSON object
 * @throws {Error} If JSON cannot be parsed
 */
function parseGeminiJSON(text) {
  let cleanText = text.trim();

  // Remove markdown code fences if present
  if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  // Try direct parse first
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // Attempt recovery: find first { and last }
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = cleanText.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(extracted);
      } catch (e2) {
        throw new Error(
          'Could not parse JSON from Gemini response. Please try again.'
        );
      }
    }

    throw new Error(
      'Could not parse JSON from Gemini response. Please try again.'
    );
  }
}
