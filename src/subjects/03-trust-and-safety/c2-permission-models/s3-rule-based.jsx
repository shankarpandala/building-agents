import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function RuleBased() {
  return (
    <div className="prose-agents">
      <h2>Rule-Based Permissions</h2>
      <p>
        Rule-based permission models pre-specify exactly what an agent is and is not allowed to
        do, in the form of explicit conditions. When an agent contemplates an action, it checks
        the rules: if the action matches an allowed pattern, it proceeds autonomously; if it
        matches a denied pattern, it stops. No human needs to be consulted for any action
        that falls within the pre-defined rules.
      </p>

      <ConceptBlock title="Rule-Based Permission Model" number="Concept 3.7">
        A rule-based permission model encodes authorization decisions as explicit, evaluatable
        conditions defined before the agent runs. Rules may allow actions ("the agent may
        read any file in /reports"), deny them ("the agent may never modify files in
        /production"), or escalate them ("any deletion requires confirmation"). The model is
        deterministic: given the same action and the same rule set, the outcome is always the
        same.
      </ConceptBlock>

      <p>
        The strength of rule-based models is predictability and auditability. The rules can be
        reviewed by security teams, version-controlled, and tested. There is no ambiguity about
        whether a specific action is permitted — the rules either cover it or they do not.
        This makes rule-based permissions the most common choice for regulated industries and
        security-sensitive deployments.
      </p>

      <NoteBlock title="Rule coverage gaps" type="warning">
        Rules only govern actions they explicitly address. When an agent encounters a situation
        not covered by any rule, the system must decide: fail closed (deny by default) or fail
        open (allow by default). For safety-critical systems, always fail closed — uncovered
        actions are denied until a rule explicitly permits them.
      </NoteBlock>

      <WarningBlock title="Rules can be gamed">
        Rule-based models are vulnerable to exact-match bypasses. An agent that technically
        complies with every rule while violating the intent behind them is a real risk. Rules
        should be written to capture intent, not just syntax. Supplement rule checks with
        periodic audits of what the agent actually does versus what designers intended.
      </WarningBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'rb-1',
            difficulty: 'beginner',
            question:
              'Write three rules (in plain English) for a customer support agent that handles refund requests. Include at least one allow rule, one deny rule, and one escalation rule.',
            hint: 'Think about the range of things a support agent might want to do.',
            solution:
              'Allow: "Process refunds up to $50 without manager approval." Deny: "Never access a customer\'s payment card details directly." Escalate: "Any refund request over $200 must be routed to a human agent for review before processing."',
          },
          {
            id: 'rb-2',
            difficulty: 'intermediate',
            question:
              'A rule says "the agent may send emails only to addresses in the approved contacts list." An attacker tricks the agent into adding a malicious address to the contacts list first, then sending an email to it. What class of vulnerability is this, and how would you mitigate it?',
            hint: 'The attack involves two steps — think about what the first step exploits.',
            solution:
              'This is a privilege escalation via rule precondition manipulation. The rule\'s allow condition (membership in the contacts list) is only as safe as the mechanism that manages the list. Mitigation: treat the contacts list itself as a sensitive resource with its own permission rules — require human approval to add new addresses, and audit additions separately from email sends.',
          },
          {
            id: 'rb-3',
            difficulty: 'advanced',
            question:
              'Compare rule-based and ask-every-time models on three dimensions: scalability, predictability, and resilience to novel situations. Which model performs better on each dimension, and why?',
            hint: 'Think about what happens to each model as task volume increases and as situations become more unusual.',
            solution:
              'Scalability: Rule-based wins — rules execute without human involvement, scaling to any volume. Ask-every-time bottlenecks at human availability. Predictability: Rule-based wins — the same action always produces the same decision. Ask-every-time varies with human judgment and attention. Novel situations: Ask-every-time wins — a human can reason about an unprecedented scenario. Rules either block it (fail closed) or allow it incorrectly (gap in coverage), with no intelligent handling of novelty.',
          },
        ]}
      />
    </div>
  );
}
