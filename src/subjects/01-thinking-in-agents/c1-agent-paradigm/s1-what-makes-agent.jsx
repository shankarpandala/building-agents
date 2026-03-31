import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function WhatMakesAgent() {
  return (
    <div className="prose-agents">
      <h2>What Makes Something an Agent?</h2>
      <p>
        The word "agent" gets used loosely — sometimes to mean any AI system, sometimes just a chatbot
        with tools. But there is a precise sense in which something earns the label. An agent is not
        defined by its intelligence or its size. It is defined by its relationship to goals and actions
        in the world.
      </p>

      <ConceptBlock title="Agency" number="1.1">
        <p>
          An agent is a system that <strong>perceives its environment, makes decisions, and takes
          actions</strong> in pursuit of a goal — and does so with some degree of autonomy over
          multiple steps. The key word is <em>pursuit</em>: an agent is oriented toward outcomes,
          not just outputs. It produces behavior, not just text.
        </p>
      </ConceptBlock>

      <p>
        This distinguishes agents from simpler systems. A calculator responds to input with output.
        A search engine retrieves documents given a query. These are reactive systems — each
        interaction is independent, and neither system is "trying" to accomplish anything across time.
        An agent, by contrast, maintains a thread of intention across multiple steps. It takes an
        action, observes the result, and adjusts its next move accordingly.
      </p>

      <AnalogyBlock title="The Detective Analogy">
        <p>
          Think of a detective solving a case. They don't wait for all the facts to arrive — they
          form hypotheses, go collect evidence, revise their theory, and pursue leads. Each step
          informs the next. They operate with a goal (solve the case) under uncertainty (incomplete
          information), using judgment to decide what to do at each turn. That is exactly the
          structure of an AI agent.
        </p>
      </AnalogyBlock>

      <p>
        Three properties are necessary for a system to be an agent. First, it must be
        <strong> goal-directed</strong>: behavior is organized around achieving something, not just
        responding. Second, it must be <strong>situated</strong>: it operates in an environment it
        can perceive and affect. Third, it must be <strong>sequential</strong>: its actions unfold
        over time, with earlier actions affecting what later actions are possible.
      </p>

      <NoteBlock title="Agents are not magic" type="note">
        <p>
          Calling a system an "agent" does not make it smarter or more reliable. Agentic structure
          is an architectural choice that suits certain kinds of tasks — ones that require planning,
          tool use, or multi-step reasoning. For simple question-answering, agentic structure adds
          complexity without benefit.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex1-1',
            difficulty: 'beginner',
            question: 'A thermostat senses room temperature and turns the heater on or off. Is it an agent? What properties of agency does it have, and what does it lack?',
            hint: 'Consider whether the thermostat is goal-directed, situated, and sequential. Does it plan? Does it learn from feedback?',
            solution: 'A thermostat is situated (it perceives the environment) and arguably goal-directed (maintain a target temperature). But it lacks sequential reasoning — each decision is independent, reactive, and rule-based. It has no model of the world and does not adapt its strategy over time. It exhibits the structure of agency in a minimal, brittle way, but most would not call it a true agent.'
          },
          {
            id: 'ex1-2',
            difficulty: 'intermediate',
            question: 'A language model responds to a user message with a helpful answer in a single turn. Is it an agent? What would need to change for it to become one?',
            hint: 'Focus on the sequential and goal-directed properties. What does a single-turn interaction lack?',
            solution: 'A single-turn language model is not an agent. It produces a response but does not pursue a goal across multiple steps, cannot take actions that affect the world, and has no feedback loop. To become an agent, it would need the ability to take actions (tool calls, API requests), observe their results, and loop until a goal is achieved — rather than stopping after one response.'
          },
          {
            id: 'ex1-3',
            difficulty: 'advanced',
            question: 'Some argue that agency is not binary but a spectrum. What dimensions might define "how much" of an agent a system is? Give three dimensions with examples.',
            hint: 'Think about autonomy, planning horizon, and the ability to change strategy mid-task.',
            solution: 'Three useful dimensions: (1) Autonomy — the degree to which the system decides its own next actions vs. following explicit instructions step by step. (2) Planning horizon — how far ahead it reasons before acting; a one-step reactive system has horizon 1, while a system that outlines a plan before executing has a longer horizon. (3) Adaptability — whether the system can revise its approach when it encounters unexpected results. A system can score high on one dimension and low on others.'
          }
        ]}
      />
    </div>
  )
}
