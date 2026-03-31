import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ToolRequirements() {
  return (
    <div className="prose-agents">
      <h2>Tool Requirements</h2>
      <p>
        A skill is only as capable as the tools available to it. A code review skill
        without file reading tools cannot review code. A deployment skill without
        access to the target environment cannot deploy. Declaring tool requirements
        upfront is how a skill communicates what it needs to function — and how the
        system verifies those needs are met before execution begins.
      </p>

      <ConceptBlock title="Tool Requirements" number="10.6">
        <p>
          Tool requirements are the explicit declaration of which tools a skill depends
          on to perform its work. A requirement specifies not just the tool name but the
          capabilities needed — read access versus write access, which endpoints or
          resources, and what permissions. Declaring requirements serves two purposes:
          it enables the runtime to verify availability before execution starts, and it
          documents the skill's capabilities and limitations for anyone evaluating whether
          to use it.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Recipe's Ingredient List">
        <p>
          A recipe lists ingredients before the instructions begin. This lets the cook
          check the pantry before starting — far better than discovering halfway through
          that a critical ingredient is missing. Tool requirements serve the same purpose
          for skills. They let the system check that everything is available before the
          skill starts running, avoiding partial execution that wastes time and may leave
          things in a broken state.
        </p>
      </AnalogyBlock>

      <p>
        Requirements should be declared at different levels of necessity. Some tools are
        essential — without them the skill cannot run at all. Others are optional — the
        skill can produce a reduced result without them. And some are conditional — needed
        only when certain parameters are set. This granularity prevents skills from being
        blocked by the absence of tools they would not have used anyway.
      </p>

      <PrincipleBlock title="Fail Before Starting, Not During Execution" number="10.4">
        <p>
          A skill that starts running and then fails because a required tool is missing
          has wasted time and possibly created side effects that must be cleaned up.
          Checking tool requirements before execution is a pre-flight check. It is
          always cheaper to discover a missing dependency before work begins than after
          work is partially complete.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Permissions are part of requirements" type="note">
        <p>
          A tool being present is not sufficient — the skill also needs appropriate
          permissions. A file system tool that exists but lacks write permission will
          cause a skill that needs to create files to fail mid-execution. Tool
          requirements should specify the permission level needed, not just the tool
          name. Pre-flight checks should verify both presence and access.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'tr-1',
            difficulty: 'beginner',
            question: 'A skill called "generate-changelog" reads git history, formats a changelog, and writes it to a file. What are its tool requirements? Classify each as essential, optional, or conditional.',
            hint: 'Walk through each step of the skill and identify what tool it needs.',
            solution: 'Essential: (1) Git history access — without it, the skill has no data to work from. (2) File write access — the final changelog must be written somewhere. Optional: (3) Issue tracker access — if available, the skill can enrich changelog entries with ticket numbers and descriptions; without it, the changelog is still useful but less detailed. Conditional: (4) Notification tool — needed only if the "notify_team" parameter is set to true. The skill should declare all four, categorized by necessity, so the runtime knows which missing tools are blockers and which are graceful degradations.'
          },
          {
            id: 'tr-2',
            difficulty: 'intermediate',
            question: 'A skill declares it requires a "database" tool but two different database tools are available — one for PostgreSQL and one for MongoDB. How should the requirement system handle this? What additional information should requirements specify?',
            hint: 'Think about whether "database" is specific enough as a requirement, and what happens when multiple tools match a generic requirement.',
            solution: 'The requirement "database" is too vague. Requirements should specify capability types rather than generic categories: "relational-database-query" or "document-store-read" rather than "database." When a skill declares a capability requirement, the runtime matches it against tools that advertise that capability. If multiple tools match, the resolution strategy should be: (1) check if the skill specifies a preference order, (2) check if the project configuration designates a default for that capability, (3) ask the user which to use. The requirement schema should include: capability type, minimum required operations (read, write, schema-modify), and optionally a preferred tool name for environments where the choice is known.'
          }
        ]}
      />
    </div>
  )
}
