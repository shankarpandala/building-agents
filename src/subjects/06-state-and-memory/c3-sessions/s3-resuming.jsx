import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ResumingSection() {
  return (
    <div className="prose-agents">
      <p>
        Not all conversations reach a natural conclusion. Users close browsers,
        lose connectivity, or simply run out of time mid-task. Resuming a session
        means restoring enough state that the agent and user can continue as if the
        interruption did not happen — or at least understand exactly where they left off.
      </p>

      <ConceptBlock title="Session Resumption" number="Concept 6.12">
        Session resumption is the process of restoring a prior session's state into
        a new context window so that work can continue without requiring the user to
        re-establish context from scratch. A fully resumable session preserves:
        the conversation history, the task progress, any pending commitments or
        outstanding questions from the prior session, and the agent's current
        understanding of the user's goal.
      </ConceptBlock>

      <AnalogyBlock title="The Bookmarked Page">
        A reader who is interrupted mid-chapter places a bookmark and notes where
        they were in the story. When they return, they flip to the bookmark, read
        the last paragraph to re-orient, and continue. Session resumption works
        the same way: the "bookmark" is the saved session state, and the "last
        paragraph" is a brief summary of where the conversation was when it paused.
      </AnalogyBlock>

      <p>
        Effective resumption requires three things: a durable transcript (so the
        prior session can be reconstructed), a resumption summary (a compact
        description of pending state that can be injected into the new session's
        system prompt), and a reconnection protocol (how the agent greets the
        returning user and confirms what to do next). The resumption summary is
        the most important — it bridges the gap between sessions at low token cost.
      </p>

      <WarningBlock title="Stale Pending Actions">
        When resuming a session hours or days after interruption, pending actions
        from the prior session may be stale. A task that was "in progress" may have
        been completed by another means, superseded by events, or become irrelevant.
        Always validate the state of pending actions before resuming execution —
        never assume the world is unchanged.
      </WarningBlock>

      <ExerciseBlock
        title="Session Resumption Practice"
        exercises={[
          {
            id: 'e6-12-1',
            difficulty: 'beginner',
            question: 'A user was in the middle of filing a support ticket when they lost connectivity. When they return the next day, what should the resumption experience look like?',
            hint: 'Think about what the user needs to know and what the agent needs to verify.',
            solution: 'The agent should greet the returning user and summarize where they left off: "Welcome back. Last time we were working on a support ticket about [topic]. You had filled in [X and Y] and we were about to [next step]. Would you like to continue?" The agent should verify the ticket was not already submitted by another route before proceeding.',
          },
          {
            id: 'e6-12-2',
            difficulty: 'intermediate',
            question: 'Design a resumption summary format that captures sufficient context for a coding task that was interrupted mid-implementation. What fields must the summary contain?',
            hint: 'Think about what a developer needs to know to continue work seamlessly.',
            solution: 'Fields: (1) Task description: the original goal in one to two sentences. (2) Completed steps: what has been implemented or decided. (3) Current state: where exactly the work stopped and what was being worked on. (4) Pending steps: what remains to be done. (5) Open questions: anything that was unresolved when the session ended. (6) Key decisions: important choices made and their rationale. (7) Blocking issues: any problems that were preventing progress.',
          },
          {
            id: 'e6-12-3',
            difficulty: 'advanced',
            question: 'A multi-agent workflow involving three specialized agents was interrupted mid-run. Design a resumption strategy that correctly identifies which agent was active, what state each agent holds, and how to safely continue.',
            hint: 'Consider workflow checkpointing and safe restart points.',
            solution: 'Each agent maintains a checkpoint after completing each discrete sub-task. The checkpoint includes: agent ID, task step, output produced, and the inputs received. On resumption: (1) Read the workflow log to find the last successful checkpoint. (2) Identify which agent was active and at what step. (3) Re-validate the inputs to the interrupted step (they may have changed). (4) Resume from the last checkpoint, not from before it — do not re-execute completed steps. (5) If the interrupted step is partially complete, determine whether it is safe to continue or must be restarted. (6) Notify human oversight before resuming any step that had irreversible side effects.',
          },
        ]}
      />
    </div>
  );
}
