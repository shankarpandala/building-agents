import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ConversationHistorySection() {
  return (
    <div className="prose-agents">
      <p>
        Conversation history is the most immediate form of agent memory. It is the
        sequence of messages exchanged in the current session — the raw record of
        what was said, asked, and answered. Without it, every turn is the agent's
        first interaction with the user.
      </p>

      <ConceptBlock title="Conversation History" number="Concept 6.1">
        Conversation history is the ordered sequence of user and assistant messages
        that have occurred in the current session. It gives the agent continuity —
        the ability to understand references to previous turns, track multi-step
        requests, and maintain consistent positions without asking the user to
        re-explain what they already said. History is the foundation of all other
        session state.
      </ConceptBlock>

      <AnalogyBlock title="The Shared Notepad">
        Two colleagues working on a problem together share a notepad where everything
        discussed is written down. Either person can glance at the notepad to recall
        what was agreed, what was tried, and what is still pending. Conversation history
        is that shared notepad — it makes the collaboration coherent even when the
        exchange is long and covers many topics.
      </AnalogyBlock>

      <p>
        Conversation history serves multiple functions simultaneously. It provides
        <strong> reference context</strong> (pronouns and implied references resolve
        correctly), <strong>task continuity</strong> (the agent knows where a
        multi-step task is in progress), and <strong>consistency enforcement</strong>
        (the agent does not contradict positions it took earlier). All three functions
        depend on history remaining accurate and intact.
      </p>

      <NoteBlock type="note" title="History Is Not Infallible">
        Conversation history records what was said, not what is true. If the user
        provided incorrect information earlier and the agent accepted it, that
        misinformation is now in the history. The agent must remain open to
        corrections that supersede earlier turns, not treat history as ground truth.
      </NoteBlock>

      <ExerciseBlock
        title="Conversation History Practice"
        exercises={[
          {
            id: 'e6-1-1',
            difficulty: 'beginner',
            question: 'A user says "change it to blue" without prior context in the current session. What should the agent do, and why does conversation history matter here?',
            hint: 'Consider what the agent needs to resolve the pronoun "it."',
            solution: 'Without prior context, "it" is unresolvable. The agent should ask: "I want to help — what would you like to change to blue?" If there were prior turns discussing a specific element (a button, a logo, a document), the agent could resolve the reference from history and proceed without asking.',
          },
          {
            id: 'e6-1-2',
            difficulty: 'intermediate',
            question: 'A user corrects information they gave earlier: "Actually, my account number is 12345, not 54321 like I said before." How should the agent handle this correction in terms of conversation history?',
            hint: 'Consider which piece of information the agent should act on going forward.',
            solution: 'The agent should acknowledge the correction, update its working understanding, and proceed with the corrected value. It should not protest that the old value is "in the history." When a later turn explicitly supersedes an earlier one, the later turn takes precedence for all subsequent actions.',
          },
          {
            id: 'e6-1-3',
            difficulty: 'advanced',
            question: 'In a multi-agent system where a handoff occurs mid-conversation, what aspects of the conversation history must the receiving agent receive to maintain continuity, and what can be safely omitted?',
            hint: 'Think about what the receiving agent needs to serve the user correctly.',
            solution: 'Must transfer: user\'s stated goal, key facts provided by the user, commitments made by the prior agent, current status of any in-progress tasks, and the most recent few turns for immediate context. Can omit: detailed reasoning steps of the prior agent, verbatim early turns if summarized, and internal tool call/result details unless they contain facts the user referenced.',
          },
        ]}
      />
    </div>
  );
}
