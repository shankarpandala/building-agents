import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function AutoExtractedSection() {
  return (
    <div className="prose-agents">
      <p>
        Requiring users to manually save important facts to memory creates friction
        and misses information users do not think to save. Auto-extraction is the
        process of automatically identifying and storing valuable information from
        conversations without requiring explicit user action.
      </p>

      <ConceptBlock title="Auto-Extracted Memory" number="Concept 6.9">
        Auto-extracted memory is information automatically identified and stored
        during a conversation based on extraction heuristics or model judgment.
        Extraction triggers include: explicit user statements about preferences or
        facts ("I always prefer X"), corrections to prior agent behavior, recurring
        patterns across sessions, and significant decisions or conclusions that should
        persist. Auto-extraction reduces friction but introduces accuracy and
        privacy risks that must be managed.
      </ConceptBlock>

      <p>
        Extraction quality matters enormously. Over-extraction floods the memory store
        with low-value noise that degrades retrieval. Under-extraction misses genuinely
        useful knowledge. The extraction model must distinguish between incidental
        statements ("I was just saying that as an example") and genuinely persistent
        preferences ("I always want responses formatted this way").
      </p>

      <NoteBlock type="tip" title="Confirm Before Committing">
        High-value auto-extracted entries should be confirmed with the user before
        permanent storage. A brief end-of-session summary ("I noticed a few things
        I could remember for next time — should I save these?") makes the process
        transparent and gives users control. Confirmation also corrects extraction
        errors before they persist.
      </NoteBlock>

      <WarningBlock title="Auto-Extraction and Privacy">
        Auto-extraction can silently accumulate sensitive personal information
        that the user did not consciously choose to share. An offhand mention of
        a health condition, financial situation, or personal conflict should not
        automatically become a permanent memory entry. Apply conservative extraction
        criteria and exclude categories of sensitive data from automatic storage.
      </WarningBlock>

      <ExerciseBlock
        title="Auto-Extracted Memory Practice"
        exercises={[
          {
            id: 'e6-9-1',
            difficulty: 'beginner',
            question: 'A user says "I\'m always forgetting to attach files to emails — that\'s been a problem for me." Should this be auto-extracted to user memory? Why or why not?',
            hint: 'Consider whether this is actionable and whether it is genuinely persistent.',
            solution: 'Yes, this is a good candidate. It is a self-described persistent pattern ("always"), it is actionable (the agent can proactively remind the user to attach files when composing emails), and it is not sensitive. Extracted entry: "User frequently forgets to attach files to emails — proactively ask about attachments when helping compose emails."',
          },
          {
            id: 'e6-9-2',
            difficulty: 'intermediate',
            question: 'Design three extraction rules (if-then format) that would help an agent identify which statements from a conversation are worth storing in user memory.',
            hint: 'Look for signals that distinguish persistent preferences from in-context statements.',
            solution: 'Rule 1: If the user uses frequency words ("always," "never," "usually," "every time") about their own behavior or preferences, extract as a potential preference. Rule 2: If the user corrects the agent and the correction is about a general preference rather than a specific case ("not just this time — I always want..."), extract as a confirmed preference. Rule 3: If the user explicitly expresses frustration about a repeated issue, extract as a pattern to avoid ("user has found X unhelpful").',
          },
          {
            id: 'e6-9-3',
            difficulty: 'advanced',
            question: 'An auto-extraction system has been running for six months and the user memory store now contains 800 entries per user, many outdated or contradictory. Design a memory hygiene strategy to restore quality.',
            hint: 'Think about audit, deduplication, staleness, and conflict resolution.',
            solution: 'Hygiene strategy: (1) Deduplication: cluster semantically similar entries and merge them into the most recent or most specific version. (2) Staleness: entries not referenced in any session for 90+ days are flagged as stale and hidden from retrieval pending review. (3) Contradiction resolution: when two entries conflict, surface both to the user in a periodic "memory review" prompt and ask them to confirm the current truth. (4) Confidence decay: entries with no confirmation events have their confidence score decrease over time, reducing their retrieval weight. (5) Category pruning: entries in sensitive categories with no action utility are deleted on a rolling basis.',
          },
        ]}
      />
    </div>
  );
}
