import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function RemoteMachines() {
  return (
    <div className="prose-agents">
      <h2>Remote Machines</h2>
      <p>
        Agents do not always run on the same machine as the developer or the user who
        invoked them. In many real-world deployments, an agent runs on a remote server —
        a cloud instance, a compute node, or a shared development environment. This changes
        the operational model significantly.
      </p>

      <ConceptBlock title="Remote Agent Execution" number="Concept 11.6">
        Remote execution means the agent process runs on a machine that is not the local
        developer workstation. The agent operates in that remote environment — reading
        files, running commands, and accessing services — but communicates its outputs
        back to the human across a network boundary. The agent's perspective of "local"
        is the remote machine, not the developer's laptop.
      </ConceptBlock>

      <p>
        Remote execution is often chosen for resource reasons — the remote machine has
        more CPU, more memory, or access to private networks that the local machine does
        not. It is also used for isolation: running untrusted code or large-scale operations
        on a dedicated machine prevents interference with the developer's local environment.
      </p>

      <NoteBlock title="Latency Is Now a First-Class Concern" type="note">
        Every action the agent takes on the remote machine involves a round-trip over the
        network. File reads, command outputs, and status updates all travel across this
        boundary. Designing agents for remote execution means accounting for latency at
        every step — batching operations where possible, streaming outputs incrementally,
        and avoiding unnecessary round-trips.
      </NoteBlock>

      <WarningBlock title="Environment Drift">
        The remote machine's environment may differ from what the agent expects: different
        software versions, different file system layouts, different environment variables.
        Agents running remotely must be resilient to these differences and should inspect
        their environment before making assumptions rather than trusting that the remote
        setup matches a template.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'rm-1',
            difficulty: 'beginner',
            question: 'List three reasons why you might prefer to run an agent on a remote machine rather than locally. List one significant downside of each.',
            hint: 'Consider resources, isolation, and network access.',
            solution: '(1) More compute — the remote machine has more CPU/RAM for intensive tasks. Downside: latency for all I/O. (2) Isolation — agent runs in a sandboxed environment away from local files. Downside: harder to debug; agent cannot easily access local artifacts. (3) Private network access — the remote machine is inside a VPC with access to internal services. Downside: security surface increases; credentials for those services must be safely provided to the agent.'
          },
          {
            id: 'rm-2',
            difficulty: 'intermediate',
            question: 'An agent running remotely needs to process 500 files. How should it approach this differently than if it were running locally?',
            hint: 'Think about how many round-trips are needed and how to minimize them.',
            solution: 'On a remote machine, the agent should process files locally (on the remote server) rather than streaming each file back to the orchestrator for processing. It should batch operations — reading many files in one call if possible — rather than making one call per file. Results should be aggregated and returned as a summary rather than streamed as individual outputs. The key principle is to minimize the number of times data crosses the network boundary.'
          },
          {
            id: 'rm-3',
            difficulty: 'advanced',
            question: 'What happens when a remote agent process is killed mid-task? Design a recovery strategy that allows the agent to resume safely.',
            hint: 'Think about checkpointing, idempotency, and how to communicate the agent\'s prior state.',
            solution: 'The agent should write checkpoints to persistent storage at meaningful milestones — after completing each logical sub-task. Each operation should be idempotent where possible: re-running the same step should produce the same result, not a duplicate. On restart, the agent reads the last checkpoint, informs the human of the recovery, and asks whether to resume from that point. Actions that cannot be made idempotent (e.g., sending a notification) should be guarded with completion flags stored alongside the checkpoint.'
          }
        ]}
      />
    </div>
  );
}
