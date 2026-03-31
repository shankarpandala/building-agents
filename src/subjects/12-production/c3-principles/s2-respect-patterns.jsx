import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function RespectPatterns() {
  return (
    <div className="prose-agents">
      <h2>Respect Existing Patterns</h2>
      <p>
        Every codebase, every organization, every workflow has accumulated patterns
        over time. These patterns may not be optimal in the abstract, but they
        represent shared understanding. When an agent ignores existing patterns
        and introduces its own conventions, it creates friction, confusion, and
        maintenance burden — even when the agent's approach is technically superior.
      </p>

      <ConceptBlock title="Convention Over Invention" number="Concept 12.10">
        An agent operating in an existing environment should observe and replicate
        the conventions already in use rather than introducing new ones. This applies
        to naming conventions, file organization, error handling styles, communication
        formats, and architectural patterns. The goal is consistency with the
        surrounding context, not theoretical perfection. A contribution that matches
        existing patterns is immediately understandable to everyone familiar with
        the system. A contribution that introduces a new pattern, however elegant,
        requires everyone to learn something new.
      </ConceptBlock>

      <AnalogyBlock title="The New Neighbor">
        Imagine moving into a neighborhood where every house has its mailbox on the
        left side of the driveway. You might prefer yours on the right. Yours might
        even be more convenient for the mail carrier on your specific route. But
        placing it on the right means every visitor, every delivery driver, every
        neighbor looks in the wrong place first. Consistency with the neighborhood
        serves everyone better than local optimization for yourself. An agent joining
        an existing codebase is the new neighbor.
      </AnalogyBlock>

      <p>
        Pattern detection is a critical agent skill. Before making changes, an
        effective agent examines the surrounding context: how are similar problems
        already solved here? What naming conventions are in use? What structure do
        existing files follow? The answers to these questions should constrain the
        agent's choices. The agent's job is to contribute work that looks like it
        belongs, not work that stands out as foreign.
      </p>

      <PrincipleBlock title="Match the Existing Voice" number="Principle 12.6">
        The best agent contributions are invisible — they blend seamlessly with
        the existing system. A reviewer should not be able to tell whether a change
        was made by the agent or by a long-time contributor. This requires the agent
        to suppress its own preferences in favor of the project's established style.
        Convention is a form of communication, and breaking it introduces noise.
      </PrincipleBlock>

      <NoteBlock title="When Patterns Are Genuinely Harmful" type="tip">
        Occasionally, existing patterns are actively harmful — they introduce security
        vulnerabilities, cause data loss, or violate important constraints. In these
        rare cases, the agent should still not silently break from the pattern.
        Instead, it should flag the concern and propose a migration, allowing the
        human to decide whether the disruption of changing the pattern is justified
        by the benefit.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'rp-1',
            difficulty: 'beginner',
            question: 'An agent is adding a new function to a file where all existing functions use descriptive, verbose names like "calculateMonthlyRevenue" and "validateUserPermissions." The agent prefers shorter names. What should it do?',
            hint: 'Think about what matters more: the agent\'s preference or the project\'s consistency.',
            solution: 'The agent should use the same verbose, descriptive naming style as the existing functions. The file has an established convention, and matching it ensures the new function is immediately recognizable as belonging to the same codebase. A short name in a sea of long names creates an inconsistency that every future reader must notice and reason about. The agent\'s naming preference is irrelevant — the project\'s convention is the constraint that matters.'
          },
          {
            id: 'rp-2',
            difficulty: 'intermediate',
            question: 'How should an agent detect existing patterns before making changes? What signals should it look for, and how many examples should it examine?',
            hint: 'Think about the different dimensions of convention in a project and how much evidence is needed to be confident in a pattern.',
            solution: 'The agent should examine: (1) Adjacent code — functions in the same file and files in the same directory to detect local conventions. (2) Similar features — how was a comparable task done elsewhere in the project? (3) Naming conventions — variable names, function names, file names, and whether they follow camelCase, snake_case, or another style. (4) Structural patterns — do similar files share a common structure (imports, then constants, then functions)? (5) Error handling — are errors thrown, returned, logged, or silently handled? At least three to five examples of the same pattern should be observed before treating it as a convention. A single example could be an anomaly; a repeated pattern is a convention.'
          },
          {
            id: 'rp-3',
            difficulty: 'advanced',
            question: 'A project has two conflicting patterns — older files use one convention and newer files use another, suggesting a migration was started but never completed. How should an agent decide which pattern to follow?',
            hint: 'Think about which direction the project is heading and who should decide the resolution.',
            solution: 'The agent should: (1) Identify the direction of change — if the newer files consistently use pattern B and older files use pattern A, the project appears to be migrating toward B. (2) Check for explicit guidance — configuration files, style guides, or documentation may state which pattern is current. (3) Look at the immediate neighborhood — if the file being modified is surrounded by pattern A files, match pattern A for local consistency, even if B is the future direction. (4) When uncertain, ask — describe both patterns to the user and ask which to follow. The agent should never unilaterally decide to accelerate a migration by converting old-pattern files. That is a separate decision with its own scope, risk, and review requirements.'
          }
        ]}
      />
    </div>
  );
}
