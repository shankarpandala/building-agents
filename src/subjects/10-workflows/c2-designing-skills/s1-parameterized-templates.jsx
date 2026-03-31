import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ParameterizedTemplates() {
  return (
    <div className="prose-agents">
      <h2>Parameterized Templates</h2>
      <p>
        A skill that works for exactly one situation is not reusable — it is a script.
        True reusability comes from parameterization: designing skills with variable
        slots that adapt their behavior to the specific context they are invoked in.
        Parameters transform a rigid procedure into a flexible template.
      </p>

      <ConceptBlock title="Parameterized Template" number="10.5">
        <p>
          A parameterized template is a skill definition that contains variable slots —
          placeholders for values that are filled in at invocation time. Parameters might
          include the target file, the review standard to apply, the output format, or
          the severity threshold. The template defines the structure of the workflow; the
          parameters customize it for a specific use. Well-parameterized skills are
          written once and used in many contexts.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Mad Libs Approach">
        <p>
          A Mad Libs game has a fixed story structure with blanks for nouns, verbs, and
          adjectives. The structure stays the same, but filling in different words produces
          wildly different stories. A parameterized skill template works the same way: the
          workflow logic is the fixed structure, and the parameters are the blanks. "Review
          [file] for [standard] and report issues above [severity]" is one template that
          handles hundreds of specific review scenarios.
        </p>
      </AnalogyBlock>

      <p>
        The art of parameterization is choosing the right level of abstraction. Too few
        parameters and the skill is rigid — it works only in narrow conditions. Too many
        parameters and the skill becomes confusing — users must specify so many values
        that invoking the skill is as complex as doing the task manually.
      </p>

      <PrincipleBlock title="Parameterize the What, Not the How" number="10.3">
        <p>
          Parameters should let users specify what they want done, not how to do it.
          Good parameters: target file, output format, quality standard. Bad parameters:
          which internal step to skip, what prompt to use at step three, how many retries
          to attempt. When parameters expose internal mechanics, the skill's implementation
          cannot change without breaking every caller. Keep the interface about intent and
          the implementation about execution.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Unvalidated parameters cause silent failures">
        <p>
          A parameter that accepts any value without validation is a trap. If a severity
          threshold expects a number between 1 and 5 but receives "high," the skill may
          silently produce wrong results rather than failing clearly. Every parameter
          needs a type, a validation rule, and a clear error message when the value is
          invalid. Fail loudly at invocation time rather than silently during execution.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'pt-1',
            difficulty: 'beginner',
            question: 'A team has a skill that reviews Python files for PEP 8 compliance. They want to reuse it for JavaScript files with ESLint rules. What parameters would make this a single, reusable skill instead of two separate ones?',
            hint: 'Identify what differs between the two use cases and make those the parameters.',
            solution: 'The reusable skill needs at minimum three parameters: (1) target_language — "python" or "javascript" — which determines the file types to scan, (2) style_standard — "pep8" or "eslint" — which determines the rules to apply, and (3) target_path — the file or directory to review. The workflow structure (scan files, apply rules, report violations) is identical; only the inputs change. Optionally, a severity_filter parameter lets users control whether to see all issues or only errors. This single parameterized skill replaces two hard-coded ones and can extend to any language by adding new standard options.'
          },
          {
            id: 'pt-2',
            difficulty: 'intermediate',
            question: 'A skill template has 12 parameters. Users complain it is too complex to use. How do you reduce the cognitive load without removing flexibility?',
            hint: 'Think about which parameters most users leave at their default value.',
            solution: 'Apply a layered parameter strategy. (1) Identify the 2-3 parameters that vary in every invocation (e.g., target file, output format) — these are required. (2) Set sensible defaults for the remaining 9-10 parameters based on the most common use case. (3) Group the optional parameters into logical categories (e.g., "formatting options," "filter options") so that users who need them can find them, but users who do not can ignore them. The result: most invocations specify only 2-3 values, power users can override any default, and the skill retains full flexibility. The key insight is that good defaults are a form of design — they encode your understanding of the most common use case.'
          },
          {
            id: 'pt-3',
            difficulty: 'advanced',
            question: 'Design a parameter inference system where the skill automatically determines parameter values from context when the user does not provide them. What context sources would you use, what are the risks, and how do you handle uncertainty?',
            hint: 'Think about what the current environment, recent conversation, and file system can tell you about likely parameter values.',
            solution: 'Context sources for inference: (1) Current working directory and file types present — infer target_language. (2) Project configuration files (e.g., linter configs) — infer style_standard. (3) Recent conversation history — infer intent and scope. (4) Git status — infer which files were recently changed and are likely targets. Risks: (a) incorrect inference leads to the skill operating on wrong files or with wrong settings, (b) users may not realize values were inferred and may not check them. Mitigation: always display inferred values before execution ("I\'ll review src/main.py using PEP 8 — proceed?"). Allow users to correct any inference. Never infer destructive parameters (e.g., "delete after review") — require those explicitly. Treat inference as a suggestion, not a decision.'
          }
        ]}
      />
    </div>
  )
}
