import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function SessionPersistence() {
  return (
    <div className="prose-agents">
      <h2>Session Persistence</h2>
      <p>
        Agent sessions are ephemeral by default. The conversation exists in memory while
        the session is active, and vanishes when it ends. For short, self-contained tasks
        this is fine. But many real-world workflows span hours, days, or weeks — a user
        starts a research task, closes their laptop, and returns the next morning to
        continue. Session persistence is the set of techniques for saving agent state so
        that work can be paused, resumed, transferred, or reviewed after the fact.
      </p>

      <ConceptBlock title="Session Persistence" number="Concept 4.15">
        Session persistence means saving enough state from an agent session that the
        session can be resumed later without loss of context or progress. This includes
        the conversation history, any accumulated tool results, the agent's working
        state, and metadata about resource consumption. Persistence can range from
        simple transcript storage — saving the full conversation for human review — to
        full checkpoint-and-resume, where the agent picks up exactly where it left off.
      </ConceptBlock>

      <AnalogyBlock title="Saving a Video Game">
        A video game save file captures the player's position, inventory, quest progress,
        and world state. When the player loads the save, they resume exactly where they
        left off — they do not replay the entire game from the beginning. Session
        persistence works the same way for agents. The "save file" contains the
        conversation history, tool state, and progress markers. A well-designed save
        captures everything needed to resume without the agent needing to redo any
        completed work.
      </AnalogyBlock>

      <p>
        Persistence serves multiple purposes beyond simple resume. Saved sessions are
        an audit trail — a complete record of what the agent did, why, and at what cost.
        They enable debugging when something goes wrong. They allow supervisors to review
        agent work after the fact. And they enable a powerful pattern: session replay,
        where a saved session is loaded and the agent's decisions are re-examined or
        re-executed with different parameters.
      </p>

      <PrincipleBlock title="Persist for Auditability, Not Just Resumption" number="Principle 4.15">
        Even if you never plan to resume a session, persist it anyway. The record of
        what an agent did — which tools it called, what results it received, what
        decisions it made — is invaluable for debugging failures, understanding costs,
        improving prompts, and building trust with users. Treat session transcripts
        as operational data, not disposable logs.
      </PrincipleBlock>

      <NoteBlock title="What to persist" type="tip">
        A minimal persistence record includes the full message history and total token
        usage. A richer record adds timestamps for each turn, individual tool call
        durations, cost breakdowns, the system prompt version, and any configuration
        that was active during the session. The richer the record, the more useful it
        is for post-hoc analysis — but the more storage and serialization cost it
        incurs.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'sp-1',
            difficulty: 'beginner',
            question:
              'Why is saving just the final output of an agent session insufficient for persistence? What additional information is needed?',
            hint: 'Think about what you would need to resume the session or understand how the output was produced.',
            solution:
              'The final output alone captures the result but not the process. To resume, you need the full conversation history so the agent has context for continuing. To audit, you need the sequence of tool calls and their results to understand how the agent reached its conclusion. To debug, you need the intermediate reasoning steps where something may have gone wrong. Persistence must capture the journey, not just the destination.',
          },
          {
            id: 'sp-2',
            difficulty: 'intermediate',
            question:
              'An agent session was persisted twelve hours ago. Since then, the files the agent was working on have been modified by another developer. When the session is resumed, the agent\'s understanding of those files is stale. How should the runtime handle this?',
            hint: 'Think about what changed and what the agent assumed was still true.',
            solution:
              'The runtime should detect staleness by comparing timestamps or checksums of referenced resources at resume time versus when they were last accessed during the session. When a discrepancy is found, the runtime should inform the agent that specific resources have changed since the session was paused, and the agent should re-read the affected resources before continuing. Simply resuming with stale context would lead to decisions based on outdated information — potentially overwriting another developer\'s changes or missing important modifications.',
          },
          {
            id: 'sp-3',
            difficulty: 'advanced',
            question:
              'Design a checkpoint system that allows an agent to resume from any point in its session, not just the most recent state. What are the storage and consistency tradeoffs?',
            hint: 'Think about how version control allows you to check out any commit, not just the latest.',
            solution:
              'Store a checkpoint at each significant state transition — after each tool loop iteration, after each compaction, after each user turn. Each checkpoint contains the full conversation history and working state at that moment, forming a timeline of session states. To resume from any point, load the checkpoint at that point and continue from there. Storage tradeoff: full snapshots at every checkpoint are expensive; use incremental storage (deltas from the previous checkpoint) to reduce size. Consistency tradeoff: resuming from an earlier checkpoint means discarding all work done after that point, which is useful for "undoing" bad decisions but destructive if done carelessly. The system should make checkpoint selection explicit and warn about what will be lost when rolling back.',
          },
        ]}
      />
    </div>
  );
}
