import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function GroundingTools() {
  return (
    <div className="prose-agents">
      <h2>Grounding Through Tools</h2>
      <p>
        Tools are the primary mechanism by which agents escape the language–action gap. Rather than
        relying on trained knowledge to guess at the current state of the world, a tool-equipped
        agent can query that state directly. Rather than generating calculations as text, it can
        execute them. Rather than imagining what a database contains, it can read it. Tools
        transform the agent from a closed system reasoning about language into an open system that
        can perceive and affect the real world.
      </p>

      <ConceptBlock title="Tool-Based Grounding" number="3.2">
        <p>
          Tool-based grounding is the practice of giving agents structured access to external
          systems so they can retrieve current information and take actions with real-world effects.
          A tool is any interface that the agent can invoke by producing a structured call and
          receiving a structured result. The key property of a well-designed tool is that it
          returns <strong>verifiable, current state</strong> rather than asking the agent to
          reason about what state probably is.
        </p>
      </ConceptBlock>

      <p>
        Tools serve two grounding functions. <strong>Information tools</strong> — search, database
        queries, file reads, API calls — give the agent access to current facts it could not have
        from training alone. <strong>Action tools</strong> — write operations, message sends,
        configuration changes — allow the agent to change state in the world and (crucially)
        observe the result, creating the feedback loop that makes multi-step tasks possible.
      </p>

      <p>
        The design of the tool interface matters as much as the tools themselves. A tool that
        returns a massive, unstructured blob of data requires the agent to extract meaning from
        noise. A tool that returns a clean, structured, directly usable result makes the agent's
        subsequent reasoning easier and more reliable. Invest in tool design as seriously as in
        prompt design — they are equally influential on agent quality.
      </p>

      <PrincipleBlock title="Design Tools for the Agent, Not the Human" number="3.1">
        <p>
          Human-facing APIs are often designed for human developers who can read documentation,
          handle ambiguity, and work with complex response structures. Agent-facing tool interfaces
          should be designed differently: responses should be in the format most useful for the
          agent's reasoning step, error messages should be informative enough for the agent to
          self-correct, and scope should be limited to what the agent needs — not everything the
          underlying system can do.
        </p>
      </PrincipleBlock>

      <p>
        Tool selection — choosing which tool to invoke when — is itself a reasoning challenge.
        Agents must understand not just what tools are available, but what each tool is good for,
        what it costs, and when using it would be appropriate. A poorly specified tool description
        leads to misuse: the agent invokes tools for the wrong situations, in the wrong order, or
        with incorrect parameters. Tool documentation written for agents requires the same care
        as documentation written for humans.
      </p>

      <NoteBlock title="Tools are trust boundaries" type="tip">
        <p>
          Every tool an agent can call is a point at which external input enters the agent's
          reasoning. A web search tool can return content crafted to manipulate the agent. A
          database query can return data that was maliciously modified. Treat tool outputs as
          potentially untrusted input, apply appropriate validation, and avoid having the agent
          act on tool outputs that it cannot verify align with the original task intent.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex11-1',
            difficulty: 'beginner',
            question: 'For each task, identify whether tool-based grounding is necessary and if so, which type of tool (information or action): (a) summarizing a document the user has pasted into the conversation; (b) finding the current exchange rate between USD and EUR; (c) adding an item to a user\'s shopping list; (d) explaining the concept of recursion.',
            hint: 'Ask whether the task requires current external state or produces effects in an external system.',
            solution: '(a) No tool needed — the document is already present in context. (b) Information tool — exchange rates change constantly and cannot be accurately produced from training knowledge. (c) Action tool — modifying a shopping list is a state change in an external system. (d) No tool needed — explaining a concept relies on knowledge from training, which is stable and appropriate here.'
          },
          {
            id: 'ex11-2',
            difficulty: 'intermediate',
            question: 'You are designing a tool that lets an agent query a customer database. The database contains customer names, contact info, order history, and payment details. How would you design the tool interface differently for an agent than for a human developer? What restrictions, formatting choices, and error handling would you apply?',
            hint: 'Think about what the agent actually needs for its tasks, how it will use the output in its reasoning, and what it should not be able to access.',
            solution: 'Key differences from a human-facing API: (1) Scope restriction — expose only fields the agent needs for its tasks (e.g., order history and status), not the full record including payment details. Principle of least privilege. (2) Structured output — return results as normalized structured data (consistent field names, predictable types), not raw database rows. (3) Pagination by default — return a summary count and first N results rather than all matching records; the agent rarely needs to process 10,000 records at once. (4) Informative errors — error messages should describe what was wrong with the query in terms the agent can act on ("no customer found with that email", not "query error 404"). (5) Intent logging — log what the agent queries so a human can audit access patterns. (6) Rate limiting — prevent the agent from bulk-exporting the database, even accidentally.'
          },
          {
            id: 'ex11-3',
            difficulty: 'advanced',
            question: 'An agent has 15 tools available but on any given task it should use at most 3-4. How does having many tools affect agent performance, and what strategies help agents select the right tools without being overwhelmed by choice?',
            hint: 'Consider both the cognitive load problem (reasoning over 15 options is harder than reasoning over 3) and the risk of selecting a plausible-but-wrong tool.',
            solution: 'Having many tools hurts agent performance in several ways: (1) Selection cost — the agent must reason over a larger option space at each step, increasing the chance of a wrong choice. (2) Distraction — a tool that seems relevant but is wrong for the current step can lead the agent down an unproductive path. (3) Context overhead — full descriptions of 15 tools consume significant context window space. Strategies to mitigate: (1) Dynamic tool loading — present only tools relevant to the current task phase, not all tools at all times. (2) Tool grouping — organize tools into categories so the agent first selects a category, then a specific tool within it. (3) Tool descriptions as contracts — write tool descriptions that specify not just what the tool does but when to use it and when not to, reducing misuse. (4) Retrieval-based tool selection — use a fast lookup to find the 3-5 most relevant tools for the current step rather than reasoning over all 15. (5) Tool use examples — include worked examples in tool descriptions that show the agent the correct context for each tool.'
          }
        ]}
      />
    </div>
  )
}
