import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ParallelComposition() {
  return (
    <div className="prose-agents">
      <h2>Parallel Tool Composition</h2>
      <p>
        Not every tool invocation depends on the result of the previous one. When multiple
        tool calls are independent of each other — when they need no information from one
        another and do not conflict in their effects — they can be executed in parallel.
        Parallel composition is a powerful pattern for reducing the latency and turn-count
        of agent workflows. Used correctly, it makes agents dramatically more efficient.
        Used incorrectly, it produces race conditions, conflicting writes, and failures
        that are difficult to reproduce.
      </p>

      <ConceptBlock title="Parallel Composition" number="Concept 2.12">
        Parallel composition is the simultaneous invocation of two or more tools whose
        execution does not depend on each other's results and whose effects do not conflict.
        It is appropriate when the tools are reading independent data sources, performing
        independent computations, or acting on disjoint parts of the world. It is dangerous
        when the tools share state, when one tool's output is the other's input, or when
        their combined effects could be inconsistent.
      </ConceptBlock>

      <h3>When Parallelism Is Safe</h3>
      <p>
        The key question before running tools in parallel is: are these invocations truly
        independent? Independence has two components:
      </p>
      <ul>
        <li>
          <strong>Data independence:</strong> Neither tool needs to read the output of the
          other to function correctly. If tool A's result must feed into tool B, they are
          not independent — they must be sequential.
        </li>
        <li>
          <strong>Effect independence:</strong> The tools do not write to the same location,
          the same record, or the same external state. Two tools that both update the same
          field in a database are not independent — their parallel execution risks a write
          conflict or a lost update.
        </li>
      </ul>
      <p>
        Read-only tools are almost always safe to parallelize. Two information retrieval
        calls that fetch data from different sources have no interaction surface and no
        conflict risk. Gathering data in parallel is one of the most reliable uses of
        this pattern.
      </p>

      <PrincipleBlock title="Parallelize Reads, Serialize Writes" number="Principle 2.10">
        A practical default for parallel composition: read operations can almost always be
        parallelized safely. Write operations — anything that modifies external state —
        should be carefully evaluated for effect independence before being parallelized.
        When in doubt about two write operations, serialize them. The latency cost of
        sequential execution is almost always smaller than the debugging cost of a
        parallelism-induced data corruption.
      </PrincipleBlock>

      <h3>Handling Partial Failures in Parallel Execution</h3>
      <p>
        When multiple tools run in parallel and one of them fails, the agent faces a complex
        recovery problem. The other tools may have already succeeded and taken irreversible
        actions. The agent must decide: should the overall task abort? Should it proceed with
        the successful results and ignore the failed one? Should it retry only the failed tool?
      </p>
      <p>
        This complexity is not a reason to avoid parallelism, but it is a reason to plan for
        it explicitly. The agent's design should specify, for each parallel composition, how
        partial failures are handled — before the failure occurs, not in the moment.
      </p>

      <WarningBlock title="Parallelism Amplifies Race Conditions">
        Any shared state between parallel tools is a potential race condition. Two tools that
        each check a balance, determine it is sufficient, and then both attempt to deduct from
        it may both succeed even if only one should have. Race conditions in agent workflows
        are especially difficult to detect because they are timing-dependent and may only
        manifest under specific load conditions. If shared mutable state is involved, serialize.
      </WarningBlock>

      <ExerciseBlock
        title="Parallel Composition"
        exercises={[
          {
            id: 'par-1',
            difficulty: 'beginner',
            question: 'An agent must: (a) fetch the user\'s profile, (b) fetch the user\'s recent orders, (c) update the user\'s last-login timestamp, and (d) send a welcome-back email. Which of these can be parallelized, and which must be sequential or serialized?',
            hint: 'Check each pair for data dependence and effect independence.',
            solution: '(a) and (b) can be parallelized — both are reads from independent data sources. (c) and (d) depend on context: (c) is a write operation that can run concurrently with reads (a) and (b) since it writes to a different field. (d) should run after the profile is fetched, since the email may need to include personalized content from the profile. So: parallelize (a), (b), and (c) together; run (d) after (a) completes with the profile data.',
          },
          {
            id: 'par-2',
            difficulty: 'intermediate',
            question: 'An agent is orchestrating three independent API calls in parallel. One of them fails with a network timeout. Describe the different recovery strategies the agent might take and when each is appropriate.',
            hint: 'Consider whether the failed call\'s result is essential or optional to the overall task.',
            solution: 'Strategy 1 — Abort all: appropriate when the failed call\'s result is essential and the other calls\' results are meaningless without it. Strategy 2 — Proceed with partial results: appropriate when the failed call is optional and the successful results are independently useful. Strategy 3 — Retry the failed call only: appropriate when the tool is idempotent and the failure was transient (network timeout). Strategy 4 — Surface the gap to the user: appropriate when the agent cannot safely determine which strategy is correct without human judgment. The right choice depends on whether the failed result is load-bearing for the task goal.',
          },
          {
            id: 'par-3',
            difficulty: 'advanced',
            question: 'Two agent tasks run in parallel: Task A reads the account balance and, based on it, triggers a refund. Task B reads the same account balance and, based on it, triggers a charge. Describe the race condition that can occur and a design-level solution to prevent it.',
            hint: 'Think about the time between reading the balance and acting on it.',
            solution: 'Both tasks read the balance at approximately the same time. Both see a sufficient balance. Task A triggers a refund (increasing the balance). Task B triggers a charge (decreasing the balance). But the charge may have been decided based on a balance that the refund has now inflated — the two operations are not operating on a consistent view of state. This is a classic check-then-act race condition. Design solutions: (1) Use optimistic locking — each operation includes the balance value it read; the write is rejected if the balance has changed since the read. (2) Serialize all balance-modifying operations through a queue or lock. (3) Use atomic compare-and-swap operations at the storage level. Parallelism and shared mutable state require explicit concurrency control.',
          },
        ]}
      />
    </div>
  );
}
