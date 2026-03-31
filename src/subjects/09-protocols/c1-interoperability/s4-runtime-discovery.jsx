import ConceptBlock from '../../../components/content/ConceptBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function RuntimeDiscovery() {
  return (
    <div className="prose-agents">
      <h2>Runtime Discovery</h2>
      <p>
        A static list of tools baked into an agent at build time creates a rigid system: adding
        a new capability requires redeploying the agent. Runtime discovery solves this by letting
        agents ask, at the moment they need it, what tools are available and what those tools can do.
        The agent's capability set becomes dynamic rather than fixed.
      </p>

      <ConceptBlock title="Runtime Discovery" number="9.4">
        <p>
          Runtime discovery is the ability of an agent to query a tool server at execution time
          to learn what capabilities are available, what inputs they require, and what outputs
          they produce — without this information being hard-coded ahead of time. The agent
          adapts its behavior to the actual tools present, rather than assuming a fixed inventory.
        </p>
      </ConceptBlock>

      <p>
        Runtime discovery enables a new class of agent behavior: adaptive tool use. An agent
        equipped with discovery can reason about which available tools are suited to the current
        task, combine them in ways not anticipated at design time, and gracefully degrade when
        expected tools are absent. This composability is what makes protocol-based systems
        fundamentally more flexible than hard-wired integrations.
      </p>

      <NoteBlock title="Discovery can be expensive" type="tip">
        <p>
          Querying a server to list all available tools is a network call that takes time. Agents
          that call discovery before every single action introduce latency. A practical pattern is
          to cache the capability list at the start of a task and refresh only when a call fails
          with an "unknown tool" error — balancing freshness with performance.
        </p>
      </NoteBlock>

      <WarningBlock title="Discovery is not authorization">
        <p>
          The fact that a tool appears in a discovery response does not mean the calling agent
          is authorized to use it. Discovery tells you what exists; authorization tells you what
          you are permitted to call. Agents must not treat a tool's presence in a discovery list
          as implicit permission to invoke it without checking access controls.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-4-1',
            difficulty: 'beginner',
            question: 'What is the difference between static tool configuration and runtime discovery? Give one advantage and one disadvantage of each approach.',
            hint: 'Think about flexibility, predictability, and what happens when the set of available tools changes.',
            solution: 'Static configuration: the agent\'s available tools are defined at build or deploy time. Advantage: predictable — you always know exactly what the agent can do. Disadvantage: inflexible — adding or removing a tool requires redeploying the agent. Runtime discovery: the agent queries for available tools when it runs. Advantage: flexible — tools can be added or removed without touching the agent. Disadvantage: introduces network calls, potential latency, and the possibility that expected tools are not available at runtime.'
          },
          {
            id: 'ex9-4-2',
            difficulty: 'intermediate',
            question: 'An agent discovers 40 available tools at runtime. How should it decide which tools to include in its reasoning context, given that including all 40 tool descriptions may be impractical?',
            hint: 'Consider relevance to the current task, the cost of including irrelevant tools, and strategies for narrowing the set.',
            solution: 'The agent should filter tools based on task relevance before including them in its reasoning context. Strategies include: using tool categories or tags to narrow by domain (only include database tools when the task involves data retrieval), semantic matching between the task description and tool descriptions, or a two-stage process where a lightweight filter selects candidate tools before full reasoning. Including all 40 tools wastes context and may confuse the agent by introducing options irrelevant to the task. The goal is a focused, relevant tool set, not an exhaustive one.'
          },
          {
            id: 'ex9-4-3',
            difficulty: 'advanced',
            question: 'Design a caching strategy for tool discovery that balances freshness with performance. Under what conditions should the cache be invalidated, and how should an agent handle a call that fails because a cached tool no longer exists?',
            hint: 'Consider time-based expiry, error-triggered refresh, and the difference between "tool not found" and other error types.',
            solution: 'A robust caching strategy: (1) Cache the tool list at the start of each task execution with a short TTL (e.g., 5 minutes). (2) On a "tool not found" error, immediately invalidate and refresh the cache before retrying. (3) On any other error type, do not refresh — the issue is likely not a stale cache. (4) For long-running tasks, periodically refresh in the background to catch tool additions. When a call fails because a cached tool no longer exists, the agent should refresh discovery, check if a replacement tool exists that covers the same capability, and either retry with the replacement or surface a graceful error to the caller explaining which capability became unavailable.'
          }
        ]}
      />
    </div>
  )
}
