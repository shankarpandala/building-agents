import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function DiscoveryLoading() {
  return (
    <div className="prose-agents">
      <h2>Plugin Discovery and Loading</h2>
      <p>
        Before a plugin can extend an agent's capabilities, the agent must find it and
        bring it into operation. This process — discovery and loading — involves locating
        available plugins, validating them, and initializing them in a way that is both
        safe and predictable.
      </p>

      <ConceptBlock title="Plugin Discovery" number="Concept 11.11">
        Plugin discovery is the mechanism by which the core agent learns what plugins
        are available. Discovery can be static — a configuration file lists the plugins
        to load — or dynamic — the agent scans a directory, queries a registry, or
        responds to runtime announcements. Each approach trades flexibility against
        predictability and security.
      </ConceptBlock>

      <p>
        Static discovery is simpler and more auditable: the operator explicitly lists
        which plugins are active, and nothing else loads. Dynamic discovery is more
        flexible but requires the agent to evaluate untrusted sources — a directory
        that could contain anything, or a registry that could be compromised. The
        discovery mechanism is a security boundary, not just an engineering convenience.
      </p>

      <NoteBlock title="Load Order Matters" type="note">
        Plugins are often loaded in a specific order, and some plugins may depend on
        others being initialized first. The loading system must handle dependencies
        between plugins — ensuring that if Plugin B requires Plugin A, Plugin A is
        loaded and initialized before Plugin B's initialization begins. Circular
        dependencies must be detected and rejected at load time, not discovered
        at runtime when they cause infinite loops.
      </NoteBlock>

      <WarningBlock title="Never Load Untrusted Plugins Automatically">
        A plugin that loads automatically gains full access to the agent's plugin
        interface, including any sensitive capabilities it exposes. Automatically
        loading plugins from untrusted sources — such as arbitrary directories or
        public registries without verification — is a significant security risk.
        Plugins should be explicitly authorized by the operator before they are
        allowed to load.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'dl-1',
            difficulty: 'beginner',
            question: 'What is the difference between static and dynamic plugin discovery? When would you prefer each?',
            hint: 'Think about control, predictability, and flexibility.',
            solution: 'Static discovery reads a fixed configuration list — the operator explicitly specifies which plugins are active. It is predictable, auditable, and safe: only listed plugins load. Dynamic discovery scans for plugins at runtime based on rules like directory scanning. It is flexible — plugins can be added without reconfiguring — but introduces risk because unknown plugins may load. Prefer static discovery for production deployments where stability and security matter; dynamic discovery is useful during development when plugins change frequently.'
          },
          {
            id: 'dl-2',
            difficulty: 'intermediate',
            question: 'A plugin fails to initialize — it throws an error during its setup phase. What should the loading system do? Should it continue loading other plugins or abort entirely?',
            hint: 'Consider what the plugin provides and whether other plugins or the core depends on it.',
            solution: 'The loading system should distinguish between critical and optional plugins. For critical plugins (required by the core or by other plugins), initialization failure should abort loading entirely and surface a clear error — continuing without a critical dependency is dangerous. For optional plugins, the error should be logged clearly and loading should continue without that plugin. Users should be informed that a plugin failed to load. The system should never silently suppress plugin initialization errors.'
          },
          {
            id: 'dl-3',
            difficulty: 'advanced',
            question: 'Design a plugin verification process that ensures a plugin is safe to load before it runs any code. What checks would you perform?',
            hint: 'Think about both the plugin\'s identity and its behavior before it executes.',
            solution: 'Before loading: (1) Cryptographic signature verification — the plugin must be signed by a known trusted key; unsigned plugins are rejected. (2) Manifest validation — the plugin declares its capabilities, permissions, and dependencies; the manifest is checked for completeness and compatibility with the current core version. (3) Dependency resolution — all declared dependencies are present and at compatible versions. (4) Sandbox pre-check — the plugin\'s declared capabilities are compared against the permissions the operator has granted. At runtime: (5) The plugin runs in a sandbox with only the capabilities it declared; any attempt to use undeclared capabilities fails explicitly.'
          }
        ]}
      />
    </div>
  );
}
