'use client';

import { useState } from 'react';

export default function CopyAllButton({ resultJson }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!resultJson?.questions) return;

    // Group questions by category
    const grouped = {};
    resultJson.questions.forEach((q) => {
      if (!grouped[q.category]) {
        grouped[q.category] = [];
      }
      grouped[q.category].push(q);
    });

    // Build plain text output
    let text = `Interview Questions\n`;
    text += `Role: ${resultJson.meta?.role_guess || 'Unknown'}\n`;
    text += `Seniority: ${resultJson.meta?.seniority_guess || 'Unknown'}\n`;
    text += `Focus Areas: ${resultJson.meta?.focus_areas?.join(', ') || 'N/A'}\n`;
    text += `\n${'='.repeat(60)}\n\n`;

    Object.entries(grouped).forEach(([category, questions]) => {
      text += `${category.toUpperCase()} (${questions.length})\n`;
      text += `${'-'.repeat(60)}\n`;
      questions.forEach((q, idx) => {
        text += `\n${idx + 1}. ${q.label}\n`;
        text += `   Q: ${q.question}\n`;
        text += `   Why: ${q.why_this_question}\n`;
        text += `   Anchor: "${q.resume_anchor}"\n`;
        text += `   Difficulty: ${q.difficulty}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      {copied ? '✓ Copied!' : 'Copy All Questions'}
    </button>
  );
}
