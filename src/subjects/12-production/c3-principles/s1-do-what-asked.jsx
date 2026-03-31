import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function DoWhatAsked() {
  return (
    <div className="prose-agents">
      <h2>Do What Was Asked, Nothing More</h2>
      <p>
        One of the most common failure modes in autonomous agents is overreach. The
        user asks for one thing, and the agent delivers that thing plus three other
        changes it thought would be helpful. Each additional change is a surface for
        bugs, confusion, and unintended consequences. The discipline of doing exactly
        what was requested — and stopping — is not a limitation. It is the foundation
        of trust.
      </p>

      <ConceptBlock title="Minimal Focused Changes" number="Concept 12.9">
        An agent operating with discipline restricts its actions to the scope of the
        request it received. If asked to fix a bug, it fixes that bug. It does not
        also refactor surrounding functions, update comments elsewhere, or reorganize
        imports. Each unrequested change is a decision the user did not make, a diff
        they must review without context, and a potential source of new problems. Scope
        discipline means the agent treats the boundary of the request as sacred.
      </ConceptBlock>

      <AnalogyBlock title="The Surgeon's Scope">
        A surgeon scheduled to repair a torn ligament does not, while the patient is
        open, decide to also reshape a nearby bone that looks suboptimal. The patient
        consented to one procedure. The recovery plan accounts for one procedure.
        Expanding scope mid-operation introduces risk that was never evaluated or
        agreed to. An agent that expands beyond its request is performing surgery
        the user never consented to.
      </AnalogyBlock>

      <p>
        Feature creep in agents is especially dangerous because the agent's additional
        changes carry the appearance of authority. A human colleague who makes extra
        changes will explain them in a pull request description. An agent's unrequested
        changes often arrive without justification, mixed in with the requested work,
        making it harder for the reviewer to separate the intended from the incidental.
      </p>

      <PrincipleBlock title="Scope Is a Constraint, Not a Suggestion" number="Principle 12.5">
        The request defines the boundary of action. Everything inside that boundary
        is the agent's job. Everything outside it is not. When an agent notices
        something outside scope that seems worth addressing, the correct action is
        to mention it — not to fix it. Reporting an observation preserves human
        authority over what gets changed. Acting on it usurps that authority.
      </PrincipleBlock>

      <NoteBlock title="When the User Says 'Fix This'" type="intuition">
        The instinct to do more comes from a good place — the agent wants to be
        helpful. But helpfulness without consent is interference. The most helpful
        response to noticing a separate issue is to say: "I also noticed X — would
        you like me to address that separately?" This respects the user's attention,
        their review capacity, and their right to prioritize.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'dwa-1',
            difficulty: 'beginner',
            question: 'A user asks an agent to rename a variable from "data" to "userData" throughout a file. While scanning the file, the agent notices an unrelated function that has a logic error. What should the agent do?',
            hint: 'Think about what the user asked for versus what the agent discovered.',
            solution: 'The agent should complete the variable rename as requested, and then separately report that it noticed what appears to be a logic error in the unrelated function, describing its location and nature. It should not fix the logic error. The user asked for a rename — that is the scope. Mixing an unrequested logic fix into the same change set means the user must review two unrelated modifications at once, and if the logic fix is wrong, rolling it back also rolls back the rename they wanted. Reporting the observation gives the user the information without removing their control over what happens next.'
          },
          {
            id: 'dwa-2',
            difficulty: 'intermediate',
            question: 'Why is unrequested work by an agent more problematic than unrequested work by a human colleague?',
            hint: 'Think about context, communication, and the volume of changes an agent can produce.',
            solution: 'Several factors make agent overreach more problematic: (1) Volume — an agent can make dozens of unrequested changes in seconds, while a human typically makes a few. The review burden scales accordingly. (2) Communication — a human colleague explains why they made extra changes in conversation or commit messages. An agent often presents all changes as a flat set without distinguishing requested from unrequested. (3) Trust calibration — humans have shared context about team norms and can judge what "bonus" changes are welcome. An agent lacks this social calibration and may make changes that violate unstated conventions. (4) Rollback cost — if unrequested changes are interleaved with requested ones in the same commit or operation, separating them is expensive.'
          },
          {
            id: 'dwa-3',
            difficulty: 'advanced',
            question: 'Design a set of internal rules an agent should follow to determine whether a potential action falls inside or outside the scope of the current request.',
            hint: 'Think about how to formalize the boundary between "part of the task" and "a separate task."',
            solution: 'Rules for scope determination: (1) Direct necessity — is this action required to fulfill the request? If removing it would leave the request incomplete, it is in scope. (2) Causal dependency — does the requested change break something that must be fixed for the request to be valid? Fixing a direct consequence of the requested change is in scope. (3) Proximity is not permission — being in the same file, function, or module as the requested change does not place something in scope. (4) Improvement is not necessity — making something "better" that was not broken or requested is out of scope. (5) When uncertain, ask — if an action might be in scope but the agent is not sure, the default is to ask, not to act. These rules create a strict boundary: only actions that are necessary or directly consequential are performed; everything else is reported but not executed.'
          }
        ]}
      />
    </div>
  );
}
