import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function OutputDesign() {
  return (
    <div className="prose-agents">
      <h2>Designing Tool Outputs</h2>
      <p>
        The output of a tool is what the agent has to work with next. An agent cannot see inside
        a tool — it only observes what the tool returns. If that return value is ambiguous,
        incomplete, or structured in a way that is difficult to reason about, the agent's next
        step is compromised before it begins. Output design is not an afterthought; it shapes
        every downstream decision the agent makes.
      </p>

      <ConceptBlock title="Outputs Are the Agent's Reality" number="Concept 2.7">
        After a tool invocation, the agent's model of the world is updated by what the tool
        returns. The output becomes the agent's ground truth for that piece of the world. If the
        output is misleading — success reported when nothing happened, data returned without
        indicating it is stale, an error message that describes symptoms rather than causes —
        the agent's model of reality diverges from actual reality. Divergence accumulates silently
        until it becomes a visible failure.
      </ConceptBlock>

      <h3>The Structure of a Good Output</h3>
      <p>
        Well-designed tool outputs share several properties:
      </p>
      <ul>
        <li>
          <strong>Explicit success/failure signaling:</strong> The agent should never have to
          infer whether a call succeeded. Success and failure should be unambiguous, structured,
          and immediately distinguishable.
        </li>
        <li>
          <strong>Complete enough to act on:</strong> The agent should not need to call the
          same tool again to get information it needed in the first place. Outputs should
          anticipate what the agent will want to do next and provide the relevant context.
        </li>
        <li>
          <strong>Minimal enough to be clear:</strong> Returning everything a tool knows is
          not always helpful. Irrelevant data adds noise that the agent must filter, which
          increases the chance of misinterpretation. Return what is needed for the task, not
          a data dump.
        </li>
        <li>
          <strong>Consistent structure:</strong> Success and failure responses should use
          consistent field names and structures. An agent that must parse different shapes
          of output for different outcomes is prone to parsing errors.
        </li>
      </ul>

      <PrincipleBlock title="Error Outputs Are First-Class" number="Principle 2.5">
        Error responses deserve as much design attention as success responses. A good error
        output tells the agent what went wrong, why it went wrong, and — whenever possible —
        what the agent should try instead. An error that says only "failed" is nearly useless.
        An error that says "record not found: the provided ID does not exist in this database"
        gives the agent everything it needs to adapt its plan.
      </PrincipleBlock>

      <h3>Handling Partial Results</h3>
      <p>
        Some tools can partially succeed: they complete some of what was requested but not all.
        A batch operation might process eight records successfully before failing on the ninth.
        Partial results require explicit handling in the output design. The agent must know:
        how much succeeded, how much failed, and whether the partial success is usable or
        should be rolled back.
      </p>
      <p>
        Returning a partial result without signaling its partiality is one of the most
        treacherous output design mistakes. The agent assumes it received the full result
        and acts accordingly — planning, reporting, or triggering downstream actions based
        on incomplete data.
      </p>

      <NoteBlock title="Think About the Receiving Agent" type="intuition">
        When designing a tool's output, ask: "What will the agent try to do with this
        response?" Design the output to make that next action easy and safe. If the agent
        will likely need to check whether to retry, include retry guidance. If it will need
        to present results to a user, ensure the output contains human-readable summaries.
        The best outputs are shaped by the expected downstream action, not by internal
        data structures.
      </NoteBlock>

      <ExerciseBlock
        title="Tool Output Design"
        exercises={[
          {
            id: 'od-1',
            difficulty: 'beginner',
            question: 'A file-writing tool currently returns the number of bytes written on success, and an empty string on failure. What is wrong with this design, and how would you improve both the success and failure responses?',
            hint: 'Think about what information the agent actually needs after a write operation, and what it needs when the write fails.',
            solution: 'The success response is technically informative but incomplete — the agent does not know the final path, whether the file was created or overwritten, or when it was written. The failure response ("") is a silent failure: the agent cannot distinguish failure from success easily, and receives no information about what went wrong. Improved design: success returns the full path, file size, and timestamp of the write. Failure returns a structured error with a code (e.g., "permission_denied", "disk_full") and a human-readable explanation.',
          },
          {
            id: 'od-2',
            difficulty: 'intermediate',
            question: 'An agent calls a "send_bulk_notifications" tool with 50 recipients. The tool sends successfully to 43 and fails for 7 due to invalid addresses. How should the tool structure its output to give the agent an accurate picture of what happened?',
            hint: 'The agent needs to know what succeeded, what failed, and enough detail to decide what to do about the failures.',
            solution: 'The output should include: a top-level status field indicating partial success (not simply "success" or "failure"), a count and list of successfully notified recipients, and a separate list of failed recipients with the specific reason for each failure (e.g., "invalid email format" or "address bounced"). This allows the agent to report accurate results to the user, flag the failed addresses for correction, and decide whether to retry or escalate without needing to call any additional tools.',
          },
          {
            id: 'od-3',
            difficulty: 'advanced',
            question: 'Why might returning "too much" data from a tool be just as harmful as returning too little? Describe a concrete scenario where an over-verbose tool output leads to agent error.',
            hint: 'Consider how agents process and prioritize information within their context window.',
            solution: 'Agents have finite context and must reason over everything they receive. An over-verbose output — for example, a tool that returns an entire database record with 80 fields when the agent only needed the user\'s email — floods the agent\'s context with noise. The agent must now parse, evaluate, and carry this weight forward through subsequent reasoning steps. In practice, agents may lose track of the key fields, mis-prioritize information, or simply exceed context limits and start dropping earlier context. A tool that returns only the three fields the task requires produces faster, more accurate downstream reasoning.',
          },
        ]}
      />
    </div>
  );
}
