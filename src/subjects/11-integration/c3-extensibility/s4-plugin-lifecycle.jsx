import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function PluginLifecycle() {
  return (
    <div className="prose-agents">
      <h2>Plugin Lifecycle</h2>
      <p>
        A plugin is not simply loaded and left running indefinitely. It moves through a
        series of states from discovery to deactivation, and managing these transitions
        correctly is essential for a stable and safe agent system.
      </p>

      <ConceptBlock title="Plugin Lifecycle" number="Concept 11.13">
        The plugin lifecycle describes the sequence of states a plugin passes through:
        discovery, validation, initialization, active operation, deactivation, and unloading.
        Each transition has defined entry conditions and actions the system must take.
        A plugin that skips steps — going directly from loading to active operation
        without proper initialization — is a source of subtle and hard-to-diagnose bugs.
      </ConceptBlock>

      <p>
        The most important transitions are initialization and deactivation. Initialization
        is where the plugin sets up its state, connects to external services, and registers
        its capabilities with the core. Deactivation is where it cleans up: closing
        connections, releasing resources, and unregistering its capabilities. A plugin
        that does not deactivate cleanly leaves the agent in a degraded state — orphaned
        connections, registered capabilities that no longer function, or leaked memory.
      </p>

      <PrincipleBlock title="Clean Deactivation Is Not Optional" number="Principle 11.5">
        Every plugin must have a defined deactivation procedure that runs when the plugin
        is removed, the agent is shutting down, or an error forces the plugin offline.
        Deactivation is not an edge case to implement later — it is as important as
        initialization. A system that handles startup but not shutdown will accumulate
        damage over time.
      </PrincipleBlock>

      <NoteBlock title="Hot Reloading" type="tip">
        In some environments, plugins can be updated and reloaded without restarting
        the entire agent. This is called hot reloading. It requires that the deactivation
        of the old version and the initialization of the new version happen atomically
        from the agent's perspective — with no window where neither version is active
        and requests fail. Hot reloading is powerful but requires careful lifecycle
        management to avoid race conditions.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'pl-1',
            difficulty: 'beginner',
            question: 'List the stages of a plugin lifecycle and describe what the agent system should do at each transition.',
            hint: 'Think about discovery, initialization, active state, and shutdown.',
            solution: 'Discovery: agent finds the plugin and reads its manifest. Validation: manifest is checked for compatibility and signature is verified. Initialization: plugin\'s setup code runs, resources are acquired, capabilities are registered. Active: plugin handles events and provides capabilities normally. Deactivation: capabilities are unregistered, in-flight requests are completed or rejected gracefully, resources are released. Unloading: the plugin\'s memory and handles are fully removed from the agent process.'
          },
          {
            id: 'pl-2',
            difficulty: 'intermediate',
            question: 'A plugin is deactivated while it is in the middle of handling a long-running operation. How should this be managed?',
            hint: 'Think about in-flight work and the options for handling it.',
            solution: 'The deactivation process should first signal the plugin to stop accepting new work. Any in-flight operations can either be allowed to complete within a defined timeout (graceful shutdown) or cancelled with a structured error returned to the caller. The choice depends on the operation type: operations with visible side effects (writing files, sending messages) should complete if possible. After the timeout or completion, the plugin cleans up remaining resources. The caller must receive a clear error for any cancelled operation rather than silence.'
          },
          {
            id: 'pl-3',
            difficulty: 'advanced',
            question: 'Design a versioning strategy for a plugin that allows the agent to upgrade the plugin from v1 to v2 without dropping any in-flight requests.',
            hint: 'Think about running both versions simultaneously during the transition.',
            solution: 'Use a blue-green approach: initialize the new (v2) plugin before deactivating the old (v1) plugin. Route all new incoming requests to v2. Allow v1 to continue handling its in-flight requests until they complete or time out. Once v1 has no active requests, deactivate it. This requires the capability registration system to support multiple versions of the same plugin simultaneously with request routing logic. The handoff window should be bounded by a maximum timeout after which v1 is forcefully deactivated and its remaining requests are cancelled.'
          }
        ]}
      />
    </div>
  );
}
