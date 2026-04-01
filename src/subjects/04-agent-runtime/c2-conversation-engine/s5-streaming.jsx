import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function Streaming() {
  return (
    <div className="prose-agents">
      <h2>Streaming</h2>
      <p>
        Agents can take seconds or minutes to complete their work. If the user sees nothing
        until the final result arrives, the experience feels broken — they cannot tell
        whether the agent is working, stuck, or crashed. Streaming solves this by delivering
        results incrementally, giving users visibility into the agent's progress as it
        happens rather than only after it finishes.
      </p>

      <ConceptBlock title="Streaming" number="Concept 4.10">
        Streaming is the practice of delivering an agent's output incrementally — token by
        token, sentence by sentence, or action by action — rather than waiting for the
        entire response to be generated before showing anything. Streaming applies to both
        the model's text generation and the agent's tool loop: users can see text appearing
        as the model produces it, and they can see tool calls being made as the agent
        works through its plan.
      </ConceptBlock>

      <AnalogyBlock title="A Live Sports Broadcast">
        Nobody wants to watch a football match as a two-hour recording after the final
        whistle. The value is in watching it live — seeing each play unfold, feeling the
        momentum shift, reacting in real time. Streaming gives users the same live
        experience with agent work. They see the agent reason, act, encounter results,
        and adjust — not as a finished report, but as a process they can follow along
        with and, when needed, interrupt.
      </AnalogyBlock>

      <p>
        Streaming is not just a cosmetic improvement. It changes the dynamics of the
        interaction in fundamental ways. When users can see the agent's reasoning as it
        unfolds, they can catch misunderstandings early and redirect the agent before it
        wastes effort on the wrong path. This turns a batch interaction — submit and wait —
        into an interactive collaboration where course corrections happen mid-task.
      </p>

      <PrincipleBlock title="Visible Progress Builds Trust" number="Principle 4.10">
        Users trust what they can observe. An agent that streams its reasoning and
        actions gives users evidence that it is working correctly — or early warning
        that it is not. Opaque agents that produce results after long silences create
        anxiety and erode confidence, even when the final output is correct. Making
        work visible is a design choice that directly affects user trust.
      </PrincipleBlock>

      <NoteBlock title="Streaming tool calls" type="tip">
        Text streaming is straightforward — tokens appear as they are generated. Tool
        call streaming requires more thought. The runtime should communicate what tool
        is being called, show that the call is in progress, and reveal the result when
        it arrives. This gives users a play-by-play of the agent's actions, not just
        a stream of text output.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'str-1',
            difficulty: 'beginner',
            question:
              'Why does streaming matter more for agents than for simple chat interfaces?',
            hint: 'Think about how long each type of interaction typically takes.',
            solution:
              'Agents often perform multi-step work involving multiple tool calls, each of which takes time. A simple chat response might take one to three seconds, making the wait tolerable. An agent task might take thirty seconds to several minutes. Without streaming, the user stares at a blank screen for that entire duration with no indication of progress. Streaming bridges this gap by keeping the user informed throughout.',
          },
          {
            id: 'str-2',
            difficulty: 'intermediate',
            question:
              'An agent is streaming its text output to the user, and mid-stream it decides to call a tool. What should the user experience look like during the transition from text output to tool execution and back?',
            hint: 'Think about maintaining clarity about what the agent is doing at each moment.',
            solution:
              'The text stream should pause with a clear indication that the agent is now taking an action — such as displaying the tool name and a "working" indicator. While the tool executes, the user sees that the agent is waiting for a result. When the result arrives, the agent resumes text streaming, potentially incorporating the tool result into its continued response. The key is that no phase is invisible — the user always knows whether the agent is thinking, acting, or waiting.',
          },
          {
            id: 'str-3',
            difficulty: 'advanced',
            question:
              'Streaming lets users see agent work in progress, which means they might see reasoning that later turns out to be wrong. How should a runtime handle the case where the agent starts down one path, realizes it is wrong, and changes course — all while streaming to the user?',
            hint: 'Consider the tradeoff between transparency and confusion.',
            solution:
              'The runtime should stream the course correction transparently rather than hiding it. Show the agent recognizing its mistake and explaining the change in direction — this actually builds trust by demonstrating self-correction. However, the runtime should distinguish between minor adjustments (which can be streamed inline) and major pivots (which might warrant a visual separator or a brief summary of why the approach changed). Never silently discard already-streamed content, as users may have read it and would be confused by its disappearance.',
          },
        ]}
      />
    </div>
  );
}
