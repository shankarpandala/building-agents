import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function LanguageActionGap() {
  return (
    <div className="prose-agents">
      <h2>The Language–Action Gap</h2>
      <p>
        Language models are trained to produce fluent, coherent text. They learn statistical
        patterns over vast corpora of human writing. But acting in the world requires more than
        linguistic fluency — it requires accurate beliefs about what is real, what is current,
        and what will happen when you do something. This gap between language competence and
        world-grounded action is one of the central challenges in building AI agents.
      </p>

      <ConceptBlock title="The Language–Action Gap" number="3.1">
        <p>
          The language–action gap is the difference between a model's ability to produce plausible
          text about an action and its ability to take that action correctly in the real world.
          A model can write fluently about how to query a database, calculate a result, or book a
          flight — but the text it produces may be factually wrong, outdated, or describe a
          procedure that would fail when actually executed. <strong>Language competence does not
          imply world knowledge or correct action.</strong>
        </p>
      </ConceptBlock>

      <p>
        This gap has several sources. First, language models are trained on static data — they
        have no access to real-time state. A model that learned about a company's products in
        2023 may confidently describe offerings that no longer exist. Second, models learn
        correlational patterns, not causal mechanisms — they learn that certain words tend to
        follow certain other words, not why those things are true in the world. Third, models have
        no persistent memory or self-model — they cannot know what actions they have already taken
        or what state they have left the world in.
      </p>

      <AnalogyBlock title="The Map vs. Territory Analogy">
        <p>
          A language model's knowledge is like a very detailed map drawn from millions of
          travelers' accounts. The map is rich and useful, but it is a representation of the
          territory — not the territory itself. When the territory changes (a road closes, a
          building opens), the map does not update. An agent that acts solely from the map will
          eventually walk into a wall that isn't on the map, or take a road that no longer exists.
          Grounding is the process of keeping the map connected to the actual territory.
        </p>
      </AnalogyBlock>

      <p>
        The language–action gap is not a flaw to be fixed in the next model version — it is a
        structural property of systems trained on text. The correct response is architectural:
        design agents that bridge the gap through grounding mechanisms rather than assuming that
        linguistic fluency implies factual accuracy or correct action.
      </p>

      <NoteBlock title="Fluency as a double-edged property" type="intuition">
        <p>
          The same fluency that makes language models useful makes their errors dangerous. A model
          that produces uncertain or incoherent text signals its limitations clearly. A model that
          produces confident, well-formed, fluent text about something it has wrong provides no
          such signal. Fluent wrong answers are harder to catch than obviously broken ones — and
          in an agent loop, they propagate before anyone notices.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex10-1',
            difficulty: 'beginner',
            question: 'Give three examples of tasks where the language–action gap would cause a language model agent to produce confidently wrong outputs if it relied solely on its training knowledge rather than live data.',
            hint: 'Think about tasks that require current information, precise calculations, or knowledge of specific system state.',
            solution: 'Examples: (1) Checking stock prices — a model\'s training data contains historical prices, but it has no access to current market data. It might quote a price that is months old with full confidence. (2) Finding available appointment slots — the model has no access to a live calendar, so any specific slot it suggests is fabricated. (3) Verifying whether a specific file exists on a server — the model cannot know the current state of a filesystem; it can only guess based on what might plausibly exist.'
          },
          {
            id: 'ex10-2',
            difficulty: 'intermediate',
            question: 'A language model agent is asked to write a report on a company\'s current financial health. It has access to a web search tool but does not use it — it writes the report entirely from memory. The report is well-structured and cites plausible-sounding figures. What has gone wrong, and what should the agent have done instead?',
            hint: 'Consider both the action the agent should have taken and the reasoning failure that led it not to take it.',
            solution: 'The agent produced a report that appears authoritative but is grounded only in its training data, not in current information. The figures may be months or years out of date, and some may be confabulated — plausible-sounding but never accurate. The design failure: the agent should have recognized that "current financial health" requires live data, and should have used the web search tool to retrieve recent earnings reports, news, and filings before writing. The reasoning failure: the agent did not distinguish between "I can write plausibly about this topic" and "I have accurate, current information about this specific entity." A well-designed agent reasons about the freshness requirements of its task before deciding whether to act from memory or from tools.'
          },
          {
            id: 'ex10-3',
            difficulty: 'advanced',
            question: 'Some researchers argue that as language models get larger and more accurate, the language–action gap will disappear — models will simply "know" enough to act correctly. Evaluate this argument. What aspects of the gap might close with scale, and what aspects are structural and will persist regardless of model size?',
            hint: 'Distinguish between knowledge limitations (might close with scale) and structural properties of what it means to be a generative model trained on static data.',
            solution: 'What might improve with scale: factual accuracy on stable facts (geography, history, science), commonsense reasoning about physical and social consequences, and the ability to recognize when a task requires live data. What is structural and will not close: (1) Temporal freshness — no model trained on static data can know current events, prices, or system states without external access. (2) Persistent state — a model has no memory of prior actions in the world; each context window starts fresh. (3) Precise computation — generative models are not reliable calculators; probabilistic text generation is not arithmetic. (4) Confirmation of effects — a model cannot observe whether its proposed action actually worked. These limitations are architectural, not matters of scale. The correct solution is grounding — connecting the model to live information and observation mechanisms — not waiting for a larger model.'
          }
        ]}
      />
    </div>
  )
}
