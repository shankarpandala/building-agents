import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function PluginArchitecture() {
  return (
    <div className="prose-agents">
      <h2>Plugin Architecture</h2>
      <p>
        No agent can be built with every capability it will ever need at design time.
        Domains evolve, user needs vary, and new integrations emerge constantly. A plugin
        architecture allows an agent to grow its capabilities over time without requiring
        changes to its core.
      </p>

      <ConceptBlock title="Plugin Architecture" number="Concept 11.10">
        A plugin architecture is a design pattern in which a core system provides a
        stable interface for external modules — plugins — to attach additional behavior.
        The core does not need to know what plugins exist at design time. Plugins conform
        to a defined contract, and the core loads and orchestrates them dynamically.
        The agent's capabilities become a function of which plugins are present.
      </ConceptBlock>

      <AnalogyBlock title="The Swiss Army Knife">
        A Swiss Army knife has a fixed handle and a set of attachment slots. Each
        attachment — blade, scissors, screwdriver — plugs into the same slot using the
        same connection mechanism. You can swap attachments in and out, add new ones
        that did not exist when the knife was made, or carry only the ones you need.
        The handle never changes; the capabilities do. A plugin architecture works
        exactly the same way.
      </AnalogyBlock>

      <p>
        The contract between the core agent and its plugins is called the plugin interface.
        This interface defines what operations a plugin must implement, how it declares
        its capabilities, and how it receives and returns data. A well-designed plugin
        interface is stable across versions — plugins written today should continue to
        work even as the core agent evolves.
      </p>

      <PrincipleBlock title="Core Stability, Plugin Flexibility" number="Principle 11.4">
        The core agent should change rarely and carefully. Plugins should change freely.
        This means the plugin interface must be designed conservatively — erring on the
        side of simplicity and generality — because any change to the interface breaks
        all existing plugins. Stability in the core enables an ecosystem of plugins
        to grow around it.
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'pa-1',
            difficulty: 'beginner',
            question: 'What problems does a plugin architecture solve compared to building all capabilities directly into the core agent?',
            hint: 'Think about change, deployment, and the variety of user needs.',
            solution: 'Without plugins, adding new capabilities requires modifying and redeploying the core agent. Every user gets every capability, including ones they do not need. Experimental or domain-specific features are mixed with stable core behavior. With plugins, capabilities are added independently without touching the core, users load only what they need, and risky or experimental features can be isolated in plugins with limited blast radius if they malfunction.'
          },
          {
            id: 'pa-2',
            difficulty: 'intermediate',
            question: 'What properties should a plugin interface have to remain stable over time while still allowing new capabilities to be expressed?',
            hint: 'Think about backward compatibility, versioning, and extension points.',
            solution: 'A stable plugin interface should use explicit versioning so plugins can declare compatibility. New capabilities should be added through opt-in extension points rather than required fields — plugins that do not implement an extension simply do not gain that capability. Required interface methods should be minimal and general. The core should ignore unknown fields from plugins rather than failing. Over time, old interface versions should be deprecated gradually with a sunset timeline rather than removed abruptly.'
          },
          {
            id: 'pa-3',
            difficulty: 'advanced',
            question: 'Two plugins both attempt to handle the same kind of event. How should the core agent resolve this conflict? What are the trade-offs of different resolution strategies?',
            hint: 'Consider priority-based, first-match, and broadcast approaches.',
            solution: 'Three main strategies: (1) Priority-based — plugins declare a priority; the highest-priority handler wins. Simple, but can be fragile if priorities conflict or create unexpected overrides. (2) First-match — the first plugin registered that claims to handle the event is used. Predictable for simple cases but dependent on load order. (3) Broadcast — all interested plugins handle the event independently; results are merged or all applied. Flexible but risks conflicting side effects. The best choice depends on the semantics: for mutually exclusive actions (e.g., responding to a query), priority or first-match is appropriate; for notifications (e.g., logging), broadcast is natural.'
          }
        ]}
      />
    </div>
  );
}
