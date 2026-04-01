import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function E2ETesting() {
  return (
    <div className="prose-agents">
      <h2>End-to-End Testing</h2>
      <p>
        Unit tests verify that individual components work in isolation. End-to-end tests
        verify that the entire system — model, tools, orchestration, and environment —
        works together correctly for real tasks. For agents, end-to-end testing is
        particularly challenging because agent behavior is non-deterministic.
      </p>

      <ConceptBlock title="End-to-End Agent Test" number="Concept 12.2">
        An end-to-end agent test runs a complete task through the agent system — from the
        initial user prompt to the final output — and verifies that the result meets
        defined criteria. Unlike unit tests, it exercises the full integration: the model's
        reasoning, tool selection and execution, and the overall trajectory of the task.
        The test is evaluated against outcome criteria, not exact output matching.
      </ConceptBlock>

      <p>
        The key challenge in end-to-end agent testing is that the agent may solve a task
        in multiple valid ways. Requiring an exact output — a specific sequence of tool
        calls in a specific order — makes tests brittle and defeats the purpose of
        evaluation. Instead, end-to-end tests should define success criteria based on
        outcomes: did the task get completed? Was the result correct? Were any harmful
        actions taken?
      </p>

      <PrincipleBlock title="Test Outcomes, Not Trajectories" number="Principle 12.1">
        End-to-end tests for agents should assert on the final state of the world
        after the task completes — the files created, the records modified, the answer
        given — not on the exact sequence of steps the agent took to get there.
        A test that breaks whenever the agent chooses a slightly different but equally
        correct path is not a useful test; it is a brittle constraint.
      </PrincipleBlock>

      <WarningBlock title="Non-Determinism Requires Test Suites, Not Single Tests">
        Because an agent may behave differently on repeated runs of the same prompt,
        a single end-to-end test passing does not mean the agent is reliable. Reliable
        evaluation requires running many trials across diverse scenarios and measuring
        success rates. A single green test is weak evidence; a high success rate across
        a comprehensive test suite is meaningful evidence.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'e2e-1',
            difficulty: 'beginner',
            question: 'Why is asserting on exact tool call sequences a poor approach for end-to-end agent testing?',
            hint: 'Consider what changes when the model is updated or the task can be solved multiple ways.',
            solution: 'An agent may solve a task correctly through many different sequences of tool calls. Asserting on the exact sequence means the test breaks every time the model improves or changes its reasoning strategy, even if the outcome is still correct. It also means the test cannot distinguish between a model that solved the task correctly in a different way and a model that genuinely regressed. Testing outcomes — the final state — captures what actually matters: did the task succeed?'
          },
          {
            id: 'e2e-2',
            difficulty: 'intermediate',
            question: 'Design a success criterion for an end-to-end test of an agent tasked with "find all TODO comments in the project and create a summary document." What would you check?',
            hint: 'Think about both correctness and completeness.',
            solution: 'Success criteria: (1) A summary document exists at the expected location. (2) The document contains all TODO comments present in the source files (completeness — the agent did not miss any). (3) Each entry in the summary correctly attributes the TODO to the right file and line (accuracy). (4) The document uses a consistent, readable format. (5) No source files were modified in the process (no unintended side effects). These criteria can be verified programmatically without inspecting which specific tool calls the agent made.'
          },
          {
            id: 'e2e-3',
            difficulty: 'advanced',
            question: 'How do you evaluate an end-to-end test when the correct answer itself is ambiguous — for example, "improve the readability of this function"?',
            hint: 'Think about using a model as a judge and the properties you want to assess.',
            solution: 'When the correct answer is ambiguous, use a multi-criteria evaluation approach: (1) Define measurable proxy criteria — does the code still pass all tests? Is it shorter? Are variable names more descriptive? (2) Use a second model as a judge, prompted with a rubric, to evaluate the quality of the change. (3) Collect human ratings on a sample to calibrate the automated judge. (4) Set a minimum threshold that the improved version must meet, rather than checking for a specific expected output. This approach accepts that many outputs could be correct and focuses on verifiable properties of goodness.'
          }
        ]}
      />
    </div>
  );
}
