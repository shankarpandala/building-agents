import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function PrioritySection() {
  return (
    <div className="prose-agents">
      <p>
        When the context window approaches its limit, decisions must be made about what
        to keep and what to remove. Priority ordering gives the agent and its orchestration
        layer a principled basis for those decisions rather than a first-in-first-out
        default that often discards the wrong things.
      </p>

      <ConceptBlock title="Context Priority" number="Concept 5.12">
        Context priority is a ranking of which elements of the context window are most
        critical to the agent's current task. High-priority content is never truncated;
        low-priority content is compressed or removed first. Priority is determined by
        a combination of <strong>recency</strong> (recent turns are more relevant),
        <strong>criticality</strong> (safety rules and current task instructions are
        always high), and <strong>utility</strong> (does this content contribute to
        answering the current request?).
      </ConceptBlock>

      <p>
        A practical priority ordering from highest to lowest: current system prompt
        and constraints, the active task or goal statement, the most recent five
        user and assistant turns, relevant tool results from the current task,
        earlier conversation turns, older tool results, and finally background
        context that was injected but never referenced.
      </p>

      <PrincipleBlock title="Critical Instructions Must Survive Compression" number="Principle 5.6">
        Any instruction critical enough to affect the safety or correctness of the
        agent's behavior must be placed in a position that survives context compression.
        The system prompt is the only reliable location. Instructions buried in mid-
        conversation tool results may be silently dropped when compression occurs.
      </PrincipleBlock>

      <NoteBlock type="intuition" title="The Compression Budget">
        Think of context management as allocating a compression budget. High-priority
        content is never compressed. Medium-priority content is summarized. Low-priority
        content is dropped entirely. Define these tiers explicitly in your orchestration
        layer so compression decisions are deterministic, not ad hoc.
      </NoteBlock>

      <ExerciseBlock
        title="Context Priority Practice"
        exercises={[
          {
            id: 'e5-12-1',
            difficulty: 'beginner',
            question: 'Rank the following context elements from highest to lowest priority for retention when the window is 90% full: (a) a tool result from turn 2, (b) the system prompt, (c) the last two user turns, (d) a retrieved FAQ document injected at turn 1 and never cited.',
            hint: 'Apply recency and criticality to rank each element.',
            solution: 'Highest: (b) system prompt — always retained. (c) last two user turns — recency-critical. (a) tool result from turn 2 — retain if still relevant to current task, else summarize. Lowest: (d) injected FAQ never cited — first candidate for removal.',
          },
          {
            id: 'e5-12-2',
            difficulty: 'intermediate',
            question: 'An orchestration system compresses the middle section of a conversation by replacing it with a summary. What information must the summary preserve to maintain agent coherence?',
            hint: 'Think about what the agent needs to correctly continue the task.',
            solution: 'The summary must preserve: (1) the user\'s original goal or task description, (2) any commitments the agent made, (3) information the user provided (names, numbers, preferences), (4) which sub-tasks are complete versus pending, (5) any constraints or corrections the user specified. What can be omitted: pleasantries, redundant restatements, intermediate reasoning steps.',
          },
          {
            id: 'e5-12-3',
            difficulty: 'advanced',
            question: 'Design a priority scoring function for a long-running research agent where the task spans many hours and involves dozens of tool calls. How do you preserve research continuity when older results must be compressed?',
            hint: 'Consider tagging results by relevance to the current sub-task versus the overall goal.',
            solution: 'Tag each tool result with: (1) the sub-task it supported, (2) whether its findings were incorporated into a conclusion (archived vs. active), (3) a relevance decay score that decreases as the conversation moves to later sub-tasks. During compression, archive fully concluded sub-task results as one-paragraph summaries. Keep active sub-task results in full. Maintain a persistent "research log" as a compressed chronological summary appended to the system prompt.',
          },
        ]}
      />
    </div>
  );
}
