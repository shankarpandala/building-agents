import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function RateLimits() {
  return (
    <div className="prose-agents">
      <h2>Rate Limits and Backoff</h2>
      <p>
        Agents make many requests — to models, to tools, to external services. Each of
        these services has capacity limits and enforces them through rate limiting. An
        agent that ignores rate limits will hit walls: rejected requests, temporary bans,
        or degraded service. Handling rate limits gracefully is a fundamental requirement
        for any agent that operates in the real world rather than in a sandbox.
      </p>

      <ConceptBlock title="Rate Limiting and Backoff" number="Concept 4.14">
        Rate limiting is the practice of restricting how many requests a client can make
        to a service within a given time period. When an agent exceeds a rate limit, the
        service responds with an error indicating the agent must wait before trying again.
        Backoff is the strategy for deciding how long to wait — typically starting with a
        short delay and increasing it with each consecutive rejection, a pattern called
        exponential backoff. Jitter — adding a small random component to the delay —
        prevents multiple agents from retrying in lockstep and overwhelming the service
        again at the same moment.
      </ConceptBlock>

      <AnalogyBlock title="A Crowded Coffee Shop">
        When a coffee shop is overwhelmed with orders, the barista does not serve faster —
        they ask customers to wait. If everyone who was told to wait comes back at the
        same time, the shop is overwhelmed again. The solution is for each customer to
        wait a slightly different amount of time before returning. Exponential backoff
        with jitter works the same way: each rejected agent waits longer than the last
        attempt, and the random jitter ensures that multiple agents do not all retry at
        the same instant.
      </AnalogyBlock>

      <p>
        Rate limits are not just obstacles to be worked around — they carry information.
        A rate limit error tells the agent that the service is under pressure and that
        the agent's request pattern is contributing to that pressure. A well-designed
        runtime respects this signal by throttling proactively, not just reacting to
        errors after they occur.
      </p>

      <PrincipleBlock title="Anticipate, Don't Just React" number="Principle 4.14">
        The best rate limit strategy avoids hitting limits in the first place. Track
        request rates, monitor remaining quota when the service provides it in response
        headers, and slow down before the limit is reached. Reactive backoff — waiting
        until you are rejected — works, but proactive throttling produces a smoother
        experience and wastes fewer failed requests.
      </PrincipleBlock>

      <WarningBlock title="Retry storms">
        Naive retry logic — retrying immediately on every failure with no delay — can
        create a feedback loop where retries add to the very load that caused the
        original rejection. This turns a temporary rate limit into a sustained outage
        for the agent and potentially for other users of the same service. Always use
        increasing delays between retries, and set a maximum retry count beyond which
        the agent reports the failure rather than continuing to retry.
      </WarningBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'rl-1',
            difficulty: 'beginner',
            question:
              'Why does exponential backoff use increasing delays rather than a fixed delay between retries?',
            hint: 'Think about what a fixed delay fails to account for.',
            solution:
              'A fixed delay assumes the overload will resolve in a constant amount of time. In practice, if the service is still overloaded after the first retry, it is likely still overloaded after the second. Increasing delays give the service progressively more time to recover. They also reduce the total number of retry requests the agent sends during an outage, which helps the service recover faster by reducing load.',
          },
          {
            id: 'rl-2',
            difficulty: 'intermediate',
            question:
              'An agent is coordinating three parallel tool calls and one of them is rate-limited. Should the agent wait for the rate-limited call before processing the other two results, or should it proceed with available results? What are the tradeoffs?',
            hint: 'Think about whether the three results are independent or interdependent.',
            solution:
              'If the results are independent, the agent should process the available two immediately and retry the third in the background — this minimizes delay. If the results are interdependent (the agent needs all three to make a decision), it must wait. The tradeoff is between speed (proceeding with partial results) and correctness (ensuring all information is available before reasoning). A sophisticated runtime would let the agent express this dependency so the scheduler can make the right choice.',
          },
          {
            id: 'rl-3',
            difficulty: 'advanced',
            question:
              'Design a request queuing strategy for an agent that must make many model requests but has a limited rate quota. The strategy should maximize throughput while staying within limits and remaining fair to concurrent sessions.',
            hint: 'Think about priority, fairness, and quota allocation across sessions.',
            solution:
              'Use a token bucket or sliding window rate limiter shared across all sessions. Assign each session a priority based on its urgency and cost so far. Maintain a priority queue of pending requests. When capacity is available, dequeue the highest-priority request. To ensure fairness, implement a maximum share per session so no single long-running session starves others. Monitor the queue depth as a health metric — a growing queue indicates the system is overloaded and should shed load by rejecting new sessions or reducing per-session parallelism rather than letting queues grow unbounded.',
          },
        ]}
      />
    </div>
  );
}
