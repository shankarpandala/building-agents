import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function CrossMachine() {
  return (
    <div className="prose-agents">
      <h2>Cross-Machine Coordination</h2>
      <p>
        Some agent tasks span more than one remote machine. A deployment pipeline might
        involve a build server, a test cluster, and a production host. A data processing
        task might coordinate work across multiple compute nodes. Cross-machine coordination
        is the art of keeping agents on different machines working together correctly.
      </p>

      <ConceptBlock title="Cross-Machine Coordination" number="Concept 11.9">
        Cross-machine coordination refers to the mechanisms that allow multiple agent
        processes — running on different machines — to work toward a shared goal without
        conflicting. It involves dividing work, communicating state, handling partial
        failures, and agreeing on what has been completed so that the overall task
        progresses correctly.
      </ConceptBlock>

      <p>
        The central challenge is that distributed systems have no shared clock and no
        instantaneous communication. One machine may complete its portion of the work
        while another has not yet started. Messages may arrive out of order. A machine
        may fail silently, leaving its assigned work incomplete with no notification.
        Coordination protocols must be designed to handle these realities.
      </p>

      <PrincipleBlock title="Design for Partial Failure" number="Principle 11.3">
        In cross-machine agent systems, any individual machine can fail at any time.
        A coordination design that assumes all machines will complete their work is not
        a design — it is a wish. Every workflow must have a defined answer to: what
        happens if this step does not complete? Can it be retried? Reassigned? Skipped?
        Partial failure is not an edge case; it is the normal operating condition.
      </PrincipleBlock>

      <WarningBlock title="Beware of Split-Brain">
        A split-brain scenario occurs when two machines each believe they are the
        authoritative coordinator for the same task. Both may take conflicting actions —
        writing different results, triggering the same downstream step twice, or
        overwriting each other's work. Coordination protocols must include a mechanism
        for resolving authority, such as distributed locks or a single designated
        coordinator machine.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'cm-1',
            difficulty: 'beginner',
            question: 'Why can\'t you simply rely on each machine in a multi-machine agent system to report "done" and then proceed? What can go wrong?',
            hint: 'Think about network failures, silent crashes, and message loss.',
            solution: 'A machine can fail after completing its work but before sending its "done" message. Or the "done" message can be lost in transit. Or the machine can appear to complete but have silently produced incorrect output. Relying on self-reported completion without verification means a single lost message or silent failure can stall or corrupt the entire workflow. Robust coordination requires acknowledgment receipts, idempotent retries, and independent verification where possible.'
          },
          {
            id: 'cm-2',
            difficulty: 'intermediate',
            question: 'An agent is coordinating a task across three machines. Machine B completes its work, but Machine A fails partway through. How should the coordinator handle this?',
            hint: 'Consider whether Machine B\'s work needs to be undone and how to restart Machine A.',
            solution: 'The coordinator should: (1) detect the failure via a heartbeat timeout or explicit error message, (2) assess whether Machine B\'s completed work depends on Machine A\'s completion — if so, it may need to be held or rolled back, (3) attempt to restart or reassign Machine A\'s work to another machine, (4) once Machine A\'s work is completed, verify that the combined outputs are consistent before proceeding. The key is that incomplete partial work should never be treated as final.'
          },
          {
            id: 'cm-3',
            difficulty: 'advanced',
            question: 'How does idempotency help with cross-machine coordination, and what makes a task idempotent in this context?',
            hint: 'Think about what happens when you safely retry a step that may have already completed.',
            solution: 'Idempotency means running a step multiple times produces the same result as running it once. In cross-machine coordination, this allows safe retries: if a machine fails, you can simply restart its task on another machine without risk of duplicating effects. A task is idempotent if it checks for prior completion before acting (e.g., "has this record already been processed?"), produces the same output for the same input regardless of how many times it runs, and avoids side effects that accumulate with repeated execution (such as appending to a log rather than setting a value).'
          }
        ]}
      />
    </div>
  );
}
