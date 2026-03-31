import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function TestingTools() {
  return (
    <div className="prose-agents">
      <h2>Testing Agent Tools</h2>
      <p>
        An agent is only as reliable as the tools it depends on. Before testing the agent
        as a whole, it is essential to test each tool in isolation. Tool testing is the
        foundation of the agent testing pyramid: if tools behave unreliably, no amount
        of agent-level testing can compensate.
      </p>

      <ConceptBlock title="Tool Testing" number="Concept 12.1">
        Tool testing verifies that each tool behaves correctly across a range of inputs:
        expected inputs, edge cases, and invalid inputs. A tool test checks that
        the tool returns the right output for valid calls, surfaces clear errors for invalid
        calls, and fails loudly rather than silently when something goes wrong.
        Tool tests run without a live agent — they exercise the tool directly.
      </ConceptBlock>

      <AnalogyBlock title="Testing Before Assembly">
        Before a car manufacturer assembles a vehicle, they test every component
        independently: brakes on a test bench, engine under controlled load, electronics
        in isolation. Problems found at this stage are cheap to fix. Problems found after
        assembly are expensive — you must disassemble to reach the faulty part. Agent tool
        testing follows the same logic: find problems before the tools are integrated
        into a running agent.
      </AnalogyBlock>

      <p>
        Tool tests should cover three categories of behavior. First, the happy path:
        valid inputs produce the expected output. Second, error handling: invalid inputs
        produce clear, structured error messages rather than exceptions or silent failures.
        Third, edge cases: boundary conditions, empty inputs, very large inputs, and
        concurrent calls all behave predictably.
      </p>

      <NoteBlock title="Mock External Dependencies" type="tip">
        Tools that call external services — APIs, databases, file systems — should be
        tested with mocks that simulate those services. This makes tests fast, deterministic,
        and runnable without network access or service credentials. The mock should simulate
        both success responses and realistic failure modes so the tool's error handling
        is exercised under test, not first discovered in production.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'tt-1',
            difficulty: 'beginner',
            question: 'What are the three categories of inputs you should test for any agent tool? Give an example test case for each category for a hypothetical "search_database" tool.',
            hint: 'Think about normal use, invalid inputs, and boundary conditions.',
            solution: '(1) Happy path: search_database("customer orders", limit=10) returns a list of up to 10 matching records in the expected format. (2) Error handling: search_database("", limit=10) returns a clear error like {"error": "query must not be empty"} rather than an empty list or an exception. (3) Edge cases: search_database("orders", limit=0) handles a zero limit gracefully; search_database with a query containing special characters does not cause a SQL injection or crash; search_database when the database is unavailable returns a structured error, not a timeout with no message.'
          },
          {
            id: 'tt-2',
            difficulty: 'intermediate',
            question: 'A tool wraps an external API. What should your mock simulate beyond just the successful response?',
            hint: 'Think about the many ways an API call can fail.',
            solution: 'The mock should simulate: (1) successful response with typical data, (2) successful response with empty data (zero results), (3) authentication failure (invalid credentials), (4) rate limiting response (HTTP 429), (5) server error (HTTP 500), (6) network timeout, (7) malformed response body (invalid JSON), (8) partial success where only some requested items were returned. Each failure mode should trigger a different, appropriate behavior in the tool, and the tests should verify these behaviors explicitly.'
          },
          {
            id: 'tt-3',
            difficulty: 'advanced',
            question: 'How do you test a tool that has side effects — for example, a tool that writes a record to a database? What properties must your test environment have?',
            hint: 'Think about isolation between tests and verification of the effect.',
            solution: 'The test environment must: (1) be isolated — each test starts with a known clean state and its changes do not affect other tests; (2) be verifiable — after calling the tool, you can query the environment to confirm the expected change occurred; (3) be rollback-capable — after the test, the environment is reset so the next test starts clean. This typically means using a dedicated test database that is wiped between tests, or transaction-based testing where each test runs in a transaction that is rolled back at the end. Tests must also verify that calling the tool twice does not create duplicate records if the operation is meant to be idempotent.'
          }
        ]}
      />
    </div>
  );
}
