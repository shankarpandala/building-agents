import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ExposingCapabilities() {
  return (
    <div className="prose-agents">
      <h2>Exposing Capabilities as a Server</h2>
      <p>
        When an agent or service acts as a protocol server, it publishes capabilities that other
        agents can discover and invoke. The quality of that publication — how accurately it
        describes inputs, outputs, and behavior — determines whether clients can use those
        capabilities effectively or will constantly encounter surprises.
      </p>

      <ConceptBlock title="Capability Exposition" number="9.6">
        <p>
          Exposing a capability through a protocol means providing a machine-readable description
          of what the capability does, what it accepts as input, what it returns, what errors it
          can produce, and any constraints on how it should be called. The description is a contract:
          clients are entitled to rely on it, and servers are obligated to honor it.
        </p>
      </ConceptBlock>

      <p>
        The most common failure in capability exposition is over-simplification: describing a tool
        as doing one thing when it actually does several subtly different things depending on which
        inputs are provided. This forces clients to discover the nuance through trial and error
        rather than through documentation. The discipline of writing capability descriptions is
        partly the discipline of forcing yourself to be honest about what your tool actually does.
      </p>

      <AnalogyBlock title="A Job Posting">
        <p>
          When a company publishes a job posting, they describe required skills, responsibilities,
          and working conditions. A vague or inaccurate posting wastes everyone's time — candidates
          apply for jobs they are not suited for, and the company interviews people who cannot do
          the work. A precise posting attracts the right candidates and sets correct expectations.
          Tool capability descriptions work the same way: precision serves everyone.
        </p>
      </AnalogyBlock>

      <WarningBlock title="Side Effects Must Be Declared">
        <p>
          Any capability that modifies state, sends messages, charges money, or has any effect
          beyond returning data must declare those side effects explicitly. Clients have no way
          to infer that calling a tool will trigger an external action unless the description
          says so. Undeclared side effects are one of the most common sources of agent errors.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-6-1',
            difficulty: 'beginner',
            question: 'A tool sends a notification to a user\'s email. What information must its capability description include that a purely read-only tool would not need?',
            hint: 'Think about what a client needs to know before calling a tool that will reach out to another person.',
            solution: 'The description must declare: (1) That the tool sends an email — the external side effect. (2) Who receives the email — is it a fixed address, or does the caller specify? (3) Whether the send can be undone — it cannot, so the tool is non-reversible. (4) Any rate limits or deduplication behavior — calling it twice may send two emails. (5) Whether sending can fail silently (e.g., if the address is invalid). A read-only tool need only describe its inputs and outputs; a side-effecting tool must also describe its reach and consequences.'
          },
          {
            id: 'ex9-6-2',
            difficulty: 'intermediate',
            question: 'A developer exposes a search tool that returns different result counts based on undocumented business logic (e.g., premium users get more results). How does this inconsistency affect clients, and how should it be handled in the capability description?',
            hint: 'Consider how the client would plan its next action based on the expected response shape.',
            solution: 'Clients that receive different result counts than expected may either under-paginate (thinking they have seen all results when they have not) or over-paginate (requesting more pages that do not exist). The inconsistency breaks the client\'s ability to plan correctly. The capability description should explicitly document the result-count variability — ideally by exposing a "max results" field in the response, or by describing the factors that affect it. If the business logic cannot be documented, the tool should be split into variants that behave consistently, or the variable behavior should be surfaced through response metadata rather than hidden.'
          },
          {
            id: 'ex9-6-3',
            difficulty: 'advanced',
            question: 'You are designing a server that exposes three related capabilities: create, update, and delete for a resource type. What shared schema elements should appear in all three descriptions, and what is unique to each? How would you structure the capability descriptions to minimize redundancy while keeping them self-contained?',
            hint: 'Think about common input fields (like resource ID), common error conditions, and the different side effect profiles of each operation.',
            solution: 'Shared elements: resource identifier (required for update and delete, returned by create), authentication context, and common error types (unauthorized, not found, service unavailable). Unique to create: the full input schema for the new resource, the returned ID, and the fact that the resource did not previously exist. Unique to update: which fields are mutable versus immutable, partial vs. full update semantics. Unique to delete: whether deletion is soft or hard, whether it cascades, and whether it is reversible. Structuring: define a shared base schema for common fields and error types, then compose it into each operation description. Self-containment matters more than avoiding repetition — clients should be able to read one description without needing to cross-reference others.'
          }
        ]}
      />
    </div>
  )
}
