import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function UniversalProtocol() {
  return (
    <div className="prose-agents">
      <h2>The Case for a Universal Protocol</h2>
      <p>
        The answer to fragmentation is standardization. When every participant in an ecosystem
        agrees to speak the same language — using the same message formats, discovery mechanisms,
        and capability descriptions — the number of custom integrations collapses to zero. Each
        participant implements the protocol once, and immediately gains access to every other
        participant that has done the same.
      </p>

      <ConceptBlock title="Universal Tool Protocol" number="9.2">
        <p>
          A universal tool protocol is a shared specification that defines how an agent discovers
          what a tool does, how it calls that tool, and how it interprets the response. By
          implementing the protocol, a tool becomes accessible to any agent that also implements
          it — without any custom integration work. The protocol is the integration.
        </p>
      </ConceptBlock>

      <p>
        Protocols succeed when they make the right thing easy and the wrong thing hard. A good
        protocol for agent-tool communication must handle four concerns: capability description
        (what can this tool do?), invocation (how do I call it?), error reporting (what went
        wrong and why?), and authentication (am I allowed to use this?). Getting all four right
        is what separates a durable standard from one that eventually gets abandoned.
      </p>

      <PrincipleBlock title="Separate Discovery from Invocation" number="9.1">
        <p>
          A universal protocol should treat capability discovery and invocation as distinct
          concerns with separate mechanisms. Discovery answers "what can you do?" and should
          be safe to call without side effects. Invocation answers "do this now" and may have
          consequences. Conflating them — or skipping discovery entirely — leads to agents
          calling tools blindly and failing in unpredictable ways.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Adoption requires network effects" type="note">
        <p>
          A protocol is only valuable if many participants adopt it. A technically superior
          protocol with few adopters is less useful than a good-enough protocol with broad
          support. This is why momentum and tooling ecosystem matter as much as technical
          design when evaluating whether to adopt a protocol.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-2-1',
            difficulty: 'beginner',
            question: 'A universal protocol must specify how tools describe their capabilities. What four pieces of information does a tool description need to provide for an agent to use it correctly?',
            hint: 'Think about what a human would need to know to use a tool: what it does, what inputs to give it, what it returns, and when it might fail.',
            solution: 'A tool description needs: (1) Name and purpose — a human-readable label and a clear description of what the tool accomplishes. (2) Input schema — the parameters it accepts, their types, and which are required. (3) Output schema — the shape and type of the response on success. (4) Error conditions — what errors can occur and under what circumstances, so the agent can handle them gracefully rather than treating all failures as identical.'
          },
          {
            id: 'ex9-2-2',
            difficulty: 'intermediate',
            question: 'Why is it important that a protocol\'s discovery endpoint have no side effects? What could go wrong if listing available tools caused them to execute or changed their state?',
            hint: 'Think about how an agent might call discovery repeatedly during planning — and what happens if that has consequences.',
            solution: 'Agents often explore available tools during planning phases, potentially calling discovery many times. If discovery had side effects — incrementing a counter, reserving resources, triggering notifications — repeated exploration would cause unintended actions. It would also make recovery difficult: if an agent crashes mid-plan and restarts, it would re-trigger those side effects on restart. Safe discovery lets agents be exploratory and resilient without unintended consequences.'
          },
          {
            id: 'ex9-2-3',
            difficulty: 'advanced',
            question: 'Compare two protocol design strategies: (A) a single tightly-specified protocol covering all cases, and (B) a minimal core protocol with extension points. For agent-tool communication specifically, which would you recommend and why?',
            hint: 'Consider how tool capabilities vary: some tools are simple functions, others are stateful services with complex flows. Can one tight spec cover all cases?',
            solution: 'Strategy B is generally better for agent-tool communication. Tool capabilities vary enormously: a calculator tool is a simple stateless function, while a database tool may involve sessions, transactions, and complex query languages. A single tight spec either becomes so complex it is hard to implement correctly, or so simple it cannot express rich capabilities. A minimal core (invocation, discovery, error reporting) with extension points for domain-specific metadata gives implementors the flexibility to express their tools fully while ensuring basic interoperability. This mirrors how successful protocols like HTTP have evolved.'
          }
        ]}
      />
    </div>
  )
}
