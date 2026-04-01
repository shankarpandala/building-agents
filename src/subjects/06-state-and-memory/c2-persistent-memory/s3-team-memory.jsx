import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function TeamMemorySection() {
  return (
    <div className="prose-agents">
      <p>
        Organizations accumulate knowledge that belongs to neither a single user nor
        a specific project, but to the team or organization as a whole. Team memory is
        the persistent store of this shared, organizational knowledge — conventions,
        decisions, patterns, and policies that apply across all projects and users.
      </p>

      <ConceptBlock title="Team Memory" number="Concept 6.7">
        Team memory is a persistent, organization-scoped knowledge store that contains
        information relevant to how the team works, what it has learned, and what
        conventions it follows. It includes: established workflows and processes,
        recurring decisions and their justifications, domain expertise accumulated
        over time, and institutional knowledge that would otherwise live only in
        individuals' heads.
      </ConceptBlock>

      <AnalogyBlock title="The Organizational Brain">
        When a senior employee with deep institutional knowledge leaves a company,
        they take knowledge with them that took years to build. Teams that document
        decisions, processes, and lessons learned retain that knowledge even through
        personnel changes. Team memory is the agent-accessible version of that
        organizational brain — a living repository that grows with every session and
        is available to every agent working with the team.
      </AnalogyBlock>

      <p>
        Team memory differs from project memory in scope and lifespan. Project memory
        is temporary — it ends with the project. Team memory is ongoing — it persists
        indefinitely and applies broadly. It also differs from user memory in that it
        represents shared conventions rather than individual preferences. When team
        memory and user memory conflict, the resolution depends on whether the team's
        convention is a policy or a default.
      </p>

      <NoteBlock type="note" title="Memory Governance">
        Team memory requires governance — a process for deciding what gets added,
        who can update it, and when entries expire or are reviewed. Without governance,
        team memory accumulates outdated conventions that the agent applies confidently
        to situations they no longer fit.
      </NoteBlock>

      <ExerciseBlock
        title="Team Memory Practice"
        exercises={[
          {
            id: 'e6-7-1',
            difficulty: 'beginner',
            question: 'Give three examples of knowledge that belongs in team memory versus project memory versus user memory for a software development team.',
            hint: 'Think about scope: team-wide, project-specific, and individual.',
            solution: 'Team memory: coding style guide, deployment process, incident response runbook. Project memory: this project\'s architecture decisions, the chosen database schema, open issues. User memory: a developer\'s preferred IDE, their timezone, their expertise level in specific languages.',
          },
          {
            id: 'e6-7-2',
            difficulty: 'intermediate',
            question: 'An agent is helping a new team member and draws on team memory to explain a process. The team member says "that\'s outdated — we stopped doing it that way six months ago." What should happen next?',
            hint: 'Consider both the immediate response and the memory update.',
            solution: 'Immediately: the agent should acknowledge the correction and update its working understanding for this session. Memory update: the agent should offer to update the team memory entry with the current process, flag the update for review by a team lead, or create a pending update that requires confirmation before committing. The old entry should be archived, not deleted, so the historical record is preserved.',
          },
          {
            id: 'e6-7-3',
            difficulty: 'advanced',
            question: 'Design an access control model for team memory in an organization with multiple sub-teams. Which memory entries are visible to all, which are scoped to sub-teams, and how do you handle cross-team conflicts?',
            hint: 'Think about hierarchy, inheritance, and override rules.',
            solution: 'Three tiers: (1) Organization-wide: all agents and teams can read; only designated admins can write. (2) Team-scoped: all members of the team can read and write; other teams cannot read by default unless marked shared. (3) Sub-team scoped: same as team-scoped but narrower. For conflicts: organization-wide entries take precedence over team entries for policies. Team entries take precedence for team-specific conventions. Conflicts between peer teams are flagged for human resolution rather than silently resolved.',
          },
        ]}
      />
    </div>
  );
}
