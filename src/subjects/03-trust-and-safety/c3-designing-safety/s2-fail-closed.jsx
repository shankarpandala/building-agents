import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function FailClosed() {
  return (
    <div className="prose-agents">
      <h2>Fail Closed</h2>
      <p>
        When something unexpected happens — an ambiguous instruction, a missing permission check,
        an unanticipated state — the agent must choose a default behavior. The "fail closed"
        principle says that the safe default is inaction: when in doubt, stop and surface the
        uncertainty to a human rather than proceeding with a guess. This is the opposite of
        "fail open," where ambiguity is resolved by proceeding.
      </p>

      <ConceptBlock title="Fail Closed" number="Concept 3.11">
        A fail-closed design causes an agent to stop, report, and wait when it encounters
        uncertainty, ambiguity, or conditions outside its defined operating envelope. The default
        action on any undetermined situation is to do nothing and escalate. Fail-closed systems
        prefer a false positive (unnecessary halt) over a false negative (harmful action taken
        without authorization).
      </ConceptBlock>

      <p>
        Fail closed is not the same as fail loudly — though both are desirable together. An
        agent that fails closed should not simply freeze silently; it should communicate clearly
        what caused the halt, what information is missing, and what the human needs to provide
        to resume. A well-designed fail-closed system is informative, not just cautious.
      </p>

      <PrincipleBlock title="Deny by Default" number="Principle 3.5">
        Any action not explicitly permitted should be implicitly denied. Do not build agent
        systems where ambiguous situations result in a best-guess attempt. The cost of a wrong
        guess is usually higher than the cost of a halt. Operators can always expand permissions
        explicitly — they cannot easily undo actions that should have been blocked.
      </PrincipleBlock>

      <NoteBlock title="Fail closed vs. fail safe" type="info">
        Fail closed (halt on uncertainty) and fail safe (move to a safe physical state on
        failure) are related but distinct. In physical systems, a door that locks on power
        failure "fails safe" — it prevents intrusion. In agent systems, an agent that pauses
        and asks before acting on ambiguous data "fails closed." Both share the philosophy:
        choose the outcome with lower expected harm when the system cannot determine the right
        answer.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'fc-1',
            difficulty: 'beginner',
            question:
              'An agent receives an instruction that could be interpreted in two ways: one harmless, one destructive. Under fail-closed design, what should it do?',
            hint: 'The ambiguity itself is the trigger for fail-closed behavior.',
            solution:
              'The agent should halt and surface the ambiguity explicitly: state both possible interpretations, explain why it cannot resolve the ambiguity autonomously, and ask the human to clarify which interpretation is intended. It should not guess, even if the harmless interpretation seems more likely.',
          },
          {
            id: 'fc-2',
            difficulty: 'intermediate',
            question:
              'A team argues that fail-closed is bad for user experience because it creates too many interruptions. How do you respond, and what design approach reconciles safety with usability?',
            hint: 'Think about how to reduce the frequency of ambiguous situations, not just how to handle them.',
            solution:
              'Fail-closed is correct but should be a last resort, not a first resort. Reduce ambiguity upstream: write precise instructions, define clear operating envelopes, and validate inputs before they reach the agent. When fail-closed does trigger, make the escalation fast and the required human input minimal. A well-specified agent rarely needs to fail closed; when it does, the interruption is genuinely warranted.',
          },
          {
            id: 'fc-3',
            difficulty: 'advanced',
            question:
              'Compare the failure modes of fail-open and fail-closed agent designs over time. Which tends to produce more visible failures, and what does this mean for how teams perceive and manage risk?',
            hint: 'Think about which failures are easy to see vs. which accumulate silently.',
            solution:
              'Fail-open produces invisible failures: incorrect actions proceed without anyone noticing until downstream consequences appear. Fail-closed produces visible failures: halts are logged and reported immediately. Teams with fail-open systems often underestimate their risk because problems hide until they become large. Fail-closed teams see frequent small interruptions that may feel more burdensome but actually reveal the true rate of ambiguous situations — giving teams actionable data to improve system design.',
          },
        ]}
      />
    </div>
  );
}
