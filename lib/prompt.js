/**
 * Builds a structured prompt for Gemini to generate interview questions from a resume.
 * @param {string} resumeText - The full text of the resume
 * @returns {string} The complete prompt
 */
export function buildPrompt(resumeText) {
  return `You are an expert technical interviewer. Given the resume below, generate a personalized set of interview questions.

STRICT OUTPUT REQUIREMENT: Return ONLY valid JSON. No markdown, no code fences, no explanatory text. Just raw JSON.

JSON SCHEMA:
{
  "meta": {
    "role_guess": string,
    "seniority_guess": "Intern" | "Junior" | "Mid" | "Senior" | "Staff" | "Unknown",
    "focus_areas": string[]
  },
  "questions": [
    {
      "id": string,
      "category": "Skills" | "Projects" | "Experience" | "Behavioral" | "Leadership" | "System Design" | "Problem Solving" | "Career Motivation" | "Culture Fit" | "Other",
      "label": string,
      "question": string,
      "why_this_question": string,
      "resume_anchor": string,
      "difficulty": "Easy" | "Medium" | "Hard"
    }
  ]
}

REQUIREMENTS:
1. Generate 12-18 questions total
2. Include at least 2 questions from each of these categories: Skills, Projects, Experience, Behavioral
3. Add System Design questions ONLY if the resume shows relevant experience (senior+ roles, architecture, scalability work)
4. Every question MUST be grounded in specific resume details
5. The "resume_anchor" field should contain a SHORT direct quote or paraphrase from the resume (10-20 words max)
6. Avoid generic questions - each must be tailored to THIS specific resume
7. Do NOT invent information not present in the resume
8. Vary difficulty levels appropriately based on seniority

RESUME:
${resumeText}

Remember: Output ONLY the JSON object. Start with { and end with }. No other text.`;
}
