import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function GracefulFailure() {
  return (
    <div className="prose-agents">
      <h2>Graceful Failure in Tool Composition</h2>
      <p>
        Tools fail. Networks drop. Services go down. Inputs arrive that the tool never
        anticipated. In any real agent deployment, tool failures are not the exception —
        they are a routine part of operation. The question is not whether failures will
        occur, but whether the agent is designed to handle them gracefully: to detect them
        accurately, respond proportionally, and recover without causing further harm.
      </p>

      <ConceptBlock title="Graceful Failure" number="Concept 2.14">
        Graceful failure is the property of a system that encounters errors without
        catastrophic consequence. An agent that fails gracefully detects tool errors
        accurately, responds with an appropriate recovery action (retry, alternative tool,
        escalation, or abort), and never allows a failed tool call to silently corrupt the
        rest of its workflow. Graceful failure is not about eliminating errors — it is about
        ensuring that errors are visible, bounded, and recoverable.
      </ConceptBlock>

      <h3>The Four Responses to Tool Failure</h3>
      <p>
        When a tool call fails, an agent has four basic responses available. The right
        choice depends on the nature of the failure and the reversibility of what has
        already been done:
      </p>
      <ul>
        <li>
          <strong>Retry:</strong> Appropriate for transient failures (network errors,
          temporary service unavailability) when the tool is idempotent. Retry with
          a delay and a limit — infinite retries cause infinite hangs.
        </li>
        <li>
          <strong>Alternative tool:</strong> When a tool is unavailable but another tool
          can achieve a similar result, the agent pivots. This requires knowing, in advance,
          which tools can substitute for which.
        </li>
        <li>
          <strong>Partial completion:</strong> When part of the workflow succeeded before
          the failure, the agent may be able to report what it accomplished and flag what
          remains incomplete, rather than discarding the entire effort.
        </li>
        <li>
          <strong>Escalation:</strong> When the agent cannot safely determine the right
          recovery path, it surfaces the failure to a human or a supervisory system. This
          is always the right choice when uncertainty is high and stakes are significant.
        </li>
      </ul>

      <PrincipleBlock title="Never Swallow Failures Silently" number="Principle 2.12">
        The most dangerous response to a tool failure is to treat it as a success and
        continue. Once a failure is silently absorbed into the workflow, all subsequent
        reasoning builds on a false foundation. The agent may take further consequential
        actions based on a state that does not actually exist. Loud, explicit failure
        handling is always safer than silent continuation, even when it means stopping
        short of the goal.
      </PrincipleBlock>

      <h3>Designing Workflows for Failure Tolerance</h3>
      <p>
        Failure tolerance is not something you add to a workflow after the fact. It must
        be designed in from the beginning. At every step in a tool composition, the designer
        should ask: "What happens here if the tool returns an error? What if it times out?
        What if it returns a result that is technically valid but semantically wrong for
        this context?"
      </p>
      <p>
        Workflows with explicit failure paths at each step are longer to design but far
        shorter to debug. Every anticipated failure case that has a defined response is
        one less failure mode that can propagate silently through the rest of the workflow.
      </p>

      <WarningBlock title="Retry Loops Without Limits Are Denial-of-Service">
        An agent that retries a failing tool without a maximum retry count or backoff delay
        can loop indefinitely, consuming resources and blocking other work. Always bound
        retries: a maximum count, an increasing delay between attempts, and a defined fallback
        when the limit is reached. Unbounded retry loops are one of the most common
        pathological failure modes in production agent deployments.
      </WarningBlock>

      <ExerciseBlock
        title="Graceful Failure Patterns"
        exercises={[
          {
            id: 'gf-1',
            difficulty: 'beginner',
            question: 'An agent calls a "get_weather" tool and receives a "service unavailable" error. It calls a "send_daily_briefing" tool next anyway, constructing a briefing without weather data. What has gone wrong, and what should the agent have done?',
            hint: 'Consider whether the failure was detected, and whether the downstream action was appropriate given that detection.',
            solution: 'The agent detected the failure (it received a "service unavailable" error) but did not respond to it — it continued as if weather data were available. The briefing now omits weather or contains stale data without flagging this to the user. The correct behavior: after receiving the error, the agent should either (1) retry the weather tool if it was a transient failure, (2) note in the briefing that weather data was unavailable today, or (3) delay sending until weather data is available. Silently proceeding is the worst option.',
          },
          {
            id: 'gf-2',
            difficulty: 'intermediate',
            question: 'Design the failure handling for a three-step workflow: (1) reserve inventory, (2) process payment, (3) confirm order. Step 2 fails after step 1 has succeeded. What should the agent do, and why is this harder than a failure at step 1?',
            hint: 'Think about what state now exists in the world that did not before, and whether it is safe to leave it.',
            solution: 'Step 1 has already reserved inventory — real state exists that must be addressed. If the agent simply aborts, the reservation persists indefinitely, blocking that inventory from other customers. The correct response: trigger a compensating action (release the reservation) before reporting the failure. This is harder than a step 1 failure because the agent must actively undo completed work, not just stop. The principle here is that failure handling in multi-step workflows must account for already-committed side effects and provide compensating actions for each one.',
          },
          {
            id: 'gf-3',
            difficulty: 'advanced',
            question: 'What is the difference between a "retry-safe" failure and a "retry-dangerous" failure? Give an example of each, and describe how an agent should distinguish between them before deciding to retry.',
            hint: 'Think about what property of the tool and the failure type determines whether retrying makes things better or worse.',
            solution: 'A retry-safe failure is one where retrying cannot make the situation worse: the tool is idempotent (so a duplicate call has no additional effect) and the failure was transient (the underlying problem is likely resolved by the time of the retry). Example: a "get_user_profile" call that times out — retrying fetches the same profile with no side effects. A retry-dangerous failure is one where retrying can cause harm: the tool is non-idempotent or the failure was due to invalid input, not a transient condition. Example: a "send_payment" call that failed with "insufficient funds" — retrying does not fix the root cause and may trigger additional failed-payment fees. An agent should check: (1) Is the tool idempotent? (2) Is the error code indicating a transient condition (timeout, service unavailable) or a permanent one (invalid input, permission denied, insufficient funds)? Only retry for transient failures on idempotent tools.',
          },
        ]}
      />
    </div>
  );
}
