import QuestionCard from './QuestionCard';

export default function CategorySection({ category, questions }) {
  if (questions.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        {category}
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({questions.length})
        </span>
      </h2>
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}
