import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ToneStyleSection() {
  return (
    <div className="prose-agents">
      <p>
        Tone and style are the surface through which all agent content reaches the user.
        Even perfectly accurate information can undermine trust if delivered with the
        wrong register. The system prompt must make tone explicit — agents do not
        automatically inherit the right voice for a context.
      </p>

      <ConceptBlock title="Tone and Style Directives" number="Concept 5.4">
        Tone describes the emotional register of the agent's responses — formal, warm,
        direct, empathetic. Style describes structural and linguistic choices — sentence
        length, use of lists, technical vocabulary, reading level. Both must be matched
        to the user population and the deployment context, not left to model defaults.
      </ConceptBlock>

      <AnalogyBlock title="The Broadcaster and the Counselor">
        A TV news anchor and a grief counselor both deliver information accurately, but
        with radically different tone and style. Using anchor tone with someone in crisis,
        or counselor tone in a fast-paced trading floor chat, creates friction that
        undermines the interaction. Agents face the same challenge — appropriate register
        is context-specific.
      </AnalogyBlock>

      <p>
        Style directives should cover four dimensions: <strong>formality level</strong>
        (casual through clinical), <strong>verbosity</strong> (concise versus thorough),
        <strong>structure preference</strong> (prose versus bullets versus tables), and
        <strong>vocabulary calibration</strong> (technical terms assumed versus explained).
        A fifth optional dimension is <strong>personality markers</strong> — phrases,
        patterns, or attitudes that make the agent distinctive.
      </p>

      <NoteBlock type="tip" title="Show, Don't Just Tell">
        Abstract tone directives like "be professional" are underspecified. Supplement
        them with a brief example exchange in the system prompt itself. A single
        model response demonstrating the desired tone is worth a paragraph of description.
      </NoteBlock>

      <ExerciseBlock
        title="Tone and Style Practice"
        exercises={[
          {
            id: 'e5-4-1',
            difficulty: 'beginner',
            question: 'A children\'s educational platform needs an agent that explains science concepts. Describe the tone and style profile it should have across all four dimensions.',
            hint: 'Think about what a great science teacher for ages 8–12 sounds like.',
            solution: 'Formality: casual and encouraging. Verbosity: concise with one key idea per response, expanding only on follow-up. Structure: short paragraphs, occasional bullet lists, frequent questions to the learner. Vocabulary: everyday language with new terms introduced and immediately explained using familiar comparisons.',
          },
          {
            id: 'e5-4-2',
            difficulty: 'intermediate',
            question: 'An agent\'s system prompt says "be concise." A user asks a complex question that genuinely requires a long answer. How should the agent handle the tension?',
            hint: 'Consider what "concise" really means as a principle versus as a word count.',
            solution: '"Concise" means no unnecessary words, not short at the cost of completeness. The agent should give the full answer without padding, preamble, or repetition. If useful, it can offer a summary first and detail on request. The style directive governs density, not truncation.',
          },
          {
            id: 'e5-4-3',
            difficulty: 'intermediate',
            question: 'A user consistently responds in casual slang and short messages. Should an agent adapt its tone to match, and what limits should exist on that adaptation?',
            hint: 'Think about user preference versus brand standards versus safety.',
            solution: 'Moderate mirroring improves rapport and comprehension. The agent can adopt casual language and shorter responses. Limits: the agent should never match language that is disrespectful, profane, or unprofessional toward third parties. Brand safety rules from the operator override user preference.',
          },
        ]}
      />
    </div>
  );
}
