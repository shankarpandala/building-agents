import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function CostMonitoring() {
  return (
    <div className="prose-agents">
      <h2>Cost Monitoring</h2>
      <p>
        Agent systems incur costs with every model call: tokens in, tokens out, and
        any associated tool API costs. Unlike traditional software where cost is mostly
        fixed infrastructure, agent costs scale directly with usage and can grow
        dramatically with task complexity or runaway loops. Cost monitoring is
        not optional — it is a core operational concern.
      </p>

      <ConceptBlock title="Token-Based Cost Attribution" number="Concept 12.6">
        Token-based cost attribution tracks how many tokens each task, agent, and tool
        call consumes and maps that to monetary cost. This allows operators to understand
        the per-task cost of the agent, identify which task types or failure modes drive
        disproportionate cost, and set budget limits that prevent individual tasks from
        consuming unbounded resources.
      </ConceptBlock>

      <p>
        The most dangerous cost pattern in agent systems is the runaway loop: a task
        where the agent retries or iterates indefinitely, consuming tokens on every
        turn without converging on a solution. Runaway loops can accumulate thousands
        of dollars in costs before a human notices, especially in unattended deployments.
        Every agent system must have a hard token budget or turn limit that stops
        execution before runaway costs occur.
      </p>

      <WarningBlock title="Token Limits Are Not Enough Alone">
        Setting a maximum token limit per task is necessary but not sufficient. A task
        that stays just under the limit on every run but runs thousands of times per
        day can still generate enormous costs. Cost monitoring requires both per-task
        limits and aggregate spend tracking across all tasks over time, with alerts
        when spend deviates from expected baselines.
      </WarningBlock>

      <NoteBlock title="Cost Is a Signal About Behavior" type="intuition">
        Unusual cost spikes often indicate unexpected behavior before any other signal
        does. A task that suddenly costs ten times more than usual has changed its
        behavior — more tool calls, more retries, a longer reasoning chain. Investigating
        cost spikes often reveals bugs, prompt regressions, or tool failures before
        they manifest as visible quality problems.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'cm-1',
            difficulty: 'beginner',
            question: 'Why do agent costs require active monitoring rather than just reviewing monthly invoices?',
            hint: 'Think about how quickly costs can accumulate and how late monthly billing feedback is.',
            solution: 'Monthly invoices arrive 30 days after the cost was incurred. An agent with a runaway loop, a bug that causes excessive retries, or an unexpected surge in usage can consume thousands of dollars within hours. Active monitoring with near-real-time metrics and spend alerts allows operators to detect and stop runaway cost before the bill arrives. Monthly review is useful for trend analysis but useless for incident response.'
          },
          {
            id: 'cm-2',
            difficulty: 'intermediate',
            question: 'An agent processes user requests throughout the day. You notice that requests submitted after 5pm cost three times more on average than daytime requests. What might explain this and how would you investigate?',
            hint: 'Think about what changes at 5pm — users, task types, or environmental factors.',
            solution: 'Possible explanations: (1) After-hours requests come from different users with more complex tasks. (2) A downstream tool becomes slower after 5pm, causing the agent to retry more. (3) The model responds more verbosely to certain types of requests more common in the evening. Investigation: break down average token counts by request type for daytime vs. evening requests to see if it is compositional. Examine traces from expensive evening requests to see whether the extra tokens are in reasoning, tool calls, or output. Check if tool latency or error rates change at 5pm. Attribute cost by task type to separate user behavior changes from system behavior changes.'
          },
          {
            id: 'cm-3',
            difficulty: 'advanced',
            question: 'Design a cost budget system for an agent that must handle both short cheap tasks and long expensive tasks in the same deployment. What constraints would you implement and at what levels?',
            hint: 'Think about per-task, per-user, per-day, and system-wide limits.',
            solution: 'A layered budget system: (1) Per-task soft limit — after N tokens, the agent warns that it is approaching its budget and summarizes the remaining work. (2) Per-task hard limit — at a higher threshold, the task is terminated with a clear message and partial results are returned. (3) Per-user daily budget — a user can consume up to X dollars of compute per day; once exceeded, requests are queued or rejected until the next day. (4) System-wide daily budget — if total spend exceeds Y, new tasks are paused pending operator review. (5) Anomaly alerts — any task costing more than 3x the average for that task type triggers an alert regardless of whether any limit is exceeded. Each level serves a different failure mode.'
          }
        ]}
      />
    </div>
  );
}
