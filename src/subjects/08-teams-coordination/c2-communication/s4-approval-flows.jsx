import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ApprovalFlows() {
  return (
    <div className="prose-agents">
      <h2>Approval Flows</h2>
      <p>
        Some agent actions are consequential enough that they should not proceed without
        explicit authorisation — from the team lead, from a human supervisor, or from a
        defined approval authority. Approval flows are the communication patterns that
        implement this gate. They are not a sign of distrust in the agent; they are a
        deliberate architectural choice to route certain classes of decision through a
        checkpoint before execution.
      </p>

      <ConceptBlock title="Approval Flows" number="Concept 8.8">
        An approval flow is a communication pattern in which an agent pauses before a
        consequential action and sends an approval request to a designated authority —
        another agent, the team lead, or a human. Execution only proceeds when an
        explicit approval signal is received. Approval flows introduce latency deliberately
        in exchange for a safety guarantee: irreversible or high-impact actions do not happen
        autonomously.
      </ConceptBlock>

      <p>
        The decision of which actions require approval is a policy decision, not a technical
        one. It should be made based on the reversibility of the action, the cost of an
        incorrect decision, and the stakes of the domain. A researcher fetching a web page
        needs no approval. An executor that is about to delete a database table or send an
        email to ten thousand customers must pause and ask. The approval threshold defines
        where autonomous action ends and human (or lead) oversight begins.
      </p>

      <PrincipleBlock title="Define Approval Thresholds Explicitly" number="Principle 8.3">
        Every team should have a documented approval policy: a list of action categories and
        their required approval level (none, lead approval, human approval). Leaving approval
        thresholds implicit — trusting agents to judge for themselves which actions are
        consequential — is unreliable. The policy should be specified at team design time
        and encoded in each agent's constraints.
      </PrincipleBlock>

      <NoteBlock type="note" title="Approval vs Escalation">
        Approval flows are pre-action gates: the agent asks before acting. Escalation is
        post-discovery: the agent acts as far as it safely can, then escalates when it
        hits a limit it cannot resolve. Both are valuable; they serve different purposes.
        Approval flows prevent unauthorised consequential actions; escalation handles
        novel situations the agent is not equipped to resolve unilaterally.
      </NoteBlock>

      <ExerciseBlock
        title="Designing Approval Flows"
        exercises={[
          {
            id: 'af-1',
            difficulty: 'beginner',
            question: 'For each of the following actions, decide whether no approval, lead approval, or human approval is appropriate: (a) reading a file; (b) sending an email to one user; (c) deleting a production database table; (d) updating a user\'s billing plan.',
            hint: 'Consider reversibility and blast radius.',
            solution: '(a) Reading a file: no approval needed — read-only, no side effects. (b) Sending an email to one user: lead approval recommended — direct user contact has reputational risk but limited blast radius. (c) Deleting a production database table: human approval required — irreversible, potentially catastrophic. (d) Updating a billing plan: human approval required — financial impact, irreversible changes to a user account.',
          },
          {
            id: 'af-2',
            difficulty: 'intermediate',
            question: 'Design the message schema for an approval request and an approval response. What information must the request contain for the approver to make an informed decision quickly? What must the response contain for the requestor to act correctly?',
            hint: 'Think about what context the approver needs and what execution parameters the response must confirm.',
            solution: 'Approval request: { type: "approval_request", request_id: UUID, agent_id: string, action_type: string, action_description: string, affected_resources: string[], reversibility: "irreversible"|"recoverable"|"reversible", estimated_impact: string, context_summary: string, deadline_for_response: ISO-8601 }. Approval response: { type: "approval_response", request_id: UUID, decision: "approved"|"denied"|"deferred", approver_id: string, decided_at: ISO-8601, conditions: string | null, reason: string | null }. The agent only proceeds on "approved"; on "denied" it stops; on "deferred" it waits for a subsequent response.',
          },
          {
            id: 'af-3',
            difficulty: 'advanced',
            question: 'An agent sends an approval request to a human approver but receives no response within the timeout. The action it was seeking approval for is time-sensitive — the window to act closes soon. Design the escalation path for this scenario.',
            hint: 'Consider retry, re-routing to an alternative approver, and graceful degradation.',
            solution: 'Escalation path: (1) At 50% of timeout: send a reminder to the primary approver (point-to-point, urgent priority). (2) At 80% of timeout: simultaneously notify the backup approver (if defined in policy) and the team lead. (3) At timeout expiry: if no response, the agent must not proceed with the consequential action. It reports to the team lead: { status: "approval_timeout", action_blocked: [...], time_window_closes_at: timestamp }. (4) Team lead decides: escalate to a human supervisor immediately, or accept the action is missed. (5) Audit log records: approval requested, reminders sent, timeout occurred, action blocked. This preserves the safety guarantee — no approved-action skipping even under time pressure.',
          },
        ]}
      />
    </div>
  );
}
