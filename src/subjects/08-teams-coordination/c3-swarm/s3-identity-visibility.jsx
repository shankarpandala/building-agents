import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function IdentityAndVisibility() {
  return (
    <div className="prose-agents">
      <h2>Identity and Visibility</h2>
      <p>
        When a single agent operates alone, there is no question about who did what.
        In a swarm, that clarity vanishes. Multiple agents work simultaneously, produce
        outputs, consume resources, and sometimes fail. Without a deliberate system for
        identity and visibility, debugging a swarm is like investigating a crime where
        every witness is anonymous.
      </p>

      <ConceptBlock title="Agent Identity" number="8.11">
        <p>
          Agent identity is a unique, persistent label attached to every agent instance in
          a swarm. Identity includes a name or identifier, a role description, and metadata
          about when and why the agent was created. Identity serves two purposes: it allows
          operators to distinguish one agent from another in logs and dashboards, and it
          allows agents themselves to reference each other when coordinating work.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="Name Badges at a Conference">
        <p>
          Imagine a conference where nobody wears a name badge. You overhear interesting
          conversations but cannot tell who said what, who to follow up with, or who is
          responsible for a particular session. Name badges solve this — a glance tells you
          who someone is and what organization they represent. Agent identity serves the
          same function: it makes the swarm legible to the people operating it.
        </p>
      </AnalogyBlock>

      <p>
        Visibility goes beyond identity. It means being able to observe, in real time
        or after the fact, what each identified agent is doing. This includes what task
        it is working on, what stage it has reached, what resources it has consumed, and
        whether it has encountered errors. Visibility turns a swarm from an opaque
        process into a transparent one.
      </p>

      <PrincipleBlock title="Every Agent Action Must Be Attributable" number="8.6">
        <p>
          No output, log entry, or side effect should exist without a clear trail back
          to the specific agent that produced it. Attribution is not optional instrumentation —
          it is a design requirement. When something goes wrong, the first question is always
          "which agent did this?" If the answer is "we cannot tell," the system is not
          production-ready.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Color-coding and visual distinction" type="tip">
        <p>
          In dashboards and monitoring tools, assigning distinct visual markers — colors,
          icons, or position — to different agent roles dramatically improves an operator's
          ability to scan and understand swarm behavior at a glance. Human perception is
          fast at distinguishing color; use that to your advantage.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'iv-1',
            difficulty: 'beginner',
            question: 'A swarm of 20 agents processes customer support tickets. After a run, three tickets have incorrect responses. How does agent identity help you diagnose the problem? What information should each agent\'s identity record include?',
            hint: 'Think about what you would need to trace the bad outputs back to their source.',
            solution: 'Agent identity lets you look up which specific agent handled each of the three problematic tickets. Each identity record should include: a unique agent ID, the role or specialization assigned, the timestamp of creation, and a log of task assignments. With this, you can check whether all three bad responses came from the same agent (indicating a single faulty agent) or from different agents (indicating a systemic issue). Without identity, you would have no way to distinguish these two very different failure modes.'
          },
          {
            id: 'iv-2',
            difficulty: 'intermediate',
            question: 'Design a naming convention for agents in a swarm that processes documents through three stages: extraction, analysis, and summarization. The swarm may have multiple agents at each stage. What should the names encode, and why?',
            hint: 'Consider encoding the role, the instance number, and the run identifier into the name.',
            solution: 'A good naming convention encodes role, instance, and run: for example, "extract-03-run-20240115a" tells you the agent does extraction, is the third instance of that role, and belongs to a specific run. This convention lets operators filter logs by role (show all extractors), by instance (show one specific agent), or by run (show everything from one execution). Avoid purely random identifiers — they are unique but convey no information at a glance. The name should be both machine-parseable and human-readable.'
          },
          {
            id: 'iv-3',
            difficulty: 'advanced',
            question: 'A swarm has 200 agents and an operator reports that "the system feels slow." Design a visibility dashboard that lets the operator quickly identify whether the slowness is caused by a few underperforming agents, a bottleneck at one stage, or a systemic resource issue.',
            hint: 'Think about what aggregate views and drill-down capabilities would answer each of these three hypotheses.',
            solution: 'The dashboard needs three views. (1) Agent heatmap: a grid of all 200 agents color-coded by current throughput (items per minute). A few red squares among green ones indicates isolated underperformers. (2) Stage throughput chart: a bar chart showing throughput at each pipeline stage. If one stage is dramatically lower than others, that is the bottleneck. (3) Resource utilization panel: CPU, memory, and API rate limit usage across the system. If all agents show high resource pressure, the issue is systemic. The operator starts at the highest level (overall throughput), then drills into the view that matches the pattern they see. Each agent in every view is clickable, linking to its identity record and detailed log.'
          }
        ]}
      />
    </div>
  )
}
