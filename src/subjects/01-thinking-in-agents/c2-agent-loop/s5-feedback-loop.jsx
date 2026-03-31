import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function FeedbackLoop() {
  return (
    <div className="prose-agents">
      <h2>The Feedback Loop</h2>
      <p>
        The sense-think-act loop becomes genuinely powerful only when the act phase produces
        observations that meaningfully inform the next sense phase. This connection — the feedback
        loop — is what allows agents to learn within a task, correct course, and handle situations
        that were not anticipated at the outset. Designing feedback loops well is one of the most
        important and underappreciated aspects of agent architecture.
      </p>

      <ConceptBlock title="Feedback Loop" number="2.5">
        <p>
          A feedback loop is the mechanism by which the results of an agent's actions become
          observations that inform its next decisions. Feedback can be <strong>immediate</strong>
          (the tool result arrives synchronously), <strong>delayed</strong> (the effect of an
          action takes time to manifest), or <strong>indirect</strong> (the action changes context
          that affects a later observation). Tight, reliable feedback loops allow agents to recover
          from mistakes quickly; weak or delayed feedback makes course correction slow and difficult.
        </p>
      </ConceptBlock>

      <p>
        Not all feedback is created equal. <strong>Positive feedback</strong> — confirmation that
        an action had its intended effect — allows the agent to proceed with confidence.
        <strong> Negative feedback</strong> — error messages, unexpected results, missing data —
        signals the need for course correction. <strong>Null feedback</strong> — no response or
        ambiguous signals — is the most dangerous kind, because the agent must decide whether to
        interpret silence as success, failure, or indeterminate state.
      </p>

      <AnalogyBlock title="The Sculptor Analogy">
        <p>
          A sculptor works through continuous feedback: each stroke reveals new information about
          the stone — grain direction, hidden flaws, the emerging form. They do not plan every cut
          upfront; they respond to what the material shows them. An agent loop works the same way:
          the plan is a starting point, and the actual path is shaped by feedback from each action.
          The quality of the work depends as much on how well the sculptor reads feedback as on the
          quality of their initial plan.
        </p>
      </AnalogyBlock>

      <p>
        One of the most important design decisions in an agent system is how much the agent should
        <strong> verify</strong> its own outputs. An agent that never checks whether its actions
        achieved their intended effect is brittle — it can only succeed if nothing unexpected
        happens. An agent that builds in verification steps — querying state after writing it,
        reading back what it wrote, confirming changes before proceeding — is more robust but also
        slower. The right balance depends on the reliability of the environment and the cost of errors.
      </p>

      <PrincipleBlock title="Close the Loop Explicitly" number="2.3">
        <p>
          Do not assume that a successful action call means a successful outcome. Design agents to
          close the feedback loop explicitly: after taking an action, include a verification step
          that queries the state you intended to change. If the state reflects the intended change,
          proceed. If it does not, reason about the discrepancy before continuing. This one pattern
          catches a significant fraction of the errors that cause agents to silently go off-track.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-1',
            difficulty: 'beginner',
            question: 'An agent writes a summary to a file, then immediately reads the task as "complete" and reports success to the user. What feedback loop has it skipped, and what could go wrong as a result?',
            hint: 'Think about the gap between "I took the action" and "the action had the intended effect."',
            solution: 'The agent skipped verification — it assumed the write succeeded without confirming. Possible failures: the file path was wrong and the file was written to an unexpected location; a permission error silently failed the write; the file system was full; the write succeeded but the content was corrupted. By reporting success without verifying, the agent gives the user false confidence. A closed loop would read back the file (or check that it exists and is non-empty) before reporting completion.'
          },
          {
            id: 'ex9-2',
            difficulty: 'intermediate',
            question: 'An agent is monitoring a slow process — it triggers a job and needs to know when it finishes. The job takes 10–60 minutes. How should the agent handle this delayed feedback loop? What are the tradeoffs of different polling strategies?',
            hint: 'Consider frequency, cost, and the risk of both over-polling and under-polling.',
            solution: 'The agent should poll the job status rather than blocking or assuming completion. Strategies: (1) Fixed interval polling — check every N minutes. Simple, but may waste resources checking too frequently or miss a quick completion. (2) Exponential backoff — check at 1 minute, 2 minutes, 4 minutes, etc., up to a maximum. Good for variable durations; reduces unnecessary calls for long jobs. (3) Webhook/callback — the job notifies the agent on completion; zero polling cost but requires the job system to support callbacks. (4) Adaptive polling — estimate the expected completion time from the job type and start polling when it\'s likely to be done. Tradeoffs: frequent polling is more responsive but wastes resources; infrequent polling is efficient but may leave the agent idle long after completion. A missed timeout (no check for success/failure) risks the agent stalling indefinitely.'
          },
          {
            id: 'ex9-3',
            difficulty: 'advanced',
            question: 'Design a feedback loop quality metric for an agent system. What would you measure to determine whether the feedback loops in a given agent are "tight" enough? How would you use this metric to improve agent design?',
            hint: 'Think about latency, signal quality, and the gap between action and adjustment.',
            solution: 'A feedback loop quality metric could include: (1) Loop latency — time between taking an action and receiving a usable observation of its effect; lower is better, with a threshold above which errors are likely to compound before correction. (2) Signal fidelity — does the feedback accurately reflect the state of the world? Measured by comparing agent-reported state to ground truth on a sample of tasks. (3) Correction rate — what fraction of loops involve the agent changing course based on feedback vs. always proceeding as planned? Too low suggests the agent is ignoring feedback; too high suggests the agent is acting on noise. (4) Error recovery latency — when an error occurs, how many additional loop iterations before the agent has recovered or escalated? Shorter is better. To use these metrics: identify which loop stages have the highest latency or lowest fidelity, then focus design effort on those specific stages — better tool output formatting, more explicit verification steps, or tighter error signal design.'
          }
        ]}
      />
    </div>
  )
}
