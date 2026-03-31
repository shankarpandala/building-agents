import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function FullTrust() {
  return (
    <div className="prose-agents">
      <h2>Full Trust</h2>
      <p>
        At the far end of the permission spectrum sits the full-trust model: the agent acts
        autonomously with no per-action checks, no human approval gates, and no classifier
        evaluation. Authorization is granted at deployment time and does not constrain individual
        actions within the session. Full trust maximizes speed and autonomy at the expense of
        human oversight.
      </p>

      <ConceptBlock title="Full-Trust Permission Model" number="Concept 3.9">
        A full-trust model grants an agent unconditional authorization to take any action within
        its technical capability. Permission is established once — at configuration time — and
        all subsequent actions are implicitly authorized. There are no checkpoints, escalation
        paths, or mid-session reviews. The agent's judgment is treated as equivalent to the
        operator's intent.
      </ConceptBlock>

      <p>
        Full trust is not inherently wrong — it is appropriate in tightly constrained environments
        where the agent's capability is itself the safety boundary. A read-only analytics agent
        operating on a sandboxed copy of data can safely be given full trust because the worst
        it can do is return incorrect analysis. The "full trust" is scoped by the environment,
        not by per-action checks.
      </p>

      <WarningBlock title="Full trust requires a safe environment, not just a trusted agent">
        Full trust is only safe when the environment provides its own containment. Giving an
        agent full trust over unrestricted production systems is not a permission model — it is
        an absence of safety design. Before removing permission checks, verify that the
        environment itself limits the blast radius to an acceptable level.
      </WarningBlock>

      <NoteBlock title="Full trust and accountability" type="info">
        Even in full-trust deployments, comprehensive logging remains essential. Without a record
        of what the agent did and why, post-incident investigation is impossible. Full trust
        removes pre-action approval but should never remove post-action auditability. "Trust but
        verify after the fact" is a viable model; "trust and never look" is not.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ft-1',
            difficulty: 'beginner',
            question:
              'Describe a scenario where full trust is the appropriate permission model. What properties of the environment make it safe to remove per-action checks?',
            hint: 'Think about what constrains the blast radius when there are no permission rules.',
            solution:
              'Example: a data analysis agent operating on a read-only snapshot of anonymized data in an isolated compute environment. Safe properties: the environment is read-only (no modifications possible), the data is anonymized (no PII exposure), and the environment is isolated (no connection to production systems). The environment itself is the safety boundary.',
          },
          {
            id: 'ft-2',
            difficulty: 'intermediate',
            question:
              'A team wants to give their deployment agent full trust to speed up the CI/CD pipeline. What three questions should they answer before proceeding, to ensure this is a responsible decision?',
            hint: 'Think about what could go wrong and whether you would notice.',
            solution:
              '(1) What is the worst action this agent could take, and is the blast radius of that action acceptable? (2) Is there comprehensive logging so any mistake can be reconstructed and diagnosed? (3) Are there compensating controls outside the agent itself — such as deployment throttles, canary releases, or automatic rollback — that limit damage even if the agent acts incorrectly?',
          },
          {
            id: 'ft-3',
            difficulty: 'advanced',
            question:
              'Explain why full trust becomes more dangerous as an agent system grows more capable over time, even if the environment and rules don\'t change.',
            hint: 'Think about what "capability" means for a fixed blast radius.',
            solution:
              'A more capable agent can take more complex, non-obvious sequences of individually permitted actions to achieve outcomes the designers never anticipated. A simple agent with full trust over a database might only run straightforward queries. A highly capable agent with the same trust might construct elaborate sequences — exfiltrating data through side channels, or producing outputs that influence downstream systems in unexpected ways. Capability expands the effective action space even when the nominal permissions remain constant.',
          },
        ]}
      />
    </div>
  );
}
