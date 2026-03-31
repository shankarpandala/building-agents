import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ChoosingRightTool() {
  return (
    <div className="prose-agents">
      <h2>Choosing the Right Tool</h2>
      <p>
        An agent rarely has just one tool. In most real systems, it has access to a set of
        tools — sometimes a large one — and must decide at each step which tool, if any, is
        the right one to invoke. Tool selection is one of the most frequent reasoning tasks an
        agent performs, and one of the most consequential. Choosing poorly wastes computation,
        corrupts state, or misses the actual need entirely.
      </p>

      <ConceptBlock title="Tool Selection as Reasoning" number="Concept 2.10">
        Choosing the right tool is not a lookup operation — it is a reasoning problem. The
        agent must interpret the current goal, understand what each candidate tool does, assess
        whether the current state satisfies each tool's preconditions, and evaluate the risks of
        invocation versus inaction. This is a multi-dimensional judgment that benefits from the
        same careful reasoning the agent applies to any other decision.
      </ConceptBlock>

      <h3>The Tool Selection Decision Surface</h3>
      <p>
        When an agent considers which tool to use, it should be reasoning along at least
        these dimensions:
      </p>
      <ul>
        <li>
          <strong>Relevance:</strong> Does this tool address the actual need, or just
          something adjacent to it? Overfitting to a tool that is "close enough" is a
          common failure mode.
        </li>
        <li>
          <strong>Preconditions:</strong> Are the conditions for this tool's correct operation
          currently satisfied? Invoking a tool whose preconditions are not met often produces
          misleading results or silent failures.
        </li>
        <li>
          <strong>Risk:</strong> How reversible is this tool's action? Does the current level
          of certainty justify taking an action of this consequence?
        </li>
        <li>
          <strong>Alternatives:</strong> Is there a different tool that accomplishes the goal
          with lower risk, fewer assumptions, or a more appropriate scope?
        </li>
      </ul>

      <PrincipleBlock title="When in Doubt, Do Less" number="Principle 2.8">
        When an agent is uncertain which tool is correct, the right default is to do less —
        to gather more information before committing to an action, or to surface the ambiguity
        rather than guess. An agent that invokes the wrong tool "just to see what happens"
        risks real-world side effects that cannot be easily undone. Uncertainty about which
        tool to use is almost always a signal to pause and reason more carefully.
      </PrincipleBlock>

      <h3>Avoiding Tool Overreach</h3>
      <p>
        Tool overreach occurs when an agent uses a more powerful tool than the situation
        requires. An agent that has access to a "delete all records matching criteria" tool
        should not use it when a "delete this specific record by ID" tool is available and
        sufficient. More power means more potential for accidental harm.
      </p>
      <p>
        The principle of least privilege applies to tool selection: use the tool with the
        narrowest scope that accomplishes the goal. This limits the blast radius of errors,
        makes behavior easier to audit, and produces workflows that are easier to reason
        about after the fact.
      </p>

      <NoteBlock title="The Closest Tool Is Not Always the Right Tool" type="tip">
        Agents often select tools based on surface similarity — the tool's name sounds related
        to the task, so they try it. This is a brittle selection strategy. A better approach
        is to reason from the outcome first: what state needs to exist after this step? Then
        find the tool whose postconditions describe that state most precisely. Working backward
        from the desired outcome produces more accurate tool selection than pattern-matching
        on names.
      </NoteBlock>

      <ExerciseBlock
        title="Choosing the Right Tool"
        exercises={[
          {
            id: 'crt-1',
            difficulty: 'beginner',
            question: 'An agent needs to find all customers who placed orders last month. It has access to: "search_customers" (searches by name or email), "get_customer_by_id" (retrieves a single record), and "query_orders_by_date_range" (returns order records with customer IDs for a given time period). Which tool should it use first, and why?',
            hint: 'Think about what information the agent currently has and what each tool actually retrieves.',
            solution: '"query_orders_by_date_range" is the right first tool. The agent does not know the names or IDs of customers who ordered last month — it only knows the time period. This tool retrieves order records (which include customer IDs) for that period. Then, if needed, the agent can use those IDs with "get_customer_by_id". Using "search_customers" first would require knowing customer identifiers the agent does not yet have.',
          },
          {
            id: 'crt-2',
            difficulty: 'intermediate',
            question: 'An agent is 80% confident it knows which record to delete, but not 100% certain. It has both a "delete_record_by_id" tool and a "get_record_by_id" tool. What should it do, and why does the level of certainty matter for tool selection?',
            hint: 'Consider the reversibility of each tool and what an error means in each case.',
            solution: 'The agent should use "get_record_by_id" first to confirm the record matches expectations before deleting. An 80% confidence level is insufficient for an irreversible action. If deletion is wrong, the data is gone. By retrieving first, the agent spends one extra step to raise its confidence near 100% before committing to the destructive action. The level of certainty required before taking an action should be proportional to the reversibility of that action.',
          },
          {
            id: 'crt-3',
            difficulty: 'advanced',
            question: 'Describe a scenario where an agent has two tools that could both technically accomplish a goal, but choosing the wrong one leads to a subtle long-term problem rather than an immediate error. What principle should guide the choice?',
            hint: 'Think about side effects, state accumulation, and downstream assumptions.',
            solution: 'Example: an agent can update a record by using either "update_full_record" (replaces all fields) or "patch_record_field" (updates one field). Both can set the same target field to the desired value. But "update_full_record" silently overwrites every other field with whatever the agent currently has in context — which may be stale. Over time, concurrent updates cause data loss. The subtlety is that no individual call fails; the error accumulates. The guiding principle: prefer the narrowest-scope tool that achieves the goal. "patch_record_field" is correct here because it does exactly and only what is needed, without implicit side effects on unrelated state.',
          },
        ]}
      />
    </div>
  );
}
