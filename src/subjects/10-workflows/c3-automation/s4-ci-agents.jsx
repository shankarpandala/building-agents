import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function CIAgents() {
  return (
    <div className="prose-agents">
      <h2>Agents in Continuous Integration</h2>
      <p>
        Continuous integration pipelines are where code changes meet quality gates.
        Traditionally these gates are static: run tests, check linting, measure
        coverage. Agents add a dynamic, intelligent layer — they can review changes
        contextually, triage failures, suggest fixes, and make nuanced decisions that
        static checks cannot. Integrating agents into CI transforms pipelines from
        pass/fail gatekeepers into collaborative participants in the development process.
      </p>

      <ConceptBlock title="CI Agent" number="10.12">
        <p>
          A CI agent is an agent that participates in a continuous integration pipeline
          as a first-class step. Unlike static checks that apply fixed rules, a CI agent
          can interpret context: it understands what the change intends to accomplish,
          evaluates whether the implementation achieves that intent, and provides feedback
          that goes beyond "pass" or "fail." CI agents operate within the constraints of
          the pipeline — they must complete within time limits, produce structured output
          that the pipeline can act on, and handle failures gracefully.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Building Inspector vs. The Architect">
        <p>
          A traditional CI check is like a building inspector with a checklist: does this
          meet code? Is the wiring correct? Pass or fail. A CI agent is more like having
          the architect visit the construction site — they check the code requirements too,
          but they also assess whether the design intent is being realized, whether the
          construction approach will cause problems later, and whether there is a better
          way to achieve the same goal. Both are valuable; the agent adds the layer of
          judgment that checklists cannot capture.
        </p>
      </AnalogyBlock>

      <p>
        The critical constraint for CI agents is that they operate in a pipeline with
        strict expectations about time, output format, and reliability. A CI step that
        sometimes takes five minutes and sometimes takes fifty minutes makes the pipeline
        unpredictable. A CI agent that produces brilliant analysis but in a format the
        pipeline cannot parse is useless to automation.
      </p>

      <PrincipleBlock title="CI Agents Must Be Deterministic in Behavior, Not Just Output" number="10.10">
        <p>
          A CI agent's output may vary — different changes warrant different feedback. But
          its behavior must be predictable: it always completes within a time bound, always
          produces structured output in the expected format, always exits with a meaningful
          status code, and never silently fails. Developers build trust with CI agents by
          experiencing consistent behavior, even when the content of feedback varies.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Start with advisory, not blocking" type="tip">
        <p>
          When introducing a CI agent, configure it as advisory — it posts comments and
          suggestions but does not block the pipeline. This lets the team calibrate the
          agent's judgment before giving it veto power. Only promote a CI agent to a
          blocking check after the team has verified that its assessments are consistently
          trustworthy and its false positive rate is acceptably low.
        </p>
      </NoteBlock>

      <WarningBlock title="Flaky agents destroy pipeline trust">
        <p>
          If a CI agent intermittently fails due to timeouts, rate limits, or nondeterministic
          behavior, developers will learn to ignore it — or worse, to re-run the pipeline
          until it passes. A flaky agent is worse than no agent because it trains the team
          to distrust automated feedback. If an agent cannot be made reliable, remove it
          from the pipeline until it can.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ci-1',
            difficulty: 'beginner',
            question: 'A team adds a CI agent that reviews every pull request for potential issues. In the first week, it flags 40 issues across 10 PRs, but only 12 are genuine problems — the rest are false positives. What is the impact on the team, and what should they do?',
            hint: 'Think about how developers respond to tools that are wrong most of the time.',
            solution: 'With a 70% false positive rate, developers will quickly learn to dismiss the agent\'s feedback without reading it — even the 30% that are genuine problems. This is the "cry wolf" effect. The team should: (1) Immediately switch the agent from blocking to advisory mode if it was blocking. (2) Analyze the 28 false positives to identify patterns — are they concentrated in certain types of changes or certain rule categories? (3) Disable the rules or heuristics responsible for the most false positives. (4) Re-launch with a narrower scope that has a much higher precision rate — it is better to catch fewer real issues with high confidence than to catch more issues with low confidence. (5) Gradually expand scope as precision is validated. The target should be at least 80% precision before the agent\'s feedback is taken seriously.'
          },
          {
            id: 'ci-2',
            difficulty: 'intermediate',
            question: 'Design the output format for a CI agent that reviews pull requests. The output must be useful to both humans (who read PR comments) and machines (the CI pipeline that decides pass/fail). What structure achieves both goals?',
            hint: 'Think about structured data that can be rendered as human-readable comments and also parsed programmatically.',
            solution: 'Use a structured format with two rendering paths. The data structure includes: (1) overall_status: "pass", "warn", or "fail", (2) findings: an array where each entry has severity (critical/warning/info), category (security/performance/correctness/style), location (file path and line range), description (human-readable explanation), and confidence (high/medium/low). For the machine path: the pipeline reads overall_status to decide pass/fail, and can filter findings by severity to determine whether to block. For the human path: a renderer converts findings into formatted PR comments grouped by file, with severity indicators and inline annotations. The same data serves both audiences. Key design choice: include confidence levels so the pipeline can be configured to block only on high-confidence critical findings, reducing false-positive blocks while still surfacing lower-confidence observations as non-blocking comments.'
          },
          {
            id: 'ci-3',
            difficulty: 'advanced',
            question: 'A CI agent must complete its review within a 5-minute time limit to avoid slowing the pipeline. For small PRs this is easy, but large PRs (hundreds of changed files) cannot be fully analyzed in time. Design a strategy for handling time-constrained analysis of variable-size inputs.',
            hint: 'Think about prioritization, progressive analysis, and graceful degradation.',
            solution: 'Use a tiered analysis strategy. (1) Triage phase (30 seconds): quickly scan all changed files and classify them by risk — files touching authentication, database access, or public APIs are high-risk; style-only changes and documentation are low-risk. (2) Deep analysis phase (3.5 minutes): analyze files in risk order, starting with the highest-risk files. Track elapsed time continuously. (3) Time check at each file: before starting analysis of the next file, check remaining time. If insufficient time remains for another deep analysis, switch to shallow mode. (4) Shallow analysis (remaining time): for unanalyzed files, perform only fast checks (pattern matching for known dangerous patterns, surface-level structure review). (5) Report phase (1 minute reserved): compile results, clearly marking which files received deep analysis versus shallow analysis. Include a note: "12 of 47 files received detailed analysis; 35 received surface-level review due to time constraints." This ensures the most important files always get thorough review, the pipeline time limit is always respected, and the team knows exactly what was and was not analyzed.'
          }
        ]}
      />
    </div>
  )
}
