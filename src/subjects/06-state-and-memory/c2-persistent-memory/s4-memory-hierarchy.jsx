import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function MemoryHierarchySection() {
  return (
    <div className="prose-agents">
      <p>
        User memory, project memory, and team memory do not exist in isolation — they
        interact, overlap, and sometimes conflict. The memory hierarchy defines how
        these stores relate to each other and how the agent resolves conflicts between
        them.
      </p>

      <ConceptBlock title="Memory Hierarchy" number="Concept 6.8">
        The memory hierarchy is the structured relationship between different memory
        scopes. In most systems it has three levels: <strong>organizational/team
        memory</strong> (broadest scope, slowest to change, highest authority for
        policies), <strong>project memory</strong> (task-specific, medium scope),
        and <strong>user memory</strong> (narrowest scope, highest specificity for
        individual preferences). Each level can override the level above it for
        preferences, but not for policies.
      </ConceptBlock>

      <p>
        The hierarchy governs retrieval priority as well as conflict resolution. When
        assembling the context for a session, memory is typically retrieved from all
        levels and combined. The agent must know which level each piece of information
        comes from so it can apply the right precedence rules when pieces conflict.
      </p>

      <PrincipleBlock title="Policies Override, Preferences Yield" number="Principle 6.4">
        Distinguish between policy entries (mandatory rules that apply regardless of
        individual or project preference) and default entries (starting points that
        can be overridden). User preferences can override team defaults but cannot
        override team policies. This distinction should be explicit in the memory schema,
        not left to inference.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Hierarchy Transparency">
        When an agent's behavior is governed by team memory rather than the current
        conversation, it helps to briefly surface this: "I'm following our team's
        standard process here — we always do X before Y." This gives users visibility
        into why the agent is behaving as it is and an opportunity to challenge or
        override if appropriate.
      </NoteBlock>

      <ExerciseBlock
        title="Memory Hierarchy Practice"
        exercises={[
          {
            id: 'e6-8-1',
            difficulty: 'beginner',
            question: 'A user prefers responses in bullet points. The project specifies that all deliverables should be in prose format. The organization has no policy on format. Which preference takes precedence for (a) a conversational response and (b) a formal project deliverable?',
            hint: 'Distinguish between conversational style and deliverable format.',
            solution: '(a) Conversational response: user preference takes precedence — the user is talking to the agent informally, and bullet points serve them better. (b) Formal deliverable: project scope takes precedence — the deliverable is a project artifact, not a personal message, and the project format standard applies.',
          },
          {
            id: 'e6-8-2',
            difficulty: 'intermediate',
            question: 'An agent retrieves conflicting information from two levels of the memory hierarchy: team memory says to always CC the manager on external emails, but user memory says this particular user has an exemption. How should the agent handle this?',
            hint: 'Determine whether the team entry is a policy or a default.',
            solution: 'If the team memory entry is a policy: the user cannot override it, and the agent should apply it. The exemption claim should be flagged for human review. If the team memory entry is a default: the user-level exemption overrides it and the agent proceeds without CC. The distinction requires the memory schema to explicitly label entries as policy or default. When unlabeled, the agent should ask or escalate rather than guess.',
          },
          {
            id: 'e6-8-3',
            difficulty: 'advanced',
            question: 'Design a memory assembly strategy for a session where all three memory levels contribute relevant content. How do you avoid context window bloat while ensuring all critical information is present?',
            hint: 'Think about selective retrieval, priority filtering, and compression by level.',
            solution: 'Assembly strategy: (1) Always inject the current state summaries from all three levels (kept small, max 500 tokens each). (2) Use semantic retrieval from each level to fetch only entries relevant to the current session topic. (3) Apply deduplication — if team and project memory say the same thing, keep the more specific (project) version. (4) Label each retrieved entry with its source level so conflict resolution is transparent. (5) Allocate a fixed token budget per level: team 10%, project 20%, user 15%, leaving 55% for conversation and tools.',
          },
        ]}
      />
    </div>
  );
}
