import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Telemetry() {
  return (
    <div className="prose-agents">
      <h2>Telemetry</h2>
      <p>
        You cannot manage what you cannot see. In production, an agent operates without
        a human watching every step. Telemetry is the system of signals that gives
        operators visibility into what the agent is doing — how often, how fast,
        how successfully, and what it does when things go wrong.
      </p>

      <ConceptBlock title="Agent Telemetry" number="Concept 12.5">
        Telemetry is the collection of structured signals from a running agent system:
        metrics (numerical measures over time), traces (records of individual request
        paths), and logs (timestamped event records). Together, these signals allow
        operators to understand current behavior, detect anomalies, diagnose failures,
        and track changes in performance over time.
      </ConceptBlock>

      <AnalogyBlock title="The Aircraft Flight Recorder">
        Commercial aircraft record hundreds of parameters continuously — airspeed,
        altitude, control positions, engine status. Pilots do not watch all of these
        at once, but the data is there when needed: to detect anomalies in real time
        and to reconstruct exactly what happened after an incident. Agent telemetry
        serves the same role — background data collection that becomes essential
        when something unexpected occurs.
      </AnalogyBlock>

      <p>
        The most important signals to collect from an agent system are: task completion
        rate (what fraction of tasks complete successfully), tool call latency (how
        long each tool call takes), model latency (how long reasoning takes per turn),
        error rate by category (which kinds of failures are happening), and token usage
        (the volume of model input and output across tasks).
      </p>

      <NoteBlock title="Instrument From Day One" type="tip">
        Adding telemetry after a production incident is painful and often impossible —
        the evidence you needed is already gone. Instrument your agent system before
        the first production deployment. Even basic metrics and structured logging
        will be invaluable when the first unexpected behavior appears. The cost of
        instrumentation is low; the cost of flying blind in production is high.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'tel-1',
            difficulty: 'beginner',
            question: 'What are the three types of telemetry signals and what does each tell you that the others cannot?',
            hint: 'Think about aggregation vs. individual requests vs. event timelines.',
            solution: 'Metrics are aggregated numerical measurements over time — they tell you whether a value like success rate or latency is changing across many requests, but they do not tell you which specific requests caused a change. Traces record the path of an individual request through the system — they tell you exactly what happened for a specific task, including all tool calls and their durations. Logs are timestamped event records — they capture specific events with context (error messages, decisions made) that metrics cannot capture and that traces may not include at every step. Together, they allow both aggregate trend analysis and deep individual incident investigation.'
          },
          {
            id: 'tel-2',
            difficulty: 'intermediate',
            question: 'Your agent\'s task success rate drops from 95% to 80% overnight. Describe a methodical investigation using telemetry.',
            hint: 'Use multiple signal types to narrow down the cause.',
            solution: 'Step 1: Query metrics to identify when the drop began — does it correlate with a deployment, a time of day, or a specific user segment? Step 2: Filter traces from the failure period and compare them to traces from before — where in the task trajectory do they diverge? Do they fail at the same tool call or at different points? Step 3: Examine logs for error messages associated with failed traces — is there a common error pattern? Step 4: Check tool-level metrics — did latency or error rate increase for a specific tool at the same time? This narrows the cause from "something went wrong" to a specific component or change.'
          },
          {
            id: 'tel-3',
            difficulty: 'advanced',
            question: 'What telemetry would you add specifically for a multi-agent system where one orchestrator delegates work to multiple sub-agents?',
            hint: 'Think about tracing across process boundaries and attributing outcomes.',
            solution: 'Critical additions: (1) Distributed trace IDs that propagate from the orchestrator to each sub-agent, so the full execution path of a task is traceable across all agents. (2) Delegation metrics: how many sub-tasks were delegated, to which agents, and what was their outcome. (3) Attribution: when a task fails, which sub-agent\'s failure caused the overall failure. (4) Coordination overhead: time spent waiting for sub-agents vs. time spent in actual work. (5) Sub-agent utilization: are some agents overloaded while others are idle? These signals reveal the coordination layer\'s behavior, which single-agent telemetry cannot capture.'
          }
        ]}
      />
    </div>
  );
}
