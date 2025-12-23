'use client';

import { useState } from 'react';
import { generateQuestions } from '@/lib/gemini';
import CategorySection from '@/components/CategorySection';
import CopyAllButton from '@/components/CopyAllButton';
import ResumeUploader from '@/components/ResumeUploader';

const MIN_RESUME_LENGTH = 200;

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultJson, setResultJson] = useState(null);

  const handleGenerate = async () => {
    if (resumeText.length < MIN_RESUME_LENGTH) {
      setError(`Please enter at least ${MIN_RESUME_LENGTH} characters.`);
      return;
    }

    setLoading(true);
    setError('');
    setResultJson(null);

    try {
      const result = await generateQuestions(resumeText);
      setResultJson(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Group questions by category
  const groupedQuestions = resultJson?.questions
    ? resultJson.questions.reduce((acc, q) => {
        if (!acc[q.category]) acc[q.category] = [];
        acc[q.category].push(q);
        return acc;
      }, {})
    : {};

  const categories = Object.keys(groupedQuestions).sort();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Interview Question Generator
          </h1>
          <p className="text-gray-600">
            Upload your resume PDF to generate tailored interview questions using AI
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Your Resume
          </label>
          
          <ResumeUploader 
            onTextExtracted={setResumeText}
            disabled={loading}
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">
              {resumeText.length} / {MIN_RESUME_LENGTH} characters minimum
            </span>
            <button
              onClick={handleGenerate}
              disabled={loading || resumeText.length < MIN_RESUME_LENGTH}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                loading || resumeText.length < MIN_RESUME_LENGTH
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Questions'
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {resultJson && (
          <div>
            {/* Meta Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Profile Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Role:</span>{' '}
                  <span className="text-gray-600">{resultJson.meta?.role_guess || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Seniority:</span>{' '}
                  <span className="text-gray-600">{resultJson.meta?.seniority_guess || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Focus Areas:</span>{' '}
                  <span className="text-gray-600">
                    {resultJson.meta?.focus_areas?.join(', ') || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex justify-end mb-6">
              <CopyAllButton resultJson={resultJson} />
            </div>

            {/* Questions by Category */}
            <div>
              {categories.map((category) => (
                <CategorySection
                  key={category}
                  category={category}
                  questions={groupedQuestions[category]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          <p>
            Powered by Google Gemini API • Questions are AI-generated and may require review
          </p>
        </footer>
      </div>
    </main>
  );
}
