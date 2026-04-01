import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function PluginsAddCapabilities() {
  return (
    <div className="prose-agents">
      <h2>How Plugins Add Capabilities</h2>
      <p>
        Plugins extend an agent in specific ways defined by the plugin interface. The
        most common extensions are new tools, new knowledge sources, and new behaviors
        for handling particular kinds of requests. Understanding how these extensions
        work helps both plugin authors and agent designers build systems that compose well.
      </p>

      <ConceptBlock title="Capability Extension" number="Concept 11.12">
        A plugin extends agent capabilities by registering new handlers with the core.
        A tool plugin registers a new callable action — the agent can now invoke it.
        A knowledge plugin registers a new retrieval source — the agent can now query it.
        A behavior plugin registers a new response pattern for specific request types.
        In each case, the extension is additive: the core's existing capabilities
        remain intact and the new capability augments them.
      </ConceptBlock>

      <p>
        The key design principle behind additive extension is that plugins should not
        need to modify the core to add their capabilities. If a plugin must reach into
        the core and change its behavior to function, the plugin interface is poorly
        designed. A well-designed interface provides clean hooks that plugins attach
        to without touching core logic.
      </p>

      <AnalogyBlock title="The Electrical Outlet">
        Plugging a lamp into the wall does not change the house's wiring. The electrical
        system provides a standard socket; the lamp connects to it and gains access to
        power. The house does not need to know what kind of lamp will be plugged in —
        it only needs to provide the right outlet interface. Capability extension
        works the same way: the agent provides the socket; the plugin brings the lamp.
      </AnalogyBlock>

      <NoteBlock title="Composing Plugins" type="tip">
        Plugins that each add a single focused capability compose well: an agent with
        ten focused plugins is predictable and debuggable. Plugins that try to do many
        things or that override broad swaths of agent behavior compose poorly — they
        conflict with each other and with the core in ways that are hard to anticipate.
        Plugin design benefits from the same single-responsibility thinking that applies
        to tools and agents generally.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'pc-1',
            difficulty: 'beginner',
            question: 'What are three different types of capabilities a plugin might add to an agent? Give a concrete example of each.',
            hint: 'Think about tools, knowledge, and behavior patterns.',
            solution: '(1) New tool: a weather plugin that adds a get_weather action the agent can call when answering questions about conditions. (2) New knowledge source: a documentation plugin that registers a retrieval function allowing the agent to search an internal wiki. (3) New behavior: a formatting plugin that intercepts code-related responses and adds syntax highlighting, changing how the agent presents certain outputs.'
          },
          {
            id: 'pc-2',
            difficulty: 'intermediate',
            question: 'Why is it important that plugins add capabilities additively rather than modifying the core? What goes wrong when plugins patch core behavior directly?',
            hint: 'Think about multiple plugins interacting and debugging.',
            solution: 'When plugins modify core behavior directly, their changes interact unpredictably. Plugin A patches function X; Plugin B also patches function X; the result depends on load order and is not what either plugin intended. Debugging is nearly impossible because the source of unexpected behavior is hidden inside patches. Additive extension avoids this: each plugin adds to a defined registry without touching shared code. The core\'s behavior remains stable regardless of which plugins are loaded.'
          },
          {
            id: 'pc-3',
            difficulty: 'advanced',
            question: 'A plugin wants to add a capability that requires modifying how the agent formats all its responses. How should this be handled in a well-designed plugin architecture?',
            hint: 'Think about hooks, middleware, and whether "all responses" is the right scope.',
            solution: 'The plugin interface should provide a response-processing hook — a middleware layer that plugins can register into. This hook is called for each response and plugins in the chain can transform it. This is additive: the plugin adds itself to the processing chain without modifying core response logic. The agent developer must design this hook explicitly; if no hook exists, the plugin author should request it as a core extension rather than patching the core themselves. Additionally, the plugin should scope its transformation narrowly — applying it only to response types where it is appropriate, not truly to all responses.'
          }
        ]}
      />
    </div>
  );
}
