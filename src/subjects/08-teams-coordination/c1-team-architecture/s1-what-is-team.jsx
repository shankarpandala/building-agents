import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function WhatIsTeam() {
  return (
    <div className="prose-agents">
      <h2>What Is an Agent Team?</h2>
      <p>
        The term "multi-agent system" covers a wide range of configurations — from a simple
        orchestrator calling a single sub-agent to sprawling networks of dozens of specialised
        workers. An agent team is a specific and more structured arrangement: a persistent,
        coordinated group of agents with defined roles, shared goals, and explicit communication
        protocols. Understanding what makes a team distinct from an ad-hoc collection of agents
        is the foundation for designing one well.
      </p>

      <ConceptBlock title="Agent Team" number="Concept 8.1">
        An agent team is a group of agents with assigned roles, a shared objective, and
        coordination mechanisms that govern how they communicate and divide work. Unlike a
        loose collection of independently spawned sub-agents, a team has structure: there is
        typically a lead responsible for coordination, teammates with defined responsibilities,
        and agreed-upon protocols for passing information and resolving conflicts. Teams are
        designed to persist across multiple interactions rather than being assembled once
        for a single task.
      </ConceptBlock>

      <p>
        The distinction between "a group of agents" and "a team" is meaningful in practice.
        An unstructured group of agents doing similar work in parallel is a swarm — useful for
        embarrassingly parallel tasks but not for work requiring coordination and interdependence.
        A team is chosen when the task has sub-problems that depend on each other, when different
        components require different expertise, and when the combined output needs coherent
        integration rather than simple aggregation.
      </p>

      <AnalogyBlock title="The Film Production Crew">
        A film production crew is a team, not a crowd. The director, cinematographer, sound
        designer, and editor each have defined roles and responsibilities. They communicate
        through established protocols — dailies, production meetings, notes. Their work is
        interdependent: the editor cannot work until the cinematographer has shot, the sound
        designer needs the rough cut. The team's structure exists to manage those dependencies
        and ensure the final product is coherent, not a collection of disconnected pieces.
      </AnalogyBlock>

      <NoteBlock type="note" title="Teams vs Pipelines">
        A pipeline is sequential — Agent A outputs to Agent B outputs to Agent C. A team is
        more network-like: members can communicate laterally, the lead can redirect work, and
        members can surface problems upstream. Teams are appropriate when the task requires
        adaptive coordination; pipelines are appropriate when the flow is fixed and predictable.
      </NoteBlock>

      <ExerciseBlock
        title="Defining an Agent Team"
        exercises={[
          {
            id: 'wit-1',
            difficulty: 'beginner',
            question: 'What are three structural properties that distinguish an agent team from a simple collection of parallel sub-agents? Give a concrete example of why each property matters.',
            hint: 'Think about roles, communication, and shared goals.',
            solution: '(1) Defined roles: each team member has a specific responsibility, preventing overlap and gaps. Without this, two agents may both attempt the same sub-task while another is left uncovered. (2) Explicit communication protocols: team members pass information in agreed formats via agreed channels. Without this, outputs from one agent may be incompatible with what another needs. (3) Shared goal: all members are oriented toward the same outcome. Without a shared goal, agents optimise locally in ways that conflict at the system level.',
          },
          {
            id: 'wit-2',
            difficulty: 'intermediate',
            question: 'A product company wants to build an agent team to handle customer support escalations. Sketch the team structure: define the roles needed, what each role is responsible for, and one key dependency between roles.',
            hint: 'Think about triage, domain expertise, resolution, and follow-up.',
            solution: 'Roles: (1) Triage agent — reads the incoming ticket and routes it to the appropriate specialist. (2) Technical specialist agent — handles technical product issues. (3) Billing specialist agent — handles payment and subscription issues. (4) Resolution agent — drafts the final customer-facing response. Key dependency: the resolution agent cannot draft a response until the relevant specialist has produced a diagnosis or resolution recommendation. The triage agent\'s routing decision also determines which specialist is activated.',
          },
          {
            id: 'wit-3',
            difficulty: 'advanced',
            question: 'Under what conditions should you choose a team architecture over a simpler pipeline or a single orchestrator with multiple sub-agents? Identify at least three conditions and explain the reasoning behind each.',
            hint: 'Think about when lateral communication, adaptive coordination, and persistent roles become necessary.',
            solution: '(1) The task requires lateral communication between workers (not just top-down orchestration) — a pipeline cannot support this; a team can. (2) The task recurs frequently enough that maintaining persistent, specialised roles is more efficient than assembling sub-agents from scratch each time. (3) Different sub-problems require materially different expertise and context — a single orchestrator with generic sub-agents produces lower quality than specialists. (4) The overall task must adapt mid-execution based on intermediate findings — a fixed pipeline cannot update its routing; a team with a lead can re-assign work dynamically.',
          },
        ]}
      />
    </div>
  );
}
