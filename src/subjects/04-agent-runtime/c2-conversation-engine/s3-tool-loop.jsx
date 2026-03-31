import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ToolLoop() {
  return (
    <div className="prose-agents">
      <h2>The Tool Loop</h2>
      <p>
        The tool loop is what separates an agent from a chatbot. A chatbot receives input
        and produces output in a single pass. An agent receives input, reasons about what
        to do, takes an action, observes the result, and then decides whether to act again
        or respond. This cycle — call, observe, reason, repeat — is the beating heart of
        every capable agent system.
      </p>

      <ConceptBlock title="The Tool Loop" number="Concept 4.8">
        The tool loop is the iterative cycle in which an agent calls a tool, receives the
        result, incorporates it into its reasoning context, and then decides whether to
        call another tool or produce a final response. Each iteration adds information to
        the conversation, progressively building toward a complete answer. The loop
        continues until the agent determines it has enough information to respond — or
        until an external constraint forces it to stop.
      </ConceptBlock>

      <AnalogyBlock title="A Detective Following Leads">
        A detective investigating a case does not gather all evidence in one step. They
        follow a lead, examine what they find, and decide what lead to follow next. Each
        discovery reshapes their understanding of the case. They stop when they have
        enough evidence to draw a conclusion — or when they run out of time and must
        report what they have. The tool loop follows the same pattern: each tool call is
        a lead, each result reshapes the plan, and the agent stops when it can answer
        confidently or must stop for external reasons.
      </AnalogyBlock>

      <p>
        The power of the tool loop comes from its open-ended nature. The agent is not
        following a predetermined script of which tools to call in which order. At each
        iteration, the model re-evaluates the full context — the original request, all
        previous tool calls and their results — and makes a fresh decision about what to
        do next. This allows agents to adapt to unexpected results, recover from errors,
        and pursue multi-step strategies that could not have been planned in advance.
      </p>

      <PrincipleBlock title="Progressive Refinement" number="Principle 4.8">
        Each iteration of the tool loop should bring the agent closer to its goal. If a
        tool call does not add useful information, the agent should recognize this and
        change strategy rather than repeating the same action. Progress is not guaranteed
        by iteration alone — it requires the agent to evaluate each result critically and
        adjust its approach accordingly.
      </PrincipleBlock>

      <NoteBlock title="Loop depth in practice" type="info">
        Most practical agent tasks resolve within three to eight tool loop iterations.
        Tasks requiring dozens of iterations often indicate an unclear goal, an
        inadequate tool set, or a problem that should be decomposed into subtasks
        handled by separate agents. Monitoring loop depth is a useful diagnostic for
        understanding agent behavior.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'tl-1',
            difficulty: 'beginner',
            question:
              'What distinguishes an agent in a tool loop from a script that calls the same sequence of tools every time?',
            hint: 'Think about what happens between each tool call.',
            solution:
              'In a tool loop, the agent re-evaluates its plan after every tool result. It decides dynamically which tool to call next — or whether to stop — based on what it has learned so far. A script follows a fixed sequence regardless of intermediate results. The agent adapts; the script does not.',
          },
          {
            id: 'tl-2',
            difficulty: 'intermediate',
            question:
              'An agent calls a tool and receives an error message. Describe two productive strategies for the next iteration of the tool loop, and one unproductive strategy.',
            hint: 'Think about how the agent should interpret and react to failure.',
            solution:
              'Productive: (1) Retry with corrected parameters — if the error indicates a malformed input, the agent adjusts and tries again. (2) Try an alternative tool that can accomplish the same goal through a different path. Unproductive: Retrying the exact same call with the same parameters, hoping for a different result. This wastes iterations and tokens without making progress.',
          },
          {
            id: 'tl-3',
            difficulty: 'advanced',
            question:
              'Design a policy for limiting tool loop iterations that balances thoroughness with efficiency. What factors should influence the maximum number of iterations allowed, and how should the agent behave when it reaches the limit?',
            hint: 'Consider task complexity, token cost, and the user experience when the limit is hit.',
            solution:
              'Factors: task complexity (simple lookups need fewer iterations than multi-step research), remaining token budget (each iteration consumes context), and the value of additional iterations (diminishing returns as the agent gathers more information). At the limit, the agent should not silently stop — it should summarize what it accomplished, identify what remains unfinished, and explain why it stopped. This gives the user enough context to continue manually or to grant additional iterations.',
          },
        ]}
      />
    </div>
  );
}
