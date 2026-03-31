import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ExecutionBackends() {
  return (
    <div className="prose-agents">
      <h2>Execution Backends</h2>
      <p>
        A swarm of agents does not run on good intentions — it runs on infrastructure.
        The execution backend is the layer that actually instantiates agents, allocates
        resources, routes work, and terminates workers when done. Understanding the
        properties and trade-offs of different execution backends is essential for
        designing swarms that scale reliably.
      </p>

      <ConceptBlock title="Execution Backend" number="Concept 8.11">
        An execution backend is the infrastructure layer responsible for spawning,
        running, and terminating agents in a multi-agent system. Backends vary along
        several dimensions: whether they are synchronous or asynchronous, whether agents
        run in the same process or different processes (or machines), how they handle
        failures, and what isolation guarantees they provide. The backend shapes what
        parallelism is achievable, what the failure model looks like, and how observable
        the running system is.
      </ConceptBlock>

      <p>
        Common backend patterns include in-process thread pools (fast, low overhead, shared
        memory — useful for lightweight swarms), distributed task queues (high throughput,
        fault-tolerant, isolated — useful for large-scale swarms), and serverless invocation
        (infinite scale on demand, stateless — useful for burst workloads). The choice depends
        on the scale of parallelism, the duration of individual tasks, the need for isolation,
        and the acceptable cost of coordination overhead.
      </p>

      <NoteBlock type="note" title="Observability as a Backend Requirement">
        Every production execution backend must provide observability: the ability to see,
        in real time, how many agents are running, what each is doing, and how many have
        completed or failed. Without observability, a swarm in production is a black box.
        When something goes wrong, there is no way to tell what happened, which items were
        processed, or where work was lost. Treat observability as a first-class backend
        requirement.
      </NoteBlock>

      <PrincipleBlock title="Match the Backend to the Workload" number="Principle 8.5">
        An in-process thread pool is wasteful for 10,000-agent swarms; a distributed
        task queue is over-engineered for a ten-agent team. Match the execution backend
        to the scale and characteristics of the actual workload. Start with the simplest
        backend that meets requirements; migrate to more complex infrastructure only when
        the simpler option provably cannot scale to the required load.
      </PrincipleBlock>

      <ExerciseBlock
        title="Choosing and Designing Execution Backends"
        exercises={[
          {
            id: 'eb-1',
            difficulty: 'beginner',
            question: 'For each scenario, identify which execution backend pattern (in-process thread pool, distributed task queue, or serverless) is most appropriate and explain why: (a) classify 100 images in a web server request; (b) process 1 million log entries overnight; (c) run 10 coordinated research agents for a single user session.',
            hint: 'Consider scale, duration, and the need for coordination.',
            solution: '(a) In-process thread pool: small scale (100 items), needs to complete within a request, no persistent coordination needed. (b) Distributed task queue: massive scale (1M items), fault tolerance important for overnight runs, items are independent. (c) In-process or lightweight distributed pool: small team (10 agents), coordination is needed within the session, serverless would add too much cold-start latency for interactive use.',
          },
          {
            id: 'eb-2',
            difficulty: 'intermediate',
            question: 'A swarm of 200 agents is processing work using a distributed task queue. The queue has 5,000 items. Halfway through, the backend reports that 30 agents have crashed. How should the system respond, and what backend features make this recovery possible?',
            hint: 'Think about item leasing, automatic retry, and how the queue re-exposes crashed work.',
            solution: 'Recovery process: (1) The 30 crashed agents\' claimed items have their leases expire automatically. The queue re-exposes these items as "available". (2) The remaining 170 agents continue pulling from the queue, picking up the re-exposed items alongside new ones. (3) If 30 new agent instances are available (via auto-scaling), they are added to the pool and begin pulling work immediately. (4) No items are lost because the queue held the canonical state; agent crashes only affect in-progress items, which are automatically retried. Backend features required: item leasing with expiry, automatic failure detection, visibility into queue depth and agent count.',
          },
          {
            id: 'eb-3',
            difficulty: 'advanced',
            question: 'Design the observability surface for a swarm execution backend. Define what metrics should be tracked in real time, what alerts should trigger, and what a runbook entry for "swarm significantly underperforming" should look like.',
            hint: 'Think about throughput, error rate, queue depth, and agent health as core signal categories.',
            solution: 'Real-time metrics: (1) Queue depth (items available, in-progress, completed, failed). (2) Agent count (active, crashed, idle). (3) Throughput (items completed per minute). (4) Error rate (failed items / total claimed). (5) Tail latency (P95, P99 processing time per item). (6) Lease expiry rate (proxy for agent instability). Alerts: queue depth not decreasing after 5 minutes (swarm stalled), error rate > 5% (systematic failure), active agent count drops by > 20% in 1 minute (agent crash wave). Runbook for underperformance: (1) Check active agent count — if low, check for crash wave and re-provision. (2) Check individual agent logs — are agents taking longer per item than expected? (3) Check external dependencies — is a shared API rate-limiting? (4) Check queue for stuck items with expired leases — requeue if needed. (5) If throughput remains low after addressing the above, scale up agent count.',
          },
        ]}
      />
    </div>
  );
}
