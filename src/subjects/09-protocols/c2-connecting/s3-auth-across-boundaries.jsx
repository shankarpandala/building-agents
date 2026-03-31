import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function AuthAcrossBoundaries() {
  return (
    <div className="prose-agents">
      <h2>Authentication Across Protocol Boundaries</h2>
      <p>
        When an agent calls a tool hosted on a different server — possibly owned by a different
        organization — the question of identity becomes complex. Who is making the call: the
        agent, the user whose task triggered the agent, or the operator who deployed the agent?
        Authentication across protocol boundaries requires explicit decisions about which
        identity to present and how credentials flow through multi-hop chains.
      </p>

      <ConceptBlock title="Identity Propagation" number="9.7">
        <p>
          Identity propagation is the question of whose credentials are presented when an agent
          calls a tool on behalf of someone else. The agent may carry its own service identity,
          the user's delegated credentials, or a scoped token that represents only the permissions
          needed for this specific task. Each choice carries different trust implications for the
          receiving server.
        </p>
      </ConceptBlock>

      <p>
        In practice, three patterns are common. In the <strong>agent identity</strong> pattern,
        the agent presents its own credentials and the tool trusts the agent to act on behalf of
        any user. This is simple but grants the agent broad power. In the <strong>delegated
        identity</strong> pattern, the user's token is passed along, and the tool enforces the
        user's own permission set. This is more restrictive but requires the user to pre-authorize
        the flow. In the <strong>scoped token</strong> pattern, a purpose-specific token is
        generated that encodes exactly what the agent is allowed to do — nothing more.
      </p>

      <PrincipleBlock title="Prefer Scoped Tokens for Cross-Boundary Calls" number="9.4">
        <p>
          When an agent must cross an organizational or service boundary to invoke a tool, use
          a scoped token that encodes only the specific permissions needed for the current task.
          Scoped tokens limit blast radius: if the token is intercepted or misused, the attacker
          gains only what the token permitted — not everything the agent or user can do.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Credential Leakage in Multi-Hop Chains">
        <p>
          In a chain where Agent A calls Agent B which calls Tool C, the credentials passed at
          each hop may contain more permission than the next hop needs. Each link in the chain
          should receive only the credentials required to complete its step — not the full
          credentials of the originating user or agent. Passing full credentials through
          intermediate hops is one of the most common privilege escalation patterns.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-7-1',
            difficulty: 'beginner',
            question: 'A user asks an agent to read their calendar and draft a meeting invitation. The agent must call a calendar API. Should the agent use its own service credentials or the user\'s delegated token? What are the tradeoffs?',
            hint: 'Think about what each credential set authorizes and what happens if the agent\'s credentials are used for all users.',
            solution: 'The agent should use the user\'s delegated token. If it uses its own service credentials, it may access other users\' calendars or be granted read/write to all accounts — violating the principle of least privilege. The user\'s delegated token limits access to what that user can see. The tradeoff is that delegated authentication requires the user to grant access upfront (an OAuth flow or similar), while service credentials are simpler to manage. The security benefit of delegated credentials strongly outweighs the setup cost for operations that touch personal data.'
          },
          {
            id: 'ex9-7-2',
            difficulty: 'intermediate',
            question: 'An agent is given a broad OAuth token by the user with read/write access to their entire file system. The agent\'s current task only requires reading one specific directory. How should the agent handle this mismatch between the token\'s scope and the task\'s actual needs?',
            hint: 'Consider whether the agent should use the full token, or whether there is a better option.',
            solution: 'The agent should not use the broad token directly if a more scoped alternative is available. If the protocol supports token downscoping — requesting a new token with reduced permissions — the agent should request a read-only token scoped to the specific directory before making the call. If downscoping is not available, the agent should document its use of the broad token in its reasoning trace and proceed with caution, avoiding any writes. The broader principle is that the agent is responsible for limiting its own privilege even when the user has granted more than necessary.'
          },
          {
            id: 'ex9-7-3',
            difficulty: 'advanced',
            question: 'Design an authentication scheme for a three-hop agent chain: a user triggers Agent A, which calls Agent B, which calls an external API. Each hop crosses an organizational boundary. What credentials should flow at each hop, and what should each participant verify?',
            hint: 'Work outward from the principle of least privilege. Each hop should get only what it needs, and each participant should verify both identity and scope.',
            solution: 'Hop 1 (User → Agent A): User authenticates to Agent A with their full user token. Agent A verifies the user\'s identity and checks that the requested task is within scope. Hop 2 (Agent A → Agent B): Agent A generates a scoped task token — it identifies Agent A as the caller, attests that it is acting on behalf of the user (by reference, not by forwarding the full user token), and encodes only the permissions Agent B needs to complete its part. Agent B verifies the token was issued by a trusted source (Agent A) and that the scope covers the operation. Hop 3 (Agent B → External API): Agent B generates another scoped token, narrowed further to only the external API call needed. The external API verifies the token\'s signature, the issuer\'s trust chain, and the scope. No hop receives the credentials from the previous hop verbatim — each generates a fresh, scoped token. This creates an auditable chain where each participant can be identified.'
          }
        ]}
      />
    </div>
  )
}
