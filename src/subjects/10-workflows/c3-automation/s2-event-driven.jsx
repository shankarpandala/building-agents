import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function EventDrivenAgents() {
  return (
    <div className="prose-agents">
      <h2>Event-Driven Agents</h2>
      <p>
        Scheduled agents run on a clock. Event-driven agents run on signals. They
        sit idle until something happens — a pull request is opened, a deployment
        completes, a test fails, an issue is filed — and then they spring into action.
        Event-driven agents are reactive by design: they respond to the world rather
        than polling it.
      </p>

      <ConceptBlock title="Event-Driven Agent" number="10.10">
        <p>
          An event-driven agent is an agent that activates in response to an external
          event rather than a schedule or direct invocation. Events come from many
          sources: version control systems (push, merge, branch creation), CI pipelines
          (build success, test failure), project management tools (issue creation,
          status change), or infrastructure monitors (resource alerts, uptime changes).
          The agent subscribes to specific event types and executes a corresponding
          skill when those events occur.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Smoke Detector">
        <p>
          A smoke detector does not check for fires on a schedule. It monitors
          continuously and activates only when smoke is present. This is far more
          efficient than a guard walking through every room every hour, and far more
          responsive — the alarm sounds within seconds of detection, not at the next
          scheduled patrol. Event-driven agents follow this model: they respond in
          the moment that action is needed, not at the next convenient time.
        </p>
      </AnalogyBlock>

      <p>
        The key advantage of event-driven agents over scheduled ones is timeliness.
        A scheduled agent that checks for new pull requests every hour might wait up
        to 59 minutes before reviewing a PR. An event-driven agent triggered by the
        PR creation event starts reviewing within seconds. For workflows where speed
        matters, event-driven is the superior pattern.
      </p>

      <PrincipleBlock title="Filter Events Before Processing Them" number="10.8">
        <p>
          Not every event of a subscribed type warrants agent action. A PR-opened event
          for a documentation-only change may not need the full security review agent.
          Build filtering logic between the event source and the agent: check the event
          payload, evaluate whether the agent's skill is relevant, and skip execution
          when it is not. An agent that triggers on every event regardless of relevance
          wastes resources and generates noise.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Idempotency is essential for event-driven agents" type="tip">
        <p>
          Events can be delivered more than once — network retries, duplicate webhooks,
          and system replays are common. An event-driven agent must produce the same
          result whether it processes an event once or three times. If the agent creates
          a review comment, it should check whether it already commented before posting
          a duplicate. Designing for idempotency prevents event-driven agents from
          creating confusing duplicate outputs.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ed-1',
            difficulty: 'beginner',
            question: 'A team wants an agent that automatically labels new issues based on their content. Should this be scheduled (check for new issues every 10 minutes) or event-driven (trigger when an issue is created)? Justify your choice.',
            hint: 'Consider response time expectations and resource efficiency.',
            solution: 'Event-driven is the better choice. Reasons: (1) Timeliness — users expect labels to appear quickly after filing an issue, not up to 10 minutes later. (2) Efficiency — a scheduled agent runs every 10 minutes even when no issues are filed, wasting resources. An event-driven agent runs only when there is work to do. (3) Simplicity — an event-driven agent processes one issue at a time as it arrives. A scheduled agent must track which issues it has already processed to avoid re-labeling. The only scenario where scheduled might be preferable is if the event infrastructure is unreliable and events are sometimes dropped — then periodic polling serves as a safety net.'
          },
          {
            id: 'ed-2',
            difficulty: 'intermediate',
            question: 'An event-driven agent responds to "deployment completed" events by running a smoke test suite. During a busy deployment day, 12 deployments happen in rapid succession. What problems might arise, and how should the system handle them?',
            hint: 'Think about resource contention, ordering, and whether all 12 smoke test runs are necessary.',
            solution: 'Problems: (1) Resource contention — 12 simultaneous smoke test runs may overwhelm the test infrastructure or the target environment. (2) Obsolescence — if deployment 12 replaces deployment 11, smoke-testing deployment 11 is pointless by the time it completes. (3) Interference — smoke tests running against deployment 7 may see inconsistent behavior if deployment 8 is applied mid-test. Solutions: (a) Queue events and process them serially rather than in parallel. (b) Implement event coalescing — if a new deployment event arrives while a smoke test is pending, cancel the pending test and test only the latest deployment. (c) Add a brief debounce window — wait 2 minutes after a deployment event before starting smoke tests, canceling if a newer deployment arrives in that window. The goal is to test the state that matters (the latest deployment) rather than every intermediate state.'
          },
          {
            id: 'ed-3',
            difficulty: 'advanced',
            question: 'Design an event routing system where different types of events trigger different agent skills, and some events trigger multiple skills in a defined order. What are the components of this system and how do they interact?',
            hint: 'Think about event buses, subscription registries, and orchestration layers.',
            solution: 'Components: (1) Event ingestion layer — receives raw events from external sources (webhooks, message queues), normalizes them into a standard event format with type, payload, source, and timestamp. (2) Subscription registry — maps event types to skills, with optional filter predicates. One event type can map to multiple skills. Each mapping specifies execution order (priority number) and whether the skill is required or optional. (3) Event router — when an event arrives, the router looks up all matching subscriptions, orders them by priority, evaluates filter predicates against the event payload, and produces an execution plan. (4) Execution orchestrator — runs the execution plan, passing results from earlier skills to later ones when configured as a chain. Handles failures according to the subscription\'s failure policy (stop chain, skip and continue, or retry). (5) Event log — records every event, every routing decision, and every execution result for auditability. The key design choice is separating routing (which skills to run) from orchestration (how to run them) — this lets either layer change independently.'
          }
        ]}
      />
    </div>
  )
}
