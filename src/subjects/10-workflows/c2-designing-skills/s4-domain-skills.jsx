import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function DomainSkills() {
  return (
    <div className="prose-agents">
      <h2>Skills for Common Domains</h2>
      <p>
        Certain agent tasks appear in nearly every software development context:
        debugging a failure, reviewing code changes, refactoring for clarity, generating
        documentation. These recurring patterns are natural candidates for pre-built
        skills. Understanding what makes a good domain skill — and what pitfalls to
        avoid — helps teams build skill libraries that deliver consistent value.
      </p>

      <ConceptBlock title="Domain Skill" number="10.8">
        <p>
          A domain skill is a reusable workflow designed for a specific, recurring task
          within a professional domain. In software development, common domain skills
          include code review, debugging, refactoring, documentation generation, and
          dependency analysis. A well-designed domain skill encodes expert-level
          knowledge about how the task should be performed — not just the steps, but
          the judgment calls, the common pitfalls, and the quality standards that
          distinguish excellent work from adequate work.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Specialist's Checklist">
        <p>
          When an experienced surgeon performs an operation, they follow a checklist — not
          because they have forgotten the steps, but because checklists ensure consistency
          and catch oversights even when expertise is present. Domain skills serve the same
          purpose for agent workflows: they encode the expert's checklist so that the
          quality of execution does not depend on whether the agent happens to remember
          every consideration. The skill carries the expertise.
        </p>
      </AnalogyBlock>

      <p>
        The most valuable domain skills are those that encode judgment, not just procedure.
        Any agent can be told to "read the file and list problems." A good code review
        skill knows to check for security implications, to consider the context of the
        change relative to the broader system, to distinguish style preferences from
        genuine issues, and to prioritize feedback by impact.
      </p>

      <PrincipleBlock title="Encode the Expert's Priorities, Not Just Their Steps" number="10.6">
        <p>
          The difference between a novice and an expert performing the same task is not
          the steps they follow — it is what they pay attention to, what they weigh
          heavily, and what they choose to ignore. A domain skill should capture these
          priorities explicitly. A debugging skill should encode that reproducing the
          issue comes before hypothesizing causes. A review skill should encode that
          correctness matters more than style.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Domain skills need domain updates" type="note">
        <p>
          Development practices evolve. Security standards change. New patterns emerge
          and old patterns become anti-patterns. A domain skill that was excellent when
          written can become misleading if it is not updated as the domain evolves.
          Build a review cadence into your skill library — revisit domain skills
          periodically to ensure they reflect current best practices.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ds-1',
            difficulty: 'beginner',
            question: 'List five pieces of expert judgment that a code review domain skill should encode beyond "read the code and find bugs." For each, explain why a generic agent would miss it without the skill.',
            hint: 'Think about what separates a senior developer\'s code review from a junior developer\'s.',
            solution: '(1) Check for security implications — a generic agent may find logic errors but miss that a change exposes user data. (2) Evaluate the change in context — does this modification interact poorly with code outside the diff? A generic agent reviews only what it sees. (3) Distinguish blocking issues from suggestions — not all feedback is equally important. Without this judgment, the review buries critical issues among style nits. (4) Consider testability — does this change make the code harder to test? A generic agent may approve code that works but is untestable. (5) Assess naming and abstraction quality — are the names and boundaries chosen ones that will make sense to the next developer? A generic agent checks syntax, not whether the code communicates its intent clearly.'
          },
          {
            id: 'ds-2',
            difficulty: 'intermediate',
            question: 'Design the structure of a debugging domain skill. What phases should it include, what should the skill do in each phase, and how should it handle the case where the first hypothesis is wrong?',
            hint: 'Think about the systematic debugging process: reproduce, hypothesize, test, conclude.',
            solution: 'Phases: (1) Reproduce — the skill first confirms it can observe the reported failure. If it cannot reproduce, it stops and reports this rather than guessing. (2) Gather context — collect error messages, recent changes, relevant logs, and system state. (3) Hypothesize — based on context, generate ranked hypotheses (most likely cause first). (4) Test — for each hypothesis starting with the most likely, identify a specific check that would confirm or refute it. Execute the check. (5) Iterate — if the hypothesis is refuted, move to the next one. If all initial hypotheses fail, broaden the investigation scope and generate new hypotheses. (6) Conclude — when a hypothesis is confirmed, document the root cause, the evidence, and a recommended fix. The key design choice is making the skill iterative — it must not commit to its first guess but systematically work through possibilities.'
          },
          {
            id: 'ds-3',
            difficulty: 'advanced',
            question: 'A team wants to build a refactoring domain skill. The challenge is that "good refactoring" is highly context-dependent — what improves one codebase may harm another. How do you design a refactoring skill that adapts to different codebase conventions without requiring a separate skill for each project?',
            hint: 'Think about how the skill can learn the conventions of a codebase from the codebase itself.',
            solution: 'Design a two-phase refactoring skill. Phase 1 (Convention Discovery): before suggesting any changes, the skill examines the existing codebase to infer conventions — naming patterns, module structure, abstraction style, test organization, and comment density. It builds a "convention profile" from what it observes. Phase 2 (Convention-Aligned Refactoring): the skill applies refactoring improvements that align with the discovered conventions rather than imposing external standards. For example, if the codebase uses long descriptive function names, the skill does not introduce short abbreviated ones. The convention profile is parameterizable — teams can override inferred conventions where the codebase is inconsistent and they want to converge on a specific style. This approach adapts to any project without project-specific skill variants because the conventions come from the code, not the skill definition.'
          }
        ]}
      />
    </div>
  )
}
