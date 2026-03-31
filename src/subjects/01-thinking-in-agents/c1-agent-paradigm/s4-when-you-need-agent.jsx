import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function WhenYouNeedAgent() {
  return (
    <div className="prose-agents">
      <h2>When Do You Actually Need an Agent?</h2>
      <p>
        There is a tendency to reach for agentic architectures because they are interesting and
        powerful. This is the wrong reason. Agents introduce real costs — complexity, latency,
        failure modes, and oversight burden. You should build an agent when the task genuinely
        requires it, not because you can.
      </p>

      <p>
        The key question is: <strong>does this task require sequential decision-making under
        uncertainty across multiple steps where earlier actions affect later ones?</strong> If the
        answer is no — if the task is a single lookup, a single generation, or a fixed pipeline
        that a human can specify in advance — then an agent is the wrong tool.
      </p>

      <PrincipleBlock title="Four Signals That You Need an Agent" number="1.2">
        <p>A task benefits from agentic design when it exhibits four properties:</p>
        <ul>
          <li><strong>Multi-step with branching:</strong> The path to completion cannot be fully specified in advance because it depends on what is discovered along the way.</li>
          <li><strong>Requires real-world actions:</strong> Completion involves changing state in external systems — files, databases, APIs, communications — not just producing text.</li>
          <li><strong>Long enough to benefit from automation:</strong> The task takes long enough that human step-by-step guidance costs more than the risk of autonomous errors.</li>
          <li><strong>Has a verifiable completion state:</strong> You can tell when the agent is done, even if you cannot fully specify how it should proceed.</li>
        </ul>
      </PrincipleBlock>

      <p>
        Tasks that require human judgment at every step, tasks where the path is fully known in
        advance, and tasks where a mistake in any single step is catastrophic are all bad candidates
        for agentic architecture. A deterministic pipeline, a simple RAG system, or a
        well-structured prompt chain will often outperform an agent on tasks that do not require
        genuine flexibility.
      </p>

      <NoteBlock title="The complexity tax" type="intuition">
        <p>
          Every agentic step multiplies the opportunity for error. A five-step agent where each step
          has 90% reliability completes correctly only about 59% of the time. A ten-step agent at
          the same per-step reliability succeeds only 35% of the time. This is not an argument
          against agents — it is an argument for being precise about which tasks justify the
          architecture.
        </p>
      </NoteBlock>

      <p>
        Good candidates for agentic design include: research tasks that involve gathering information
        from multiple sources and synthesizing it; workflow automation where the triggers and
        completion criteria are defined but the steps are variable; monitoring tasks that require
        ongoing perception and conditional response; and tasks requiring tool use where the right
        tool depends on what is discovered mid-task.
      </p>

      <WarningBlock title="Avoid agentic complexity for vanity">
        <p>
          Building an agent when a simple pipeline would suffice creates unnecessary fragility.
          The system becomes harder to debug (any of many steps could be the source of failure),
          harder to test (the state space is exponentially larger), and harder to explain to users
          (behavior is less predictable). If you can write down the exact steps in advance, write
          them down — don't make the model figure them out at runtime.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex4-1',
            difficulty: 'beginner',
            question: 'For each task, decide: agent, simple pipeline, or direct LLM call? (a) Translate a document from French to English. (b) Research a company by searching the web, reading their about page, finding recent news, and producing a briefing. (c) Given a list of customer names, generate a personalized greeting for each one.',
            hint: 'Ask whether the steps can be fully specified in advance and whether the output of one step determines the next step\'s approach.',
            solution: '(a) Direct LLM call — this is a single, well-defined operation with no branching or sequential decisions. (b) Agent — the research path depends on what is found: interesting news might require follow-up searches, the about page might be missing key information that requires other sources, and the synthesis depends on what was discovered. (c) Simple pipeline — the steps are fully known (loop over names, generate greeting, output list), even though it is repeated many times.'
          },
          {
            id: 'ex4-2',
            difficulty: 'intermediate',
            question: 'A team wants to build an agent that processes customer support tickets: reads the ticket, checks the customer\'s account history, looks up relevant documentation, and drafts a response. Is this a good use of agentic architecture? What makes it a good or poor fit?',
            hint: 'Evaluate against the four signals: multi-step with branching, real-world actions, benefit from automation, verifiable completion.',
            solution: 'This is a reasonable use of agentic architecture, with caveats. It has multiple steps with some branching (different accounts need different lookups, different issues need different docs). It involves real-world data access. The completion state is verifiable (a draft response exists). However, "drafting a response" is not fully autonomous — it should be human-reviewed before sending, which means the agentic part ends at draft creation. The main risk is over-engineering: if the steps are actually always the same (read ticket → look up account → search docs → draft), a deterministic pipeline may be simpler and more reliable than an agent.'
          },
          {
            id: 'ex4-3',
            difficulty: 'advanced',
            question: 'You have a task that scores 3 out of 4 on the agent signals — it\'s multi-step with branching, requires real-world actions, and has a verifiable completion state, but the task is short enough that a human could guide each step in under 2 minutes. What factors would tip your decision toward building an agent vs. keeping a human in the loop?',
            hint: 'Think about frequency, scale, consistency, and what happens at the edge cases.',
            solution: 'Factors toward agent: (1) Frequency — if this task runs hundreds of times a day, 2 minutes per instance is a significant bottleneck even if each instance is short. (2) Consistency — agents apply the same logic every time; humans vary, especially on repetitive tasks. (3) Availability — if the task must run outside business hours or at unpredictable times, a human loop is unreliable. Factors toward human-in-loop: (1) If edge cases are common and consequential — 2 minutes of human review catches errors that could cost far more to fix. (2) If the task is new and the failure modes are not yet understood — human oversight during early deployment catches problems before they scale. (3) If users expect and value human involvement as part of the process.'
          }
        ]}
      />
    </div>
  )
}
