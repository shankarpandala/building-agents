import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function HealthChecks() {
  return (
    <div className="prose-agents">
      <h2>Health Checks</h2>
      <p>
        A running agent can appear operational while silently degrading. Its responses
        may slow, its tools may return stale data, its context window may be nearly
        exhausted. Health checks are the mechanism by which an agent system regularly
        assesses its own fitness — not waiting for a failure to be reported, but
        actively testing whether all critical subsystems are functioning within
        acceptable bounds.
      </p>

      <ConceptBlock title="Health Checks" number="Concept 12.8">
        A health check is a periodic self-diagnostic that an agent system performs
        to verify that its dependencies and internal state are within normal operating
        parameters. This includes verifying that external services are reachable and
        responsive, that tool endpoints return valid responses, that latency remains
        below thresholds, and that resource consumption (tokens, memory, concurrent
        sessions) has not exceeded safe limits. Health checks produce a clear signal:
        healthy, degraded, or unhealthy.
      </ConceptBlock>

      <AnalogyBlock title="The Preflight Checklist">
        Before every flight, a pilot walks through a preflight checklist — fuel levels,
        control surfaces, instruments, communication systems. No pilot assumes that
        because the plane flew yesterday, it is ready to fly today. Each subsystem is
        individually verified. An agent health check serves the same purpose: a
        systematic confirmation that every dependency the agent needs is present,
        responsive, and behaving correctly before the agent is trusted to handle
        real requests.
      </AnalogyBlock>

      <p>
        Health checks operate at multiple levels. A shallow health check confirms
        that the agent process is alive and accepting requests. A deep health check
        goes further: it verifies that the model endpoint responds within acceptable
        latency, that each tool dependency is reachable, that credentials have not
        expired, and that recent error rates are within tolerance. The distinction
        matters because a shallow check can pass while a deep check reveals that
        the agent is effectively broken.
      </p>

      <PrincipleBlock title="Measure Fitness, Not Just Liveness" number="Principle 12.4">
        An agent that is alive is not necessarily an agent that is well. Liveness
        tells you the process is running. Fitness tells you the agent can actually
        do its job. Health checks must assess fitness: can the agent reach its model,
        call its tools, access its data, and respond within the time its users expect?
        A system that reports healthy when it cannot fulfill requests is worse than
        one that honestly reports degradation.
      </PrincipleBlock>

      <WarningBlock title="Health Checks Must Not Cause Harm">
        Deep health checks that call real tools or services must be designed to be
        side-effect free. A health check that writes test records to a production
        database, sends messages to real users, or consumes expensive API quota
        creates the very problems it is meant to detect. Health probes should use
        read-only operations, dedicated test endpoints, or synthetic inputs that
        are clearly distinguishable from real traffic.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'hc-1',
            difficulty: 'beginner',
            question: 'What is the difference between a shallow health check and a deep health check? Why might you need both?',
            hint: 'Think about what each level of check actually verifies and when each kind of failure would be caught.',
            solution: 'A shallow health check verifies that the agent process is running and can accept incoming requests — it is a basic liveness signal. A deep health check verifies that all critical dependencies are reachable and performing within acceptable bounds: the model endpoint responds, tools return valid data, credentials are not expired, and latency is within thresholds. You need both because they serve different consumers: load balancers use shallow checks to route traffic (fast, frequent), while monitoring systems use deep checks to detect degradation before users notice (slower, less frequent). A system could pass a shallow check while failing a deep one — the process is alive but cannot actually serve requests.'
          },
          {
            id: 'hc-2',
            difficulty: 'intermediate',
            question: 'Design the health check dimensions for an agent that answers customer support questions using a knowledge base tool and a ticket-creation tool. What would you check, and what thresholds would indicate degradation?',
            hint: 'Think about every dependency the agent needs to do its job, and what "too slow" or "too broken" looks like for each one.',
            solution: 'Dimensions to check: (1) Model endpoint — verify it responds to a minimal prompt within an acceptable latency (e.g., under 3 seconds; degraded if over 5 seconds). (2) Knowledge base tool — issue a known test query and verify the response is non-empty and arrives within threshold (e.g., under 1 second). (3) Ticket-creation tool — verify the endpoint is reachable with a read-only probe (do not create a real ticket); check that authentication credentials are valid. (4) Recent error rate — if more than a defined percentage of the last N requests resulted in errors, mark as degraded. (5) Token budget — if average token consumption per session is trending upward beyond normal, flag as degraded. (6) Queue depth — if pending requests are backing up beyond a threshold, the system is overloaded. Each dimension produces a status: healthy, degraded, or unhealthy. The overall status is the worst individual status.'
          },
          {
            id: 'hc-3',
            difficulty: 'advanced',
            question: 'How would you design a health check system that distinguishes between transient failures (a momentary network blip) and persistent degradation (a dependency that is genuinely down)?',
            hint: 'Think about how many consecutive failures constitute a real problem versus noise.',
            solution: 'Use a state machine with hysteresis: (1) A single failed check does not immediately change the status — it increments a failure counter. (2) Only after N consecutive failures (e.g., 3) does the status transition from healthy to degraded or unhealthy. (3) Similarly, a single passing check after failure does not immediately restore healthy status — require M consecutive passes to transition back. This prevents flapping between states due to transient issues. Additionally, track failure duration: a dependency that has been unreachable for 30 seconds is different from one unreachable for 10 minutes. Escalate alerts based on duration, not just occurrence. Finally, distinguish between dependencies: a flaky non-critical tool might warrant a degraded status, while a failed model endpoint is immediately critical regardless of consecutive-failure thresholds.'
          }
        ]}
      />
    </div>
  );
}
