import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function UserMemorySection() {
  return (
    <div className="prose-agents">
      <p>
        Users should not have to re-introduce themselves every session. User memory
        is the persistent store of what an agent has learned about a specific user —
        their preferences, history, communication style, and recurring needs — enabling
        continuity and personalization across all of their sessions.
      </p>

      <ConceptBlock title="User Memory" number="Concept 6.6">
        User memory is a persistent, per-user store of facts, preferences, and patterns
        that should persist across sessions. It captures: expressed preferences (how
        the user likes to communicate, what formats they prefer), factual context
        (their role, their environment, their constraints), learned patterns (topics
        they return to frequently, mistakes to avoid), and relationship history
        (what has been done for them, what was helpful or not).
      </ConceptBlock>

      <p>
        User memory enables a fundamentally different kind of interaction. Without it,
        every session is a first meeting. With it, the agent can greet a returning user
        with awareness of what they care about, avoid repeating mistakes, and offer
        suggestions calibrated to their actual needs rather than generic defaults.
      </p>

      <PrincipleBlock title="Memory Must Be Transparent and Correctable" number="Principle 6.3">
        Users must be able to know what the agent remembers about them, correct
        inaccuracies, and request deletion. An agent acting on incorrect user memory
        is worse than one with no memory — it confidently delivers the wrong thing.
        Transparency about stored memory is both an ethical requirement and a
        practical quality control mechanism.
      </PrincipleBlock>

      <WarningBlock title="Memory Can Entrench Errors">
        If a user's preferences were inferred incorrectly and stored, they persist
        until corrected. The agent will apply wrong assumptions across all future
        sessions, and the user may not know why the experience feels off. Build
        easy correction flows and periodically surface stored preferences for
        confirmation.
      </WarningBlock>

      <ExerciseBlock
        title="User Memory Practice"
        exercises={[
          {
            id: 'e6-6-1',
            difficulty: 'beginner',
            question: 'What is the difference between a user preference inferred by the agent and one explicitly stated by the user? How should storage treat each differently?',
            hint: 'Consider confidence level and the need for confirmation.',
            solution: 'Explicitly stated preferences are high confidence and can be stored directly. Inferred preferences are lower confidence — derived from behavioral patterns — and should be flagged as inferred, given a lower confidence score, and surfaced for confirmation before being used persistently. Inferred preferences that the user confirms become explicit.',
          },
          {
            id: 'e6-6-2',
            difficulty: 'intermediate',
            question: 'A user\'s stored preferences say they prefer concise responses, but in the current session they are asking very detailed follow-up questions suggesting they want more depth. How should the agent resolve this tension?',
            hint: 'Consider session-level behavior versus stored preferences, and when to update.',
            solution: 'The current session\'s signals take precedence for the current conversation. The agent should shift to more detailed responses without explanation. After a pattern is clear (multiple turns showing the same behavior), the agent can gently surface the observation: "I\'ve noticed you\'re asking for more detail today — would you like me to update your preferences to include more thorough explanations?" This gives the user control over whether the change is permanent.',
          },
          {
            id: 'e6-6-3',
            difficulty: 'advanced',
            question: 'Design a user memory schema that balances personalization value with privacy minimization. What is stored, what is derived at query time, and what is never stored?',
            hint: 'Apply data minimization principles — store only what delivers genuine value.',
            solution: 'Stored: communication preferences (format, length, formality), domain expertise levels per topic, explicit tool or workflow preferences, confirmed facts the user has stated (role, timezone). Derived at query time: specific behavior patterns (queried from session log aggregates, not stored as assertions). Never stored: sensitive personal details not required for service, content of private conversations (only metadata like topic category), anything with no direct personalization use. All stored entries include a creation date and a review-by date after which the user is prompted to confirm or remove them.',
          },
        ]}
      />
    </div>
  );
}
