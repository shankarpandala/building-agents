import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function AgentsVsAssistants() {
  return (
    <div className="prose-agents">
      <h2>Agents vs. Assistants</h2>
      <p>
        The terms "AI assistant" and "AI agent" are often used interchangeably, but they describe
        fundamentally different interaction models. Conflating them leads to bad design decisions:
        building an assistant when you need an agent, or building an agent when an assistant would
        do just fine.
      </p>

      <ConceptBlock title="AI Assistant" number="1.3a">
        <p>
          An AI assistant is a system that <strong>responds to requests</strong>. The human drives
          the interaction: they provide context, ask questions, and interpret results. The assistant
          produces outputs — answers, drafts, summaries — but takes no actions of its own. Each
          exchange is largely self-contained. The assistant has no persistent agenda between turns.
        </p>
      </ConceptBlock>

      <ConceptBlock title="AI Agent" number="1.3b">
        <p>
          An AI agent is a system that <strong>pursues goals</strong>. The human delegates an
          objective, and the agent determines the sequence of steps needed to achieve it. The agent
          takes actions — calling tools, reading documents, sending messages — and adapts its plan
          based on what it learns. It maintains continuity of purpose across many steps.
        </p>
      </ConceptBlock>

      <p>
        The practical distinction comes down to who is doing the sequencing. With an assistant, the
        human sequences the steps: "Summarize this document." Then: "Now extract the action items."
        Then: "Draft a reply based on those." With an agent, you hand over the goal — "Handle the
        follow-ups from this document" — and the agent figures out the sequence itself.
      </p>

      <AnalogyBlock title="The Travel Analogy">
        <p>
          An assistant is like a knowledgeable travel advisor: you ask questions, they answer them,
          and you decide what to book. An agent is like a travel concierge with booking authority:
          you say "plan my trip to Lisbon for next month" and they research options, make
          reservations, and send you a confirmation. Both require trust, but of a very different kind
          — the concierge needs judgment and the authority to act on your behalf.
        </p>
      </AnalogyBlock>

      <p>
        Neither model is better in the abstract. Assistants are appropriate when the human has
        strong opinions about each step, when the task is exploratory, or when mistakes in any
        single step are costly. Agents are appropriate when the task has a clear goal, the steps
        are well-defined enough for the system to reason about them, and the value of automation
        outweighs the cost of reduced step-by-step control.
      </p>

      <WarningBlock title="The hidden assumption of delegation">
        <p>
          When you switch from assistant to agent, you are implicitly trusting the system to
          interpret your goal correctly across steps you cannot see. Many agent failures happen not
          because the system is incapable, but because the goal was ambiguous and the system made
          a reasonable-but-wrong interpretation that compounded over multiple steps. Clarity of
          goal specification matters far more in agentic settings than in conversational ones.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex3-1',
            difficulty: 'beginner',
            question: 'Classify each of the following as better suited to an assistant or an agent, and explain why: (a) helping a user brainstorm names for a product; (b) monitoring a log file and creating a ticket when an error pattern appears; (c) answering questions about a company\'s HR policies.',
            hint: 'Ask whether the task involves a clear goal, sequential actions, and a definite completion state.',
            solution: '(a) Assistant — brainstorming is exploratory and the human wants to stay in the loop at each step, guiding the direction. (b) Agent — this has a clear trigger condition, a defined action to take, and runs autonomously over time without human input. (c) Assistant — this is reactive, each question is largely independent, and there is no multi-step goal to pursue.'
          },
          {
            id: 'ex3-2',
            difficulty: 'intermediate',
            question: 'A product manager uses an AI to help write a product requirements document. They go back and forth many times, refining sections. Is this an assistant or an agent interaction? Could it be redesigned as an agent interaction, and would that be an improvement?',
            hint: 'Consider what the "goal" is and whether the human wants to retain control over each editing decision.',
            solution: 'This is an assistant interaction — the PM is guiding each step and the AI responds to each request. It could be redesigned as an agent: give the AI the goal "produce a complete PRD for feature X" with context about the product and users, and let it draft the full document. Whether that\'s an improvement depends on the PM\'s preferences. If they have strong opinions about structure and tone, the assistant model may produce better results because their judgment shapes each section. If they mainly want a first draft to react to, the agent model saves time.'
          },
          {
            id: 'ex3-3',
            difficulty: 'advanced',
            question: 'Some systems start as assistants and gradually acquire agentic properties — they get memory, tool access, and the ability to take actions. What are the risks of this incremental expansion, and what safeguards should accompany each new capability added?',
            hint: 'Consider how users\' mental models of the system lag behind its actual capabilities.',
            solution: 'The core risk is that users\' trust calibration and oversight behaviors were set when the system was a simple assistant. As the system gains capabilities, users may not update their assumption that it is safe to run without supervision. Safeguards for each expansion: (1) Memory — users should know what is being retained and be able to inspect and delete it; (2) Tool access — each tool should be clearly disclosed, with explicit scope limits; (3) Action-taking — irreversible actions should require explicit confirmation until the system has a track record; (4) Any expansion — the system should proactively communicate what it can now do, not leave users to discover it.'
          }
        ]}
      />
    </div>
  )
}
