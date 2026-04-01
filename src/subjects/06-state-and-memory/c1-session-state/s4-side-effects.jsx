import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function SideEffectsSection() {
  return (
    <div className="prose-agents">
      <p>
        When an agent calls a tool that changes the world — sending a message, modifying
        a database, triggering a workflow — it produces a side effect. Side effects are
        how agents accomplish real work, and they are also how agents cause real damage
        when something goes wrong.
      </p>

      <ConceptBlock title="Side Effects" number="Concept 6.4">
        A side effect is any change to state outside the current context window that
        results from an agent action. Side effects are categorized by their reversibility:
        <strong> reversible side effects</strong> can be undone (a draft email that
        is not yet sent), <strong>recoverable side effects</strong> require effort to
        undo (a sent email with a recall mechanism), and <strong>irreversible side
        effects</strong> cannot be undone (a deleted record without backup, a published
        post, a completed payment).
      </ConceptBlock>

      <p>
        The session state of side effects matters beyond the current action. An action
        taken in this session affects the state seen in future sessions. An email sent
        cannot be unsent. A customer record modified persists for the next agent that
        reads it. Side effects accumulate across sessions and form the persistent
        footprint of the agent's activity.
      </p>

      <PrincipleBlock title="Prefer Reversible Actions" number="Principle 6.2">
        When multiple paths lead to the same goal, prefer the one with more reversible
        side effects. Create a draft before sending. Stage a change before committing.
        Queue a deletion before executing. Reversibility preserves the ability to
        recover from mistakes — both the agent's and the user's.
      </PrincipleBlock>

      <WarningBlock title="The Compounding Side Effect">
        In an agentic loop, each irreversible side effect narrows the space of
        recoverable futures. An agent that takes five irreversible actions in sequence
        may find itself in a state from which no good outcome is reachable. The further
        a loop runs without human checkpoints, the harder recovery becomes.
      </WarningBlock>

      <ExerciseBlock
        title="Side Effects Practice"
        exercises={[
          {
            id: 'e6-4-1',
            difficulty: 'beginner',
            question: 'Classify these agent actions as reversible, recoverable, or irreversible: (a) drafting an email, (b) sending an email, (c) posting to a public social media account, (d) moving a file to trash, (e) permanently deleting a file.',
            hint: 'Consider whether the action can be undone and at what cost.',
            solution: '(a) Reversible — draft discarded with no effect. (b) Recoverable — email recall exists but is unreliable and the recipient may have read it. (c) Recoverable with difficulty — post can be deleted but screenshots may persist. (d) Reversible — file can be restored from trash. (e) Irreversible — no recovery without backup.',
          },
          {
            id: 'e6-4-2',
            difficulty: 'intermediate',
            question: 'An agent is asked to "clean up old records from the database." Before executing any deletions, what side effect safeguards should it implement?',
            hint: 'Think about confirmation, reversibility, and scope controls.',
            solution: 'Safeguards: (1) Clarify "old" — define a specific age threshold before acting. (2) Show the user a sample of what will be deleted and get explicit confirmation. (3) Archive rather than delete if possible — move records to a cold storage table first. (4) Execute in small batches with a pause for review rather than all at once. (5) Log every deletion with the record ID and timestamp.',
          },
          {
            id: 'e6-4-3',
            difficulty: 'advanced',
            question: 'Design a side effect audit log for a financial agent. What fields should each log entry contain, and how should it be used after an incident to reconstruct what happened?',
            hint: 'Consider who needs to read the log and what questions they need to answer.',
            solution: 'Each entry: session ID, user ID, timestamp, tool name, action type (read/write/delete), target resource (table + record ID), input parameters, result status, and a hash of the pre-action state snapshot. After an incident, the log should enable: (1) chronological reconstruction of all state changes, (2) identification of which action caused the problematic state, (3) replay or rollback using the pre-action snapshots. The log should be immutable — no agent action can modify it.',
          },
        ]}
      />
    </div>
  );
}
