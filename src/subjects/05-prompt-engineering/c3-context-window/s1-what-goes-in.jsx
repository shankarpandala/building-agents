import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function WhatGoesInSection() {
  return (
    <div className="prose-agents">
      <p>
        The context window is the finite space available to the model at any given
        moment. Everything the agent knows, can reference, and acts upon must fit within
        it. Understanding what goes in — and what does not — is fundamental to
        building effective agents.
      </p>

      <ConceptBlock title="Context Window Composition" number="Concept 5.10">
        The context window contains all text visible to the model at inference time.
        In a typical agent session, this includes: the system prompt, the conversation
        history (all prior turns), tool definitions, tool call results, and any
        injected background context. Every token of every element competes for the
        same finite space.
      </ConceptBlock>

      <AnalogyBlock title="The Briefing Room Whiteboard">
        Before a mission, a team gathers in a briefing room with a single whiteboard.
        Everything relevant to the operation — maps, objectives, team roles, constraints —
        must fit on that board. Nobody can act on what is not written. The context window
        is that whiteboard: everything the agent knows in the moment must be written there,
        and the board has a fixed size.
      </AnalogyBlock>

      <p>
        Context window content can be divided into <strong>persistent content</strong>
        (system prompt, tool definitions — stable across turns), <strong>accumulating
        content</strong> (conversation history — grows turn by turn), and
        <strong>ephemeral content</strong> (tool results, retrieved chunks — present
        for one turn then potentially discarded or summarized).
      </p>

      <NoteBlock type="note" title="Token Accounting">
        System prompts are often much larger than developers expect when they include
        tool definitions, constraint lists, and injected context. Before designing the
        conversation flow, audit the baseline token cost of the system prompt alone.
        This determines how many turns of history are actually affordable.
      </NoteBlock>

      <ExerciseBlock
        title="Context Window Composition Practice"
        exercises={[
          {
            id: 'e5-10-1',
            difficulty: 'beginner',
            question: 'An agent has a 200k token context window. The system prompt uses 4k tokens, each tool definition uses 500 tokens, and there are 12 tools. The average user turn is 100 tokens and the average assistant turn is 300 tokens. How many turns fit before the window is exhausted?',
            hint: 'Calculate baseline token cost first, then compute remaining space per turn pair.',
            solution: 'System prompt: 4,000. Tools: 12 × 500 = 6,000. Baseline total: 10,000. Remaining: 190,000. Each turn pair (user + assistant): 400 tokens. Max turns: 190,000 ÷ 400 = 475 turns. (This is a simplification — tool results add more.)',
          },
          {
            id: 'e5-10-2',
            difficulty: 'intermediate',
            question: 'Which elements of the context window cannot be trimmed when space is running low, and which are safe to compress or remove?',
            hint: 'Think about what the agent actively needs versus what is historical record.',
            solution: 'Cannot trim: system prompt (defines behavior), current tool definitions (agent must know what tools exist), the most recent few turns (immediate conversation context). Safe to compress: early conversation history (can be summarized), large tool results from earlier turns (can be replaced with summaries), repetitive injected context (can be deduplicated).',
          },
          {
            id: 'e5-10-3',
            difficulty: 'intermediate',
            question: 'Why does placing important instructions at the beginning and end of the context window tend to produce better agent behavior than placing them in the middle?',
            hint: 'Consider how attention mechanisms process long sequences.',
            solution: 'Language models exhibit a recency bias (strong attention to recent tokens) and a primacy effect (strong attention to earliest tokens). Instructions buried in the middle of a long context receive less consistent attention. Critical constraints should appear early in the system prompt and be repeated or summarized just before the current turn when they are especially important.',
          },
        ]}
      />
    </div>
  );
}
