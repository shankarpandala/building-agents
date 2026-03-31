import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function OrphanAgents() {
  return (
    <div className="prose-agents">
      <h2>Orphan Agents</h2>
      <p>
        An orphan agent is a sub-agent that has been started but whose results will never be
        collected, whose errors will never be handled, and which may continue consuming
        resources long after the parent task has concluded. Orphan agents are one of the
        costliest failure modes in multi-agent systems — invisible, persistent, and capable
        of causing cascading problems in the environment they operate in.
      </p>

      <ConceptBlock title="Orphan Agents" number="Concept 7.12">
        An orphan agent is a sub-agent that has lost its connection to the orchestrator that
        spawned it. This happens when an orchestrator fails or exits without cancelling its
        sub-agents, when a sub-agent is launched with no timeout or cancellation mechanism,
        or when the orchestrator simply moves on and forgets to collect results. Orphan agents
        may continue executing, consuming API quotas, writing to external systems, or holding
        locks — all without any parent to account for their behaviour.
      </ConceptBlock>

      <p>
        Preventing orphan agents requires the same discipline as preventing resource leaks in
        software: every resource opened must be explicitly closed. Every sub-agent launched must
        have a corresponding lifecycle: a timeout or completion condition, a cancellation path
        for when the parent exits early, and a mechanism for the orchestrator to verify that
        all sub-agents have reached a terminal state before the task is considered complete.
      </p>

      <NoteBlock type="tip" title="The Ledger Pattern">
        Maintain a ledger of every sub-agent launched, indexed by ID, with columns for launch
        time, expected completion time, current status, and result. Before the orchestrator
        concludes, it checks the ledger: any sub-agent not in a terminal state (completed,
        failed, cancelled) must be explicitly cancelled. This simple pattern prevents the
        most common forms of orphaning.
      </NoteBlock>

      <WarningBlock title="Orphan Agents in External Systems">
        An orphan agent that holds an external resource — an open database transaction, a
        checked-out lock, an authenticated session — can block other agents or users from
        accessing that resource indefinitely. External systems may not have the ability to
        detect or time out hung agent connections. Design every sub-agent to release external
        resources explicitly before it terminates, and set resource-level timeouts independent
        of agent lifecycle.
      </WarningBlock>

      <ExerciseBlock
        title="Preventing and Detecting Orphan Agents"
        exercises={[
          {
            id: 'oa-1',
            difficulty: 'beginner',
            question: 'Name three conditions that can cause an orchestrator to orphan a sub-agent it launched. For each, describe what the sub-agent continues to do after it is orphaned.',
            hint: 'Think about orchestrator failure, task completion without cleanup, and timeout omission.',
            solution: '(1) Orchestrator crashes mid-task: the sub-agent continues executing with no one to collect its result or cancel it. (2) Orchestrator marks the task complete before waiting for all sub-agents: the remaining sub-agents continue running and may write results to locations no one will read. (3) No timeout set and the sub-agent enters an infinite loop or waits on an unresponsive external service: it runs indefinitely consuming resources.',
          },
          {
            id: 'oa-2',
            difficulty: 'intermediate',
            question: 'An orchestrator is cancelled by the user midway through a multi-agent task. Design the shutdown sequence the orchestrator should follow to avoid leaving orphan agents behind.',
            hint: 'Think about order of operations: what must happen before the orchestrator terminates?',
            solution: 'Shutdown sequence: (1) Receive cancellation signal. (2) Stop launching any new sub-agents. (3) Send cancellation signals to all sub-agents currently running (identified from the ledger). (4) Wait up to a brief grace period for sub-agents to acknowledge cancellation and release external resources. (5) For any sub-agent that does not acknowledge within the grace period, force-terminate it at the infrastructure level. (6) Log the final state of all sub-agents (cancelled, completed, force-terminated). (7) Release any resources the orchestrator itself holds. Then exit.',
          },
          {
            id: 'oa-3',
            difficulty: 'advanced',
            question: 'In a long-running production system, orphan agents from previous runs are discovered still executing after the orchestrators that spawned them have long since exited. Design a recovery mechanism that can detect and clean up these orphans without human intervention.',
            hint: 'Think about heartbeats, expiry timestamps, and a background watchdog process.',
            solution: 'Recovery mechanism: (1) Each sub-agent registers itself with a central registry on start, recording its ID, parent orchestrator ID, start time, and a lease expiry time. (2) Each sub-agent renews its lease periodically (heartbeat). (3) A watchdog process scans the registry for entries past their lease expiry that have not been renewed — these are candidate orphans. (4) The watchdog checks whether the parent orchestrator is still active. If not, it marks the sub-agent as orphaned and sends a termination signal. (5) The watchdog logs all cleanups with reasons, enabling post-mortem analysis of why orphaning occurred. (6) Recovered orphan results are preserved in a dead-letter store for potential inspection.',
          },
        ]}
      />
    </div>
  );
}
