import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function LongRunningSection() {
  return (
    <div className="prose-agents">
      <p>
        Most agent sessions are short. But some tasks span hours, days, or weeks —
        research projects, complex implementations, ongoing workflows. Long-running
        sessions present challenges that short sessions do not: context window
        exhaustion, state staleness, accountability gaps, and the need for human
        checkpoints across an extended timeline.
      </p>

      <ConceptBlock title="Long-Running Sessions" number="Concept 6.13">
        A long-running session is one that extends beyond a single interaction window —
        either in time (hours to days) or in scope (many sub-tasks forming a larger
        goal). Long-running sessions require explicit state management strategies:
        checkpointing to survive interruptions, context compression to handle window
        limits, and human oversight integration to ensure the work remains aligned
        with the user's evolving intentions.
      </ConceptBlock>

      <p>
        Three problems compound over time in long-running sessions. First, the context
        window fills and must be managed. Second, the world changes — facts that were
        accurate at session start may no longer be. Third, the agent may drift from
        the user's intent through accumulated small misinterpretations, each reasonable
        individually but collectively diverging from the original goal.
      </p>

      <PrincipleBlock title="Checkpoint, Verify, Continue" number="Principle 6.6">
        Long-running sessions should include regular checkpoints where the agent
        surfaces its understanding of the current state, confirms alignment with the
        user's goal, and validates that the world has not changed in ways that affect
        the plan. Checkpoints prevent the compounding of small errors into large
        failures across extended timelines.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Intent Drift">
        Over a long session, a user's intent may legitimately evolve. They start wanting
        X, but as the work proceeds they realize they need Y. An agent that treats the
        original goal as immutable will deliver X perfectly when the user now wants Y.
        Regular intent checks — "Is this still what you're looking for?" — prevent
        wasted effort and keep the agent aligned with the user's current goal, not their
        initial one.
      </NoteBlock>

      <ExerciseBlock
        title="Long-Running Sessions Practice"
        exercises={[
          {
            id: 'e6-13-1',
            difficulty: 'beginner',
            question: 'A research agent is tasked with a project expected to take three days. What types of external state might become stale during that time, and how should the agent handle each?',
            hint: 'Think about data sources the agent relies on and how quickly they change.',
            solution: 'Stale risks: (1) Web sources used in research may be updated — re-fetch when citing, especially for rapidly changing topics. (2) Access permissions may change — re-validate before each write action. (3) The user\'s goals may evolve — check alignment at each major milestone. (4) Dependent external systems (APIs, databases) may have schema or behavior changes — test before relying on prior results.',
          },
          {
            id: 'e6-13-2',
            difficulty: 'intermediate',
            question: 'Design a checkpoint protocol for a long-running coding agent. How often should checkpoints occur, what should they contain, and who should approve them before work continues?',
            hint: 'Balance oversight value against interruption cost.',
            solution: 'Checkpoint frequency: after each self-contained work unit (a feature implemented, a bug fixed) rather than on fixed time intervals. Checkpoint content: summary of work completed, current file state, next planned step, any open decisions requiring human input. Approval: automatic continuation for low-risk steps (reading, drafting). Human approval required before: large refactors, deletions, external API calls, or any action flagged as high-consequence. Display checkpoints in a sidebar so the user can review without interrupting the agent.',
          },
          {
            id: 'e6-13-3',
            difficulty: 'advanced',
            question: 'A long-running agent has been working for two days when the user changes a key requirement that invalidates 40% of the work done so far. Design the strategy for handling this gracefully — what is assessed, what is discarded, and how is the path forward determined?',
            hint: 'Think about impact analysis, recovery cost estimation, and replanning.',
            solution: 'Step 1: Impact analysis — map the changed requirement to the affected work units. Tag each as: (a) unaffected (keep), (b) partially affected (modify), (c) fully invalidated (discard). Step 2: Surface the impact to the user with an estimate of recovery cost before taking any action. Step 3: Get user confirmation that the new requirement justifies the rework. Step 4: Archive invalidated work (do not delete — it may contain reusable elements). Step 5: Replan from the earliest affected checkpoint. Do not restart from zero — preserved work units are the foundation of the new plan. Step 6: Establish a revised goal statement in the persistent state block to prevent re-drift.',
          },
        ]}
      />
    </div>
  );
}
