import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function TranscriptsSection() {
  return (
    <div className="prose-agents">
      <p>
        A transcript is the durable record of a conversation — every message, every
        tool call, every result, and every decision made during a session. Transcripts
        serve operations, quality assurance, compliance, and the ability to resume
        interrupted sessions.
      </p>

      <ConceptBlock title="Session Transcript" number="Concept 6.11">
        A session transcript is the complete, ordered, time-stamped record of all
        events in a session. For an agent session, this includes: user and assistant
        messages, tool invocations and their results, any injected system messages
        or context updates, and session metadata (start/end time, session identity).
        A complete transcript is both a debugging artifact and a compliance record.
      </ConceptBlock>

      <p>
        Transcripts have multiple consumers with different needs. <strong>Operations
        teams</strong> need transcripts to diagnose failures and reproduce issues.
        <strong>Quality assurance</strong> teams use them to evaluate agent performance
        and identify patterns in incorrect or harmful responses. <strong>Compliance
        teams</strong> need them to verify that the agent behaved within policy.
        <strong>Users</strong> may need them to review what was done on their behalf.
        A good transcript format serves all of these consumers.
      </p>

      <PrincipleBlock title="Transcripts Are Immutable" number="Principle 6.5">
        Transcripts must be immutable once written. An agent that can modify its own
        transcript could conceal errors, remove evidence of policy violations, or
        retroactively alter commitments it made. The transcript is the authoritative
        record; any correction or annotation must be appended as a new entry, not
        applied as an edit to an existing one.
      </PrincipleBlock>

      <NoteBlock type="note" title="Transcript Size Management">
        Long sessions and tool-heavy agents produce very large transcripts. Structure
        the transcript format to support selective retrieval — indexed by turn number,
        by event type, and by timestamp — so consumers can query only the portion they
        need without reading the entire record.
      </NoteBlock>

      <ExerciseBlock
        title="Transcripts Practice"
        exercises={[
          {
            id: 'e6-11-1',
            difficulty: 'beginner',
            question: 'What is the minimum information each transcript entry should contain to make it useful for both operations debugging and compliance review?',
            hint: 'Think about what these two different consumers need from the same record.',
            solution: 'Minimum per entry: event type (user message / assistant message / tool call / tool result / system event), timestamp, session ID, event content, for tool events: tool name + parameters + result + duration. Operations additionally needs: error codes, latency, model version. Compliance additionally needs: policy version active at the time, any policy triggers or overrides applied.',
          },
          {
            id: 'e6-11-2',
            difficulty: 'intermediate',
            question: 'A user requests a copy of their conversation transcript for their own records. What should and should not be included in the version provided to the user?',
            hint: 'Consider what is the user\'s information versus what is system-internal.',
            solution: 'Include: all user messages, all assistant messages, tool invocations and results that the user directly requested or that informed the agent\'s visible responses. Exclude: internal system messages and operator instructions (may contain confidential operator configuration), raw tool errors with system internals, session metadata beyond creation time and user identity.',
          },
          {
            id: 'e6-11-3',
            difficulty: 'advanced',
            question: 'Design a transcript retention policy for a healthcare agent that handles sensitive medical queries. What retention periods apply, who can access which parts, and when must transcripts be destroyed?',
            hint: 'Consider regulatory requirements, user rights, and purpose limitation.',
            solution: 'Retention: full transcripts retained for 7 years to meet medical record requirements. Access: users access their own transcripts on request. Clinical staff access transcripts for their own patients only. Compliance accesses redacted transcripts for audit purposes. Security accesses metadata only (no content) for incident investigation. Destruction: on user deletion request, anonymize content while retaining metadata for aggregate analysis. After the 7-year period, schedule automatic deletion. Tool call data containing raw medical terminology is separated into a higher-sensitivity tier with shorter access windows.',
          },
        ]}
      />
    </div>
  );
}
