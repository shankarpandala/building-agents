import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ReversibleIrreversible() {
  return (
    <div className="prose-agents">
      <h2>Reversible vs. Irreversible Actions</h2>
      <p>
        Not all agent actions are equally consequential. One of the most important distinctions
        in agent safety is between reversible and irreversible actions. Reversible actions can be
        undone; irreversible ones cannot. This single property shapes how much caution an agent
        should apply before executing any given step.
      </p>

      <ConceptBlock title="Reversibility Spectrum" number="Concept 3.3">
        Actions fall on a spectrum from fully reversible to fully irreversible. Moving a file
        to a trash folder is nearly reversible. Sending an email is not reversible but is limited
        in scope. Deleting a database without backup is irreversible at scale. Agents should
        treat position on this spectrum as a primary input to the decision of whether to act
        autonomously or seek confirmation.
      </ConceptBlock>

      <p>
        Reversibility is not a binary property — it is a function of time, cost, and completeness.
        A deleted file is reversible if a backup exists and is recent. The same deletion becomes
        irreversible if the backup is six months old and the file was created yesterday. Designing
        agents well means building the infrastructure for reversibility: snapshots, audit logs,
        soft deletes, and rollback windows.
      </p>

      <AnalogyBlock title="Git Commits vs. Published Posts">
        Committing code to a local repository is reversible — you can amend, reset, or revert
        freely. Pushing to a public repository increases the cost of reversal. Publishing and
        announcing a release makes reversal even harder due to downstream dependencies. The
        action looks similar at each stage but the reversibility decreases dramatically. Agent
        actions have the same layered structure.
      </AnalogyBlock>

      <PrincipleBlock title="Prefer Reversible Paths" number="Principle 3.1">
        When an agent faces a choice between two approaches that both achieve the goal, prefer the
        more reversible one. Reversibility is not a constraint to work around — it is a design
        criterion to optimize for. This is especially important in agentic pipelines where errors
        compound across many steps before anyone notices.
      </PrincipleBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ri-1',
            difficulty: 'beginner',
            question:
              'For each action, classify it as reversible, partially reversible, or irreversible, and briefly explain: (a) renaming a file, (b) posting a public tweet, (c) charging a customer\'s credit card.',
            hint: 'Think about technical reversibility and practical reversibility separately.',
            solution:
              '(a) Reversible — rename back or restore from backup. (b) Partially reversible — can delete but retweets/screenshots persist. (c) Partially reversible — can issue refund but transaction record remains and customer experience is already affected.',
          },
          {
            id: 'ri-2',
            difficulty: 'intermediate',
            question:
              'An agent is about to permanently delete 500 archived records to free up storage. Describe two system-level mechanisms that could make this action more reversible without changing the agent\'s logic.',
            hint: 'Think about what happens at the storage layer before and after deletion.',
            solution:
              'First, implement a soft-delete pattern: mark records as deleted and move them to an archive table with a retention window before physical removal. Second, take an automated snapshot of the affected records to cold storage before executing the deletion, creating a point-in-time recovery option.',
          },
          {
            id: 'ri-3',
            difficulty: 'advanced',
            question:
              'Why does the reversibility of an action often decrease as a pipeline grows longer, even if each individual step remains reversible in isolation?',
            hint: 'Think about downstream dependencies and compounding state changes.',
            solution:
              'Each step may trigger downstream actions in other systems — notifications sent, caches invalidated, third-party APIs called, or other agents triggered. Reversing step 3 may technically be possible, but steps 4–8 that ran because of step 3 may have already produced irreversible effects. Reversibility of a pipeline must be evaluated holistically, not step-by-step.',
          },
        ]}
      />
    </div>
  );
}
