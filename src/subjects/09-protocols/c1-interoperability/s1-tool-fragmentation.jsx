import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ToolFragmentation() {
  return (
    <div className="prose-agents">
      <h2>The Tool Fragmentation Problem</h2>
      <p>
        As agents multiply across organizations, each tends to arrive with its own set of tools,
        built in its own way, speaking its own interface language. The result is fragmentation:
        a landscape where every agent is an island, unable to share capabilities with any other.
        This is the starting problem that communication protocols are designed to solve.
      </p>

      <ConceptBlock title="Tool Fragmentation" number="9.1">
        <p>
          Tool fragmentation occurs when every agent or system defines its own bespoke interface
          for the capabilities it exposes or consumes. Each integration requires custom code to
          bridge the differences. The cost grows quadratically: with N systems, you may need
          up to N² custom bridges, and every new system added means N new integration points.
        </p>
      </ConceptBlock>

      <p>
        Fragmentation is not just an engineering inconvenience. It creates operational brittleness:
        a change to one system's interface ripples outward, breaking every agent that depended on
        it. It also creates security risks — each bespoke integration tends to handle authentication
        and authorization slightly differently, and the gaps between them are where vulnerabilities hide.
      </p>

      <AnalogyBlock title="The Pre-USB World">
        <p>
          Before USB, every peripheral device — keyboard, mouse, printer, camera — came with its
          own connector. Computers shipped with a dozen different ports, cables were not interchangeable,
          and adding a new device often required opening the machine. USB replaced all of that with
          a single standard. The same principle applies to agent-to-tool communication: a shared
          protocol eliminates the proliferation of bespoke connectors.
        </p>
      </AnalogyBlock>

      <WarningBlock title="The Hidden Cost of Custom Integrations">
        <p>
          Teams often underestimate the maintenance burden of custom integrations. Each one is a
          liability: it must be updated when either side changes, it often lacks error handling,
          and it typically has no shared test coverage. Over time, the sum of custom integrations
          can consume more engineering effort than the agents themselves.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-1-1',
            difficulty: 'beginner',
            question: 'An organization has 5 agents, each with 4 unique tools. If every agent needs a custom bridge to use every other agent\'s tools, how many bridges are required? What happens when a sixth agent is added?',
            hint: 'Count unique ordered pairs. With N systems needing to talk to each other, the number of directed connections is N×(N-1).',
            solution: 'With 5 agents, each needing to connect to 4 others, that is 5×4 = 20 directed bridges. Adding a sixth agent requires 5 new outgoing bridges (sixth to each existing) plus 5 incoming bridges (each existing to sixth) — 10 more, for a total of 30. A universal protocol collapses all of these to a single standard each system implements once.'
          },
          {
            id: 'ex9-1-2',
            difficulty: 'intermediate',
            question: 'Describe two concrete failure modes that arise specifically from fragmentation — problems that would not exist if all agents shared a single protocol.',
            hint: 'Think about what happens when one side of a custom bridge changes, and how security decisions get made inconsistently.',
            solution: 'First, version drift: when one system updates its interface, every custom bridge to it breaks simultaneously, with no standard mechanism to signal the change or negotiate compatibility. Second, inconsistent authorization: each custom integration implements permission checks differently, creating gaps where an agent can access something it should not because one bridge uses weaker checks than another. Both problems disappear when all parties implement a shared protocol that defines how versioning and authorization work.'
          },
          {
            id: 'ex9-1-3',
            difficulty: 'advanced',
            question: 'Some argue that standardized protocols sacrifice expressiveness for compatibility — a universal interface can only expose the lowest common denominator of what any tool can do. How would you design a protocol to avoid this tradeoff?',
            hint: 'Consider how the web solved this: HTTP is universal, but it does not constrain what can be served over it. What is the equivalent for tool protocols?',
            solution: 'The key is to separate the transport and discovery layer from the capability layer. A universal protocol should standardize how you find, call, and get results from tools — not what those tools do. Extensions and domain-specific metadata can ride on top of the core protocol. This is how HTTP works: the protocol is universal, but nothing prevents a server from exposing rich, domain-specific APIs over it. A well-designed agent protocol should similarly define a thin, stable core with extension points for richer semantics.'
          }
        ]}
      />
    </div>
  )
}
