import ConceptBlock from '../../../components/content/ConceptBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function PermissionBridging() {
  return (
    <div className="prose-agents">
      <h2>Permission Bridging Across Systems</h2>
      <p>
        When an agent operates across multiple systems — each with its own permission model —
        the question of how permissions translate between them becomes critical. An action that
        is permitted in system A may be explicitly forbidden in system B, or it may have no
        direct equivalent. Permission bridging is the design challenge of navigating these
        differences without accidentally granting more access than intended.
      </p>

      <ConceptBlock title="Permission Bridging" number="9.11">
        <p>
          Permission bridging is the process of translating or mapping permissions from one
          system's model to another's when an agent acts across a protocol boundary. The bridge
          must decide what permissions from system A correspond to in system B — and must default
          to the more restrictive interpretation when an exact mapping does not exist.
        </p>
      </ConceptBlock>

      <p>
        Permission mismatches arise in several ways. System A may have fine-grained roles
        (read-only, comment-only, editor) while system B has only a binary authorized/unauthorized
        distinction. System A may grant access to a category (all documents in a project) while
        system B requires specific resource identifiers. System A may allow an action for a
        limited time while system B has no concept of time-bound permissions.
        Each mismatch is an opportunity for accidental privilege escalation.
      </p>

      <WarningBlock title="Assume Restriction When Mapping Is Ambiguous">
        <p>
          When a permission in one system does not map cleanly to a permission in another,
          always assume the more restrictive interpretation. An agent that grants itself
          "editor" access in system B because its system A role was "commenter" is escalating
          privileges. When in doubt, treat the permission as not granted and surface the
          ambiguity for resolution rather than assuming the more permissive option.
        </p>
      </WarningBlock>

      <PrincipleBlock title="Bridges Should Be Explicit, Not Inferred" number="9.7">
        <p>
          Permission bridges should be explicitly defined mappings maintained by a human with
          authority over both systems — not inferred by the agent at runtime based on name
          similarity or guesswork. The agent is not the right party to decide what "editor
          in system A" means in system B. That is an organizational decision that must be
          made deliberately.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-11-1',
            difficulty: 'beginner',
            question: 'System A has three permission levels: "viewer", "editor", and "admin". System B has two: "read" and "write". How should each system A role map to system B, and what information is lost in the translation?',
            hint: 'Consider what system B\'s "write" permission encompasses compared to system A\'s fine-grained distinction between editing and administering.',
            solution: 'Viewer → read (straightforward). Editor → write (reasonable, though system B\'s write likely covers actions system A reserves for admins). Admin → write (same mapping, with information loss: system B has no way to distinguish an editor from an admin). The key loss is granularity: system B cannot represent the difference between editing and administrative actions. If the bridge allows admins to be treated as just "write" users in system B, that is acceptable. The dangerous direction is the reverse: allowing a system B "write" user to be treated as an admin in system A, which would be a privilege escalation.'
          },
          {
            id: 'ex9-11-2',
            difficulty: 'intermediate',
            question: 'A user\'s permission in system A is time-limited: they have editor access until Friday. System B has no concept of time-bound permissions. How should the bridge handle this when granting access in system B?',
            hint: 'Consider what options the bridge has: grant permanent access, grant no access, or introduce a different mechanism.',
            solution: 'The bridge cannot faithfully represent a time-limited permission in a system with no time concept. The options are: (1) Grant no access in system B until a human explicitly creates a permanent permission — most restrictive and most faithful to intent. (2) Grant access but implement time-bounding in the bridge itself, checking the expiry on every call and rejecting after the deadline — most accurate but requires the bridge to maintain state. (3) Grant permanent access and trust that the system A permission will be revoked at expiry — least secure, because the system B permission persists even after the system A permission expires. Option 2 is the right design choice for a serious production bridge.'
          },
          {
            id: 'ex9-11-3',
            difficulty: 'advanced',
            question: 'An agent operates across three systems with different permission models. Design a minimal permission bridge architecture that ensures no accidental privilege escalation, is auditable, and handles the case where one system\'s permission model changes.',
            hint: 'Think about where the mapping is stored, who can change it, and what happens to in-flight permissions when the mapping changes.',
            solution: 'Architecture: (1) Centralized mapping store: explicit permission maps for each system pair, stored in a version-controlled configuration that requires review and approval to change. (2) Conservative defaults: any unmapped permission is denied, not granted. Gaps must be explicitly filled by a human. (3) Audit log: every permission bridge decision (permission X in system A → permission Y in system B, for request Z) is logged with a timestamp, the mapping version used, and the outcome. (4) Versioned mappings: the mapping in effect at the time of an action is recorded in the audit log, so retrospective review is possible. When system models change, the mapping must be reviewed and updated before the agent is permitted to bridge to the changed system — a change to any participant\'s permission model triggers a mapping review gate. This prevents silent privilege changes from slipping through.'
          }
        ]}
      />
    </div>
  )
}
