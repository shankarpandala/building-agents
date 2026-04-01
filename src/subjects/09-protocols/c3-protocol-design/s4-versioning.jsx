import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function Versioning() {
  return (
    <div className="prose-agents">
      <h2>Protocol Versioning and Evolution</h2>
      <p>
        Protocols are not static. Tools evolve, capabilities are added, schemas change, and
        bugs are fixed. A protocol that cannot accommodate change becomes a constraint that
        prevents the tools that implement it from improving. Versioning is the mechanism that
        allows a protocol to evolve without breaking existing participants.
      </p>

      <ConceptBlock title="Protocol Versioning" number="9.12">
        <p>
          Protocol versioning is the practice of labeling each iteration of a protocol's
          contract so that clients and servers can negotiate which version they will use to
          communicate. Versioning separates the question of "what is the latest protocol"
          from "what version are we actually using in this conversation," allowing new and
          old participants to coexist during transitions.
        </p>
      </ConceptBlock>

      <p>
        Changes to a protocol fall into two categories. <strong>Non-breaking changes</strong>
        add new optional fields, new error codes, or new capabilities — existing clients can
        ignore what they do not understand, and the protocol remains backward compatible.
        <strong> Breaking changes</strong> remove required fields, rename them, change their
        semantics, or remove capabilities — any client relying on the old behavior will fail.
        Good protocol design maximizes non-breaking evolution and gives ample notice before
        breaking changes take effect.
      </p>

      <PrincipleBlock title="Be Conservative in What You Remove" number="9.8">
        <p>
          Adding to a protocol is almost always safe. Removing from a protocol breaks clients
          that depend on what was removed. The cost of removing a capability or field is always
          paid by the clients — not the server. This asymmetry means servers should be very
          reluctant to remove things and should provide long deprecation windows before doing so.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Semantic versioning for protocols" type="note">
        <p>
          Semantic versioning (major.minor.patch) maps naturally to protocol changes:
          patch versions for bug fixes with no schema changes, minor versions for backward-compatible
          additions, and major versions for breaking changes. Clients can express their compatibility
          range ("I support v2.0 through v2.x") and servers can advertise which versions they support,
          enabling clean negotiation.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-12-1',
            difficulty: 'beginner',
            question: 'Classify each of these protocol changes as breaking or non-breaking, and explain why: (a) adding an optional "tags" field to a response, (b) renaming "user_id" to "userId" in a request schema, (c) adding a new optional query parameter, (d) changing an error code from 404 to 422 for invalid input.',
            hint: 'A change is breaking if any existing client that was working correctly before will fail or behave incorrectly after the change.',
            solution: '(a) Non-breaking: clients that do not use the new field can ignore it. (b) Breaking: any client that sends "user_id" will now be sending an unrecognized field — the request will likely fail. (c) Non-breaking: existing clients that do not send the new parameter continue to work as before. (d) Breaking: clients that check for 404 to detect invalid input will no longer trigger on 422, causing them to handle the error incorrectly. Even changes that seem minor — like error code values — are breaking if clients rely on specific values.'
          },
          {
            id: 'ex9-12-2',
            difficulty: 'intermediate',
            question: 'A tool server wants to rename a required field in its response schema. It cannot break existing clients. Design a migration plan that allows old clients to keep working while new clients use the new field name.',
            hint: 'Think about how to provide both field names simultaneously during a transition period.',
            solution: 'A dual-field transition: (1) In the next minor version, add the new field name alongside the old one — both are present in responses. Document the old field as deprecated with a sunset date. (2) Communicate the deprecation to all known clients with the timeline. (3) After the deprecation window (long enough for all clients to update), release a new major version that removes the old field name. Clients that have updated will use the new name; clients that have not updated continue to use the old name during the window. The key principle: never remove until all clients have had reasonable opportunity to migrate, and never assume silence means they have updated.'
          },
          {
            id: 'ex9-12-3',
            difficulty: 'advanced',
            question: 'Design a version negotiation mechanism for an agent-tool protocol. When a client connects to a server, how should they agree on which protocol version to use? What should happen if there is no overlap between the versions each supports?',
            hint: 'Consider negotiation patterns from existing protocols (like TLS or HTTP/2) and what information each side needs to declare.',
            solution: 'Negotiation mechanism: (1) The client sends a capability declaration on first connection containing its supported version range (e.g., min: "2.0", max: "3.1") and any optional feature flags it supports. (2) The server responds with the highest version within the overlap range that it supports, or an explicit rejection if no overlap exists. (3) Both parties use the negotiated version for all subsequent communication in the session. If there is no overlap: the server returns a "version mismatch" error specifying the range it supports. The client can either fail gracefully (surfacing the version mismatch to a human or orchestrator) or, if it supports adapter logic, attempt to bridge the gap. The key is that the error message must be machine-readable — including the server\'s supported range — so the client can surface a meaningful diagnostic rather than a generic connection failure.'
          }
        ]}
      />
    </div>
  )
}
