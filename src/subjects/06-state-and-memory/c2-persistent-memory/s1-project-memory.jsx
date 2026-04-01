import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ProjectMemorySection() {
  return (
    <div className="prose-agents">
      <p>
        Some knowledge belongs to a specific project — a shared context that all
        conversations about that project should have access to, regardless of which
        session is asking. Project memory is the persistent repository for this
        shared, task-scoped knowledge.
      </p>

      <ConceptBlock title="Project Memory" number="Concept 6.5">
        Project memory is a store of persistent facts, decisions, and context scoped
        to a specific project or task. It accumulates across sessions and is available
        to any agent or session working on that project. It captures what has been
        decided, what is in scope, what constraints apply, and what progress has been
        made — so future sessions do not start from zero.
      </ConceptBlock>

      <AnalogyBlock title="The Project Wiki">
        A software project's internal wiki holds decisions, architecture notes, and
        conventions accumulated over months of work. Every new developer reads it
        to get up to speed. An agent working on the same project should have access
        to the same shared knowledge — not stored in any single conversation's history,
        but in a durable project-scoped store that any session can read and update.
      </AnalogyBlock>

      <p>
        Project memory typically contains: the project's stated goal and success
        criteria, major decisions and their rationale, known constraints and limitations,
        completed milestones, open questions, and a log of significant actions taken
        by agents. The structure should be queryable — it grows too large to inject
        in full into every context window, so retrieval must be selective.
      </p>

      <NoteBlock type="tip" title="Decisions Over Discussions">
        Project memory is most valuable when it captures decisions and their rationale,
        not the full discussion that led to them. Storing summaries of debates wastes
        space. Storing "we decided X because of Y" enables any future session to
        understand and respect the decision without replaying the reasoning.
      </NoteBlock>

      <ExerciseBlock
        title="Project Memory Practice"
        exercises={[
          {
            id: 'e6-5-1',
            difficulty: 'beginner',
            question: 'A coding agent has been working on a web application across ten sessions. List five categories of information that should be in project memory to help future sessions continue effectively.',
            hint: 'Think about what a new team member joining the project would need to know.',
            solution: '(1) Tech stack and key architectural decisions with rationale. (2) Completed features and current status. (3) Known bugs and their triage status. (4) Coding conventions and style decisions specific to the project. (5) Outstanding tasks with priority and any blocking dependencies.',
          },
          {
            id: 'e6-5-2',
            difficulty: 'intermediate',
            question: 'Two agents are working on the same project in parallel. Agent A updates the project memory with a new decision at the same time Agent B reads it. What consistency problem can arise, and how should the memory store handle it?',
            hint: 'Think about concurrent reads and writes to a shared store.',
            solution: 'Agent B may read a stale version and make decisions inconsistent with Agent A\'s update. The memory store should use versioning or optimistic locking: each write includes the version it is based on, and a conflict is raised if the version has changed since the last read. Conflicts should surface to human oversight rather than being silently overwritten.',
          },
          {
            id: 'e6-5-3',
            difficulty: 'advanced',
            question: 'A project spans 18 months and the project memory has grown to 500,000 tokens. Describe a strategy for keeping the memory queryable and cost-effective as it scales.',
            hint: 'Consider indexing, tiered storage, and semantic retrieval.',
            solution: 'Archive old decisions into a vector index searchable by semantic similarity. Maintain a "current state" summary of at most 5,000 tokens that is always injected in full. Retrieval is two-stage: the current state summary is always present; on-demand retrieval fetches specific historical records by semantic query. Entries older than a defined threshold are compressed into category summaries. A project timeline remains uncompressed to preserve chronological navigation.',
          },
        ]}
      />
    </div>
  );
}
