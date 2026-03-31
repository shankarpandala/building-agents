import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ToolContract() {
  return (
    <div className="prose-agents">
      <h2>The Tool Contract</h2>
      <p>
        Every tool embodies an implicit agreement between the tool designer and the agents
        that use it. This agreement — the tool contract — defines what the tool promises to do,
        what it requires in return, and how it will behave when things go wrong. When this
        contract is clear and honored, agents can reason confidently. When it is vague or
        violated, agents fail in ways that are hard to diagnose and harder to fix.
      </p>

      <ConceptBlock title="The Tool Contract" number="Concept 2.4">
        A tool contract has three parts. The precondition defines what must be true for the
        tool to operate correctly — valid inputs, required permissions, necessary state.
        The postcondition defines what will be true after a successful invocation — what changed,
        what was returned, what can be relied upon. The invariant defines what the tool will
        never do — what it will not touch, what it will not break, regardless of inputs.
        Together these three parts define the boundary of safe use.
      </ConceptBlock>

      <h3>Why Contracts Matter for Agents</h3>
      <p>
        Human developers can read documentation, ask colleagues, and run experiments to
        understand how a tool behaves. Agents primarily learn from the tool's name, description,
        and schema. If those signals are incomplete or misleading, the agent cannot reason
        correctly about whether to invoke the tool, what inputs to provide, or what to do
        with the result.
      </p>
      <p>
        The tool contract is not just internal documentation — it is the agent's primary
        interface to understanding what the tool does. A well-specified contract allows an
        agent to plan accurately. A missing or broken contract forces the agent to guess.
        Guessing in a tool-invocation context has real-world consequences.
      </p>

      <PrincipleBlock title="Honor the Contract Completely" number="Principle 2.2">
        A tool that violates its own contract is more dangerous than a tool that fails outright.
        When a tool fails, the agent knows something went wrong. When a tool silently violates
        its postconditions — modifying state it said it would not touch, returning results that
        do not reflect its stated behavior — the agent reasons confidently on false ground.
        Contract violations are the hardest bugs to find and fix.
      </PrincipleBlock>

      <h3>Specifying Good Preconditions</h3>
      <p>
        Preconditions should be stated explicitly in the tool's description: what inputs are
        required, what format they must be in, what assumptions the tool makes about the state
        of the world when it is called. The more precisely a precondition is stated, the better
        the agent can determine whether calling the tool right now is appropriate.
      </p>
      <p>
        A tool that fails silently when preconditions are violated is dangerous. A tool that
        checks its preconditions and returns a clear error when they are not met is safe.
        The agent receives honest information and can adapt its plan accordingly.
      </p>

      <WarningBlock title="Partial Contracts Are Contract Violations">
        A tool description that says "retrieves user data" but does not specify what happens when
        the user does not exist, when permissions are insufficient, or when the service is
        unavailable is a partial contract. The agent will guess about these cases — and often
        guess wrong. Every significant edge case in a tool's behavior deserves explicit treatment
        in its contract.
      </WarningBlock>

      <ExerciseBlock
        title="Understanding Tool Contracts"
        exercises={[
          {
            id: 'tc-c-1',
            difficulty: 'beginner',
            question: 'For a hypothetical "delete_file" tool, specify: (a) two preconditions the tool should check, (b) two postconditions that should hold after successful execution, and (c) one invariant — something the tool must never do regardless of inputs.',
            hint: 'Think about what must be true before, what must be true after, and what absolute limits the tool must respect.',
            solution: '(a) Preconditions: the file path must exist and be valid; the calling agent must have write permission to that location. (b) Postconditions: the file no longer exists at that path; any locks or handles held to the file are released. (c) Invariant: the tool must never delete files outside the allowed working directory, regardless of what path is provided.',
          },
          {
            id: 'tc-c-2',
            difficulty: 'intermediate',
            question: 'An agent receives the result from a "calculate_discount" tool and uses it to generate an invoice. The tool\'s description says it "applies the correct discount for the customer tier." Later it emerges the tool was applying last year\'s discount rates. Which part of the contract failed, and what was the downstream consequence?',
            hint: 'Focus on the postcondition and what the agent assumed was guaranteed.',
            solution: 'The postcondition failed: the tool implied it would return the correct current discount, but actually returned stale data. The agent reasonably assumed the result was accurate and built the invoice on top of it. Every invoice generated in that period was incorrect. The agent had no way to detect this because the tool returned a result without error — a postcondition violation is invisible from the outside.',
          },
          {
            id: 'tc-c-3',
            difficulty: 'advanced',
            question: 'How does the concept of a tool contract relate to composability? When you chain tools together, what guarantees must each tool\'s contract provide for the composition to be reliable?',
            hint: 'Think about how one tool\'s postconditions become the next tool\'s preconditions.',
            solution: 'In a tool chain, the postconditions of each tool must satisfy the preconditions of the next. If tool A promises to return a validated user ID, and tool B requires a validated user ID, the chain is reliable only if tool A\'s postcondition guarantee is truly upheld. Any gap between what one tool promises and what the next tool requires is a potential failure point. Reliable composition requires that contracts be precise enough to verify these transitions, not just vague enough to seem compatible.',
          },
        ]}
      />
    </div>
  );
}
