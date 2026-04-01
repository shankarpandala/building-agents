import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function InformationDensitySection() {
  return (
    <div className="prose-agents">
      <p>
        Not all tokens are equally informative. Information density is the ratio of
        meaningful content to total tokens consumed. Maximizing density — getting more
        useful information per token — directly extends the effective reach of any
        context window.
      </p>

      <ConceptBlock title="Information Density" number="Concept 5.14">
        Information density is the measure of how much task-relevant information is
        conveyed per token of context. Low-density content includes redundant preamble,
        repeated instructions, verbose tool schemas, and unfiltered document dumps.
        High-density content is pre-processed, deduplicated, and targeted to what the
        agent actually needs to complete its current task.
      </ConceptBlock>

      <p>
        Density can be improved at every layer of context construction. System prompts
        can be edited to eliminate redundancy. Tool definitions can be minimized.
        Retrieved documents can be chunked and filtered before insertion. Conversation
        history can be summarized. Each improvement multiplies the effective window size
        without increasing the token budget.
      </p>

      <PrincipleBlock title="Every Token Must Earn Its Place" number="Principle 5.7">
        Before inserting any content into the context window, ask: does this token help
        the agent answer the current question better? If the answer is no, the token
        should not be there. Passive context — content that might be useful — is the
        enemy of density. Active context — content that is useful now — is the goal.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Structured Formats Aid Density">
        Structured, terse formats (key-value pairs, short tables, labeled fields) convey
        more information per token than natural language prose in many contexts.
        Injected facts like user account state, session metadata, or configuration
        values are often better expressed as structured data than as sentences.
      </NoteBlock>

      <ExerciseBlock
        title="Information Density Practice"
        exercises={[
          {
            id: 'e5-14-1',
            difficulty: 'beginner',
            question: 'Rewrite the following low-density system prompt injection as a high-density structured alternative: "The user\'s name is Sarah Johnson and she has been a customer since January 2022. Her account tier is premium. She currently has two open support tickets."',
            hint: 'Use a structured format that conveys the same information in fewer tokens.',
            solution: 'User: Sarah Johnson | Customer since: Jan 2022 | Tier: Premium | Open tickets: 2',
          },
          {
            id: 'e5-14-2',
            difficulty: 'intermediate',
            question: 'A retrieval system inserts the full text of three 2,000-word documents into the context window to answer a question about one specific fact. Describe the process for improving density in this pipeline.',
            hint: 'Think about filtering stages before insertion.',
            solution: 'Step 1: Run a relevance filter to select only the top 2–3 most relevant passages per document rather than full text. Step 2: Extract and deduplicate sentences that directly address the query. Step 3: Insert only the filtered passages with document citation labels. Result: the same factual coverage in perhaps 200–400 tokens rather than 6,000.',
          },
          {
            id: 'e5-14-3',
            difficulty: 'advanced',
            question: 'You are optimizing a long-running agent for a complex task. Describe three measurable signals you would track to determine whether information density in the context window is degrading over time.',
            hint: 'Consider both token usage and behavioral signals.',
            solution: 'Signal 1: Average tokens per turn vs. task progress — if token count grows faster than tasks completed, density is falling. Signal 2: Tool call retry rate — low-density context forces more clarification tool calls as the agent lacks the information it needs. Signal 3: Answer coherence score on known facts injected early in the session — if the agent starts contradicting or forgetting early injected facts, compression is removing high-value content.',
          },
        ]}
      />
    </div>
  );
}
