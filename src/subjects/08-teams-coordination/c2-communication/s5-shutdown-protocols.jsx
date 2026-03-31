import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ShutdownProtocols() {
  return (
    <div className="prose-agents">
      <h2>Shutdown Protocols</h2>
      <p>
        A team that starts well but shuts down badly is still a broken team. Shutdown is
        the moment when the most resources can be wasted, the most side effects can be
        accidentally triggered, and the most state can be lost. A well-designed shutdown
        protocol is not an afterthought — it is a first-class design requirement that
        must be specified before the team is deployed.
      </p>

      <ConceptBlock title="Shutdown Protocols" number="Concept 8.9">
        A shutdown protocol is the agreed sequence of communication and actions that brings
        a team to a clean, complete stop. It defines: who initiates shutdown (the lead,
        a human, an external signal), what each agent must do in response, how in-progress
        work is handled, and how the team confirms all members have reached a terminal state.
        A protocol that does not address all four elements leaves gaps that cause resource
        leaks, incomplete actions, or data loss.
      </ConceptBlock>

      <p>
        Shutdown is not always planned. A team may need to stop due to task completion
        (normal shutdown), user cancellation (requested shutdown), a critical error
        (emergency shutdown), or resource exhaustion (forced shutdown). Each scenario
        has different urgency and different acceptable trade-offs between clean shutdown
        and speed. The protocol must handle all four, even if the normal path is the
        most common.
      </p>

      <PrincipleBlock title="Shutdown Must Be Deterministic" number="Principle 8.4">
        A shutdown protocol should always produce the same outcome regardless of when
        it is triggered: all agents reach a terminal state, all external resources are
        released, and the team's final status is logged. Shutdown sequences that depend
        on race conditions, unacknowledged messages, or agent availability produce
        unpredictable results. Design shutdown to be deterministic: every agent must
        have a path to terminal state even if every other agent has already stopped.
      </PrincipleBlock>

      <WarningBlock title="The Mid-Action Shutdown">
        The hardest shutdown case is when an agent is mid-action at the moment shutdown
        is triggered — it has started a tool call that has real-world effects (sending
        a request, writing a record) but has not yet completed it. The agent cannot
        safely abandon the action (partial writes are often worse than completed or not-started
        writes), and it cannot safely continue (the team is shutting down. Design actions
        to be atomic where possible, and design shutdown signals to be acknowledged rather
        than immediate interrupts.
      </WarningBlock>

      <ExerciseBlock
        title="Designing Shutdown Protocols"
        exercises={[
          {
            id: 'sp-1',
            difficulty: 'beginner',
            question: 'What are the four types of shutdown a team may need to handle? For each, describe the key difference in how the team should respond compared to normal task completion.',
            hint: 'Think about the initiator, the urgency, and the acceptable trade-offs in each case.',
            solution: '(1) Normal shutdown (task complete): orderly, all steps executed, results persisted, clean ledger update. (2) Requested shutdown (user cancels): similar to normal but partial results should be preserved; agents finish safe stopping points rather than task completion. (3) Emergency shutdown (critical error): faster than requested; agents may abort in-progress work to prevent further damage; all external connections closed immediately. (4) Forced shutdown (resource exhaustion or timeout): the infrastructure-level kill signal; agents may not reach their own shutdown logic; external resource release must be handled by the infrastructure layer, not the agent.',
          },
          {
            id: 'sp-2',
            difficulty: 'intermediate',
            question: 'Design the message exchange for a requested shutdown initiated by the team lead. Include: the shutdown signal, agent acknowledgement, partial-result submission, and final confirmation.',
            hint: 'Think of it as a four-step handshake.',
            solution: 'Step 1 — Lead broadcasts shutdown signal: { type: "shutdown_request", shutdown_id: UUID, mode: "graceful", reason: "user_cancellation", complete_current_action: true, deadline: timestamp }. Step 2 — Each agent sends: { type: "shutdown_ack", shutdown_id: UUID, agent_id: string, status: "acknowledged", current_action: "completing"|"none" }. Step 3 — Each agent sends, when ready: { type: "shutdown_ready", shutdown_id: UUID, agent_id: string, partial_results: object|null, resources_released: bool }. Step 4 — Lead confirms all agents in terminal state: { type: "shutdown_complete", shutdown_id: UUID, agents_terminated: [...], partial_results_stored: bool }.',
          },
          {
            id: 'sp-3',
            difficulty: 'advanced',
            question: 'An agent receives a shutdown signal while it is waiting for a response from an external API. The API call has already been sent and cannot be cancelled. The agent holds a database row lock that must be released. What should the agent do?',
            hint: 'Prioritise resource release over result collection; differentiate between blocking and non-blocking resource holds.',
            solution: 'The agent should: (1) Acknowledge the shutdown signal immediately to prevent the lead from timing out waiting for it. (2) Release the database row lock right now — holding a lock through shutdown is a guaranteed resource leak. The lock can be released without waiting for the API response. (3) Set a short timeout for the API response (e.g., 10 seconds). If the response arrives within the window, record it in the partial-results package. If not, log "API response pending at shutdown" and proceed. (4) Under no circumstances wait indefinitely for the API response — the agent must reach terminal state by the shutdown deadline regardless. (5) Send shutdown_ready with whatever partial result is available and resources_released: true.',
          },
        ]}
      />
    </div>
  );
}
