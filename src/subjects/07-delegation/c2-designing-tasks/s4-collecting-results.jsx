import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function CollectingResults() {
  return (
    <div className="prose-agents">
      <h2>Collecting and Integrating Sub-Agent Results</h2>
      <p>
        Delegation is not complete when the sub-agent finishes — it is complete when the
        orchestrator has successfully integrated the result into its own reasoning. The
        collection and integration step is where many multi-agent systems silently fail:
        sub-agents finish correctly but their results are misread, incompatibly formatted,
        or ignored when they arrive after the orchestrator has already moved on.
      </p>

      <ConceptBlock title="Result Collection" number="Concept 7.8">
        Result collection is the process by which an orchestrating agent retrieves sub-agent
        outputs and incorporates them into its own state or plan. Collection requires three
        things: <strong>a contract</strong> (both parties agreed on the output format upfront),
        <strong>a retrieval mechanism</strong> (the orchestrator knows how and where to find
        each result), and <strong>a validation step</strong> (the orchestrator checks that
        the result matches the contract before acting on it). Skipping validation is the
        most common collection mistake.
      </ConceptBlock>

      <p>
        Output format contracts deserve explicit attention. If an orchestrator expects a JSON
        object with a specific schema and receives a prose paragraph, it cannot use the result
        without an additional parsing step — which may itself introduce errors. Specifying the
        output format in the brief is an investment that pays off at collection time: it shifts
        the formatting responsibility to the sub-agent, where it is cheaper to enforce.
      </p>

      <PrincipleBlock title="Validate Before You Integrate" number="Principle 7.5">
        Before incorporating a sub-agent's result into downstream reasoning, verify that it
        meets the expected schema and contains the required fields. A malformed or partial
        result silently propagated into a plan is more dangerous than a clearly flagged failure.
        The orchestrator should treat missing or malformed results as explicit failures, not
        as implicit successes.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Handling Partial Results">
        Not every sub-task needs to fully succeed for the overall task to be usable. Design
        collection logic to distinguish between results that are required (the plan cannot
        proceed without them) and results that are enriching (the plan is better with them but
        can proceed without). Treating all results as required creates unnecessary blockage;
        treating all as optional risks producing an output based on incomplete data.
      </NoteBlock>

      <ExerciseBlock
        title="Designing Robust Result Collection"
        exercises={[
          {
            id: 'cr-1',
            difficulty: 'beginner',
            question: 'An orchestrator receives this result from a sub-agent asked to find a product price: "The price is approximately twenty dollars, though it varies by region." Why is this a problematic result, and what output format contract would have prevented it?',
            hint: 'Think about what the orchestrator needs to use this value programmatically.',
            solution: 'The result is ambiguous ("approximately"), imprecise ("twenty dollars" is prose, not a number), and incomplete (no specific region, no currency symbol). A contract would specify: return a JSON object with fields { "price_usd": number, "region": string, "source_url": string, "retrieved_at": ISO-8601 timestamp }. The sub-agent must return structured data the orchestrator can use without additional parsing or interpretation.',
          },
          {
            id: 'cr-2',
            difficulty: 'intermediate',
            question: 'Five sub-agents run in parallel. Two return results quickly; two return results after a long delay; one never returns. How should the orchestrator handle this situation at each of its collection points?',
            hint: 'Think about timeouts, partial collection, and distinguishing required from optional results.',
            solution: 'At the collection point: (1) Check which results are available. Use the two fast results immediately if they are not interdependent with the slow ones. (2) Set a timeout for the two slow agents. If they arrive within the window, integrate them; if not, mark them as timed-out and note the gap. (3) After a second timeout for the non-returning agent, mark it as failed. If its result is required, halt and report failure; if optional, proceed and annotate the output with the missing data. Log all outcomes for observability.',
          },
          {
            id: 'cr-3',
            difficulty: 'advanced',
            question: 'Two sub-agents independently research the same question and return contradictory answers. How should the orchestrator handle this contradiction? Design a resolution strategy that does not simply discard one result.',
            hint: 'Think about using a critic agent, surfacing the contradiction explicitly, or triangulating with a third source.',
            solution: 'Strategy: (1) Surface the contradiction explicitly in the orchestrator\'s state rather than silently picking one answer. (2) Spawn a critic or arbitration sub-agent with both results and the original question, tasked with evaluating which result is better supported or whether both can be true in different contexts. (3) If the critic cannot resolve it, include both results in the final output with appropriate uncertainty framing rather than presenting a false consensus. Contradictions that cannot be resolved should be visible to downstream consumers, not hidden.',
          },
        ]}
      />
    </div>
  );
}
