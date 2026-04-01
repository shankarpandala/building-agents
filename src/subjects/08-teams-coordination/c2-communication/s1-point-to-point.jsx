import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function PointToPoint() {
  return (
    <div className="prose-agents">
      <h2>Point-to-Point Communication</h2>
      <p>
        The most fundamental communication pattern in an agent team is direct, targeted
        messaging between two agents: one sender, one recipient, one message. This is
        point-to-point communication. It is simple, traceable, and easy to reason about —
        which makes it the right default for the majority of inter-agent exchanges in a
        well-designed team.
      </p>

      <ConceptBlock title="Point-to-Point Communication" number="Concept 8.5">
        Point-to-point communication is a message sent from one specific agent to another,
        with a defined purpose: a task assignment, a status report, a result delivery, or a
        request for clarification. The sender knows who will receive the message; the
        recipient knows who sent it and why. This specificity makes point-to-point exchanges
        easy to audit, easy to attribute, and easy to replay for debugging. It is the
        backbone of structured team coordination.
      </ConceptBlock>

      <p>
        The simplicity of point-to-point communication is also its limitation. In a team
        with many members, maintaining direct channels between every pair of agents creates
        a dense network that is hard to manage. For small teams — typically fewer than six
        to eight agents — point-to-point communication is ideal. For larger teams, selective
        use of point-to-point for critical exchanges, combined with other patterns for
        broader announcements, produces better results.
      </p>

      <NoteBlock type="intuition" title="Communication as a Design Constraint">
        Think of each point-to-point channel as a named, purposeful connection. When designing
        a team, draw out the communication topology: who needs to talk to whom, and for what
        purpose? If the resulting diagram has more connections than you can easily trace, the
        team may be too large or too loosely structured for point-to-point to be the primary
        pattern.
      </NoteBlock>

      <WarningBlock title="Informal Side Channels">
        In human teams, informal communication channels emerge naturally — a quick corridor
        question, an unscheduled call. In agent teams, undocumented or ad-hoc communication
        bypasses the structured channels and creates messages that are invisible to the team
        lead and impossible to audit. Every agent communication should flow through a defined,
        logged channel.
      </WarningBlock>

      <ExerciseBlock
        title="Point-to-Point Communication Design"
        exercises={[
          {
            id: 'pp-1',
            difficulty: 'beginner',
            question: 'For a three-agent team (lead, researcher, writer), map out all the point-to-point channels that would exist. For each channel, name one message type that would flow across it.',
            hint: 'Channels can be bidirectional — think about what flows in each direction.',
            solution: 'Channels: (1) Lead → Researcher: task assignment ("research topic X, return key findings as a structured list"). (2) Researcher → Lead: result delivery ("here are five findings with sources"). (3) Lead → Writer: task assignment with context ("write a 500-word summary using these findings"). (4) Writer → Lead: completion report ("draft complete, attached for review"). (5) Researcher → Lead: blocker report ("source is unavailable, awaiting instructions"). Five directed channels, each with a distinct message type.',
          },
          {
            id: 'pp-2',
            difficulty: 'intermediate',
            question: 'A team lead needs to send a task to a researcher and then later needs to query the status of that task. Design the message schemas for both the initial assignment and the status query. What fields are essential in each?',
            hint: 'Think about what the recipient needs to act correctly on each message.',
            solution: 'Task assignment schema: { type: "task_assignment", task_id: string, from: "lead", to: "researcher", goal: string, context: object, constraints: object, output_format: object, deadline: ISO-8601 }. Status query schema: { type: "status_query", task_id: string, from: "lead", to: "researcher", query_time: ISO-8601 }. Status response schema: { type: "status_response", task_id: string, from: "researcher", to: "lead", status: "in_progress"|"completed"|"blocked"|"failed", progress_note: string, estimated_completion: ISO-8601 | null }.',
          },
          {
            id: 'pp-3',
            difficulty: 'advanced',
            question: 'Design a message routing layer for a six-agent team where all communication flows through a central message bus rather than direct agent-to-agent calls. What properties must the bus guarantee, and what metadata must every message carry?',
            hint: 'Think about delivery guarantees, ordering, attribution, and observability.',
            solution: 'Bus guarantees: (1) At-least-once delivery — no message silently dropped. (2) Ordering per channel — messages between the same sender-recipient pair arrive in send order. (3) Attribution — every message is signed with sender identity. (4) Persistence — messages are logged before delivery, enabling replay. Required metadata per message: { message_id: UUID, sent_at: timestamp, from_agent_id: string, to_agent_id: string, conversation_id: string (groups related messages), message_type: string, payload_schema_version: string }. The bus uses conversation_id to group related exchanges and enables the team lead to query the full history of any sub-task by conversation.',
          },
        ]}
      />
    </div>
  );
}
