import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function TokenBudgeting() {
  return (
    <div className="prose-agents">
      <h2>Token Budgeting</h2>
      <p>
        Every agent operates within a finite context window. Each turn of conversation,
        each tool result, each piece of system configuration consumes tokens from that
        fixed budget. An agent that ignores its token budget will eventually hit the
        context limit mid-task — losing coherence, truncating critical information, or
        failing outright. Token budgeting is the discipline of allocating this scarce
        resource wisely across the lifetime of a session.
      </p>

      <ConceptBlock title="Token Budget" number="Concept 4.11">
        A token budget is the planned allocation of a model's context window across the
        different demands of an agent session. These demands include the system prompt,
        conversation history, tool definitions, tool results, and space reserved for the
        model's own output. Budgeting means deciding in advance how much of the context
        window each category may consume — and having strategies for what happens when a
        category exceeds its allocation.
      </ConceptBlock>

      <AnalogyBlock title="Packing a Suitcase">
        A suitcase has finite space, and a traveler must decide how to divide it among
        clothes, toiletries, documents, and souvenirs. A careless traveler stuffs items in
        until the suitcase will not close, then must remove something important. A
        thoughtful traveler allocates space for each category before packing, leaving room
        for things acquired during the trip. Token budgeting is suitcase packing for
        context — you must plan your allocations before the session begins and leave room
        for what accumulates during the work.
      </AnalogyBlock>

      <p>
        The challenge of token budgeting grows with task complexity. A simple question-answer
        session uses little history and few tool calls. A multi-step research task
        accumulates dense history and large tool results. The runtime must monitor
        consumption continuously and make tradeoffs — summarizing old history, truncating
        large tool results, or signaling the agent to wrap up — before the budget is
        exhausted.
      </p>

      <PrincipleBlock title="Reserve Before You Spend" number="Principle 4.11">
        Always reserve context space for the model's response before filling the window
        with input. A context window packed to capacity with history and tool results
        leaves no room for the model to generate a useful response. The output reservation
        must be set before the input is assembled, not discovered as an afterthought when
        generation fails.
      </PrincipleBlock>

      <NoteBlock title="Hidden token costs" type="tip">
        Tool definitions, system prompts, and internal formatting consume tokens that are
        invisible to the end user but significant in the budget. An agent with thirty
        tools may spend thousands of tokens just describing those tools before a single
        word of conversation. Awareness of these hidden costs is essential for accurate
        budgeting.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'tb-1',
            difficulty: 'beginner',
            question:
              'A model has a 100,000 token context window. The system prompt uses 2,000 tokens and tool definitions use 8,000. How many tokens remain for conversation history and model output combined?',
            hint: 'Simple subtraction, but think about what else needs space.',
            solution:
              '90,000 tokens remain for conversation history and model output. However, you must further reserve space for the model\'s output — if you reserve 4,000 tokens for output, only 86,000 are available for history. The key insight is that the usable budget is smaller than the raw context window because of these fixed costs.',
          },
          {
            id: 'tb-2',
            difficulty: 'intermediate',
            question:
              'An agent has been running for twenty turns and has consumed 70% of its token budget on history. It needs to call a tool that will likely return a large result. What should the runtime do before making that call?',
            hint: 'Think about what must happen to make room.',
            solution:
              'The runtime should compact existing history before the tool call — summarizing older turns to free tokens. It should also estimate the likely size of the tool result and verify that sufficient budget remains for the result, plus the model\'s subsequent reasoning and response. If the budget is too tight even after compaction, the runtime should inform the agent so it can choose a less token-intensive approach or deliver a partial result.',
          },
          {
            id: 'tb-3',
            difficulty: 'advanced',
            question:
              'Design a token budgeting strategy for an agent that must handle both quick single-turn questions and long multi-step research tasks, without knowing in advance which type of task it will receive.',
            hint: 'Think about adaptive allocation rather than fixed allocation.',
            solution:
              'Use adaptive budgeting: start with generous allocations for history and tool results, but monitor consumption rate per turn. If the first few turns consume tokens slowly (single-turn pattern), no adjustment is needed. If consumption is rapid (research pattern), trigger early compaction and set progressively tighter limits on tool result sizes. Define budget thresholds — at 50% consumed, begin summarizing old turns; at 75%, limit tool result sizes; at 90%, signal the agent to conclude. The key is that the strategy adapts to observed behavior rather than requiring task classification up front.',
          },
        ]}
      />
    </div>
  );
}
