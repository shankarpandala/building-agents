import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function TeamLead() {
  return (
    <div className="prose-agents">
      <h2>The Team Lead</h2>
      <p>
        Every well-functioning team has a coordinator: someone who understands the overall goal,
        assigns work, tracks progress, and integrates results. In an agent team, this role is
        filled by the team lead. The team lead is not simply the most capable agent — it is the
        agent specifically designed for coordination, planning, and decision-making at the
        team level.
      </p>

      <ConceptBlock title="The Team Lead Agent" number="Concept 8.2">
        The team lead is the coordinating agent responsible for decomposing the team's overall
        goal into sub-tasks, assigning those tasks to the appropriate teammates, monitoring
        progress, and integrating results into a coherent final output. The team lead does not
        typically do the specialised work itself — it directs, monitors, and synthesises. Its
        prompt is designed for planning and coordination rather than deep domain execution.
      </ConceptBlock>

      <p>
        The team lead occupies a unique position: it must understand enough about each
        teammate's domain to assign work intelligently, but it does not need to match any
        teammate's depth. It needs strong planning, task decomposition, and integration skills.
        These are distinct capabilities from domain expertise, and they should be reflected in
        how the team lead is configured and prompted.
      </p>

      <PrincipleBlock title="Lead for Coordination, Not Execution" number="Principle 8.1">
        A team lead that does most of the substantive work is not leading — it is hoarding.
        The team lead's comparative advantage is coordination: tracking the whole, managing
        dependencies, and synthesising across parts. When a team lead starts executing
        deep domain tasks, it sacrifices its coordination bandwidth. Design the team lead to
        delegate aggressively and focus on integration.
      </PrincipleBlock>

      <WarningBlock title="The Bottleneck Lead">
        If all communication between teammates must flow through the team lead, the lead
        becomes a bottleneck as team size grows. Design communication protocols that allow
        lateral communication between teammates where appropriate, reserving the lead for
        decisions and integrations that genuinely require the full-team view.
      </WarningBlock>

      <ExerciseBlock
        title="Designing the Team Lead Role"
        exercises={[
          {
            id: 'tl-1',
            difficulty: 'beginner',
            question: 'List five responsibilities that belong to the team lead and five that belong to specialist teammates. What is the key criterion that distinguishes lead responsibilities from teammate responsibilities?',
            hint: 'Think about scope: whole-team view versus single-domain focus.',
            solution: 'Lead responsibilities: (1) decomposing the goal into sub-tasks; (2) assigning tasks to the right specialist; (3) tracking task completion; (4) resolving conflicts between sub-results; (5) synthesising final output. Teammate responsibilities: (1) executing assigned tasks with domain depth; (2) reporting results in the agreed format; (3) flagging blockers within their scope; (4) following the constraints in their brief; (5) requesting clarification when the brief is ambiguous. Key criterion: lead responsibilities require the whole-team view; teammate responsibilities require only domain-specific depth.',
          },
          {
            id: 'tl-2',
            difficulty: 'intermediate',
            question: 'A team lead is working on a complex research task. At what point should it perform integration work itself versus spawning another specialist (e.g., a synthesis agent) to do it? What factors determine this?',
            hint: 'Think about the synthesis task\'s complexity, the lead\'s available context, and specialisation value.',
            solution: 'The lead should synthesise directly when: the integration is straightforward (combining three well-structured summaries into a report outline) and the lead has sufficient context budget. It should delegate synthesis to a specialist when: the synthesis requires domain depth the lead lacks; the synthesis task is long enough to exhaust the lead\'s available context; or the synthesis benefits from a clean, dedicated context rather than the lead\'s already-loaded state. The lead\'s primary resource is its attention and context window — protecting those is a valid reason to delegate even synthesis.',
          },
          {
            id: 'tl-3',
            difficulty: 'advanced',
            question: 'Design the team lead\'s state machine: the set of states it can be in during a team task, the events that trigger transitions, and the actions it takes in each state. Include at least five states.',
            hint: 'Think about planning, dispatching, waiting, collecting, and concluding as starting states.',
            solution: 'States: (1) Planning: receives goal, decomposes into tasks, assigns teammates. Transition to Dispatching when all tasks are assigned. (2) Dispatching: sends briefs to teammates. Transition to Monitoring when all briefs are sent. (3) Monitoring: tracks task completion, handles status updates. Transition to Collecting when all expected results arrive (or timeout). Transition to Replanning if a teammate reports failure. (4) Replanning: reassigns failed tasks or adjusts scope. Returns to Dispatching. (5) Collecting: receives and validates all results. Transition to Integrating. (6) Integrating: synthesises results into final output. Transition to Concluding. (7) Concluding: delivers output, releases resources, signals completion.',
          },
        ]}
      />
    </div>
  );
}
