import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function InteractiveSessions() {
  return (
    <div className="prose-agents">
      <h2>Interactive Sessions</h2>
      <p>
        An IDE agent rarely completes its work in a single isolated burst. More often, it
        operates in an interactive session — a continuous loop where the developer and the
        agent exchange messages, the agent takes actions, and the developer can redirect,
        approve, or interrupt at any point. Designing for interactive sessions requires
        thinking carefully about state, interruption, and shared understanding.
      </p>

      <ConceptBlock title="Interactive Session" number="Concept 11.5">
        An interactive session is a stateful, multi-turn exchange between the developer and
        the agent within the IDE. The agent accumulates context across turns — prior messages,
        actions taken, files modified — and uses it to inform each next step. Sessions can be
        paused, redirected, or terminated by the developer at any time.
      </ConceptBlock>

      <AnalogyBlock title="The Pair Programming Session">
        Think of an interactive agent session like pair programming with a colleague. You
        describe what you want to accomplish, they start making changes, you give feedback
        mid-stream, they adjust. The session has a shared context — both of you know what
        has already been done. If you get interrupted and come back later, you both need
        to re-establish that shared understanding before continuing.
      </AnalogyBlock>

      <p>
        Session state is the accumulated record of what has happened: what the agent was
        asked to do, what it did, what it observed, and what the developer said in response.
        This state must be maintained faithfully because the agent's next action depends
        on it. Losing session state mid-task — due to a crash, timeout, or restart —
        forces the agent to act without history, which is dangerous.
      </p>

      <WarningBlock title="Never Assume Continuity">
        An agent should never assume that a session will run to completion without interruption.
        Developers close their IDE, switch tasks, or lose network connections. A well-designed
        interactive session should be resumable: the agent stores enough state that it can
        reconstruct where it left off, and it confirms with the developer before continuing
        rather than blindly picking up where it stopped.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'is-1',
            difficulty: 'beginner',
            question: 'What information would you store in session state to allow an interrupted agent session to be resumed accurately?',
            hint: 'Think about what the agent knew, what it did, and what it was about to do.',
            solution: 'Session state should store: the original task description, the conversation history (all messages exchanged), a list of actions taken (files modified, commands run) with their results, the current plan or next intended step, and any context the developer provided mid-session. With this, the agent can give the developer a clear summary of where things stand and ask whether to continue, modify, or abandon the task.'
          },
          {
            id: 'is-2',
            difficulty: 'intermediate',
            question: 'A developer redirects an agent mid-task: "Actually, ignore what I said about tests — focus on the UI first." How should the agent handle this redirect?',
            hint: 'Consider both immediate response and the impact on session state.',
            solution: 'The agent should: (1) acknowledge the redirect clearly, (2) summarize what it has already done for the tests (so the developer knows the current state), (3) ask whether those test changes should be kept or reverted, and (4) then shift focus to the UI. The session state must be updated to reflect the new priority. Silently switching focus without acknowledgment risks the developer losing track of what state the codebase is in.'
          },
          {
            id: 'is-3',
            difficulty: 'advanced',
            question: 'How does the concept of "undo" complicate interactive agent sessions, and what design choices make undo more tractable?',
            hint: 'Think about compound actions — what happens when a single agent turn involves many file changes?',
            solution: 'Each agent turn may involve many discrete actions (editing multiple files, running commands with side effects). Undoing a turn means reversing all of those actions atomically. This requires the agent to track every change it makes with enough detail to reverse it, and to recognize that some actions (network calls, file deletions without backup) may be irreversible. Design choices that help: taking snapshots before each turn, treating all changes as staged until explicitly committed, presenting the diff to the developer before applying, and avoiding irreversible side effects whenever possible.'
          }
        ]}
      />
    </div>
  );
}
