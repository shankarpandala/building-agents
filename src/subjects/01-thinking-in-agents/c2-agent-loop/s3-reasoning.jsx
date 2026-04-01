import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function Reasoning() {
  return (
    <div className="prose-agents">
      <h2>Reasoning: How the Agent Decides</h2>
      <p>
        Observation tells the agent where it is. Reasoning determines what it should do next.
        This is the most cognitively demanding phase of the agent loop — and the phase most
        affected by the capabilities and limitations of the underlying model. Understanding how
        agents reason helps you design tasks they can handle and anticipate where they will
        struggle.
      </p>

      <ConceptBlock title="Agent Reasoning" number="2.3">
        <p>
          Reasoning in an agent encompasses several distinct operations: <strong>situation
          assessment</strong> (what is the current state, and how does it compare to the goal?),
          <strong> planning</strong> (what sequence of actions is likely to achieve the goal?),
          <strong> decision-making</strong> (which specific action to take right now?), and
          <strong> uncertainty handling</strong> (what is unknown, and does that uncertainty need
          to be resolved before acting?). These do not always happen sequentially — they are
          often interleaved.
        </p>
      </ConceptBlock>

      <p>
        A key concept in agent reasoning is the distinction between <strong>deliberate</strong>
        and <strong>reactive</strong> reasoning. Reactive reasoning matches the current situation
        to a known pattern and acts accordingly — fast, low-cost, but brittle in novel situations.
        Deliberate reasoning constructs a plan by thinking through consequences — slower, more
        expensive, but capable of handling situations that do not match known patterns.
      </p>

      <p>
        Most capable agents need both. Reactive reasoning handles routine steps efficiently.
        Deliberate reasoning is reserved for moments when the situation is novel, high-stakes,
        or unclear. Good agent design includes signals that tell the agent when to shift from
        reactive to deliberate mode — usually when observations do not match expectations.
      </p>

      <AnalogyBlock title="The Chess Player Analogy">
        <p>
          An expert chess player does not analyze every possible move from scratch. Most of the
          time, they pattern-match to known positions and play from experience. But when they
          encounter a position they haven't seen before, or when the stakes are highest, they
          slow down and reason explicitly — considering long sequences of moves and their
          consequences. The ability to switch between these modes is what makes them an expert.
        </p>
      </AnalogyBlock>

      <p>
        For language model agents, reasoning happens in the generated text. This has an important
        implication: <strong>making reasoning explicit improves it</strong>. When an agent writes
        out its analysis before choosing an action, the generation process itself produces
        better decisions than when the model jumps straight to an action. This is the principle
        behind chain-of-thought and scratchpad techniques — not just a prompt trick, but a
        structural reflection of how reasoning works in generative models.
      </p>

      <NoteBlock title="Reasoning is not planning" type="intuition">
        <p>
          A common confusion is treating reasoning and planning as synonymous. Planning is the
          specific activity of constructing a sequence of future actions. Reasoning is broader —
          it includes understanding the current state, evaluating options, and handling surprises.
          An agent that has a plan still needs to reason at each step: is the plan still valid?
          Did the last action produce what was expected? A rigid plan without ongoing reasoning
          is a recipe for compounding errors.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex7-1',
            difficulty: 'beginner',
            question: 'An agent has been asked to find and book the best hotel for a business trip. It has just received search results showing 20 hotels. What reasoning steps should it perform before taking its next action?',
            hint: 'Think about situation assessment (what do I have?), decision criteria (what is "best"?), and uncertainty (what do I still need to know?).',
            solution: 'The agent should: (1) Assess what "best" means in context — proximity to the meeting venue, price range, business amenities (the user may not have specified). (2) Scan the results for obvious disqualifiers — wrong location, outside budget, poor reviews. (3) Identify the top candidates and what additional information would help choose between them. (4) Decide whether it has enough information to book, or whether it needs to ask a clarifying question or do additional research. Booking immediately from search results without this reasoning would likely produce a poor outcome.'
          },
          {
            id: 'ex7-2',
            difficulty: 'intermediate',
            question: 'An agent is three steps into a five-step plan when it receives an unexpected observation that contradicts its assumption from step one. How should it reason about this situation, and what are the risks of two different responses: continuing with the original plan vs. replanning from scratch?',
            hint: 'Consider the cost of replanning versus the cost of an invalidated assumption propagating through the remaining steps.',
            solution: 'The agent should first assess how foundational the contradicted assumption is: did the original plan depend on it being true? If yes, continuing risks compounding an error over the remaining steps — actions built on a false premise are likely to fail or cause harm. Replanning from scratch is safer but costly, especially if steps already taken had side effects that now need to be accounted for. A better middle path: partial replan — preserve steps that do not depend on the invalidated assumption, replan only the parts that do. The general principle is that unexpected observations are signals, not noise, and should be incorporated into reasoning rather than ignored.'
          },
          {
            id: 'ex7-3',
            difficulty: 'advanced',
            question: 'Language model agents can sometimes get stuck in "reasoning loops" — generating plausible-sounding analysis that never arrives at a decision. What structural causes lead to reasoning loops, and what design patterns prevent them?',
            hint: 'Think about what conditions allow reasoning to continue indefinitely without converging on a choice.',
            solution: 'Structural causes: (1) Unbounded deliberation with no decision criterion — the agent generates pros and cons without a stopping rule or tiebreaker. (2) Missing information that the agent tries to reason around rather than acknowledging as a gap. (3) Goal ambiguity — the agent cannot evaluate options without knowing what "success" means, but hasn\'t been told. (4) Risk aversion — the model avoids choosing because any choice might be wrong, and non-choice feels safer. Prevention patterns: (1) Explicit decision criteria in the system prompt — define what counts as "good enough." (2) Hard step limits with a fallback to asking the user when limits are hit. (3) Teach the model to name uncertainty explicitly and convert it into a question rather than reasoning around it. (4) Distinguish between "I need more information" (take an action to get it) vs. "I have enough information to decide" (decide).'
          }
        ]}
      />
    </div>
  )
}
