import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function LeastPrivilege() {
  return (
    <div className="prose-agents">
      <h2>Least Privilege</h2>
      <p>
        Least privilege is one of the oldest and most important principles in computer security,
        and it applies directly to agents. It states that any component — human, process, or
        agent — should have access to exactly what it needs to perform its job, and nothing more.
        Over-provisioning access is not a convenience feature; it is a safety risk waiting to be
        realized.
      </p>

      <ConceptBlock title="Least Privilege" number="Concept 3.10">
        The principle of least privilege requires that an agent be granted the minimum permissions
        necessary to complete its intended task. Permissions should be scoped to specific
        resources, specific actions, and — where possible — specific time windows. Any access not
        explicitly required for the task is a potential source of unintended harm.
      </ConceptBlock>

      <AnalogyBlock title="Hotel Key Cards">
        A hotel key card opens your room and the gym. It does not open the kitchen, the server
        room, or other guests' rooms. The hotel doesn't give you a master key and ask you to
        use good judgment. Each guest gets exactly the access needed for their stay, scoped to
        the rooms they actually need. Agent permissions should be designed the same way.
      </AnalogyBlock>

      <p>
        In practice, least privilege requires actively scoping permissions along three dimensions:
        resource scope (which data or systems can be accessed), action scope (which operations
        can be performed — read, write, delete), and temporal scope (during what time window
        access is valid). Most security failures involving agents involve over-permission on at
        least one of these dimensions.
      </p>

      <PrincipleBlock title="Grant Permissions Just In Time" number="Principle 3.4">
        Prefer granting permissions at the moment they are needed and revoking them immediately
        after use, rather than maintaining standing permissions throughout a session. A long-lived
        session with broad permissions is a much larger attack surface than a series of
        short-lived, narrowly scoped access grants. Just-in-time permissions minimize the window
        of exposure.
      </PrincipleBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'lp-1',
            difficulty: 'beginner',
            question:
              'An agent is tasked with generating a weekly sales summary report from a database. What is the minimum set of permissions it needs, stated in terms of resource, action, and time scope?',
            hint: 'Think about what the agent needs to read, what it should never touch, and when it runs.',
            solution:
              'Resource: read access to the sales tables relevant to the report — no access to HR, financial, or other tables. Action: SELECT only — no INSERT, UPDATE, or DELETE. Time scope: permissions active only during the scheduled report window (e.g., Sunday night), revoked immediately after the report is generated.',
          },
          {
            id: 'lp-2',
            difficulty: 'intermediate',
            question:
              'A developer says "it\'s easier to give the agent admin access and not worry about scoping." What are three concrete risks this creates, even if the developer trusts the agent completely?',
            hint: 'Think about what else could go wrong beyond the agent itself misbehaving.',
            solution:
              '(1) If the agent\'s credentials are compromised (e.g., leaked in logs or via prompt injection), attackers gain admin access to the entire system. (2) A bug in the agent\'s logic could inadvertently use admin access to modify or delete data it was not supposed to touch. (3) Blast radius of any mistake — including honest errors — is maximized: a miscalculation that should affect one table could affect the whole system.',
          },
          {
            id: 'lp-3',
            difficulty: 'advanced',
            question:
              'Explain the tension between least privilege and agent autonomy in multi-step tasks. How can you design a system that honors both?',
            hint: 'Think about what a multi-step agent needs to discover vs. what it needs to know upfront.',
            solution:
              'Multi-step agents often don\'t know exactly which resources they will need until mid-task — requesting least-privilege upfront may be impossible. Tension: granting broad access enables autonomy but violates least privilege; requiring pre-specification of all needed resources enables least privilege but breaks autonomy for exploratory tasks. Resolution: use a dynamic permission request pattern — the agent starts with minimal permissions and requests additional access as each step reveals new needs, with human or automated approval at each escalation point.',
          },
        ]}
      />
    </div>
  );
}
