import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function DerivedStateSection() {
  return (
    <div className="prose-agents">
      <p>
        Agents often need to track state that is not directly stored anywhere — it must
        be computed from what has happened in the session. This derived state is the
        agent's working understanding: what the user wants, what has been accomplished,
        what remains, and what constraints are active.
      </p>

      <ConceptBlock title="Derived State" number="Concept 6.3">
        Derived state is information that does not exist in conversation history or
        application state directly, but is inferred by the agent from those sources.
        Examples include the current progress toward a multi-step goal, the list of
        user-expressed constraints accumulated across turns, the agent's current
        hypothesis about user intent, and a running summary of decisions made.
        Derived state is the agent's active working model of the task.
      </ConceptBlock>

      <AnalogyBlock title="The Detective's Case Board">
        A detective investigating a case has raw evidence (conversation history and
        application state) and a case board — their working theory of events, key
        suspects, and open questions. The case board is derived from the evidence but
        is not the evidence itself. Updating the case board is continuous, and a good
        detective revises it when new evidence contradicts the current theory.
      </AnalogyBlock>

      <p>
        Derived state must be actively maintained. As the conversation evolves, earlier
        inferences may be invalidated — the user may clarify that they did not mean
        what the agent inferred, or application state changes may alter what was
        previously assumed. An agent that acts on stale derived state makes confident
        mistakes.
      </p>

      <WarningBlock title="Hardened Inferences">
        Agents can develop "hardened inferences" — derived conclusions that were
        correct earlier but persist after being invalidated. Once the agent has decided
        the user wants X, it may interpret all subsequent messages as confirming X
        even when they do not. Derived state must be treated as a working hypothesis,
        not a conclusion.
      </WarningBlock>

      <ExerciseBlock
        title="Derived State Practice"
        exercises={[
          {
            id: 'e6-3-1',
            difficulty: 'beginner',
            question: 'A user is booking a multi-leg trip. Over six turns they mention: no early flights, prefers aisle seats, traveling with a child, and budget under $800. What derived state should the agent be tracking?',
            hint: 'List the constraints and preferences that have accumulated across turns.',
            solution: 'Derived constraint list: (1) departure time: not before approximately 9am, (2) seat preference: aisle, (3) party: adult + child (likely requires adjacent seats), (4) total budget: under $800. The agent should also derive implied constraints: child fare, possible family seating requirements, potential need for adjacent seats on each leg.',
          },
          {
            id: 'e6-3-2',
            difficulty: 'intermediate',
            question: 'Midway through a task, the user says "actually, I don\'t care about the timeline anymore, just get the best price." How should this update the agent\'s derived state?',
            hint: 'Identify which earlier derived constraints are invalidated.',
            solution: 'This supersedes any previously derived time-related constraints (no early flights, specific departure windows, urgency signals). The optimization target shifts from balancing time and cost to purely minimizing cost. The agent should explicitly acknowledge the change and confirm its new understanding before proceeding, especially if it has already collected options based on the old priority.',
          },
          {
            id: 'e6-3-3',
            difficulty: 'advanced',
            question: 'Design a derived state management strategy for an agent that must track progress across a 20-step compliance workflow. How does the agent maintain an accurate picture of what is complete, pending, and blocked?',
            hint: 'Think about explicit state tracking versus inference from history.',
            solution: 'Maintain an explicit task registry in the persistent state block: each step has an ID, status (complete/pending/blocked), completion timestamp, and any blocking dependencies. The registry is updated by the agent as a structured mutation after each step completion, not inferred from history. Blocked states include the reason for blocking. This prevents the agent from re-attempting completed steps or skipping blocked ones due to history compression.',
          },
        ]}
      />
    </div>
  );
}
