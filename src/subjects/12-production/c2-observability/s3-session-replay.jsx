import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function SessionReplay() {
  return (
    <div className="prose-agents">
      <h2>Session Replay</h2>
      <p>
        When an agent behaves unexpectedly, understanding why requires reconstructing
        exactly what happened. Session replay is the capability to reconstruct a full
        agent session — every message, every tool call, every model response —
        from stored records, allowing post-hoc investigation without needing the
        original running system.
      </p>

      <ConceptBlock title="Session Replay" number="Concept 12.7">
        Session replay is the reconstruction of a past agent session from logged records.
        It provides a timestamped, step-by-step view of what the agent received, what
        it decided, what it called, and what results it received. This allows developers
        to identify exactly where reasoning went wrong, which tool returned unexpected
        data, or where the agent's behavior deviated from what was intended.
      </ConceptBlock>

      <AnalogyBlock title="The Court Reporter">
        A court reporter transcribes every word spoken in a trial — not because most
        of it will be reviewed, but because any part of it might need to be retrieved
        later. If a dispute arises about what was said, the record is there. Session
        replay is the court reporter for agent interactions: a complete, faithful
        record that enables reconstruction of any past session, regardless of when
        the need to review it arises.
      </AnalogyBlock>

      <p>
        The records needed for session replay include: the full conversation history
        (all system, user, and assistant messages), each tool call with its exact
        arguments, each tool result with its exact response, timing information
        for every step, and any context that was injected (retrieved documents,
        system state). Without complete records, replay is impossible and
        investigation relies on incomplete evidence.
      </p>

      <PrincipleBlock title="Log Everything You Need to Understand the Past" number="Principle 12.3">
        You cannot predict in advance which session you will need to replay.
        The sessions that are fine do not need investigation; only the sessions that
        went wrong do. But you cannot know in advance which ones those will be.
        Therefore, every session must be logged with sufficient detail for replay
        from the moment it begins. Logging can be sampled for storage efficiency,
        but flagged or anomalous sessions should always be retained in full.
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'sr-1',
            difficulty: 'beginner',
            question: 'What information must be stored for a session replay to fully reconstruct an agent interaction?',
            hint: 'Think about all the inputs and outputs that pass through the agent during a session.',
            solution: 'Required records: (1) The session ID and timestamps for every step. (2) All messages in the conversation: system prompt, user messages, assistant messages. (3) Each tool call: name, arguments, the exact time it was made. (4) Each tool result: the exact response body and any error information. (5) Any injected context: retrieved documents, user profile data, system state that was fetched. (6) Model metadata: which model version was used. Without complete records of both inputs and outputs at each step, the replay will be missing context that the agent had, making the reconstruction incomplete.'
          },
          {
            id: 'sr-2',
            difficulty: 'intermediate',
            question: 'A user reports that the agent gave them incorrect advice three days ago but they cannot recall the exact conversation. How would session replay help, and what would you look for?',
            hint: 'Think about finding the session and then diagnosing the cause.',
            solution: 'Use the user ID and approximate timestamp to locate the session in the replay store. Reconstruct the full interaction and identify the turn where the incorrect advice was given. Then examine: (1) What information did the agent have at that point — was the context it was working from correct or incorrect? (2) Which tool calls were made — did a tool return wrong data? (3) What was the model\'s reasoning — did it misinterpret correct data? (4) Was the system prompt in effect the current version — or was a stale version active? This reconstruction often reveals whether the fault was in the model\'s reasoning, in a tool, or in the data the user provided.'
          },
          {
            id: 'sr-3',
            difficulty: 'advanced',
            question: 'Session logs may contain sensitive user data. How do you balance the need for full session replay against privacy and data minimization principles?',
            hint: 'Think about what is stored, for how long, and who can access it.',
            solution: 'Strategies: (1) Data minimization in storage — store structured tool call records rather than full message text where possible; store summaries for benign sessions and full detail only for flagged or anomalous ones. (2) Differential retention — standard sessions are retained for 30 days and then deleted; flagged sessions with potential safety or quality issues are retained for longer pending review. (3) Access controls — session replays are accessible only to authorized debugging and safety teams, not all engineers. (4) Redaction pipeline — sensitive fields (credentials, PII detected by a classifier) are automatically redacted from stored logs at collection time. (5) User consent — clearly disclose in the product that sessions may be retained for safety and quality purposes, and provide mechanisms for users to request deletion of their session data.'
          }
        ]}
      />
    </div>
  );
}
