import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ContextCompaction() {
  return (
    <div className="prose-agents">
      <h2>Context Compaction</h2>
      <p>
        As an agent works, its conversation history grows. Every user message, every
        assistant response, every tool call and result adds tokens to the context. Left
        unchecked, this growth eventually fills the context window and halts the agent.
        Context compaction is the set of techniques for reducing the size of the history
        while preserving the information the agent needs to continue working coherently.
      </p>

      <ConceptBlock title="Context Compaction" number="Concept 4.12">
        Context compaction is the process of replacing verbose or outdated portions of
        the conversation history with shorter representations that preserve essential
        information. Compaction reduces token consumption so the agent can continue
        operating within its context window. Common techniques include summarizing
        earlier turns, truncating large tool results to their key findings, and
        dropping turns that are no longer relevant to the current task.
      </ConceptBlock>

      <AnalogyBlock title="Meeting Minutes">
        In a long meeting, a note-taker does not transcribe every word spoken. They
        capture the key decisions, action items, and important context — a compact
        representation of what matters. Later participants can read the minutes and
        understand the state of play without reliving every discussion. Context
        compaction works the same way: replacing the full transcript of earlier
        turns with a summary that captures what the agent needs going forward.
      </AnalogyBlock>

      <p>
        The art of compaction lies in deciding what to keep and what to discard.
        Aggressive compaction saves the most tokens but risks losing information that
        turns out to matter later. Conservative compaction preserves more detail but
        provides less relief. The best strategies are adaptive — they compact more
        aggressively as the context fills up, and they preserve information that is
        most likely to be referenced again based on the task structure.
      </p>

      <WarningBlock title="Compaction can destroy critical context">
        When a summary replaces the original turns, the original detail is gone from
        the model's perspective. If the summary omits a fact that becomes relevant
        later, the agent will behave as though that fact never existed. This is not
        a minor inconvenience — it can cause the agent to contradict earlier decisions,
        repeat work it already completed, or lose track of constraints it was given.
        Compaction must be treated as a lossy operation with real consequences.
      </WarningBlock>

      <NoteBlock title="When to compact" type="intuition">
        Compaction should be triggered by approaching a threshold, not by hitting a
        wall. If the context window is at 80% capacity, compact proactively. Waiting
        until 99% means the compaction itself may not have enough room to execute
        properly, and the agent is one large tool result away from failure.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'cc-1',
            difficulty: 'beginner',
            question:
              'Why is context compaction described as a "lossy" operation? What does it lose?',
            hint: 'Compare a summary to the original content it replaces.',
            solution:
              'Compaction is lossy because a summary cannot capture every detail of the original content. Specific wording, nuance, intermediate reasoning steps, and minor details are lost when turns are summarized. The model can no longer reference the exact original content — only the summary\'s interpretation of it. This is analogous to lossy image compression: the file is smaller, but fine detail is permanently removed.',
          },
          {
            id: 'cc-2',
            difficulty: 'intermediate',
            question:
              'An agent is working on a coding task. Its history contains fifteen turns: five about understanding the requirements, five about exploring the codebase, and five about implementing a solution. The context is nearly full. Which turns should be compacted most aggressively, and why?',
            hint: 'Think about which information is still actively needed.',
            solution:
              'The codebase exploration turns should be compacted most aggressively — their specific tool outputs (file contents, search results) are large and their key findings can be summarized compactly. Requirements turns should be compacted conservatively because losing a requirement could cause incorrect implementation. Implementation turns should be kept in full because they represent the current working state. The principle: compact completed phases aggressively, preserve the active phase and constraints.',
          },
          {
            id: 'cc-3',
            difficulty: 'advanced',
            question:
              'Design a compaction strategy that minimizes the risk of losing information the agent will need later. What metadata or signals would help the compaction system make better decisions?',
            hint: 'Think about what makes certain information more likely to be referenced again.',
            solution:
              'Track reference frequency — information that has been referenced multiple times across turns is more likely to matter again. Tag turns with their role in the task (constraint, discovery, decision, action) and compact each type differently. Preserve all user-stated constraints verbatim. Keep a separate "key facts" list that survives compaction, updated as important discoveries are made. Allow the agent itself to flag information as "preserve" during its reasoning. Use task phase detection to avoid compacting information from the current phase. The ideal system combines structural metadata with the agent\'s own judgment about what matters.',
          },
        ]}
      />
    </div>
  );
}
