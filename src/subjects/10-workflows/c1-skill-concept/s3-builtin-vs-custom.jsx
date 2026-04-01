import ConceptBlock from '../../../components/content/ConceptBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function BuiltinVsCustom() {
  return (
    <div className="prose-agents">
      <h2>Built-in vs. Custom Skills</h2>
      <p>
        Some skills come with an agent platform — general-purpose capabilities like web search,
        code execution, or document retrieval that apply across many domains. Others must be
        built for a specific organization, process, or dataset. Understanding the difference
        between built-in and custom skills, and knowing when each is appropriate, is a
        foundational skill design decision.
      </p>

      <ConceptBlock title="Built-in Skills" number="10.3">
        <p>
          Built-in skills are general-purpose capabilities provided by the agent platform that
          work across domains without customization. They handle common patterns — searching,
          summarizing, executing computations — that appear in many different workflows.
          Built-in skills are immediately available, well-tested, and maintained by the platform.
          They are the right starting point before building anything custom.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Custom Skills" number="10.4">
        <p>
          Custom skills encode domain-specific procedures, organizational conventions, or
          proprietary data access patterns that no general platform can anticipate. They are
          built by the team deploying the agent and reflect deep knowledge of a specific
          context. Custom skills are necessary when the task requires judgment, data access,
          or procedures that are unique to the organization.
        </p>
      </ConceptBlock>

      <NoteBlock title="Prefer built-in before custom" type="tip">
        <p>
          Every custom skill is an ongoing maintenance commitment. Before building a custom
          skill, check whether a built-in skill handles 80% of the use case. Adapting the
          task to fit a built-in skill is often faster and more reliable than building a
          purpose-specific custom one. Build custom only when the fit is genuinely poor.
        </p>
      </NoteBlock>

      <WarningBlock title="Custom skills become stale">
        <p>
          Unlike built-in skills maintained by a platform team, custom skills are maintained
          by the team that built them. When the underlying process, data schema, or tool
          changes, the custom skill must be updated. Teams that build many custom skills without
          a maintenance plan find themselves with a growing inventory of skills that no longer
          work as described.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex10-3-1',
            difficulty: 'beginner',
            question: 'A team wants to build an agent that answers questions about company policy documents. Should they build a custom skill for this, or can a built-in skill handle it? What factors determine the answer?',
            hint: 'Consider whether the task requires access to proprietary content, specialized retrieval logic, or just general document Q&A behavior.',
            solution: 'It depends on the retrieval and access requirements. If the policy documents are accessible as public files and the questions are straightforward factual queries, a built-in document Q&A skill may handle it. If the documents are stored in a proprietary internal system, require specific access credentials, are structured in a non-standard format, or if the "correct" answers reflect organizational interpretations rather than literal text, a custom skill is warranted. The deciding factors are: data access (proprietary vs. accessible), content complexity (standard vs. specialized), and answer expectations (literal retrieval vs. interpreted). Most enterprise policy Q&A systems require at least some custom work.'
          },
          {
            id: 'ex10-3-2',
            difficulty: 'intermediate',
            question: 'A built-in summarization skill produces summaries in a generic format. The organization needs summaries in their specific template: three bullet points, a risk flag, and a recommended next action. Should they modify the built-in skill or build a custom one? What are the tradeoffs?',
            hint: 'Consider whether the platform allows configuration of built-in skills, or whether "modification" means building on top of the built-in.',
            solution: 'If the platform allows configuration of output format (e.g., a template parameter), configure the built-in skill — this is the lowest effort path. If configuration is not available, the right approach is to wrap the built-in skill in a thin custom layer: call the built-in summarization skill, then pass its output through a formatting step that produces the required structure. This is not "modifying" the built-in but composing with it. Building a fully custom summarization skill from scratch wastes effort and loses the quality improvements the platform team applies to the built-in. The principle is: reuse the expensive part (the summarization intelligence), customize only the cheap part (the output format).'
          },
          {
            id: 'ex10-3-3',
            difficulty: 'advanced',
            question: 'Design a decision framework for when to build a custom skill versus adapting a built-in. Your framework should consider at least four dimensions and produce a clear recommendation.',
            hint: 'Think about data access, task specificity, maintenance cost, and the quality gap between built-in and custom.',
            solution: 'Four-dimension framework: (1) Data access: does the task require proprietary, internal, or non-public data? If yes, custom skill required — built-ins cannot access data they are not given. (2) Process specificity: does the task encode organizational conventions, legal requirements, or institutional judgment that differs from general best practice? If yes, custom. (3) Quality gap: if you tried a built-in skill, how close was the output to what is needed? If within minor formatting adjustments, prefer built-in + wrapper. If fundamentally different in substance, custom. (4) Maintenance capacity: does the team have ongoing capacity to maintain the skill as the underlying data, process, or tools evolve? If no, prefer a simpler built-in solution even if it is a worse fit. Recommendation rule: use custom only if at least two of these dimensions require it AND maintenance capacity exists. Otherwise, adapt to built-in.'
          }
        ]}
      />
    </div>
  )
}
