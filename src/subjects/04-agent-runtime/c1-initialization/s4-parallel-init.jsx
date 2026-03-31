import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ParallelInit() {
  return (
    <div className="prose-agents">
      <h2>Parallel Initialization</h2>
      <p>
        Many bootstrap steps are independent of each other — loading tool configurations does
        not require waiting for memory retrieval to complete; fetching user preferences does
        not depend on credential validation. Running these steps sequentially wastes time.
        Parallel initialization executes independent bootstrap steps concurrently, dramatically
        reducing total cold-start latency.
      </p>

      <ConceptBlock title="Parallel Initialization" number="Concept 4.4">
        Parallel initialization identifies the dependency graph of bootstrap steps and executes
        independent steps concurrently. Steps with dependencies run sequentially after their
        prerequisites complete. The total initialization time is determined by the critical path
        — the longest chain of dependent steps — rather than the sum of all steps. Effective
        parallelization can reduce cold-start time by 50–80% in typical agent setups.
      </ConceptBlock>

      <AnalogyBlock title="Pre-flight Checklist">
        Before a commercial flight departs, many preparation tasks happen in parallel: ground
        crew loads baggage, fuel truck refills tanks, catering loads meals, maintenance checks
        systems, and pilots complete cockpit setup. None of these depend on each other.
        Departure is held until all are complete — the gate closes when the last critical
        task finishes, not when they all finish sequentially. Agent parallel initialization
        applies the same pre-flight discipline.
      </AnalogyBlock>

      <p>
        The key design artifact for parallel initialization is the dependency graph: a directed
        acyclic graph (DAG) where each node is a bootstrap step and each edge represents a
        dependency. Steps with no incoming edges can start immediately. Steps with incoming
        edges wait for all their predecessors to complete. The runtime scheduler uses this
        graph to automatically maximize parallelism while respecting required ordering.
      </p>

      <NoteBlock title="Failure handling in parallel init" type="warning">
        When steps run in parallel, one step failing does not automatically cancel others.
        The runtime must define a policy: cancel all in-flight steps immediately (fail fast),
        or allow other steps to complete and collect all errors before reporting. Fail fast
        saves resources but may leave some initialization state partially complete. Collect-all
        provides richer diagnostics. For critical safety initialization, fail fast is usually
        the right choice.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'pi-1',
            difficulty: 'beginner',
            question:
              'Given these bootstrap steps and dependencies, which steps can run in parallel? (a) load config, (b) validate credentials [depends on a], (c) retrieve user history [depends on a], (d) assemble system prompt [depends on b and c], (e) register tools [depends on a].',
            hint: 'Draw out the dependency graph and identify which steps have the same prerequisites.',
            solution:
              'After (a) completes: steps (b), (c), and (e) can all run in parallel since they all depend only on (a). Step (d) must wait for both (b) and (c) to complete. So the parallel groups are: {a} → {b, c, e} in parallel → {d} (after b and c) with e completing independently.',
          },
          {
            id: 'pi-2',
            difficulty: 'intermediate',
            question:
              'A critical bootstrap step fails after 8 seconds, but 3 other parallel steps are still running and will take 2 more seconds each to complete. Should the runtime cancel the remaining steps immediately or wait for them? What factors influence this decision?',
            hint: 'Think about resource usage, error diagnostics, and what the remaining steps might be doing.',
            solution:
              'Factors: (1) Resource cost of letting them continue — if they are making external calls (database queries, API requests), canceling immediately saves those resources. (2) Whether the remaining steps produce useful diagnostic information even if the session fails. (3) Whether the remaining steps have side effects that are hard to clean up if they complete after a failure decision. Generally: cancel immediately if any remaining step has external side effects or significant resource cost; let them complete only if they are cheap, side-effect-free, and produce useful diagnostic data.',
          },
          {
            id: 'pi-3',
            difficulty: 'advanced',
            question:
              'A developer adds a new bootstrap step that loads user preferences. They add it to run in parallel with credential validation. Two weeks later, a bug is reported: users\' custom preferences are sometimes ignored. How might the parallel execution have caused this, and how would you fix it?',
            hint: 'Think about what might happen if the preferences load completes before or after another step that needs them.',
            solution:
              'A likely cause: the system prompt assembly step was designed to incorporate user preferences, but it didn\'t have a declared dependency on the preferences step. Sometimes preferences loaded before prompt assembly (working correctly), sometimes after (preferences available but not yet incorporated). Fix: explicitly declare the dependency so prompt assembly always waits for preferences loading. This is a race condition caused by an unmodeled dependency — the fix is modeling it correctly in the dependency graph, not adding arbitrary waits.',
          },
        ]}
      />
    </div>
  );
}
