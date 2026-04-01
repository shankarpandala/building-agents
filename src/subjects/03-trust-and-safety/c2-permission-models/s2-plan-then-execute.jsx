import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function PlanThenExecute() {
  return (
    <div className="prose-agents">
      <h2>Plan-Then-Execute</h2>
      <p>
        The plan-then-execute model separates the work of deciding what to do from the work of
        doing it. The agent first generates a complete plan — a sequence of proposed actions —
        and presents it to a human for review. Only after the plan is approved does the agent
        begin execution. This concentrates human oversight into a single checkpoint rather than
        scattering it across every individual action.
      </p>

      <ConceptBlock title="Plan-Then-Execute Permission Model" number="Concept 3.6">
        In the plan-then-execute model, the agent reasons through a task and produces an explicit
        action plan before taking any real-world steps. A human reviews the full plan, can modify
        or reject it, and then approves it as a whole. Execution follows the approved plan
        autonomously. The key insight is that oversight happens at the planning phase, where
        course correction is cheapest.
      </ConceptBlock>

      <AnalogyBlock title="The Surgical Checklist">
        Before a complex surgery, the surgical team reviews the procedure plan together: what
        will be done, in what order, with what instruments, and what the abort conditions are.
        Everyone agrees before the first incision. The surgery then proceeds without a committee
        vote for every cut. The planning session is the safety gate, not the execution.
      </AnalogyBlock>

      <p>
        Plan-then-execute is well suited to tasks that are too long for step-by-step approval but
        too consequential for fully autonomous execution. It works best when the action space is
        predictable enough that a complete plan can be specified in advance. It breaks down when
        the agent must react to information it discovers mid-execution, because the plan may
        become invalid as conditions change.
      </p>

      <PrincipleBlock title="Make Plans Inspectable" number="Principle 3.3">
        A plan is only useful as a safety mechanism if humans can actually understand it. Plans
        should be expressed in human-readable terms that describe intent, not just low-level
        operations. "Delete all rows where status is 'archived' and created_at is before 2023"
        is inspectable. A list of opaque database transaction IDs is not.
      </PrincipleBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'pte-1',
            difficulty: 'beginner',
            question:
              'What is the main advantage of plan-then-execute over ask-every-time, and what is the main risk introduced by concentrating approval into a single checkpoint?',
            hint: 'Think about the human\'s cognitive load and what they can realistically evaluate in one review.',
            solution:
              'Advantage: dramatically reduces interruptions — one review for a 50-step plan instead of 50 reviews. Main risk: the human may not carefully evaluate all 50 steps. Reviewers tend to skim long plans and miss subtle issues in the middle. The plan must be structured to make anomalies easy to spot.',
          },
          {
            id: 'pte-2',
            difficulty: 'intermediate',
            question:
              'An agent is executing an approved 20-step plan and at step 12 discovers that the data it is working with is structured differently than expected. Should the agent continue, stop and re-plan, or improvise? Defend your answer.',
            hint: 'Consider what the original approval was actually authorizing.',
            solution:
              'The agent should stop and re-plan. The human\'s approval was for the specific plan as written, based on assumptions about the environment. If those assumptions no longer hold, continuing constitutes acting outside the scope of what was approved. The agent should surface the new information, propose a revised plan, and seek fresh approval.',
          },
          {
            id: 'pte-3',
            difficulty: 'advanced',
            question:
              'Design a plan format that would make it easy for a non-technical reviewer to catch a dangerous step hidden among many routine steps. What elements would you include?',
            hint: 'Think about how humans scan documents for risk.',
            solution:
              'Include: (1) A risk summary at the top listing any irreversible or high-blast-radius steps. (2) Color or symbol coding for each step by reversibility. (3) Plain-language descriptions of what each step does and why. (4) Explicit "point of no return" markers where rollback becomes impossible. (5) A diff view if the plan modifies existing data, showing before and after.',
          },
        ]}
      />
    </div>
  );
}
