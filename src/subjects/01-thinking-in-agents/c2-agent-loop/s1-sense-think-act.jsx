import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function SenseThinkAct() {
  return (
    <div className="prose-agents">
      <h2>The Sense–Think–Act Loop</h2>
      <p>
        At the heart of every agent — from the simplest thermostat to the most sophisticated
        language model system — is a repeating cycle. The agent perceives its environment, reasons
        about what to do, and then acts. This three-phase loop is the fundamental unit of agentic
        behavior. Understanding it deeply is more useful than knowing any particular framework or
        implementation.
      </p>

      <ConceptBlock title="The Sense–Think–Act Loop" number="2.1">
        <p>
          The agent loop has three phases that repeat until the task is complete or a stopping
          condition is met:
        </p>
        <ul>
          <li><strong>Sense:</strong> Gather observations from the environment — tool outputs, user messages, memory, external data.</li>
          <li><strong>Think:</strong> Reason about the current state and decide what to do next — plan, evaluate options, choose an action.</li>
          <li><strong>Act:</strong> Execute the chosen action — call a tool, send a message, update memory, produce output.</li>
        </ul>
        <p>
          The output of Act feeds back into the next Sense phase, creating a loop that continues
          until the agent determines the goal has been achieved.
        </p>
      </ConceptBlock>

      <p>
        What makes this loop powerful is that it allows an agent to operate under incomplete
        information. The agent does not need to know everything upfront. It can start with what it
        knows, take an exploratory action, learn from the result, and proceed with updated
        understanding. This is the key difference between an agent and a one-shot system: the loop
        allows incremental progress through uncertainty.
      </p>

      <AnalogyBlock title="The Surgeon Analogy">
        <p>
          A surgeon does not know exactly what they will find before making the first incision.
          They have a plan, but that plan adapts as they see what is actually there. Each observation
          informs the next action. They sense (see the tissue), think (is this what we expected?),
          and act (proceed, adjust, or stop). An AI agent operates in exactly this way — the loop
          is not a weakness but the mechanism by which it handles real-world complexity.
        </p>
      </AnalogyBlock>

      <p>
        The loop also has important implications for failure. If any phase breaks down — if sensing
        is incomplete, if reasoning is flawed, or if actions have unintended side effects — errors
        propagate into the next iteration. A small mistake in reasoning can lead to an action that
        makes the next sense phase harder to interpret, leading to worse reasoning, and so on.
        Good agent design builds error detection into the loop itself.
      </p>

      <NoteBlock title="The loop is not always explicit" type="note">
        <p>
          In many language model agent implementations, the sense-think-act loop is implicit in the
          conversation structure: observations come in as context, reasoning happens in the model's
          generation, and actions are expressed as tool calls or responses. But the logical structure
          is always the same, even when the implementation looks different.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex5-1',
            difficulty: 'beginner',
            question: 'Trace the sense-think-act loop for a simple agent tasked with finding the cheapest flight from New York to London next month. What does it sense in the first iteration? What might it think? What action does it take? What happens in the second iteration?',
            hint: 'Start with what information the agent has at the beginning and what it needs to find out.',
            solution: 'Iteration 1 — Sense: the task description (destination, time range, goal of finding cheapest). Think: I need to search for available flights. Act: call a flight search tool with the parameters. Iteration 2 — Sense: the list of flight results. Think: which is cheapest? Are there alternative airports or dates nearby that might be cheaper? Act: possibly search nearby dates or airports, or return the cheapest found. The agent may loop several times before concluding it has found a good answer.'
          },
          {
            id: 'ex5-2',
            difficulty: 'intermediate',
            question: 'What happens to the sense-think-act loop when an action fails? For example, a tool call returns an error. How should a well-designed agent respond, and what does this reveal about the importance of the sense phase?',
            hint: 'Consider what the error is telling the agent and how that should update its plan.',
            solution: 'When an action fails, the error result becomes the observation in the next sense phase. A well-designed agent treats the error as information: it reads the error message, reasons about what went wrong (wrong parameters? unavailable resource? permission denied?), and decides how to adapt — retry with different parameters, try an alternative approach, or escalate to the user. This reveals that the sense phase must be capable of processing negative results, not just successes. Agents that only expect success in their reasoning step will get confused or loop indefinitely when tools fail.'
          },
          {
            id: 'ex5-3',
            difficulty: 'advanced',
            question: 'The sense-think-act loop implies that every action is followed by an observation. But some actions produce no observable output — they are "fire and forget." How does this challenge the loop structure, and what design patterns can compensate?',
            hint: 'What substitutes for missing feedback? How do humans handle actions where they can\'t directly observe results?',
            solution: 'Fire-and-forget actions break the feedback loop because the agent cannot confirm whether the action succeeded or what effect it had. Compensation patterns: (1) Verification steps — after a fire-and-forget action, add a subsequent action that queries the state to confirm the effect (e.g., after sending a message, query the sent folder). (2) Idempotent design — design actions so that repeating them is safe, allowing retry without risk of duplication. (3) Optimistic assumption with logging — proceed assuming success but log the action so a human can audit. (4) Explicit uncertainty propagation — have the agent reason explicitly about the fact that it does not know the outcome, carrying that uncertainty forward into subsequent decisions rather than assuming success.'
          }
        ]}
      />
    </div>
  )
}
