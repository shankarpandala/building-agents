import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function LooseCoupling() {
  return (
    <div className="prose-agents">
      <h2>Loose Coupling in Protocol Design</h2>
      <p>
        The goal of a protocol is to let participants work together without depending intimately
        on each other's internals. This property — loose coupling — is what gives protocol-based
        systems their durability. When participants are loosely coupled, either side can evolve
        independently as long as the contract between them is honored.
      </p>

      <ConceptBlock title="Loose Coupling" number="9.9">
        <p>
          Loose coupling in a protocol means that each participant depends on the other only
          through the protocol interface — not through knowledge of each other's implementation,
          internal state, or deployment details. A client should be able to swap the tool it
          calls for any other that implements the same interface, and a server should be able
          to change its implementation without clients needing to update.
        </p>
      </ConceptBlock>

      <p>
        Tight coupling creeps in through seemingly innocent shortcuts: an agent that parses a
        tool's internal error message strings to decide what to do next, a tool that returns
        fields the client did not ask for and that the client now depends on, a client that
        knows the tool's database schema and queries it directly. Each of these creates a
        hidden dependency that does not appear in the protocol contract but will break when
        either side changes.
      </p>

      <AnalogyBlock title="Power Outlets">
        <p>
          A power outlet and a plug are loosely coupled: the outlet does not know or care what
          device is plugged into it, and the device does not know or care how the electricity
          is generated. The standard defines the interface (voltage, frequency, socket shape),
          and anything that matches the interface works. Devices and grids can be upgraded
          independently. Tight coupling would be like a lamp that can only work with one
          specific power plant.
        </p>
      </AnalogyBlock>

      <PrincipleBlock title="Depend on the Interface, Not the Implementation" number="9.5">
        <p>
          Any behavior that is not documented in the protocol contract should not be relied upon.
          If a tool happens to return results in alphabetical order but does not document that
          ordering, clients must not depend on it. Documenting behavior is a commitment; undocumented
          behavior is noise. Build only on commitments.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-9-1',
            difficulty: 'beginner',
            question: 'An agent parses the text of error messages returned by a tool to extract the error code ("Error 404: Not found"). Why is this tightly coupled, and what would a loosely coupled alternative look like?',
            hint: 'Think about what happens when the error message text changes but the underlying error condition remains the same.',
            solution: 'Parsing error message text is tight coupling because the agent now depends on the specific wording of the message — implementation detail that the tool author may change at any time without considering it a breaking change. A loosely coupled alternative uses a structured error response: a machine-readable error code (e.g., "NOT_FOUND") in a dedicated field, separate from the human-readable message. The agent reads the code field; the message can change freely without breaking anything.'
          },
          {
            id: 'ex9-9-2',
            difficulty: 'intermediate',
            question: 'A tool returns a "metadata" field containing internal system information (server name, build version, processing time). Some clients start logging this data. Why is this a coupling problem, and how should it be handled?',
            hint: 'Consider who owns the metadata field and what happens when the tool removes or restructures it.',
            solution: 'The tool never contracted to provide this metadata, so clients have no right to depend on it. When the tool removes or restructures the field — as it eventually will — those clients break unexpectedly. The problem has two sides: the tool should not be returning undocumented fields, and clients should ignore fields they did not explicitly request and that are not in the documented schema. If clients genuinely need processing time metrics, the right solution is for the tool to add a documented "response_metadata" field with a stable schema that is explicitly part of the contract.'
          },
          {
            id: 'ex9-9-3',
            difficulty: 'advanced',
            question: 'A team is designing a new tool protocol and debating two options: (A) a schema that exactly matches the current tool implementations, or (B) an abstract schema designed around client needs, which tools then implement. Which approach leads to better coupling, and why?',
            hint: 'Think about whose perspective should drive the interface: the implementer or the user?',
            solution: 'Option B leads to better coupling. When the schema mirrors current tool implementations, clients are de facto coupled to those implementations — the schema leaks internal concerns like field names chosen for database convenience or response shapes chosen for server efficiency. When the schema is designed around client needs, tools adapt their responses to match the contract, keeping their internal details private. This is the foundational principle of interface segregation: the interface should be defined by the consumer, not the provider. It forces tool authors to think about what clients actually need rather than what is easiest to expose.'
          }
        ]}
      />
    </div>
  )
}
