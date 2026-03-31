import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function CostAskingVsActing() {
  return (
    <div className="prose-agents">
      <h2>The Cost of Asking vs. The Cost of Acting</h2>
      <p>
        Every agent decision involves an implicit trade-off: ask a human for clarification or
        proceed autonomously. Both choices have costs. Asking interrupts the human, slows the
        workflow, and — if done too often — trains users to ignore confirmations. Acting without
        asking risks taking the wrong action, possibly an irreversible one. Neither extreme is
        correct.
      </p>

      <ConceptBlock title="The Ask–Act Trade-off" number="Concept 3.4">
        The decision to ask versus act should be calibrated against two costs: the cost of an
        unnecessary interruption (friction, user fatigue, broken focus) and the cost of an
        unchecked wrong action (damage, reversal effort, trust erosion). High-stakes irreversible
        actions warrant asking even at high friction cost. Routine reversible tasks warrant
        autonomous action even with some uncertainty.
      </ConceptBlock>

      <p>
        The cost of asking is not zero. Users who are interrupted too frequently begin approving
        confirmations reflexively — the same phenomenon as "alert fatigue" in security systems.
        An agent that asks for confirmation on every small step creates a false sense of oversight
        while actually reducing it, because humans stop reading what they are approving.
      </p>

      <NoteBlock title="Automation bias" type="warning">
        Research consistently shows that humans in supervisory roles over automated systems tend
        to over-trust automation over time. This means confirmation dialogs lose effectiveness the
        more routine they become. Reserve human checkpoints for genuinely high-stakes decisions,
        so they receive the attention they deserve.
      </NoteBlock>

      <PrincipleBlock title="Match Friction to Stakes" number="Principle 3.2">
        Design agent checkpoints proportional to the stakes of the action. Routine, reversible,
        low-blast-radius operations should run without interruption. Novel, irreversible, or
        high-blast-radius operations should pause and surface a clear, specific question — not a
        generic "are you sure?" that triggers reflexive approval.
      </PrincipleBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ca-1',
            difficulty: 'beginner',
            question:
              'An agent that helps with email drafts asks "Should I send this?" before every single email, including routine internal meeting confirmations. What is the likely long-term behavioral effect on users, and why is this a safety problem?',
            hint: 'Think about what happens to human attention when prompts become routine.',
            solution:
              'Users will begin clicking "yes" without reading, because the prompt has become noise. This creates automation bias — users appear to be in the loop but are not providing real oversight. High-stakes emails may be sent without genuine review because the confirmation habit has been dulled by low-stakes repetition.',
          },
          {
            id: 'ca-2',
            difficulty: 'intermediate',
            question:
              'Design a simple decision rule an agent could use to determine whether to ask before acting. What two factors should always be in that rule, and what is one factor that should be context-dependent?',
            hint: 'Revisit the blast radius and reversibility concepts from earlier sections.',
            solution:
              'Always include: (1) reversibility — if the action cannot be undone, ask; (2) blast radius — if many systems or people are affected, ask. Context-dependent: novelty — if this is the first time the agent has performed this class of action in this environment, more caution is warranted even for lower-stakes operations.',
          },
          {
            id: 'ca-3',
            difficulty: 'advanced',
            question:
              'A team argues that their agent should ask for permission before every action to maximize safety. Construct the strongest counter-argument against this position.',
            hint: 'Consider what "safety" really means at the system level, not just the action level.',
            solution:
              'Maximizing confirmations does not maximize safety — it creates alert fatigue, erodes the quality of human oversight, and incentivizes users to bypass the agent entirely or use less safe alternatives. True safety requires proportionate oversight: reserve human attention for the decisions where it genuinely matters, so that attention is available and meaningful when it is needed most.',
          },
        ]}
      />
    </div>
  );
}
