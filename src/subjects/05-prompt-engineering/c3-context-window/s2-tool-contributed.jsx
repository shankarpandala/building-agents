import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ToolContributedSection() {
  return (
    <div className="prose-agents">
      <p>
        Tools make agents powerful, but they have a hidden cost: every tool definition
        and every tool result consumes context window space. Managing tool-contributed
        tokens is one of the most impactful optimizations available to agent designers.
      </p>

      <ConceptBlock title="Tool-Contributed Context" number="Concept 5.11">
        Tool-contributed context has two components. <strong>Tool definitions</strong>
        are the descriptions, parameter schemas, and usage examples provided to the
        model so it knows how to invoke each tool — present for the entire session.
        <strong> Tool results</strong> are the outputs returned after each invocation —
        added to the context window with each tool call and never automatically removed.
        Both accumulate; neither is free.
      </ConceptBlock>

      <p>
        Tool definition cost is largely fixed and controllable at design time. A tool
        definition with a verbose description and a complex parameter schema may cost
        ten times more tokens than a minimal one. Tool result cost is variable and
        runtime-dependent — a search tool that returns five documents can easily
        contribute thousands of tokens in a single call.
      </p>

      <WarningBlock title="Tool Result Accumulation">
        By default, tool results remain in the context window indefinitely. After
        several tool calls returning large payloads, the conversation history becomes
        dominated by tool results rather than the actual conversation. This pushes
        early conversation turns out of the window and degrades continuity. Actively
        manage result retention.
      </WarningBlock>

      <NoteBlock type="tip" title="Minimal Tool Definitions">
        Write tool descriptions to be accurate and unambiguous, not exhaustive.
        Remove examples from tool definitions once the agent is performing reliably —
        examples add significant token cost. A well-named parameter with a clear type
        often needs no description at all.
      </NoteBlock>

      <ExerciseBlock
        title="Tool-Contributed Context Practice"
        exercises={[
          {
            id: 'e5-11-1',
            difficulty: 'beginner',
            question: 'An agent has 15 tools, each with an average definition size of 800 tokens. What percentage of a 128k context window do tool definitions consume before any conversation begins?',
            hint: 'Calculate total tool definition tokens and divide by window size.',
            solution: '15 × 800 = 12,000 tokens. 12,000 / 128,000 = 9.4%. Nearly a tenth of the window is consumed before the first user message. Adding a 3,000-token system prompt brings the pre-conversation overhead to ~11.7%.',
          },
          {
            id: 'e5-11-2',
            difficulty: 'intermediate',
            question: 'A web search tool returns full page text (up to 5,000 tokens per result) and is called three times in a conversation. Describe two strategies to prevent these results from dominating the context window.',
            hint: 'Think about filtering, summarization, and selective retention.',
            solution: 'Strategy 1: Truncate results at invocation time — extract only the most relevant passages before inserting into context. Strategy 2: After the agent has used a result, replace the full text in the context window with a one-sentence summary. Both strategies require explicit handling at the orchestration layer, not by the model itself.',
          },
          {
            id: 'e5-11-3',
            difficulty: 'advanced',
            question: 'Design a tool registry strategy that gives the agent access to 40 different tools without loading all 40 definitions into every context window.',
            hint: 'Consider dynamic tool loading based on intent classification.',
            solution: 'Maintain a two-tier tool registry. All sessions start with a small set of universal tools (5–8 most common). The intent classifier determines which domain the session is in, and domain-specific tools are injected into the system prompt at session creation. For sessions that span domains, tools can be added mid-conversation as a system message when a new domain is detected. This keeps per-session tool token cost below 15 tools on average.',
          },
        ]}
      />
    </div>
  );
}
