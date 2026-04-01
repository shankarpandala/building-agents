import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function Observation() {
  return (
    <div className="prose-agents">
      <h2>Observation: What the Agent Knows</h2>
      <p>
        An agent can only reason about what it can perceive. The observation phase determines the
        quality of everything that follows — no amount of sophisticated reasoning can compensate
        for incomplete, misleading, or poorly structured observations. Getting observation right
        is as important as any other part of agent design.
      </p>

      <ConceptBlock title="Observation" number="2.2">
        <p>
          An observation is any information the agent receives about the state of the world. This
          includes: <strong>task inputs</strong> (what the agent was asked to do),
          <strong> tool outputs</strong> (results from actions it took),
          <strong> memory retrievals</strong> (relevant information from past interactions),
          <strong> environmental state</strong> (current values of tracked variables or resources),
          and <strong>user messages</strong> (clarifications or updates from humans). Together,
          these form the agent's model of its current situation.
        </p>
      </ConceptBlock>

      <p>
        One of the most important distinctions in observation design is between
        <strong> full observability</strong> and <strong>partial observability</strong>. A fully
        observable environment is one where the agent's observation tells it everything relevant
        about the current state. In practice, nearly all real-world environments are partially
        observable — the agent sees a window onto a larger reality.
      </p>

      <p>
        Partial observability is not a bug to be engineered away; it is the normal condition of
        operating in the world. The right response is to design agents that know what they do not
        know — that reason explicitly about the limits of their observations and take actions to
        fill gaps before committing to consequential decisions.
      </p>

      <PrincipleBlock title="Observations Should Be Actionable" number="2.1">
        <p>
          A good observation does not just report state — it presents state in a form that supports
          reasoning and decision-making. Raw dumps of data, overly verbose outputs, and poorly
          formatted results all degrade the quality of subsequent reasoning. When designing what
          agents observe, ask: will this representation make it easier or harder to reason about
          what to do next?
        </p>
      </PrincipleBlock>

      <p>
        Context window management is a practical form of observation design. Language model agents
        have finite context, and every token used for observation is a token not available for
        reasoning. Effective agents summarize, filter, and prioritize observations rather than
        accumulating everything. The goal is to give the agent the most relevant information in
        the least space.
      </p>

      <WarningBlock title="Garbage in, garbage out — amplified">
        <p>
          In a single-turn system, bad input produces bad output — and that is the end of it. In
          an agent loop, bad observations produce bad reasoning, which produces bad actions, which
          produce worse observations, which produce worse reasoning. The loop can amplify initial
          observation errors into cascading failures. Validate and sanitize observations before
          they enter the reasoning phase, especially when they come from external tools or
          untrusted sources.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex6-1',
            difficulty: 'beginner',
            question: 'An agent is tasked with booking a meeting room for three people. List four types of observations it would need to complete this task, and for each one, identify whether it comes from user input, a tool call, or memory.',
            hint: 'Think about what information is needed to find an available room that fits the requirements.',
            solution: 'Examples: (1) The date and time of the meeting — from user input. (2) The list of available rooms and their capacities — from a calendar/room booking tool. (3) Whether any of the attendees have room preferences or requirements — from user input or memory of past preferences. (4) The current bookings for the desired time slot — from a calendar tool. Other valid answers include: required AV equipment (user input), attendee calendars to confirm availability (tool), or past meeting room ratings (memory).'
          },
          {
            id: 'ex6-2',
            difficulty: 'intermediate',
            question: 'An agent receives a tool output that is 50,000 tokens long — the full contents of a large document it searched. The agent\'s context window is 100,000 tokens. What are the risks of passing the full document as an observation, and what are two better alternatives?',
            hint: 'Think about what the agent actually needs from the document versus what it received.',
            solution: 'Risks of passing the full document: (1) It fills half the context window, leaving less room for reasoning and other observations. (2) Relevant information is buried in irrelevant content, degrading reasoning quality. (3) Cost increases significantly. Better alternatives: (1) Chunking and retrieval — break the document into segments, embed them, and retrieve only the segments most relevant to the current step. (2) Summarization — use a fast, cheap call to summarize the document to a few hundred tokens before passing it to the reasoning step. The right choice depends on whether the agent needs precise quotes (favor retrieval) or general understanding (favor summarization).'
          },
          {
            id: 'ex6-3',
            difficulty: 'advanced',
            question: 'Design an observation schema for an agent that monitors a software deployment pipeline. What should it observe at each stage, how should observations be structured, and how should it handle the case where an expected observation never arrives?',
            hint: 'Consider both the "happy path" observations and the signals (or absence of signals) that indicate problems.',
            solution: 'The observation schema should include: stage name and timestamp, status (running/succeeded/failed/timed out), output logs (truncated to relevant lines, not full dumps), resource metrics (CPU/memory if relevant), and any artifacts produced. Structure: normalized key-value format so the agent can compare across stages reliably. Handling missing observations: the agent should track expected observations with deadlines. If a stage does not report completion within its expected window, the agent should treat silence as a potential failure signal — query the pipeline status actively rather than waiting, and escalate after a second timeout. Absence of expected feedback is itself an observation.'
          }
        ]}
      />
    </div>
  )
}
