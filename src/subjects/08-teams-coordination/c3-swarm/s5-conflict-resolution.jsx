import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ConflictResolution() {
  return (
    <div className="prose-agents">
      <h2>Conflict Resolution</h2>
      <p>
        Whenever multiple agents can act on the same resource, modify the same output,
        or reach different conclusions about the same question, conflict is inevitable.
        Conflict resolution is not an edge case to handle later — it is a core design
        concern that must be addressed before a swarm is deployed.
      </p>

      <ConceptBlock title="Conflict Resolution" number="8.13">
        <p>
          Conflict resolution is the set of rules and mechanisms a multi-agent system
          uses to handle situations where agents produce incompatible outputs, claim
          overlapping resources, or reach contradictory conclusions. Resolution strategies
          range from simple (last write wins) to sophisticated (voting, arbitration by a
          designated authority, or structured merge). The right strategy depends on the
          cost of an incorrect resolution.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="Two Editors, One Document">
        <p>
          Imagine two editors revising the same paragraph of a manuscript simultaneously.
          One tightens the prose, the other restructures the argument. When they compare
          their versions, the changes are incompatible — you cannot simply overlay one on
          the other. Someone must decide which revision to keep, how to merge them, or
          whether to start fresh. Multi-agent conflicts follow the same pattern: independent
          work produces divergent results that require deliberate reconciliation.
        </p>
      </AnalogyBlock>

      <p>
        The simplest conflicts are resource conflicts — two agents trying to claim the
        same task. These are resolved mechanically through atomic operations. More complex
        are output conflicts, where agents produce different results for the same question.
        The hardest are strategy conflicts, where agents disagree about what approach to
        take. Each level requires different resolution mechanisms.
      </p>

      <PrincipleBlock title="Define Conflict Resolution Before Conflicts Occur" number="8.8">
        <p>
          Every shared resource and every point where agent outputs converge must have a
          pre-defined conflict resolution policy. Discovering that you need conflict
          resolution during a production run means the conflict has already caused damage.
          Anticipate where conflicts can arise and encode the resolution strategy into
          the system design from the beginning.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Last-write-wins destroys information">
        <p>
          The simplest resolution strategy — accepting whichever result was written last —
          is also the most dangerous. It silently discards the earlier result without
          evaluating whether it was better. In agent systems where outputs carry different
          levels of confidence or quality, last-write-wins can consistently discard the
          superior result in favor of the merely more recent one.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'cr-1',
            difficulty: 'beginner',
            question: 'Three agents are asked to classify the same document. Agent A says "urgent," Agent B says "routine," and Agent C says "urgent." How should the system resolve this disagreement? What if the vote were 2-1 in the other direction?',
            hint: 'Consider majority voting and whether all agents\' opinions should carry equal weight.',
            solution: 'With simple majority voting, the document is classified as "urgent" (2-1). If the vote were 2-1 for "routine," the classification would be "routine." Majority voting works when agents have roughly equal competence and the classification is discrete. However, if Agent A is known to be more accurate for this document type, a weighted voting system might override the majority. The key insight is that majority voting is a reasonable default, but equal weighting assumes equal competence — an assumption worth verifying.'
          },
          {
            id: 'cr-2',
            difficulty: 'intermediate',
            question: 'Two agents are refactoring different parts of a codebase and both modify a shared configuration file. Their changes are logically independent but textually overlap. Design a resolution strategy that does not require human intervention.',
            hint: 'Think about how version control systems handle this, and what additional context agents have that text-based merge tools do not.',
            solution: 'Use a semantic merge strategy: instead of merging text, have each agent express its changes as structured operations (e.g., "set key X to value Y," "add entry Z to list W"). A merge coordinator applies all non-conflicting operations directly. For true conflicts (both agents modify the same key to different values), the coordinator uses a priority rule based on which agent\'s task has higher relevance to that key. If priority is equal, the coordinator spawns a brief arbitration step: a single agent reviews both proposed values with the context of why each was chosen, and selects or synthesizes the final value. This is automatic because the arbitration agent has access to both agents\' reasoning.'
          },
          {
            id: 'cr-3',
            difficulty: 'advanced',
            question: 'Design a conflict resolution framework for a swarm where agents may disagree not just on outputs but on strategy — for example, one agent believes the task should be decomposed differently than another. How do you resolve strategic disagreements without a single point of authority becoming a bottleneck?',
            hint: 'Consider time-boxed experimentation, where competing strategies run in parallel briefly and results determine the winner.',
            solution: 'Use a competitive evaluation pattern. When a strategic disagreement is detected: (1) Each competing strategy is allocated a small, equal budget (time or resources) to demonstrate results on a subset of the work. (2) An evaluation function — defined before the conflict, not ad hoc — measures the quality and efficiency of each strategy\'s partial results. (3) The strategy with better evaluation results is adopted for the remainder of the work. (4) If results are statistically indistinguishable, the system defaults to the simpler strategy (fewer coordination requirements). This avoids a single authority bottleneck because the resolution is empirical, not authoritative. The evaluation function is the pre-defined policy; no agent or coordinator makes a subjective judgment. The cost is the parallel experimentation budget, which must be bounded to prevent strategic disagreements from consuming too many resources.'
          }
        ]}
      />
    </div>
  )
}
