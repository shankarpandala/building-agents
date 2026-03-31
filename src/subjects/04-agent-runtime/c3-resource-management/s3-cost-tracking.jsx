import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function CostTracking() {
  return (
    <div className="prose-agents">
      <h2>Cost Tracking</h2>
      <p>
        Agent work is not free. Every model request consumes tokens, and tokens cost money.
        Every tool call takes time, and time has a cost. Every session consumes compute
        resources that could be used for other work. A production agent system must track
        these costs explicitly — not as an afterthought, but as a core part of the runtime
        that influences decisions about how and whether to continue working.
      </p>

      <ConceptBlock title="Cost Dimensions" number="Concept 4.13">
        Agent cost has three primary dimensions. Token cost is the direct expense of model
        inference, measured in input and output tokens and priced by the model provider.
        Time cost is the wall-clock duration of agent work, which affects user experience
        and system throughput. Compute cost includes tool execution, network calls, and
        any infrastructure the agent depends on. A complete cost picture includes all
        three dimensions, because optimizing for one while ignoring the others leads to
        poor tradeoffs.
      </ConceptBlock>

      <AnalogyBlock title="A Taxi Meter">
        A taxi meter tracks cost along two dimensions simultaneously: distance traveled
        and time elapsed. The passenger can see the fare accumulating and make decisions
        accordingly — choosing a shorter route, deciding the destination is too expensive,
        or budgeting for the final amount. Agent cost tracking serves the same purpose:
        making the accumulating cost visible so that the runtime, the operator, and
        potentially the user can make informed decisions about continuing, pausing, or
        stopping the work.
      </AnalogyBlock>

      <p>
        Cost tracking is not just about billing. It is a control mechanism. When the
        runtime knows how much a session has cost so far, it can enforce budgets, trigger
        compaction when costs rise too fast, choose cheaper tools or models for simpler
        subtasks, and warn users before expensive operations. Without cost tracking, agents
        operate as open-ended spending machines with no feedback loop between effort and
        expense.
      </p>

      <PrincipleBlock title="Cost Should Influence Strategy" number="Principle 4.13">
        The runtime should not just record cost — it should use cost as an input to
        decision-making. An agent approaching its budget limit should prefer cheaper
        strategies, summarize rather than explore, and prioritize delivering a useful
        partial result over pursuing completeness at any price. Cost-aware agents
        allocate their budget to the highest-value actions.
      </PrincipleBlock>

      <NoteBlock title="Input vs. output token pricing" type="info">
        Most model providers charge more per output token than per input token. This
        means verbose agent responses are disproportionately expensive. A cost-aware
        runtime tracks input and output tokens separately and may encourage concise
        responses when the budget is tight — not by limiting quality, but by avoiding
        unnecessary elaboration.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ct-1',
            difficulty: 'beginner',
            question:
              'Why is tracking only token cost insufficient for understanding the full cost of an agent session?',
            hint: 'Think about what else the agent consumes besides tokens.',
            solution:
              'Token cost captures model inference expense but misses time cost (a session that takes ten minutes costs the user\'s time and blocks system resources) and compute cost (tool executions, API calls to external services, database queries). An agent might use few tokens but call an expensive external API twenty times, or take five minutes of wall-clock time for a task the user expected to take thirty seconds. All three dimensions matter.',
          },
          {
            id: 'ct-2',
            difficulty: 'intermediate',
            question:
              'An agent is given a task with a budget of one dollar. After five tool loop iterations, it has spent sixty cents. The task is roughly half complete. Should the agent continue, and what factors should inform its decision?',
            hint: 'Think about the rate of spending versus the rate of progress.',
            solution:
              'The agent is on track to exceed its budget — 60% of budget spent at 50% completion. Factors to consider: (1) Will remaining work be cheaper per iteration (perhaps early iterations were expensive setup)? (2) Can the agent switch to a cheaper strategy for the remaining work? (3) Is a partial result valuable, or is completion all-or-nothing? (4) Can the agent request a budget increase? The agent should inform the user or operator about the cost trajectory and either request more budget, switch strategies, or deliver the best partial result it can within the remaining forty cents.',
          },
          {
            id: 'ct-3',
            difficulty: 'advanced',
            question:
              'Design a cost tracking system for a multi-agent architecture where a parent agent delegates subtasks to child agents. How should costs be attributed, and how should the parent agent use cost information to manage its children?',
            hint: 'Think about hierarchical budgets and rollup accounting.',
            solution:
              'Each child agent receives a sub-budget allocated from the parent\'s total budget. The child tracks its own costs and reports them back. The parent maintains a ledger: total budget, amount allocated to each child, amount actually spent by each child, and its own direct costs. The parent uses this information to make delegation decisions — if one child is consuming disproportionate resources, the parent can reduce its allocation, reassign its task, or terminate it. Cost rolls up hierarchically so the top-level operator sees the total cost of the entire task tree. The parent should reserve budget for its own coordination overhead, not allocate 100% to children.',
          },
        ]}
      />
    </div>
  );
}
