import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function TeamLifecycle() {
  return (
    <div className="prose-agents">
      <h2>Team Lifecycle</h2>
      <p>
        Agent teams are not static configurations — they go through distinct phases from
        formation to shutdown. Understanding the team lifecycle enables better design: each
        phase has different concerns, and problems that arise in production can often be
        traced to a phase that was handled poorly. A team that is assembled correctly but
        never properly shut down leaks resources just as surely as code with a memory leak.
      </p>

      <ConceptBlock title="Team Lifecycle Phases" number="Concept 8.4">
        An agent team passes through five phases: <strong>formation</strong> (the team is
        assembled, roles assigned, and communication channels established),
        <strong> briefing</strong> (the goal is decomposed and each teammate receives their
        initial brief), <strong>execution</strong> (teammates work on their tasks, the lead
        monitors and coordinates), <strong>integration</strong> (results are collected,
        validated, and synthesised), and <strong>shutdown</strong> (all agents are gracefully
        terminated, resources released, and state persisted if needed). Skipping or rushing
        any phase creates problems in the phases that follow.
      </ConceptBlock>

      <p>
        Formation deserves more attention than it typically receives. The decisions made at
        formation — which agents to include, how many, with what roles and tools — shape every
        subsequent phase. A team formed without thinking through the execution phase often
        discovers missing roles or wrong capability scoping only when a task fails. A brief
        formation and planning step pays dividends throughout execution.
      </p>

      <PrincipleBlock title="Design for the Full Lifecycle" number="Principle 8.2">
        Every team design should trace through all five lifecycle phases before deployment.
        Ask: how will this team form? How will the goal be decomposed? What happens if a
        teammate fails mid-execution? How will results be integrated? How will the team shut
        down cleanly? Gaps found in this exercise are far cheaper to fix in design than in
        production.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Persistent vs Ephemeral Teams">
        Some teams are ephemeral — assembled for one task, shut down when done. Others are
        persistent — kept alive across many tasks, with teammates that accumulate domain
        context over time. Persistent teams amortise formation costs and can develop richer
        internal coordination, but they also require lifecycle management across restarts,
        failures, and member replacement.
      </NoteBlock>

      <ExerciseBlock
        title="Managing the Team Lifecycle"
        exercises={[
          {
            id: 'tl-1',
            difficulty: 'beginner',
            question: 'For each of the five lifecycle phases (formation, briefing, execution, integration, shutdown), name one thing that can go wrong and one design practice that prevents it.',
            hint: 'Think about the specific concerns of each phase separately.',
            solution: 'Formation: wrong roles assembled → conduct a task-dependency analysis before choosing team composition. Briefing: briefs are too vague → use the four-element brief format (goal, context, constraints, output format) for every teammate. Execution: a teammate fails silently → require all teammates to report status at defined checkpoints. Integration: results are incompatible formats → specify output schemas in briefs and validate on receipt. Shutdown: agents left running after task completes → maintain a team ledger and verify all agents reach terminal state before the team is declared done.',
          },
          {
            id: 'tl-2',
            difficulty: 'intermediate',
            question: 'A persistent team is deployed to handle recurring tasks. Over time, one teammate\'s performance degrades. Describe the lifecycle events that should detect this, and how the team handles member replacement without interrupting service.',
            hint: 'Think about monitoring, health checks, and hot-swapping a team member.',
            solution: 'Detection: the team lead monitors output quality metrics for each teammate (e.g., result accuracy, task completion rate, error frequency). When a teammate\'s metrics cross a degradation threshold over a rolling window, the lead flags it for replacement. Replacement: (1) the lead stops assigning new tasks to the degraded teammate; (2) a new teammate instance is initialised with the same role configuration; (3) any in-progress tasks are re-assigned to the replacement; (4) the degraded teammate completes its current task or is cancelled cleanly; (5) the replacement enters the roster. The lead maintains continuity by never leaving a role unoccupied during the transition.',
          },
          {
            id: 'tl-3',
            difficulty: 'advanced',
            question: 'A team is partway through execution when the user cancels the overall task. Design the graceful shutdown sequence, accounting for: teammates mid-task, partial results that may have value, and external resources that must be released.',
            hint: 'Prioritise resource release, then preserve anything worth keeping.',
            solution: 'Shutdown sequence: (1) Team lead receives cancellation. Broadcasts stop-new-work signal to all teammates. (2) Teammates acknowledge and stop initiating new tool calls. They complete any tool call already in-flight if it will finish within 5 seconds; otherwise abandon. (3) Each teammate calls explicit release functions for any external resources it holds (open connections, locks, sessions). (4) Teammates send a partial-result package to the lead, even for incomplete work. Format: { task_id, completion_percentage, partial_findings: [...], resources_released: bool }. (5) Lead persists partial results to a recovery store with a task identifier, so work completed so far can be resumed or inspected. (6) Lead verifies all teammates report terminal status, force-terminates any that don\'t within the grace window. (7) Lead releases its own resources and marks task as cancelled-with-partial-results.',
          },
        ]}
      />
    </div>
  );
}
