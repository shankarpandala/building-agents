import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function MultiTurnTests() {
  return (
    <div className="prose-agents">
      <h2>Multi-Turn Conversation Tests</h2>
      <p>
        Many agent interactions are not single-shot — they unfold across multiple turns
        of conversation. The agent responds, the user replies, the agent refines its
        approach. Testing this kind of interaction requires a different approach than
        single-turn evaluation: context must be maintained, and correctness depends
        on how the agent handles the evolution of the conversation.
      </p>

      <ConceptBlock title="Multi-Turn Test" number="Concept 12.3">
        A multi-turn test simulates a full conversation between a user and the agent,
        progressing through a predefined or dynamically generated sequence of turns.
        It evaluates not just the final output but intermediate responses and the
        agent's ability to carry context, handle clarifications, correct its course
        when given feedback, and maintain consistency across the conversation.
      </ConceptBlock>

      <AnalogyBlock title="Testing a Live Interview">
        Evaluating a job candidate with a single question is different from evaluating
        them across a full interview. A single question tests one capability in isolation.
        A full interview reveals how they handle follow-up questions, adapt when corrected,
        remember what they said earlier, and maintain coherent reasoning over time.
        Multi-turn testing does the same for agents — it exercises the properties that
        only emerge across a sustained interaction.
      </AnalogyBlock>

      <p>
        Multi-turn tests must simulate a realistic user. One approach is scripted
        conversations — a fixed sequence of user messages that exercise a known scenario.
        A more powerful approach is simulated users — a second model that plays the role
        of the user, responding dynamically to the agent's outputs. Simulated users can
        probe the agent's behavior in ways that scripted tests cannot anticipate.
      </p>

      <NoteBlock title="Test for Context Retention" type="note">
        A key property to evaluate in multi-turn tests is context retention: does the
        agent remember what it learned and decided in earlier turns? An agent that
        "forgets" prior context, contradicts its earlier statements, or asks for
        information the user already provided is failing a fundamental requirement.
        Multi-turn tests should explicitly include scenarios where the agent must
        reference or build on earlier turns to give a correct answer.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'mtt-1',
            difficulty: 'beginner',
            question: 'What can multi-turn tests reveal about an agent that single-turn tests cannot? Give two specific examples.',
            hint: 'Think about properties that only emerge over time in a conversation.',
            solution: '(1) Context retention — whether the agent remembers a detail mentioned in turn 1 when answering a question in turn 5. A single-turn test cannot reveal this. (2) Course correction — whether the agent can update its answer when the user provides correcting information in a follow-up turn. A single-turn test shows only whether the agent gets the answer right the first time, not whether it can recover when initially wrong.'
          },
          {
            id: 'mtt-2',
            difficulty: 'intermediate',
            question: 'What are the trade-offs between scripted multi-turn tests and tests that use a simulated user model?',
            hint: 'Think about control, coverage, and cost.',
            solution: 'Scripted tests: fully deterministic, easy to reproduce failures, cheap to run repeatedly, but only test the exact scenarios the test author anticipated — they cannot discover unexpected failure modes. Simulated user tests: can probe the agent dynamically, discover novel failure modes, and test realistic conversation diversity, but are non-deterministic (may not reproduce the same sequence on every run), more expensive, and harder to write reliable pass/fail criteria for. The best approach combines both: scripted tests for known regression scenarios, simulated users for exploratory coverage.'
          },
          {
            id: 'mtt-3',
            difficulty: 'advanced',
            question: 'An agent is tested in a 10-turn conversation where it successfully completes the task. The same test run 5 more times yields 3 successes and 2 failures. How do you interpret and act on this result?',
            hint: 'Think about what the variability means and what you would investigate.',
            solution: 'A 60% success rate on a single test scenario is a signal to investigate, not accept. First, examine the failure runs: do they fail in the same way (suggesting a systematic flaw) or different ways (suggesting sensitivity to random variation)? If failures cluster around a specific turn, the agent may be mishandling a particular type of user input. If failures are distributed, the prompt or model behavior is unstable. Action steps: increase sample size for a more accurate rate, identify the failure pattern, and either strengthen the prompt, add a guardrail at the failure point, or decompose the task into smaller steps that are each more reliable.'
          }
        ]}
      />
    </div>
  );
}
