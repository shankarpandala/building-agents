import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function SkillInvocation() {
  return (
    <div className="prose-agents">
      <h2>Skill Invocation</h2>
      <p>
        A skill that exists but cannot be easily triggered is a skill that will not be
        used. Invocation is the bridge between a user's intent and the execution of a
        complex workflow. The quality of the invocation interface determines whether a
        skill feels like a natural extension of conversation or an obscure command
        that requires a manual.
      </p>

      <ConceptBlock title="Skill Invocation" number="10.4">
        <p>
          Skill invocation is the mechanism by which a user or system triggers execution
          of a skill. Invocation methods range from explicit (slash commands like /review
          or /deploy) to implicit (the agent recognizes from natural language that a skill
          is relevant and invokes it automatically). The invocation layer is responsible
          for parsing the trigger, extracting parameters, validating that preconditions
          are met, and initiating execution.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Restaurant Order">
        <p>
          At a restaurant, you can order by pointing at the menu and saying "number 7"
          (explicit invocation) or by describing what you want — "something light, no
          gluten, with vegetables" — and letting the waiter recommend a dish (implicit
          invocation). Both get you food, but they require different levels of knowledge
          from the customer and different levels of interpretation from the waiter. Skill
          invocation works the same way: some users want the precision of a command, others
          want the flexibility of a description.
        </p>
      </AnalogyBlock>

      <p>
        The best invocation systems support both modes. Power users who know exactly
        what they want use slash commands for speed and precision. New users who know
        what they need but not what it is called describe their goal, and the agent
        matches it to the right skill. Supporting both modes requires the skill to
        have rich metadata — not just a name, but a description of what it does and
        when it is appropriate.
      </p>

      <PrincipleBlock title="Invocation Should Match User Intent, Not System Structure" number="10.2">
        <p>
          Users think in terms of goals: "review this PR," "set up the database," "check
          for security issues." They do not think in terms of skill registries or workflow
          graphs. The invocation interface should accept goal-oriented language and map it
          to the correct skill, even if the skill's internal name is technical. When
          invocation requires users to learn the system's vocabulary, adoption drops.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Disambiguation is part of invocation" type="note">
        <p>
          When a user's request could match multiple skills, the agent must disambiguate —
          either by asking a clarifying question or by using context to select the most
          likely match. Silent disambiguation (picking one without telling the user) is
          risky because a wrong guess wastes the user's time. Transparent disambiguation
          ("I found two skills that match — did you mean X or Y?") builds trust.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'si-1',
            difficulty: 'beginner',
            question: 'A developer types "check my code for problems" to an agent that has skills for linting, security scanning, and test coverage analysis. How should the agent decide which skill to invoke? What if the answer is "all of them"?',
            hint: 'Consider whether the request is ambiguous or whether it implies a broad intent that multiple skills serve.',
            solution: 'The request "check my code for problems" is broad enough to encompass all three skills. The agent should recognize this as a composite intent and either: (a) invoke all three in sequence, presenting results from each, or (b) ask "I can check for lint issues, security vulnerabilities, and test coverage gaps — would you like all three or a specific one?" Option (a) is better for experienced users who expect comprehensive results. Option (b) is better when resources are limited or the user might want a quick check rather than a full analysis. The agent should use context (e.g., is this a quick chat or a pre-commit review?) to decide which approach to take.'
          },
          {
            id: 'si-2',
            difficulty: 'intermediate',
            question: 'Design the metadata schema for a skill that enables both slash command invocation and natural language matching. What fields are required, and how would a matching algorithm use them?',
            hint: 'Think about what a text similarity search needs versus what a command parser needs.',
            solution: 'Required metadata fields: (1) name: the slash command identifier (e.g., "review-pr"), (2) aliases: alternative slash commands (e.g., "pr-review", "code-review"), (3) description: a natural language sentence explaining what the skill does, (4) trigger_phrases: example natural language requests that should activate this skill (e.g., "review this pull request", "check my PR", "look at these changes"), (5) parameters: the inputs the skill accepts with types and descriptions, (6) preconditions: what must be true for this skill to be applicable (e.g., "must be in a git repository with an open PR"). A matching algorithm uses name and aliases for exact slash command matching, and uses description and trigger_phrases for semantic similarity matching against natural language input. Preconditions are checked after matching to confirm the skill is applicable in the current context.'
          }
        ]}
      />
    </div>
  )
}
