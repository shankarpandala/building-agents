import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function MessageHistory() {
  return (
    <div className="prose-agents">
      <h2>Message History</h2>
      <p>
        An agent's ability to maintain coherent multi-turn conversations depends on message
        history: the ordered record of all turns in a session, passed to the model with every
        new request. Unlike a human who remembers previous exchanges automatically, a language
        model has no persistent memory — it can only "remember" what is explicitly included
        in its input. Message history is the mechanism that creates the illusion of memory.
      </p>

      <ConceptBlock title="Message History" number="Concept 4.7">
        Message history is the ordered list of conversation turns — system, user, assistant,
        and tool messages — that is included in each model request to provide context about
        what has been said and done previously in the session. The model treats this history
        as part of its current input, allowing it to respond coherently to references,
        follow-ups, and evolving context across many turns.
      </ConceptBlock>

      <p>
        Message history is both essential and expensive. It is essential because without it,
        every response would be generated as if the conversation had just started. It is
        expensive because it consumes tokens — and grows with every turn. A long session with
        many tool calls can accumulate thousands of tokens of history, increasing the cost and
        latency of every subsequent request. Managing this growth is a core challenge of
        conversation engine design.
      </p>

      <WarningBlock title="History as an attack surface">
        Everything in message history is treated as trusted context by the model. If an
        earlier turn contains injected content — a tool response that includes adversarial
        instructions, for example — that content persists in the history and influences all
        future turns. History is not just a performance concern; it is a security surface
        that must be managed carefully.
      </WarningBlock>

      <NoteBlock title="Selective history inclusion" type="info">
        Not all history is equally relevant. Advanced conversation engines use selective
        inclusion: keeping recent turns in full detail, summarizing older turns, and
        dropping turns that are no longer relevant to the current task. This keeps the
        effective context focused and manageable without losing continuity. The challenge
        is determining what to keep, summarize, or drop without losing information that
        will turn out to matter later.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'mh-1',
            difficulty: 'beginner',
            question:
              'Why must message history be re-sent with every model request, rather than the model simply "remembering" the conversation?',
            hint: 'Think about how language models work at inference time.',
            solution:
              'Language models are stateless at inference time — each request is processed independently with no internal state carried over from previous requests. The model has no mechanism to recall what was said in earlier requests unless that content is explicitly included in the current request. Message history is the mechanism that provides conversational continuity by packaging what the model "needs to remember" into each new input.',
          },
          {
            id: 'mh-2',
            difficulty: 'intermediate',
            question:
              'A session has accumulated 50 turns of history, consuming 30,000 tokens. The model has a 100,000 token context limit. What are three strategies for managing history growth while maintaining conversational coherence?',
            hint: 'Think about summarization, selective inclusion, and external storage.',
            solution:
              '(1) Summarization: periodically summarize older turns into a compact summary and replace the original turns with it — reduces token count while preserving key facts. (2) Sliding window: keep only the most recent N turns in full, dropping the oldest turns. Works well when context rarely references early turns. (3) Retrieval-augmented history: store all turns externally and retrieve only the turns relevant to the current query using semantic search — the most precise approach but adds latency.',
          },
          {
            id: 'mh-3',
            difficulty: 'advanced',
            question:
              'A tool returns a very long response (10,000 tokens) that is added to message history. On the next turn, the user asks a question that has nothing to do with that tool\'s output. Describe how you would handle this situation in a production conversation engine.',
            hint: 'Think about both the token cost and the relevance of the large response to future turns.',
            solution:
              'Options: (1) Summarize the tool response immediately after it is received and replace the full response with a condensed version — the condensed version enters history instead of the full 10,000 tokens. (2) Store the full tool response in external memory, replace the history entry with a reference and a brief summary, and retrieve the full content only if a future turn specifically needs it. (3) Evaluate relevance at each turn using a lightweight classifier — if the tool response is not relevant to the current query, exclude it from the history for that request. Option 2 or 3 is most appropriate for production systems with high turn volume.',
          },
        ]}
      />
    </div>
  );
}
