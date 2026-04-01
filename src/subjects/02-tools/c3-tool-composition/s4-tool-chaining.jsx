import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ToolChaining() {
  return (
    <div className="prose-agents">
      <h2>Tool Chaining</h2>
      <p>
        Tool chaining is the practice of feeding the output of one tool directly as the
        input to the next. It is sequential composition made explicit: the tools are
        deliberately designed to connect, with each one's outputs shaped to satisfy the
        next one's input requirements. When done well, chaining creates workflows that
        are powerful, composable, and easy to reason about. When done poorly, it creates
        brittle pipelines where a single unexpected output breaks everything downstream.
      </p>

      <ConceptBlock title="The Chain as a Data Flow" number="Concept 2.13">
        A tool chain can be understood as a data flow: information enters at the first tool,
        is transformed by each successive tool, and exits as a result at the end. At each
        connection between tools, there is an implicit contract: the upstream tool's output
        format must match the downstream tool's input format. Chains break when these formats
        diverge — either because the upstream tool changed, because the agent misread the
        output, or because an error case was not anticipated in the chain's design.
      </ConceptBlock>

      <h3>Designing for Chainability</h3>
      <p>
        Tools that chain well share specific properties. Their outputs are structured and
        predictable — not free-form text that the next tool must parse, but well-typed
        values that the next tool can consume directly. Their error cases are distinct from
        their success cases so the agent can decide whether to continue the chain or abort.
        And their outputs contain the identifiers and references needed to construct the
        next call, without requiring the agent to do complex transformation.
      </p>
      <p>
        A tool that returns a flat string where the next tool expects a structured record
        is not chainable — not cleanly. The agent must act as a translator between them,
        interpreting free text and constructing the required structure. This interpretation
        step is a fragility point: it depends on the agent parsing accurately, which is
        not guaranteed.
      </p>

      <PrincipleBlock title="Design Outputs with Downstream Consumers in Mind" number="Principle 2.11">
        A tool's output format should be designed with the most common downstream use cases
        in mind. If a tool's result is almost always fed into another specific tool, the
        output should be structured to make that next invocation trivial. Tool designers
        who think only about the happy-path return value, and not about how that value will
        be used by the next step, produce tools that are chainable in theory but brittle
        in practice.
      </PrincipleBlock>

      <h3>Chain Length and Fragility</h3>
      <p>
        Long chains are fragile chains. Every link adds a potential failure point. Every
        translation between tools adds a potential misinterpretation. A chain of ten tools
        where each has a 95% success rate has only a 60% chance of end-to-end success.
        This is not a reason to avoid chaining, but it is a reason to minimize unnecessary
        links and to ensure each link in the chain is as reliable as possible.
      </p>
      <p>
        When designing a chain, ask at each link: is this tool the right scope for what
        needs to happen here? Could two tools be merged into one without sacrificing
        important visibility? Could one tool be eliminated by reshaping the upstream
        tool's output? Shorter chains that do the same work are almost always better.
      </p>

      <NoteBlock title="The Translation Tax" type="intuition">
        Every time an agent must interpret or transform a tool's output before passing it
        to the next tool, it pays a translation tax: context is consumed, interpretation
        can fail, and the agent's reasoning is one step further from the original goal.
        Well-designed tool chains minimize this tax by producing outputs that the next
        tool can consume directly, without the agent needing to act as an adapter.
      </NoteBlock>

      <ExerciseBlock
        title="Tool Chaining"
        exercises={[
          {
            id: 'ch-1',
            difficulty: 'beginner',
            question: 'Tool A returns a user object with an "account_id" field. Tool B requires an "accountId" parameter. The agent must connect these. What design problem exists here, and what is the ideal solution?',
            hint: 'Think about whether the agent should be responsible for this transformation.',
            solution: 'The naming inconsistency (snake_case vs camelCase) forces the agent to recognize that "account_id" and "accountId" are the same thing and perform an explicit mapping. This is a minor translation tax — the agent can handle it, but only if it reasons correctly about the equivalence. The ideal solution is to standardize naming conventions across all tools in a toolset so no such mapping is required. The second-best solution is to document the connection explicitly in tool descriptions so the agent knows these map to each other.',
          },
          {
            id: 'ch-2',
            difficulty: 'intermediate',
            question: 'An agent has a three-tool chain: (1) search for products, (2) check inventory for each result, (3) add the available products to a quote. Step 2 must be called once per product from step 1. How does this "fan-out" pattern affect the chain\'s complexity and reliability?',
            hint: 'Think about what happens when there are 20 results from step 1, and what happens if step 2 fails for some of them.',
            solution: 'Fan-out dramatically increases invocation count and introduces partial-failure complexity. With 20 products, step 2 runs 20 times. If 3 of those calls fail (network errors, timeouts), the agent must decide: proceed with the 17 that succeeded, retry the 3, or abort the entire chain. Each partial failure requires a recovery decision. The chain is now substantially more complex than a linear three-step sequence. Design mitigations include: batching (a single "check_inventory_batch" call that accepts multiple IDs), retry logic with idempotency guarantees, and explicit partial-success handling in the chain design.',
          },
          {
            id: 'ch-3',
            difficulty: 'advanced',
            question: 'Explain the difference between a brittle chain (one that breaks when any tool produces an unexpected output) and a resilient chain (one that handles unexpected outputs gracefully). What structural properties distinguish them?',
            hint: 'Think about error path design, validation at each step, and how the agent responds to values outside the expected range.',
            solution: 'A brittle chain assumes every tool returns the expected happy-path output and passes it directly to the next tool. When any tool returns an unexpected value (empty result, partial data, error code embedded in a success response), the next tool receives invalid input and fails in ways that may be hard to trace. A resilient chain validates each tool\'s output before passing it forward: it checks for expected fields, handles empty and error cases explicitly, and has predefined recovery paths for each failure mode. Structural properties of resilient chains: (1) each tool\'s output is validated before the next call; (2) error cases have explicit routing (retry, abort, branch, escalate); (3) the chain can report which step failed and what it received; (4) partial results are explicitly flagged as partial, not silently treated as complete.',
          },
        ]}
      />
    </div>
  );
}
