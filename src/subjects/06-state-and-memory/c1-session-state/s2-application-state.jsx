import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ApplicationStateSection() {
  return (
    <div className="prose-agents">
      <p>
        Beyond the conversation itself, agents operate within a broader application
        state — the structured data that describes the world outside the chat window.
        Account records, task queues, document states, and system configurations are
        all application state that the agent reads from and writes to.
      </p>

      <ConceptBlock title="Application State" number="Concept 6.2">
        Application state is the structured, persistent data managed by the system
        that the agent interacts with through tools. Unlike conversation history
        (which lives in the context window), application state lives in external
        systems — databases, APIs, file stores — and must be explicitly fetched or
        mutated via tool calls. Application state is the real world the agent acts upon.
      </ConceptBlock>

      <p>
        The key distinction is mutability and persistence. Conversation history is
        append-only within a session. Application state can be created, read, updated,
        and deleted across sessions — changes persist after the conversation ends and
        affect other users, systems, and future interactions. This asymmetry is why
        mutations to application state require more caution than additions to conversation
        history.
      </p>

      <PrincipleBlock title="Application State Changes Are Durable" number="Principle 6.1">
        Every tool call that modifies application state creates a durable change in the
        real world. The agent must treat such calls as consequential and irreversible
        unless an explicit undo mechanism exists. Confirming before mutating, and
        logging after, are both essential practices for application state management.
      </PrincipleBlock>

      <NoteBlock type="note" title="State Freshness">
        Application state fetched at the beginning of a session may become stale during
        a long conversation. Before taking an action that depends on a previously fetched
        value, re-fetch it if the session has been active long enough that concurrent
        changes are plausible. Stale state reads are a common source of agent errors.
      </NoteBlock>

      <ExerciseBlock
        title="Application State Practice"
        exercises={[
          {
            id: 'e6-2-1',
            difficulty: 'beginner',
            question: 'List three examples of application state and three examples of conversation history from a travel booking agent\'s session. What makes each belong to its category?',
            hint: 'Application state persists after the session; conversation history does not.',
            solution: 'Application state: (1) the user\'s saved payment methods, (2) an existing booking in the reservation system, (3) the current flight inventory. Conversation history: (1) the user saying "I prefer window seats," (2) the agent\'s last fare quote, (3) the user asking about baggage fees. The former exist in external systems; the latter exist only in the chat context.',
          },
          {
            id: 'e6-2-2',
            difficulty: 'intermediate',
            question: 'An agent cancels a flight booking and books a replacement. Midway through, the payment for the replacement fails. The original booking is already cancelled. Describe the application state problem and how to design against it.',
            hint: 'Think about transactional integrity and rollback.',
            solution: 'The agent created a partially applied state change — the old booking is gone but the new one failed. To design against this: use a transactional pattern where the original is only cancelled after the replacement is confirmed. If the platform does not support transactions, hold the original in a "pending cancel" state until the replacement succeeds. Always communicate ambiguous state to the user immediately.',
          },
          {
            id: 'e6-2-3',
            difficulty: 'advanced',
            question: 'How should an agent handle the case where application state fetched via a read tool call conflicts with information the user provided in the conversation? Which source should take precedence, and when?',
            hint: 'Consider the reliability of each source and the type of conflict.',
            solution: 'System data (application state) is typically authoritative for factual records (balances, dates, IDs). User-provided data takes precedence for preferences and intentions. When there is a factual conflict (user claims X, system shows Y), the agent should surface the discrepancy rather than silently choosing: "Your account shows a balance of $200 — you mentioned $400. Would you like me to look into the difference?" This preserves trust and catches both data errors and user mistakes.',
          },
        ]}
      />
    </div>
  );
}
