import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Teammates() {
  return (
    <div className="prose-agents">
      <h2>Teammates: Roles and Responsibilities</h2>
      <p>
        In an agent team, teammates are the specialists who perform the actual domain work.
        Each teammate is designed for a specific class of tasks, has a prompt tuned to that
        domain, and is equipped with tools relevant to its role. Teammates are not interchangeable —
        their value comes precisely from being different from each other and from the team lead.
      </p>

      <ConceptBlock title="Teammate Agents" number="Concept 8.3">
        Teammate agents are specialised agents in a team that execute assigned sub-tasks within
        their domain. Each teammate has a defined role (what kind of work it does), a capability
        set (what tools it can use), and a communication contract (how it reports results and
        raises blockers). Teammates receive work from the team lead, execute it independently,
        and return structured results. They do not direct the team's overall strategy.
      </ConceptBlock>

      <p>
        The depth of a teammate's specialisation is a design choice with trade-offs. Highly
        specialised teammates produce excellent output in their domain but are useless outside
        it. More generalist teammates can handle a wider range of tasks but may not match the
        quality of a true specialist. Most real teams benefit from a spectrum: a few deep
        specialists for the most critical domains and one or two generalists for tasks that
        don't fit neatly into a specialist's scope.
      </p>

      <AnalogyBlock title="The Jazz Ensemble">
        Each musician in a jazz ensemble has a primary instrument and role. The bassist lays
        the harmonic foundation; the drummer keeps time; the soloist explores melodies. They
        are specialists in their roles. But they also listen to each other, respond to what
        others are playing, and adapt in real time. Specialisation does not mean isolation.
        Good teammates stay aware of the broader team context even while focused on their
        own part.
      </AnalogyBlock>

      <NoteBlock type="tip" title="Designing Teammate Interfaces">
        A teammate's interface — the format of what it accepts and what it returns — is as
        important as the work it does internally. Design teammate interfaces to be simple,
        structured, and consistent. The team lead shouldn't need to parse prose outputs or
        infer missing fields. Each teammate should produce results in a form the lead can
        act on without interpretation.
      </NoteBlock>

      <ExerciseBlock
        title="Designing Effective Teammates"
        exercises={[
          {
            id: 'tm-1',
            difficulty: 'beginner',
            question: 'For a team tasked with producing a due diligence report on a startup, identify three distinct specialist teammates you would include. For each, state the role, one key tool they need, and the format of their output.',
            hint: 'Think about financial, legal, and market angles separately.',
            solution: '(1) Financial analyst teammate: reviews financial statements and metrics. Tool: spreadsheet or data parsing tool. Output: JSON with key metrics (revenue growth, burn rate, runway). (2) Legal compliance teammate: checks for regulatory issues and pending litigation. Tool: legal database search. Output: structured list of identified risks with severity ratings. (3) Market researcher teammate: assesses market size and competitive landscape. Tool: web search and company database. Output: narrative summary with three key market findings and source citations.',
          },
          {
            id: 'tm-2',
            difficulty: 'intermediate',
            question: 'A teammate receives a brief it cannot complete — the data source it needs is unavailable. Describe the correct protocol for the teammate to follow. What should it communicate, to whom, and in what format?',
            hint: 'Think about the difference between a failure and a blocker, and how the team lead uses this information.',
            solution: 'The teammate should immediately report a blocker (not a failure) to the team lead. Blocker report format: { status: "blocked", task_id: "...", reason: "Data source unavailable", source_name: "...", suggested_alternatives: [...], estimated_delay: "unknown" }. It should not attempt to guess or fabricate data. The team lead can then decide whether to reassign the task, substitute an alternative source, or revise the plan. Reporting quickly and clearly — before wasting cycles on workarounds — is the correct protocol.',
          },
          {
            id: 'tm-3',
            difficulty: 'advanced',
            question: 'Two teammates discover they need the same piece of information to complete their respective tasks. Neither has a tool to fetch it, and both are mid-task. How should this be handled, and what does this situation reveal about a gap in the team\'s design?',
            hint: 'Think about shared dependencies and where they should be resolved in the team architecture.',
            solution: 'Immediate handling: both teammates report the dependency to the team lead, which fetches or delegates the retrieval to a utility teammate and passes the result to both. The gap revealed: the team\'s briefing process failed to identify a shared dependency and pre-resolve it before dispatching the main tasks. In a well-designed team, the lead should map all task dependencies during planning and resolve shared inputs upfront — before any teammate that requires them is dispatched. Shared dependencies are the team lead\'s responsibility to surface, not the teammates\'.',
          },
        ]}
      />
    </div>
  );
}
