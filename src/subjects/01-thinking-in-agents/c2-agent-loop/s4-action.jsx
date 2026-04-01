import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function Action() {
  return (
    <div className="prose-agents">
      <h2>Action: How the Agent Changes the World</h2>
      <p>
        Action is what distinguishes an agent from a reasoning system. The ability to take actions —
        to change state in the world outside itself — is what gives agents their power and also
        what creates their risk. Understanding the taxonomy of actions, and the principles for
        choosing between them, is essential to building safe and effective agents.
      </p>

      <ConceptBlock title="Action Types" number="2.4">
        <p>Agent actions fall into four broad categories:</p>
        <ul>
          <li><strong>Information gathering:</strong> Querying databases, searching the web, reading files, calling APIs that return data. These are generally low-risk because they do not change state.</li>
          <li><strong>State-changing:</strong> Writing files, updating records, sending messages, executing commands. These are higher-risk because they have real-world consequences.</li>
          <li><strong>Communication:</strong> Producing output for a human — asking a clarifying question, presenting a result, requesting approval. These hand control back to the user.</li>
          <li><strong>Delegation:</strong> Spawning sub-agents, calling other AI systems, or scheduling deferred actions. These multiply the agent's reach and correspondingly multiply its risk surface.</li>
        </ul>
      </ConceptBlock>

      <p>
        A critical property of any action is its <strong>reversibility</strong>. Some actions can
        be undone: a draft can be discarded, a record can be restored from backup, a test email can
        be unsent if caught quickly. Other actions are effectively irreversible: a production
        database row deleted without backup, an email sent to a large list, a financial transaction
        settled. Agents should treat irreversible actions with special caution, applying higher
        confidence thresholds and human confirmation requirements before proceeding.
      </p>

      <PrincipleBlock title="Prefer Reversible Actions" number="2.2">
        <p>
          When two actions achieve the same goal, prefer the more reversible one. Move a file
          instead of deleting it. Write to a staging environment before production. Draft a message
          before sending. Archive rather than delete. The cost of reversibility is usually small;
          the cost of an irreversible mistake can be enormous. Build reversibility into agent
          design as a first-class concern, not an afterthought.
        </p>
      </PrincipleBlock>

      <p>
        Actions also differ in their <strong>scope of effect</strong>. An action that changes a
        single record in a database has a narrow blast radius. An action that runs a script against
        all records, sends a broadcast message, or modifies a shared configuration has a wide blast
        radius. Blast radius should scale proportionally with the confidence the agent has in the
        correctness of the action. High confidence, narrow blast radius: proceed. Low confidence,
        wide blast radius: pause and confirm.
      </p>

      <WarningBlock title="Actions are not atomic">
        <p>
          Many actions that appear simple involve multiple underlying operations, any of which can
          fail partway through. A "send email to team" action might succeed for some recipients and
          fail for others. A "update configuration" action might write some fields before encountering
          an error. Agents must be designed to handle partial execution: detecting incomplete actions,
          avoiding duplicate execution on retry, and communicating partial success accurately rather
          than falsely reporting complete success or complete failure.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex8-1',
            difficulty: 'beginner',
            question: 'Classify each action by type (information gathering, state-changing, communication, delegation) and reversibility (reversible, partially reversible, irreversible): (a) Search the web for recent news about a company. (b) Send a password reset email to a user. (c) Archive a completed project folder. (d) Ask the user which of two options they prefer.',
            hint: 'For reversibility, ask: can this be undone without any lasting consequence?',
            solution: '(a) Information gathering, reversible — no state was changed and the search can be re-run or ignored. (b) State-changing, partially reversible — the email cannot be unsent, but no further harm occurs once sent; the password reset token will expire. (c) State-changing, reversible — most archiving operations can be undone by unarchiving, assuming the archive is not automatically deleted. (d) Communication, not applicable — this is a handoff to the human, not an action with state effects.'
          },
          {
            id: 'ex8-2',
            difficulty: 'intermediate',
            question: 'An agent is automating a data cleanup task: it identifies duplicate records and merges them. The dataset has 10,000 records and the agent has identified 200 duplicates with 95% confidence. Design an action strategy that balances efficiency with safety given these numbers.',
            hint: 'Consider how to use confidence, reversibility, and blast radius together.',
            solution: 'A good strategy: (1) Stage before merge — write the proposed merges to a review queue rather than executing directly. (2) Sort by confidence — auto-approve merges above 99% confidence (if any); hold those at 95% for spot-check review. (3) Batch with human sampling — present a random sample of 20 proposed merges to a human reviewer; if they approve, batch-execute the rest with similar characteristics. (4) Make it reversible — before merging, back up the affected records so any merge can be undone. (5) Execute in small batches — merge 20 at a time and verify no anomalies before continuing, rather than executing all 200 at once. This approach captures most of the automation value while catching systematic errors before they affect all 200 records.'
          },
          {
            id: 'ex8-3',
            difficulty: 'advanced',
            question: 'An agent that delegates to sub-agents can achieve much more than an agent acting alone. But delegation multiplies both capability and risk. What specific risks does delegation introduce that do not exist for single-agent action, and what governance mechanisms address each risk?',
            hint: 'Think about visibility, accountability, error propagation, and the problem of sub-agents acting on potentially stale or misinterpreted instructions.',
            solution: 'Risks unique to delegation: (1) Instruction drift — the parent agent\'s intent can be misinterpreted or over-simplified when passed to a sub-agent, leading to actions the parent did not intend. Governance: require the parent to be explicit about constraints and scope, not just goals. (2) Visibility loss — when sub-agents act, the parent (and human overseer) may not see what is happening in real time. Governance: structured logging of all sub-agent actions with attribution. (3) Accountability gaps — if something goes wrong, which agent is responsible? Governance: every action traces back to the original principal and goal. (4) Error amplification — a sub-agent error can trigger further errors in sibling sub-agents that depend on the same output. Governance: sub-agents should operate independently where possible and validate inputs from other agents. (5) Scope creep — sub-agents may have access to tools that were appropriate for the parent but not appropriate for the delegated sub-task. Governance: scope tool access per delegation, not per agent.'
          }
        ]}
      />
    </div>
  )
}
