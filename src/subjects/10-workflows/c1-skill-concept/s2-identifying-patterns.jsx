import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function IdentifyingPatterns() {
  return (
    <div className="prose-agents">
      <h2>Identifying Skill Patterns</h2>
      <p>
        Skills do not appear fully formed — they are discovered by noticing patterns in agent
        behavior. When the same sequence of steps, the same decision structure, or the same
        type of output appears across multiple tasks, that repetition is a signal that a skill
        is waiting to be named and extracted. The discipline of identifying patterns is what
        separates an agent with ad hoc behavior from one with a coherent capability vocabulary.
      </p>

      <ConceptBlock title="Skill Pattern" number="10.2">
        <p>
          A skill pattern is a recurring structure in agent behavior: a set of steps that appear
          together consistently, applied to varying inputs but producing a consistent type of
          output. Identifying a skill pattern means recognizing when something an agent already
          does repeatedly has enough structure and consistency to be made explicit, named,
          and reused.
        </p>
      </ConceptBlock>

      <p>
        Four signals indicate that a pattern has emerged and a skill should be extracted.
        First, <strong>repetition</strong>: the same sequence of steps appears in multiple tasks.
        Second, <strong>variation in inputs but consistency in structure</strong>: the steps are
        the same, but they operate on different data each time. Third, <strong>a clear output
        type</strong>: the procedure reliably produces a recognizable kind of result. Fourth,
        <strong> transferability</strong>: the procedure would be useful in contexts other than
        the one where it first appeared.
      </p>

      <AnalogyBlock title="The Surgeon's Checklists">
        <p>
          Surgeons use pre-operative checklists not because they forget how to operate, but
          because they noticed that certain mistakes recurred under pressure — and that a
          structured procedure eliminated them. The checklist captures a pattern that proved
          its value through repetition. Identifying agent skill patterns works the same way:
          watch for what works, notice its structure, and formalize it.
        </p>
      </AnalogyBlock>

      <PrincipleBlock title="Name What You Can Repeat" number="10.1">
        <p>
          If you find yourself describing the same sequence of steps when explaining what an
          agent should do, that description wants to become a skill. The act of naming a pattern
          makes it possible to reason about it, test it, and improve it independently. Unnamed
          patterns are invisible; named patterns are manageable.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex10-2-1',
            difficulty: 'beginner',
            question: 'An agent has been observed doing the following in different tasks: (a) finding a customer\'s recent orders and summarizing them; (b) finding a product\'s recent reviews and summarizing them; (c) finding a support ticket\'s recent updates and summarizing them. What common skill pattern do these share, and what should the skill be named?',
            hint: 'Ignore the specific domain (customer, product, ticket) and look at the structural similarity.',
            solution: 'The common pattern is: retrieve recent items for a given entity, then summarize them. This is a "Recent Activity Summary" skill (or similar). The skill takes an entity type and entity identifier as parameters, retrieves recent related items, and produces a structured summary. The specific domains (customer, product, support ticket) are instances of the same pattern — they differ only in which tool is called during the retrieval step, which can be parameterized.'
          },
          {
            id: 'ex10-2-2',
            difficulty: 'intermediate',
            question: 'How would you systematically analyze an agent\'s execution history to identify skill candidates? Describe a process for surfacing patterns from a log of past agent runs.',
            hint: 'Think about what you would look for in the logs: repeated sequences, common output shapes, clustered tool combinations.',
            solution: 'Process: (1) Collect execution traces — the sequence of tool calls, decisions, and outputs for a sample of completed tasks. (2) Normalize the traces by removing task-specific values (keep the structure, replace the data with placeholders). (3) Cluster normalized traces by structural similarity — sequences that look the same after normalization are candidates for a shared skill. (4) Identify clusters with the following properties: appear in at least 3-5 tasks, have a consistent output shape, and cover the full sequence from a recognizable starting condition to a recognizable completion. (5) Review the top clusters with a domain expert to confirm they represent meaningful units of work. The result is a ranked list of skill candidates with evidence from actual execution history.'
          },
          {
            id: 'ex10-2-3',
            difficulty: 'advanced',
            question: 'Not all recurring patterns should become skills. Describe two types of recurring patterns that should NOT be extracted into skills, and explain why.',
            hint: 'Consider patterns that are too context-specific, too unstable, or where the variation between instances is the important part.',
            solution: 'Type 1: Highly context-specific one-offs disguised as patterns. Some tasks appear structurally similar but their variations are not incidental — they reflect genuinely different requirements. Extracting them into a skill forces all instances into the same mold, obscuring important differences. Example: "handle a customer escalation" may look similar across instances but the right response varies so much by context that a fixed procedure is actually harmful. Type 2: Unstable patterns in rapidly changing domains. If the steps in a pattern change frequently because the underlying domain or tools are evolving, extracting it into a skill creates a skill that is constantly out of date. The overhead of maintaining the skill exceeds the benefit of having it. The signal: if you would need to update the skill definition after every few uses, it is not stable enough to be a skill yet.'
          }
        ]}
      />
    </div>
  )
}
