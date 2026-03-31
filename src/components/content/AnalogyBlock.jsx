import React from 'react';

/**
 * Real-world analogy callout block.
 * Used to explain abstract agent concepts via concrete analogies.
 *
 * Props:
 *   title    {string}  Analogy title
 *   children {node}    Analogy content
 */
function AnalogyBlock({ title, children }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border-2 border-teal-400/50 bg-teal-50/50 shadow-sm dark:border-teal-500/40 dark:bg-teal-950/20">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-teal-400/30 bg-teal-100/60 px-4 py-2.5 dark:border-teal-500/30 dark:bg-teal-900/30">
        {/* Lightbulb icon */}
        <svg
          className="h-5 w-5 text-teal-500 dark:text-teal-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {title ? `Analogy · ${title}` : 'Analogy'}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default AnalogyBlock;
