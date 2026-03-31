import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function StopConditions() {
  return (
    <div className="prose-agents">
      <h2>Stop Conditions</h2>
      <p>
        An agent without a stop condition is a runaway process. The tool loop gives agents
        the power to iterate, but that power is only useful if the agent knows when to
        stop. Stop conditions are the boundaries that prevent agents from spinning
        endlessly, burning tokens, and never delivering a result. Getting stop conditions
        right is as important as getting the reasoning right.
      </p>

      <ConceptBlock title="Stop Conditions" number="Concept 4.9">
        A stop condition is any rule or signal that causes an agent to end its current
        tool loop and produce a final response. Stop conditions come in three categories:
        natural completion, where the agent determines it has fulfilled the task;
        resource limits, where a budget of tokens, time, or iterations is exhausted;
        and explicit signals, where an external authority — a user, an orchestrator, or
        a safety system — commands the agent to stop.
      </ConceptBlock>

      <AnalogyBlock title="A Chess Clock">
        In competitive chess, a player stops thinking for one of three reasons: they see
        the right move and play it, their clock runs low and forces a quick decision, or
        their opponent offers a draw and they accept. Agents face the same three
        categories of stopping. The ideal is to stop because the work is done. The
        practical reality is that resource limits and external signals are equally
        important — because without them, some tasks would consume resources indefinitely.
      </AnalogyBlock>

      <p>
        Natural completion is the most satisfying stop condition but also the hardest
        to implement reliably. The agent must judge whether its work is truly done, and
        that judgment depends on understanding the original task deeply enough to know
        what "done" looks like. Vague tasks make this judgment harder — "research this
        topic" has no clear endpoint, while "find the error in this function" does.
        Well-designed agent systems encourage specific, completable tasks precisely
        because they produce clearer stop conditions.
      </p>

      <WarningBlock title="The infinite refinement trap">
        Some agents, given open-ended tasks, will endlessly refine their output — making
        small improvements on each iteration without ever declaring the work complete.
        This is not diligence; it is a failure of stop conditions. A well-designed
        runtime sets hard limits on iterations and tokens even when the agent believes
        it can improve further. Perfection is not the goal; delivering useful results
        within bounded resources is.
      </WarningBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'sc-1',
            difficulty: 'beginner',
            question:
              'Name one example of each of the three categories of stop conditions: natural completion, resource limit, and explicit signal.',
            hint: 'Think about everyday situations where work ends for different reasons.',
            solution:
              'Natural completion: the agent finds the answer to a factual question and returns it. Resource limit: the agent has used 90% of its token budget and must respond with what it has. Explicit signal: the user clicks a "cancel" button, sending an interrupt to the runtime that terminates the current loop.',
          },
          {
            id: 'sc-2',
            difficulty: 'intermediate',
            question:
              'Why are vague tasks like "improve this code" harder to stop on than specific tasks like "fix the null pointer exception on line 42"? How would you design a system to handle vague tasks safely?',
            hint: 'Think about what "done" means for each type of task.',
            solution:
              'Specific tasks have observable completion criteria — the exception is fixed or it is not. Vague tasks have no natural endpoint because improvement is always theoretically possible. To handle vague tasks safely: set a maximum iteration count, require the agent to articulate a concrete plan with defined deliverables before starting, and use a "good enough" threshold where the agent must justify further iterations against the value they would add.',
          },
          {
            id: 'sc-3',
            difficulty: 'advanced',
            question:
              'An agent is working on a multi-step task and hits its iteration limit halfway through. It has partial results that are useful but incomplete. Design the behavior the agent should exhibit at this boundary.',
            hint: 'Think about what information the user needs to continue or to decide what to do next.',
            solution:
              'The agent should: (1) recognize it is stopping due to a limit, not completion, and say so explicitly; (2) summarize what it accomplished and what remains undone; (3) present partial results in a usable form rather than discarding them; (4) suggest how to continue — whether by granting more iterations, breaking the remaining work into smaller tasks, or picking up from a checkpoint. The worst outcome is silent truncation where the user cannot tell the work is incomplete.',
          },
        ]}
      />
    </div>
  );
}
