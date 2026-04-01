import React, { useState } from 'react';

/**
 * Design principle callout block. Replaces TheoremBlock for the agent platform.
 *
 * Props:
 *   title    {string}    Principle name
 *   children {node}      Principle content
 *   number   {string}    e.g. "Principle 2.1"
 */
function PrincipleBlock({ title, children, number }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-indigo-400/50 bg-indigo-50/50 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-950/20">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-indigo-400/30 bg-indigo-100/60 px-5 py-3 dark:border-indigo-500/30 dark:bg-indigo-900/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white dark:bg-indigo-600">
          P
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {number || 'Principle'}
        </span>
        {title && (
          <>
            <span className="text-indigo-400 dark:text-indigo-600">·</span>
            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
              {title}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 text-sm leading-relaxed text-gray-700 italic dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default PrincipleBlock;
