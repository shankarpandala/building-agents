import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Idempotency() {
  return (
    <div className="prose-agents">
      <h2>Idempotency and Safe Retries</h2>
      <p>
        Agents operate in unreliable environments. Networks drop connections. Services time out.
        Tools return ambiguous results that leave the agent unsure whether its call succeeded.
        In these moments, the agent faces a fundamental question: is it safe to try again?
        The answer depends almost entirely on whether the tool is idempotent.
      </p>

      <ConceptBlock title="Idempotency" number="Concept 2.8">
        A tool is idempotent if calling it multiple times with the same inputs produces the
        same result as calling it once. The world ends up in the same state whether the tool
        was called one time or ten. Idempotency is not about returning the same value on every
        call — it is about not accumulating side effects. An idempotent "set status to active"
        is safe to retry. A non-idempotent "increment counter" is not.
      </ConceptBlock>

      <h3>Why Idempotency Matters for Agents</h3>
      <p>
        An agent that is uncertain whether its last tool call succeeded has two options:
        assume success and move on, or retry and risk double-execution. Both options are
        dangerous if the tool is not idempotent. Assume success and you may skip a required
        step. Retry and you may send the email twice, charge the card twice, or create the
        record twice.
      </p>
      <p>
        Idempotent tools eliminate this dilemma. When an agent is uncertain, it can retry
        safely. If the first call succeeded, the retry produces no additional effect. If it
        failed, the retry completes the work. The agent can recover from network ambiguity
        without risk of duplication.
      </p>

      <AnalogyBlock title="The Elevator Button">
        Pressing an elevator button is idempotent. Press it once, the elevator is summoned.
        Press it five more times because you are impatient — the elevator still comes once,
        and arrives at the same time. The button was designed so that repeated presses have
        no additional effect beyond the first. Good tool design works the same way: the
        agent should be able to press the button as many times as it needs without fear
        of summoning five elevators.
      </AnalogyBlock>

      <PrincipleBlock title="Design for the Retry Case" number="Principle 2.6">
        When designing a tool, the retry scenario should be a primary design consideration —
        not an edge case. Ask explicitly: "What happens if this tool is called twice with the
        same inputs?" If the answer is "bad things," the tool needs to be redesigned or
        wrapped with deduplication logic before it is safe for agent use. Tools that are
        designed without considering retries become ticking time bombs in production agents.
      </PrincipleBlock>

      <h3>Techniques for Achieving Idempotency</h3>
      <p>
        Not all operations are naturally idempotent, but most can be made idempotent through
        careful design:
      </p>
      <ul>
        <li>
          <strong>Upsert instead of insert:</strong> An operation that creates a record if
          it does not exist, and updates it if it does, is idempotent. A pure insert that
          fails or duplicates on re-run is not.
        </li>
        <li>
          <strong>Idempotency keys:</strong> The agent provides a unique identifier with
          each request. The tool checks whether that identifier has been processed before.
          If yes, it returns the stored result. If no, it processes and stores the result
          for future retries.
        </li>
        <li>
          <strong>Conditional operations:</strong> "Set the status to X only if it is
          currently Y" naturally limits the effect of retries once the state has been
          changed.
        </li>
        <li>
          <strong>Explicit deduplication windows:</strong> Some operations (like sending
          a notification) can suppress duplicates if a matching request was seen within
          a recent time window.
        </li>
      </ul>

      <ExerciseBlock
        title="Idempotency in Practice"
        exercises={[
          {
            id: 'id-1',
            difficulty: 'beginner',
            question: 'Classify each of these operations as idempotent or non-idempotent: (a) set a user\'s email address, (b) append a line to a log file, (c) place an order for a product, (d) check whether a file exists.',
            hint: 'Ask for each: if you do this twice with identical inputs, does the world end up in a different state than if you did it once?',
            solution: '(a) Idempotent — setting an email to the same value twice leaves it at that value. (b) Non-idempotent — appending twice adds two lines. (c) Non-idempotent — placing the same order twice creates two orders. (d) Idempotent — checking whether a file exists has no side effects and returns the same result each time.',
          },
          {
            id: 'id-2',
            difficulty: 'intermediate',
            question: 'An agent sends a payment request via a tool. The network times out and the agent does not know if the payment went through. Without idempotency, what are the two bad outcomes possible? How does an idempotency key solve both problems?',
            hint: 'Think about what happens in each case: the payment did go through, and the payment did not go through.',
            solution: 'If the payment went through and the agent retries: the customer is charged twice. If the payment did not go through and the agent assumes success: the transaction never completes and the service is never rendered. An idempotency key solves both: the payment provider records the key on the first successful attempt. If the agent retries with the same key, the provider returns the original result (already succeeded) rather than processing again. If the key has not been recorded, the payment is processed normally. In both cases, the agent gets an accurate, definitive answer safely.',
          },
          {
            id: 'id-3',
            difficulty: 'advanced',
            question: 'Some operations are intrinsically non-idempotent (for example, generating a unique invoice number or sending a time-sensitive alert). How should a tool designer expose these tools to agents so that the non-idempotency is clear and safe retries are still possible?',
            hint: 'Think about what information needs to flow between the first attempt and any retry, and how the contract communicates the risk.',
            solution: 'The tool\'s description should explicitly state it is non-idempotent and what the consequences of a retry are. The tool should return a unique identifier for each successful invocation (e.g., invoice number, notification ID) so the agent can check whether a prior call succeeded before retrying. The agent should be designed to check for this identifier\'s existence before calling the tool again. For the most sensitive cases, the tool should require the caller to pass an explicit "I understand this is not idempotent" flag, forcing the agent to acknowledge the risk rather than calling it casually.',
          },
        ]}
      />
    </div>
  );
}
