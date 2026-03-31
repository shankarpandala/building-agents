import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function WhyBoundaries() {
  return (
    <div className="prose-agents">
      <h2>Why Agents Need Boundaries</h2>
      <p>
        Agents are powerful precisely because they can act autonomously — reading files, calling
        APIs, sending messages, and making decisions without constant supervision. That same
        autonomy is what makes unconstrained agents dangerous. Without deliberate boundaries, an
        agent that misunderstands a goal can pursue it relentlessly in ways its designers never
        intended.
      </p>

      <ConceptBlock title="The Autonomy–Safety Tension" number="Concept 3.1">
        Every increase in an agent's autonomy is also an increase in the potential magnitude of
        its mistakes. Boundaries are the mechanism by which we let agents be useful without
        letting them be catastrophic. They are not restrictions on capability — they are the
        conditions under which capability can be safely deployed.
      </ConceptBlock>

      <p>
        Human organizations solve this with roles, authorizations, and approval chains. A junior
        employee has access only to the systems they need for their job. A purchase above a
        certain value requires a manager's sign-off. These constraints exist not because the
        employee is untrustworthy, but because errors are inevitable and the cost of a mistake
        should be bounded.
      </p>

      <AnalogyBlock title="Power Tools and Guards">
        A circular saw with no blade guard can cut anything — including the operator's hand. The
        guard does not make the saw less powerful; it makes its power safe to use in proximity
        to humans. Agent safety boundaries work the same way. They are engineering choices about
        where the sharp edges are allowed to reach.
      </AnalogyBlock>

      <NoteBlock title="Boundaries are not just for bad actors" type="info">
        Most boundary violations by AI agents are not caused by adversarial inputs or malicious
        intent. They stem from ambiguous instructions, unexpected environments, or subtle
        misunderstandings of what the user actually wanted. Boundaries protect against honest
        mistakes as much as against attacks.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'wb-1',
            difficulty: 'beginner',
            question:
              'An agent is asked to "clean up old files." Without boundaries, what are two different ways this instruction could be interpreted that lead to very different outcomes?',
            hint: 'Consider what "old" means and what "clean up" might mean in different contexts.',
            solution:
              'The agent might archive files older than 30 days (safe) or permanently delete any file not modified in the last week (destructive). Both satisfy the literal instruction. Boundaries — like "only move, never delete" or "ask before acting on files newer than 90 days" — constrain the interpretation space.',
          },
          {
            id: 'wb-2',
            difficulty: 'intermediate',
            question:
              'Why is an agent that can only read data still a potential safety concern, even though it cannot modify anything?',
            hint: 'Think about what reading data at scale could enable.',
            solution:
              'A read-only agent can still exfiltrate sensitive information, expose private data to unauthorized parties, or exhaust rate limits and quotas. Data confidentiality is a distinct concern from data integrity, and boundaries must address both.',
          },
          {
            id: 'wb-3',
            difficulty: 'intermediate',
            question:
              'Describe the difference between a boundary that prevents an action and a boundary that requires approval before an action. When would you prefer each?',
            hint: 'Think about the trade-off between safety and usefulness.',
            solution:
              'A hard boundary blocks an action entirely — useful when no circumstance justifies the action. An approval boundary pauses and asks a human — useful when the action is sometimes appropriate but high-stakes. Hard boundaries maximize safety; approval boundaries preserve flexibility while maintaining oversight.',
          },
        ]}
      />
    </div>
  );
}
