import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function SharedState() {
  return (
    <div className="prose-agents">
      <h2>Shared State</h2>
      <p>
        Agents in a swarm rarely work in complete isolation. They need to know what
        others have done, what remains to be done, and what the current state of the
        overall task looks like. Shared state is the mechanism that makes this
        coordination possible — a common pool of information that all agents can
        read from and write to.
      </p>

      <ConceptBlock title="Shared State" number="8.12">
        <p>
          Shared state is any data structure, store, or communication channel that
          multiple agents in a swarm can access to coordinate their behavior. It includes
          task queues, progress trackers, result stores, and coordination flags. The
          design of shared state determines how efficiently agents can divide work,
          avoid duplication, and combine results.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Shared Whiteboard">
        <p>
          Picture a team of researchers in a room with a large whiteboard. Each person
          works independently but walks to the whiteboard to check what others have found,
          mark their own progress, and claim the next unclaimed topic. The whiteboard is
          the shared state — it does not do the research, but without it the team would
          constantly duplicate work or miss critical findings. The whiteboard's layout
          and conventions determine how smoothly the team operates.
        </p>
      </AnalogyBlock>

      <p>
        The fundamental tension in shared state design is between accessibility and
        consistency. Making state easy to read and write encourages coordination, but
        concurrent access creates the risk of stale reads, lost updates, and race
        conditions. Every shared state design must decide how to balance these forces.
      </p>

      <PrincipleBlock title="Minimize Shared State Surface" number="8.7">
        <p>
          Share only what agents need to coordinate — not everything they know. The more
          state that is shared, the more opportunities for contention, inconsistency, and
          coupling between agents. Each piece of shared state should justify its existence
          by enabling coordination that would otherwise be impossible. Private state should
          remain private.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Stale reads cause silent failures">
        <p>
          When an agent reads shared state and acts on it, the state may have changed by
          the time the action completes. Two agents can both read "task X is unclaimed,"
          both claim it, and both do the work. Without mechanisms like atomic claims or
          optimistic locking, these silent duplications accumulate and waste resources
          without any error being raised.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ss-1',
            difficulty: 'beginner',
            question: 'A swarm of five agents must process a list of 100 items without any agent working on the same item as another. What shared state do they need, and what is the minimum information it must contain?',
            hint: 'Think about what each agent needs to know before picking up the next item.',
            solution: 'The minimum shared state is a task registry that tracks, for each item, whether it is unclaimed, in-progress (and by which agent), or completed. Each agent checks the registry, atomically claims an unclaimed item, processes it, and marks it complete. The registry needs only three fields per item: item ID, status, and claiming agent ID. This is the minimum — anything less leads to duplicate work or missed items.'
          },
          {
            id: 'ss-2',
            difficulty: 'intermediate',
            question: 'Two swarm architectures are proposed: (A) agents share a single global results dictionary where each writes its findings, and (B) each agent writes to its own private results store, with a final aggregation step. What are the trade-offs between these two approaches?',
            hint: 'Consider write contention, failure isolation, and the complexity of the aggregation step.',
            solution: 'Architecture A (shared dictionary): simpler final output (already aggregated), but creates write contention as agents compete to update the same structure. A single agent\'s crash while writing can corrupt shared state. Architecture B (private stores + aggregation): eliminates write contention entirely since agents never compete for the same resource. A crash affects only one agent\'s private store. The trade-off is that aggregation must be designed separately, and intermediate progress is harder to observe since results are scattered. For most swarms, B is safer — the aggregation step is a small price for eliminating contention.'
          },
          {
            id: 'ss-3',
            difficulty: 'advanced',
            question: 'Design the shared state architecture for a swarm where agents must not only avoid duplicate work but also build on each other\'s partial results. For instance, agent A discovers a fact that changes how agent B should process its item. How do you structure this interdependency without creating a bottleneck?',
            hint: 'Think about publish-subscribe patterns and event-driven updates rather than polling.',
            solution: 'Use a two-layer shared state architecture. Layer 1: a task queue with atomic claims (same as simple swarms, handles work distribution). Layer 2: an event bus where agents publish discoveries as typed events. Agents subscribe to event types relevant to their current task. When agent A discovers a fact, it publishes an event. Agent B, if subscribed to that event type, receives it and can adjust its processing. This avoids bottlenecks because: the event bus is append-only (no contention), agents filter events locally (no central processing), and the task queue and event bus are independent systems. The key design choice is making events immutable and typed — agents decide locally what is relevant, rather than a central coordinator pushing updates.'
          }
        ]}
      />
    </div>
  )
}
