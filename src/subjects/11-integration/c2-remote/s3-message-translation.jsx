import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function MessageTranslation() {
  return (
    <div className="prose-agents">
      <h2>Message Translation</h2>
      <p>
        When an agent operates across a network boundary, its messages rarely travel
        in the exact format the remote environment expects. Different systems speak
        different protocols, use different data formats, and have different expectations
        about message structure. Message translation is the process of bridging these gaps.
      </p>

      <ConceptBlock title="Message Translation Layer" number="Concept 11.8">
        A message translation layer converts messages from one format or protocol to another
        as they cross a boundary between systems. For remote agent integrations, this layer
        sits between the agent's abstract tool calls and the concrete API or protocol that
        the remote environment understands. It serializes, deserializes, adapts schemas,
        and handles version differences.
      </ConceptBlock>

      <AnalogyBlock title="The Power Adapter">
        When you travel internationally, your devices use the same internal components,
        but the wall socket is different in every country. You use a power adapter — a thin
        layer that translates the socket's format into what your device expects. A message
        translation layer works the same way: both systems continue to operate using their
        native formats; the adapter handles the conversion at the boundary.
      </AnalogyBlock>

      <p>
        Without a translation layer, agent integrations become fragile. Hardcoding the
        remote system's wire format into the agent's logic couples them tightly — when
        the remote system changes its API, the agent must change too. A dedicated
        translation layer isolates this change to one place.
      </p>

      <NoteBlock title="Schema Evolution" type="note">
        Remote systems evolve their APIs over time. A message that was valid last month
        may fail today. The translation layer should be versioned and capable of handling
        multiple API versions simultaneously during migration. It should also degrade
        gracefully: if a field is missing from the remote response, it should use a sensible
        default rather than crashing the agent.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'mt-1',
            difficulty: 'beginner',
            question: 'Why is it better to put message translation in a dedicated layer rather than handling it directly in the agent\'s reasoning logic?',
            hint: 'Think about what happens when the remote system changes its format.',
            solution: 'If the agent handles translation directly, any change to the remote system\'s format requires changing the agent. This conflates two distinct concerns: the agent\'s job is to reason and take actions, not to know the byte layout of a remote API. A dedicated translation layer means API changes are absorbed in one place, the agent stays stable, and the translation logic can be tested independently without running the full agent.'
          },
          {
            id: 'mt-2',
            difficulty: 'intermediate',
            question: 'A remote tool returns a response in a format the translation layer does not recognize — a field has been renamed in a new API version. What should the translation layer do?',
            hint: 'Consider both the immediate response and how the agent should be informed.',
            solution: 'The translation layer should: (1) attempt to identify the response version from metadata or structural hints, (2) map the new field name to the expected internal name if the mapping is deterministic, (3) if unable to translate, return a clear structured error to the agent explaining that the response format was unrecognized, not a garbled partial result. The agent can then decide whether to retry, ask the user, or report the issue. Silent partial translation is worse than a clear failure.'
          },
          {
            id: 'mt-3',
            difficulty: 'advanced',
            question: 'Design a versioning strategy for a message translation layer that must support two active API versions simultaneously during a migration period.',
            hint: 'Think about how to identify which version to use and how to route messages.',
            solution: 'The layer should use version negotiation: on connection establishment, the remote system declares which API versions it supports and the translation layer selects the highest mutually supported version. Each inbound and outbound message carries a version tag. The layer maintains separate translation modules for each supported version and routes messages to the appropriate module. Deprecation warnings are surfaced as structured metadata. Once the old version is unsupported by all remote endpoints, its translation module is removed.'
          }
        ]}
      />
    </div>
  );
}
