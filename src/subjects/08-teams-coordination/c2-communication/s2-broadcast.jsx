import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Broadcast() {
  return (
    <div className="prose-agents">
      <h2>Broadcast Communication</h2>
      <p>
        Not every message is meant for one agent. Some information needs to reach the entire
        team simultaneously: a change in the task's goal, a critical constraint that emerged
        mid-execution, a shutdown signal. For these situations, point-to-point communication
        is inefficient and error-prone — sending individual copies to each team member
        introduces ordering problems and the risk of some members receiving the message later
        than others. Broadcast communication solves this.
      </p>

      <ConceptBlock title="Broadcast Communication" number="Concept 8.6">
        Broadcast communication is a message sent from one agent to all active team members
        simultaneously. It is used when information is relevant to every agent, when a change
        in the team's shared context needs to be propagated consistently, or when a signal
        must be received and acted on by all members at the same logical time. Broadcast
        messages are typically sent by the team lead and carry information that affects how
        all teammates should interpret or continue their current work.
      </ConceptBlock>

      <p>
        The key property of a broadcast is simultaneity: every recipient receives the same
        message, at the same time, without the lead having to maintain a list of individual
        channels. In practice, "same time" often means "before any member can take an action
        that the broadcast would affect" — the broadcast must arrive before any conflicting
        action, not necessarily at the exact same millisecond. Designing broadcast delivery
        to satisfy this ordering property is the core challenge.
      </p>

      <NoteBlock type="tip" title="When to Broadcast vs Point-to-Point">
        Use broadcast for: team-wide context updates (the goal has changed), shutdown and
        pause signals, acknowledgement requests that all members must respond to, and shared
        state invalidations (cached data is now stale). Use point-to-point for everything
        else. Broadcasting routine task assignments clutters all agents' contexts with
        irrelevant information.
      </NoteBlock>

      <WarningBlock title="Broadcast Overuse">
        A team lead that broadcasts frequently creates cognitive load for all teammates, who
        must process every broadcast regardless of relevance to their current task. In agent
        terms, every broadcast consumes context window space in every teammate. Reserve
        broadcasts for genuinely team-wide information and send everything else point-to-point.
      </WarningBlock>

      <ExerciseBlock
        title="Using Broadcast Communication Effectively"
        exercises={[
          {
            id: 'bc-1',
            difficulty: 'beginner',
            question: 'For a five-person research team, list three events that should trigger a broadcast and three that should trigger a point-to-point message. Explain the difference.',
            hint: 'Ask: does every team member need to know this immediately?',
            solution: 'Broadcast-worthy: (1) The research scope has narrowed — all teammates must stop working on out-of-scope topics. (2) A new deadline has been imposed — all teammates need to re-prioritise. (3) A key source has been found that all researchers should use. Point-to-point: (1) Assigning a specific topic to one researcher. (2) Asking the writer for a status update. (3) Sending a tool credential to only the researcher who needs it.',
          },
          {
            id: 'bc-2',
            difficulty: 'intermediate',
            question: 'A team lead broadcasts an updated constraint ("all outputs must now be under 200 words"). Three teammates are mid-task with long outputs in progress. How should each teammate handle this broadcast, and what should they return?',
            hint: 'Think about what "acknowledge" means for a broadcast and how teammates adapt in-progress work.',
            solution: 'Each teammate should: (1) Acknowledge receipt of the broadcast to the lead. (2) Assess their in-progress work against the new constraint. (3) If their output-so-far exceeds 200 words, begin trimming or restructuring before completion. (4) If already past the point where trimming is possible without redoing work, report the conflict to the lead: "Acknowledged constraint. Current draft is 450 words. I can trim to 200 on completion, or restart now — which do you prefer?" The lead makes the call; the teammate does not decide unilaterally.',
          },
          {
            id: 'bc-3',
            difficulty: 'advanced',
            question: 'Design a broadcast protocol that guarantees all team members have acknowledged and acted on a critical broadcast before the team lead proceeds. Include: message structure, acknowledgement schema, and what the lead does if a member fails to acknowledge within the timeout.',
            hint: 'Think about this as a two-phase commit: announce, then confirm.',
            solution: 'Phase 1 — Announce: Lead broadcasts { type: "broadcast", broadcast_id: UUID, criticality: "required_ack", content: {...}, ack_deadline: timestamp }. Phase 2 — Acknowledge: each teammate sends { type: "broadcast_ack", broadcast_id: UUID, agent_id: string, status: "received_and_applied" | "received_conflict", conflict_details: string | null }. Lead tracks acks by broadcast_id. If all acks arrive before deadline: proceed. If one or more agents fail to ack by deadline: lead queries their status directly (point-to-point). If no response to status query within secondary timeout: treat as failed, remove from active roster, reassign their task, proceed with remaining team. All ack state is logged for audit.',
          },
        ]}
      />
    </div>
  );
}
