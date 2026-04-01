import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function HookBasedAutomation() {
  return (
    <div className="prose-agents">
      <h2>Hook-Based Automation</h2>
      <p>
        Hooks are automation's surgical instrument. Rather than triggering an agent
        based on external events or schedules, hooks attach logic directly to specific
        moments in an agent's own lifecycle — before it reads a file, after it makes
        a tool call, before it submits a response. Hooks let you inject validation,
        logging, transformation, or guardrails at precise points in the workflow.
      </p>

      <ConceptBlock title="Hook" number="10.11">
        <p>
          A hook is a callback that executes automatically at a defined point in an
          agent's action lifecycle. Pre-hooks run before an action and can modify,
          validate, or block it. Post-hooks run after an action and can log, transform,
          or react to its result. Hooks are transparent to the main workflow — the
          skill does not need to know that hooks exist. This separation means
          cross-cutting concerns like security checks, audit logging, and output
          formatting can be added without modifying the skills themselves.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="Airport Security Checkpoints">
        <p>
          When you board a flight, you pass through security between the terminal and
          the gate. The security checkpoint is a pre-hook — it inspects what is about
          to happen (you boarding the plane) and can block it if something is wrong.
          You do not arrange your own security screening; it happens automatically at a
          defined point in the process. Hooks work the same way: they intercept the
          flow at specific points, inspect or modify what is passing through, and either
          allow or block the action.
        </p>
      </AnalogyBlock>

      <p>
        The most common uses for hooks in agent systems are: pre-action validation
        (is this tool call safe?), post-action logging (record what was done for
        audit), output transformation (format results before presenting them), and
        resource guarding (prevent actions that would exceed budgets or rate limits).
      </p>

      <PrincipleBlock title="Hooks Must Be Fast and Invisible" number="10.9">
        <p>
          A hook that takes longer than the action it wraps defeats its purpose. Hooks
          should execute quickly and not disrupt the user's experience of the workflow.
          If a hook needs to perform substantial work — like running a full security
          analysis — it should do so asynchronously or in a limited, fast-path version.
          The user should experience hooks as guardrails, not as speed bumps.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Ordering conflicts between hooks">
        <p>
          When multiple hooks attach to the same action point, their execution order
          matters. A logging hook that runs before a transformation hook records the
          untransformed output. A security hook that runs after a modification hook
          checks the modified version. If hook ordering is undefined or arbitrary,
          behavior becomes unpredictable. Always define explicit ordering for hooks
          that share an attachment point.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ha-1',
            difficulty: 'beginner',
            question: 'An agent can execute shell commands as part of its workflow. Design a pre-hook that prevents dangerous commands from executing. What should it check, and what should it do when it detects a dangerous command?',
            hint: 'Think about what makes a shell command dangerous and how to categorize risk levels.',
            solution: 'The pre-hook should: (1) Intercept every shell command before execution. (2) Check against a blocklist of dangerous patterns — commands that delete files recursively, modify system configuration, access sensitive directories, or make network requests to unknown hosts. (3) Categorize matches by severity: "blocked" (never allowed, e.g., rm -rf /), "requires confirmation" (potentially dangerous, e.g., git push --force), and "allowed" (safe operations). (4) For blocked commands: halt execution, log the attempt, and return an error explaining why. (5) For confirmation-required commands: pause and request explicit approval before proceeding. The hook should never silently allow a dangerous command and should never silently block a safe one — both false positives and false negatives erode trust.'
          },
          {
            id: 'ha-2',
            difficulty: 'intermediate',
            question: 'A team wants to add audit logging to every tool call an agent makes, without modifying any existing skills. Design a post-hook system that captures what was called, what inputs were provided, and what result was returned. What should the log entry include?',
            hint: 'Think about what information you would need to reconstruct exactly what happened during a session.',
            solution: 'The post-hook attaches to every tool invocation\'s completion point. Each log entry should include: (1) timestamp, (2) session ID (to group entries from one workflow run), (3) agent identity (which agent in a multi-agent system), (4) tool name, (5) sanitized input parameters (with sensitive values like passwords redacted), (6) result summary (success/failure plus a truncated result for large outputs), (7) execution duration, (8) the skill that initiated the tool call. The log should be written to an append-only store that the agent cannot modify or delete. Sanitization is critical — the audit log must be useful for investigation without becoming a security liability by storing credentials or personal data in plaintext.'
          },
          {
            id: 'ha-3',
            difficulty: 'advanced',
            question: 'Design a hook that enforces a token budget across an entire multi-step workflow. The hook must track cumulative usage, warn when approaching the limit, and halt execution when the budget is exhausted. How does it handle the case where the final step is critical and must not be skipped?',
            hint: 'Think about budget reservation — setting aside tokens for must-run final steps.',
            solution: 'Design: (1) A pre-hook on every language model call that checks cumulative tokens against the budget. (2) The budget is partitioned: a "reserved" portion for critical final steps and an "available" portion for everything else. For example, if the budget is 100K tokens and the final summarization step typically uses 10K, reserve 10K and allow the other steps to use up to 90K. (3) Warning threshold: when available budget drops below 20%, the hook injects a system message advising the agent to be more concise and prioritize essential work. (4) Soft limit: when available budget is exhausted, non-critical steps are skipped with a log entry explaining why. (5) Hard limit: the reserved budget is released only for the designated critical final step. If even the reserved budget is insufficient, the hook allows the step to proceed but truncates input to fit. The key insight is that a flat budget with a hard cutoff risks stopping right before the most important step. Budget reservation ensures critical work always executes.'
          }
        ]}
      />
    </div>
  )
}
