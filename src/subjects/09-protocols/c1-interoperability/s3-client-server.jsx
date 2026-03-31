import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ClientServer() {
  return (
    <div className="prose-agents">
      <h2>Client–Server Roles in Agent Protocols</h2>
      <p>
        When agents communicate with tools through a shared protocol, each participant plays
        a role. The same agent may act as a client in one interaction and a server in another.
        Understanding these roles — and the obligations that come with each — is essential to
        designing systems that compose cleanly.
      </p>

      <ConceptBlock title="Protocol Client and Server" number="9.3">
        <p>
          In an agent communication protocol, the <strong>client</strong> is the party that
          initiates requests — typically an agent seeking to invoke a capability. The
          <strong> server</strong> is the party that hosts capabilities and responds to requests —
          typically a tool provider or another agent. A single system can be both: an agent
          that calls external tools is a client to those tools, while simultaneously acting as
          a server to a higher-level agent that calls it.
        </p>
      </ConceptBlock>

      <p>
        The client–server distinction matters because each role carries different responsibilities.
        A server must faithfully describe its capabilities, validate incoming requests, and return
        consistent responses. A client must respect the server's schema, handle errors gracefully,
        and not assume more capability than the server advertises. When these responsibilities are
        violated — a server that returns undocumented fields, a client that ignores error codes —
        integrations become fragile.
      </p>

      <AnalogyBlock title="A Restaurant Menu">
        <p>
          A restaurant is a server: it publishes a menu (capability description), accepts orders
          (invocations), and returns dishes (responses). Diners are clients: they choose from the
          menu, submit orders in the expected format, and receive what was described. A diner who
          orders something not on the menu, or a kitchen that delivers something different from
          what was ordered, breaks the protocol. Both roles have obligations.
        </p>
      </AnalogyBlock>

      <PrincipleBlock title="Roles Are Contextual, Not Fixed" number="9.2">
        <p>
          Design agent systems so that any component can occupy either the client or server role
          depending on the interaction. An agent that can only be a client cannot be composed into
          larger systems where other agents need to invoke its capabilities. Symmetry in role
          capability is a sign of a well-designed protocol participant.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-3-1',
            difficulty: 'beginner',
            question: 'In a system where a research agent calls a web search tool, which party is the client and which is the server? If that same research agent is called by an orchestrator agent, what roles does the research agent now occupy?',
            hint: 'Role is determined by who initiates the request, not by what the system does in general.',
            solution: 'When the research agent calls the web search tool, the research agent is the client and the web search tool is the server. When the orchestrator calls the research agent, the research agent becomes the server — it must expose its capabilities, accept invocations, and return responses. The research agent simultaneously occupies both roles: server to the orchestrator and client to the web search tool. This stacking is normal and expected in multi-agent systems.'
          },
          {
            id: 'ex9-3-2',
            difficulty: 'intermediate',
            question: 'A server returns a response with a field that is not described in its capability schema. A client receives this and tries to use the undocumented field. What problems can arise, and who is responsible?',
            hint: 'Consider what happens when the server later removes or renames that field — and whether the client had any basis for relying on it.',
            solution: 'The server violated the protocol by returning undocumented data, and the client compounded the problem by relying on it. The immediate risk is instability: the client now has a hidden dependency on behavior that was never promised, which may change or disappear without notice. The deeper problem is that capability schemas serve as contracts — once clients start working around them, the contract becomes meaningless and the integration is essentially custom again, defeating the purpose of the protocol. Responsibility is shared: servers should not emit undocumented fields, and clients should ignore or flag them rather than silently depending on them.'
          },
          {
            id: 'ex9-3-3',
            difficulty: 'advanced',
            question: 'Design the minimal set of obligations for a protocol server. What must a well-behaved server guarantee, and what is explicitly outside its responsibility?',
            hint: 'Think about the contract a server owes its clients versus what the client is responsible for providing.',
            solution: 'A well-behaved server must: (1) Accurately describe its capabilities — the schema is a promise, not a suggestion. (2) Validate inputs before processing — the server should not crash or produce nonsense when given malformed requests. (3) Return responses that match its advertised output schema. (4) Use error codes consistently — the same class of problem should produce the same error type. Outside its responsibility: the server cannot control how the client interprets results or whether the client handles errors gracefully. It also should not be responsible for the client\'s authentication credentials or for ensuring the client is calling tools in a sensible order. Those are client-side concerns.'
          }
        ]}
      />
    </div>
  )
}
