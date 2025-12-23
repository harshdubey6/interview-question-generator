export default function QuestionCard({ question }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 text-lg flex-1">
          {question.label}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            question.difficulty === 'Easy'
              ? 'bg-green-100 text-green-700'
              : question.difficulty === 'Medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      <p className="text-gray-700 mb-3">{question.question}</p>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Why:</span> {question.why_this_question}
      </div>

      {question.resume_anchor && (
        <div className="text-sm text-gray-500 italic border-l-2 border-gray-300 pl-2">
          &ldquo;{question.resume_anchor}&rdquo;
        </div>
      )}
    </div>
  );
}
