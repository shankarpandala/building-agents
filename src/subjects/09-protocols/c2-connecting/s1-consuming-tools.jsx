import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ConsumingTools() {
  return (
    <div className="prose-agents">
      <h2>Consuming Tools as a Client</h2>
      <p>
        When an agent acts as a protocol client, it takes on the responsibility of using tools
        correctly. This is not just about calling the right function with the right arguments.
        It involves discovering capabilities, validating that a tool fits the task, handling the
        full range of responses — including errors — and doing all of this in a way that the
        system can recover from when things go wrong.
      </p>

      <ConceptBlock title="Tool Consumption Lifecycle" number="9.5">
        <p>
          Consuming a tool through a protocol involves four stages: <strong>discovery</strong>
          (learning that the tool exists and what it can do), <strong>selection</strong>
          (deciding this tool fits the current need), <strong>invocation</strong> (calling the
          tool with correctly formed inputs), and <strong>result handling</strong> (interpreting
          the response, whether success or error, and deciding what to do next).
        </p>
      </ConceptBlock>

      <p>
        Agents that skip the selection stage — calling tools because they exist rather than
        because they fit — produce noisy, unreliable behavior. Good tool selection requires
        matching the task to the tool's declared purpose, checking that required inputs are
        available, and considering whether the tool's output format is compatible with what
        the next step in the plan expects.
      </p>

      <PrincipleBlock title="Validate Before You Invoke" number="9.3">
        <p>
          Before calling a tool, verify that you can satisfy its required inputs and that its
          output will serve the next step. Calling a tool and then discovering mid-task that
          the output format is wrong wastes execution and can leave the system in a partial
          state. Input validation is cheap; partial execution is expensive.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Idempotency matters at the client" type="tip">
        <p>
          When retrying a failed tool call, prefer tools that are idempotent — calling them
          twice produces the same result as calling them once. Before retrying any call,
          check whether the tool declares itself idempotent. Non-idempotent retries (sending
          an email twice, charging a card twice) cause real harm.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-5-1',
            difficulty: 'beginner',
            question: 'An agent needs to retrieve customer data. It discovers two tools: one that fetches a customer by ID and one that searches customers by name. The task provides only a customer name. Which tool should the agent select and why?',
            hint: 'Consider what inputs you have versus what each tool requires.',
            solution: 'The agent should select the search-by-name tool. The agent has a name but not an ID, so the fetch-by-ID tool cannot be used without first obtaining the ID — which would require an additional step. Using the available input (name) to call the matching tool is the direct path. Choosing the ID-based tool would require the agent to find the ID first, adding unnecessary steps and potential failure points.'
          },
          {
            id: 'ex9-5-2',
            difficulty: 'intermediate',
            question: 'A tool call fails with a timeout error. The tool updates records in a database. Should the agent retry immediately? What information would help it decide?',
            hint: 'A timeout means you do not know whether the operation completed. Consider the difference between a read operation timing out versus a write operation timing out.',
            solution: 'The agent should not retry immediately without knowing whether the operation completed. A timeout on a write operation means the record may or may not have been updated — a blind retry could create a duplicate update. Helpful information: does the tool declare itself idempotent? If yes, retrying is safe. If not, the agent should first query the current state of the record to determine whether the update happened before deciding to retry. If no idempotency information is available, the safest path is to surface the ambiguity to a human or a higher-level supervisor rather than guessing.'
          },
          {
            id: 'ex9-5-3',
            difficulty: 'advanced',
            question: 'Design a tool invocation strategy for an agent that must call three tools in sequence, where each tool\'s output feeds into the next. How should the agent handle a failure in the second tool when the first tool has already completed and had side effects?',
            hint: 'Think about compensation actions, rollback, and the information the agent needs to undo completed steps.',
            solution: 'The agent needs a compensation strategy for the first tool before invoking the second. Before calling any tool with side effects in a chain, check whether the tool provides a rollback or compensation action (e.g., a "delete record" tool paired with a "create record" tool). If compensation is available, the agent should record the completion of step one along with the compensation action needed to undo it. On failure in step two, it executes the compensation action for step one before surfacing the error. If no compensation is available, the agent must surface the partial completion explicitly — describing what happened and what did not — so that a human or recovery process can decide how to proceed. Silent partial completion is the most dangerous outcome.'
          }
        ]}
      />
    </div>
  )
}
