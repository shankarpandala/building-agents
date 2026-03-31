import React from 'react';

/**
 * Core concept callout block. Replaces DefinitionBlock for the agent platform.
 *
 * Props:
 *   title    {string}  Concept name
 *   children {node}    Concept content
 *   number   {string}  e.g. "Concept 1.3"
 */
function ConceptBlock({ title, children, number }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-purple-400/50 bg-purple-50/50 shadow-sm dark:border-purple-500/40 dark:bg-purple-950/20">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-purple-400/30 bg-purple-100/60 px-5 py-3 dark:border-purple-500/30 dark:bg-purple-900/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white dark:bg-purple-600">
          C
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          {number || 'Concept'}
        </span>
        {title && (
          <>
            <span className="text-purple-400 dark:text-purple-600">·</span>
            <span className="text-sm font-semibold text-purple-800 dark:text-purple-200">
              {title}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default ConceptBlock;
