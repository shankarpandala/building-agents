import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function WhatIsSkill() {
  return (
    <div className="prose-agents">
      <h2>What Is a Skill?</h2>
      <p>
        As agents take on more complex work, a pattern emerges: certain multi-step tasks are
        performed repeatedly, with slight variations but the same underlying structure. Rather
        than rediscovering how to do them each time, we can package that know-how into a reusable
        unit. This is the concept of a skill — a named, reusable pattern for accomplishing a
        specific type of task.
      </p>

      <ConceptBlock title="Skill" number="10.1">
        <p>
          A skill is a reusable, named unit of agent behavior that encapsulates a repeatable
          task pattern — including the steps to perform, the tools required, and the decisions
          to make along the way. Skills turn recurring multi-step tasks into single invocable
          units, reducing repetition and ensuring consistent execution across all instances
          of that task type.
        </p>
      </ConceptBlock>

      <p>
        Skills sit above individual tool calls but below full agent systems in the hierarchy
        of abstraction. A single tool call is the most granular unit of action. A skill
        combines several tool calls and decision points into a coherent procedure. An agent
        is a system that can reason about when and how to invoke skills. This layering makes
        complex agents easier to build, test, and reason about.
      </p>

      <AnalogyBlock title="A Recipe">
        <p>
          A recipe is a skill for cooking a dish. It names the dish (what you are making),
          lists the ingredients (resources required), specifies the steps (the procedure),
          and describes what done looks like (the success condition). You do not re-derive
          the recipe every time you cook — you follow it, possibly with variations for
          what is in the pantry. Agent skills work the same way: they capture proven
          procedures so they can be reused without reinvention.
        </p>
      </AnalogyBlock>

      <NoteBlock title="Skills are not code functions" type="note">
        <p>
          Unlike code functions, skills involve judgment at multiple points: which tool to
          use when several are available, how to handle a partial result, when to stop and
          ask for clarification. A skill is more like a professional procedure than a
          deterministic algorithm — it provides structure while leaving room for the
          agent to adapt to circumstances.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex10-1-1',
            difficulty: 'beginner',
            question: 'Is "search the web" a skill? What about "research a topic and produce a summary"? Explain the distinction.',
            hint: 'Consider how many steps and decisions each involves, and whether the procedure is well enough defined to be reused.',
            solution: '"Search the web" is a single tool call, not a skill — it is one atomic action with one input and one output. "Research a topic and produce a summary" is a skill: it involves multiple steps (formulate queries, search, evaluate results, synthesize, format), decision points (is this source credible? do I need more results?), and a defined output shape. The difference is complexity, sequencing, and the presence of decision points that must be resolved during execution.'
          },
          {
            id: 'ex10-1-2',
            difficulty: 'intermediate',
            question: 'An agent performs the following sequence repeatedly: check if a file exists, read it if it does, transform its contents, and save it to a new location. At what point should this be extracted into a named skill, and what are the benefits of doing so?',
            hint: 'Think about when repetition and variation signal that a skill is warranted.',
            solution: 'The sequence should be extracted into a skill once it has been repeated more than a few times with consistent structure. Benefits: (1) Consistency — every execution follows the same procedure, reducing the chance of the agent improvising a different sequence. (2) Testability — the skill can be tested in isolation against known inputs and outputs. (3) Reuse — the agent can invoke the skill by name without re-specifying all the steps. (4) Documentation — a named skill communicates intent; unnamed ad hoc step sequences obscure it. The signal that extraction is warranted is repetition with variation: the same structure applied to different files.'
          },
          {
            id: 'ex10-1-3',
            difficulty: 'advanced',
            question: 'Skills add abstraction, but abstraction has costs. What are the downsides of over-skill-ing an agent system, and how would you decide the right level of granularity for skills in a given domain?',
            hint: 'Consider what you lose when a procedure is encapsulated: visibility, flexibility, and the ability to handle edge cases that the skill definition did not anticipate.',
            solution: 'Downsides of over-skill-ing: (1) Rigidity — a well-encapsulated skill hides its steps, making it harder to adjust when an edge case requires a deviation from the standard procedure. (2) Abstraction mismatch — skills defined at the wrong granularity force agents to either call multiple fine-grained skills in an ad hoc sequence (defeating the purpose) or use a coarse skill that does too much. (3) Maintenance overhead — more named skills means more definitions to keep updated. Right granularity: define skills at the level of complete, meaningful outcomes — things a user or operator would recognize as a unit of work. "Send a status report" is a good skill boundary; "format a paragraph" is too fine. When in doubt, start with fewer, larger skills and decompose them only when variation across instances requires it.'
          }
        ]}
      />
    </div>
  )
}
