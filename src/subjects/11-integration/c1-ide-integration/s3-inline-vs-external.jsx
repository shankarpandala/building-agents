import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function InlineVsExternal() {
  return (
    <div className="prose-agents">
      <h2>Inline vs. External Agents</h2>
      <p>
        There are two fundamental ways an agent can be positioned relative to the IDE:
        running inside it as a first-class extension, or running outside it as a separate
        process that interacts with the IDE through an API. Each model has trade-offs that
        shape what the agent can see, do, and how it should be designed.
      </p>

      <ConceptBlock title="Inline Agent" number="Concept 11.3">
        An inline agent runs within the IDE process itself, often as a plugin or extension.
        It has direct access to the IDE's internal APIs — the abstract syntax tree, the
        language server, open editor state, and cursor position. Its integration is tight
        and its latency is low, but it is bound to a specific host environment and update cycle.
      </ConceptBlock>

      <ConceptBlock title="External Agent" number="Concept 11.4">
        An external agent runs as a separate process and communicates with the IDE through
        a defined protocol — typically a local server, a file-watching mechanism, or an
        extension that acts as a relay. It is more portable and easier to test in isolation,
        but the communication boundary introduces latency and limits what the agent can observe.
      </ConceptBlock>

      <p>
        The choice between inline and external often comes down to the richness of context
        required. Tasks that need real-time awareness of editor state — completing the current
        line, suggesting a refactor for the highlighted selection — benefit from inline access.
        Tasks that operate on the project as a whole — analyzing the entire codebase, running
        test suites, managing dependencies — are well-served by an external agent.
      </p>

      <PrincipleBlock title="Match Coupling to Task Scope" number="Principle 11.1">
        The tightness of an agent's integration with its host environment should match the
        scope of the tasks it performs. Tight coupling brings rich context but reduces
        portability. Loose coupling brings portability but narrows perception. Neither is
        universally superior — choose based on the tasks the agent actually needs to do.
      </PrincipleBlock>

      <NoteBlock title="Hybrid Architectures" type="note">
        Many production IDE integrations use both patterns together: a lightweight inline
        extension captures rich editor context and streams it to an external agent process
        that does the heavy reasoning. This separates the concerns of perception (inline)
        from reasoning and action (external), giving both portability and rich context.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ie-1',
            difficulty: 'beginner',
            question: 'Name two tasks that are better suited to an inline agent and two tasks better suited to an external agent. Explain why for each.',
            hint: 'Think about what context each task needs and how quickly it needs to respond.',
            solution: 'Inline: (1) Autocomplete — needs cursor position and surrounding context instantly, latency matters. (2) Hover documentation — needs access to the language server\'s type information in real time. External: (1) Whole-codebase refactoring — needs to read many files, can tolerate latency, should be tested independently. (2) Dependency auditing — reads package manifests and calls external registries, no need for editor state.'
          },
          {
            id: 'ie-2',
            difficulty: 'intermediate',
            question: 'What are the testing implications of inline vs. external agent architectures? Which is easier to test, and why?',
            hint: 'Consider what you need to have running to test each type.',
            solution: 'External agents are far easier to test because they are independent processes with a well-defined interface. Tests can mock the IDE side of the communication boundary without launching an actual IDE. Inline agents require either a running IDE instance or a complex test harness that simulates the IDE\'s internal APIs. This makes inline agents slower to develop, harder to regression-test, and more fragile when the host IDE changes its internal structure.'
          },
          {
            id: 'ie-3',
            difficulty: 'advanced',
            question: 'In a hybrid architecture where an inline extension feeds context to an external agent, what protocol design decisions matter most? What could go wrong at the boundary?',
            hint: 'Think about serialization, freshness, and ordering of events.',
            solution: 'Key decisions: (1) Serialization format — context must be efficiently serialized to minimize latency. (2) Freshness — the agent must know whether the context it received is stale; rapid edits can produce many events and the agent must handle or discard out-of-date snapshots. (3) Ordering — events from the editor must arrive in order; dropped or reordered events produce incorrect context. (4) Cancellation — if the user changes their intent before the agent responds, the prior request must be cancelled cleanly.'
          }
        ]}
      />
    </div>
  );
}
