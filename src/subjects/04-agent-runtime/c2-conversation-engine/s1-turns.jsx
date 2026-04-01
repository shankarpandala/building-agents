import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function Turns() {
  return (
    <div className="prose-agents">
      <h2>Turns</h2>
      <p>
        Agent conversations are structured as a sequence of turns. A turn is one round of
        input and response — the fundamental unit of interaction in a conversation-based
        agent. Understanding how turns work, what they contain, and how the runtime processes
        them is foundational to understanding everything else about how agents operate.
      </p>

      <ConceptBlock title="Conversation Turn" number="Concept 4.6">
        A conversation turn is one complete input-output cycle in an agent session. Each turn
        begins when input arrives (from a user, another agent, or a tool result), and ends
        when the agent produces its response. Turns are processed sequentially — the runtime
        does not begin processing the next turn until the current turn is complete. The
        accumulation of turns forms the conversation history.
      </ConceptBlock>

      <AnalogyBlock title="A Tennis Rally">
        A tennis rally consists of alternating shots — one player hits, the other returns,
        back and forth. Each shot is a complete action that both ends one exchange and sets
        up the next. Neither player can hit twice in a row. Agent turns follow the same
        structure: input arrives, the agent responds, and the response itself may prompt
        the next input. The rally continues until a stop condition ends the session.
      </AnalogyBlock>

      <p>
        Each turn has a role and content. The role identifies who is speaking — the system
        (configuration), the user (human input), or the assistant (agent response). Tool
        calls and their results are also represented as turn content, giving the full
        conversation a complete record of what happened, not just what was said. This
        multi-party, multi-type turn structure is what makes agent conversations more complex
        than simple chat histories.
      </p>

      <NoteBlock title="Tool calls within a turn" type="info">
        A single agent turn can contain multiple tool calls before the final response.
        When an agent decides to use a tool, it emits a tool call, receives the tool result,
        and then continues reasoning — all within the same turn. From the user's perspective,
        the turn is still one input-output cycle. Internally, the runtime may be managing
        a complex multi-step process before producing the final assistant response.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'turns-1',
            difficulty: 'beginner',
            question:
              'In a conversation where the user asks a question, the agent calls two tools to gather information, and then responds — how many turns occurred? What roles appeared in the conversation history?',
            hint: 'Remember that tool calls happen within a single agent turn.',
            solution:
              'One turn. The user input, two tool calls with their results, and the final assistant response are all part of one turn. Roles present: "user" (the question), "assistant" (the tool call requests and final response), and "tool" (the tool results). The turn began with the user message and ended with the assistant\'s final response.',
          },
          {
            id: 'turns-2',
            difficulty: 'intermediate',
            question:
              'Why is it important that turns are processed sequentially rather than allowing concurrent turn processing? What failure mode would concurrent processing introduce?',
            hint: 'Think about what each turn depends on from previous turns.',
            solution:
              'Each turn\'s response depends on the full conversation history up to that point. If two turns were processed simultaneously, each would see an incomplete history — the other turn\'s input and response would be missing. This creates race conditions where the agent\'s responses are internally inconsistent, or where turn 2 answers based on a state that turn 1 has already changed. Sequential processing ensures each turn sees a complete, accurate history.',
          },
          {
            id: 'turns-3',
            difficulty: 'advanced',
            question:
              'Design the turn structure for an agent that receives instructions from both a human user and an automated orchestrator system within the same session. How would you represent both input sources in the conversation history, and what trust implications does this create?',
            hint: 'Think about how the agent should differentiate between the two input sources.',
            solution:
              'Use distinct roles or metadata to identify each source: "user" for human input, "system" or a named role like "orchestrator" for automated instructions. The trust level assigned to each role should reflect its source — orchestrator messages receive operator-level trust only if they arrive via an authenticated channel defined at initialization, not just because they claim to be from the orchestrator. In the conversation history, the source of each turn must be cryptographically distinguishable, not just labeled by convention, to prevent a user turn from impersonating an orchestrator turn.',
          },
        ]}
      />
    </div>
  );
}
