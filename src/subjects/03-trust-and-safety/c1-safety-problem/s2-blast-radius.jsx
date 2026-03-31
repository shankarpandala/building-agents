import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function BlastRadius() {
  return (
    <div className="prose-agents">
      <h2>Blast Radius</h2>
      <p>
        When an agent makes a mistake, the question is not just whether it made one — it's how
        much damage that mistake can cause before it is caught and corrected. This potential
        damage is called the blast radius: the maximum harm reachable from a single point of
        failure.
      </p>

      <ConceptBlock title="Blast Radius" number="Concept 3.2">
        The blast radius of an agent action is the maximum negative impact that can result if
        that action goes wrong. It is determined by the scope of access, the reversibility of
        the action, and the speed at which errors propagate before they are noticed. Good safety
        design minimizes blast radius before any mistake happens.
      </ConceptBlock>

      <p>
        Blast radius has two independent dimensions. The first is <strong>breadth</strong>: how
        many things can be affected? An agent with access to one database table has a narrower
        breadth than one with access to an entire production cluster. The second is{' '}
        <strong>depth</strong>: how severely can each thing be affected? Appending a log entry
        is shallow; dropping a table is deep.
      </p>

      <AnalogyBlock title="Controlled Burns">
        Forest firefighters deliberately set small, controlled fires to consume undergrowth that
        would otherwise fuel catastrophic wildfires. The controlled burn has a defined blast
        radius — it cannot spread beyond the firebreak. Agent permissions work the same way:
        define the firebreak before the burn starts, not after smoke appears.
      </AnalogyBlock>

      <WarningBlock title="Speed amplifies blast radius">
        An agent that acts slowly gives humans time to notice and intervene. An agent that
        executes thousands of operations per second can destroy a year of data in the time it
        takes someone to read a Slack notification. Rate limiting and operation counts are blast
        radius controls, not just performance considerations.
      </WarningBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'br-1',
            difficulty: 'beginner',
            question:
              'Rank these three agent actions by blast radius, from smallest to largest, and explain your reasoning: (a) append a line to a log file, (b) send a bulk email to all customers, (c) read a public webpage.',
            hint: 'Consider reversibility and how many people or systems are affected.',
            solution:
              '(c) read a webpage — no side effects at all. (a) append to log — minimal, local, easily corrected. (b) bulk email — high blast radius: emails cannot be unsent, many people affected, reputational damage is real and lasting.',
          },
          {
            id: 'br-2',
            difficulty: 'intermediate',
            question:
              'An agent has permission to modify any record in a customer database. Suggest two architectural changes that would reduce its blast radius without removing its ability to do its job.',
            hint: 'Think about scope restriction and rollback capabilities.',
            solution:
              'First, scope access to only the tables the agent actually needs (least-privilege). Second, require writes to go through a staging or soft-delete mechanism so all changes are reversible for a defined window before permanent commit.',
          },
          {
            id: 'br-3',
            difficulty: 'advanced',
            question:
              'Why might an agent with read-only access to a messaging platform have a larger blast radius than an agent with write access to a small internal database? What does this reveal about how blast radius should be measured?',
            hint: 'Consider what the read-only agent could do with what it reads.',
            solution:
              'If the messaging platform contains sensitive conversations, PII, or credentials, a read-only agent could exfiltrate high-value data — a large privacy blast radius. Blast radius must be measured across multiple dimensions: data sensitivity, number of affected parties, and downstream misuse potential — not just write permissions.',
          },
        ]}
      />
    </div>
  );
}
