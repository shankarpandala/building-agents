import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function AsyncMailboxes() {
  return (
    <div className="prose-agents">
      <h2>Async Mailboxes</h2>
      <p>
        Synchronous communication requires both agents to be "present" at the same time —
        the sender sends and waits, the recipient processes immediately and responds.
        This is simple but constraining: agents are blocked while waiting for responses,
        and the team's throughput is limited by its slowest synchronous exchange.
        Asynchronous mailboxes break this constraint.
      </p>

      <ConceptBlock title="Async Mailboxes" number="Concept 8.7">
        An async mailbox is a queue assigned to each agent into which other agents can
        deposit messages without waiting for an immediate response. The receiving agent
        processes messages from its mailbox whenever it is ready, not necessarily when
        the message was sent. This decouples senders from receivers: the sender continues
        working after depositing a message, and the receiver works through its queue at
        its own pace. Async mailboxes are the foundation of high-throughput team
        architectures.
      </ConceptBlock>

      <p>
        The trade-off is complexity: with async communication, the sender cannot assume
        the message has been received or processed by the time it takes its next action.
        It must design for the possibility that the recipient has not yet seen the message.
        This requires explicit acknowledgement mechanisms, careful sequencing of
        dependent actions, and timeouts for messages that remain unprocessed for too long.
      </p>

      <AnalogyBlock title="The Office Inbox">
        The physical inbox on a desk is an async mailbox. Colleagues can leave documents
        while you are busy — they do not need to wait for you to read them immediately.
        You process your inbox when you reach a natural break in your current work.
        This is efficient for both parties. But it means you might not see an urgent
        message for an hour. Urgent communications require a different channel — a
        knock on the door — precisely because async communication cannot guarantee
        timely delivery for critical messages.
      </AnalogyBlock>

      <NoteBlock type="tip" title="Priority Lanes">
        Design mailboxes with at least two priority lanes: standard and urgent. Agents
        check urgent messages before processing standard ones. Critical broadcasts,
        cancellation signals, and blocker notifications should use the urgent lane.
        Routine result deliveries and status updates use the standard lane. This simple
        prioritisation prevents urgent signals from being delayed behind a backlog of
        routine messages.
      </NoteBlock>

      <ExerciseBlock
        title="Designing Async Mailbox Systems"
        exercises={[
          {
            id: 'am-1',
            difficulty: 'beginner',
            question: 'What are two advantages of async mailboxes over synchronous communication in an agent team? What is one significant disadvantage that must be designed around?',
            hint: 'Think about throughput, blocking, and the ordering guarantee you lose.',
            solution: 'Advantages: (1) Higher throughput — senders never block waiting for recipients, so the whole team can progress simultaneously. (2) Resilience to speed mismatches — a slow agent does not stall a fast one. Disadvantage: no delivery guarantee without explicit acknowledgement — the sender cannot assume the recipient has acted on the message by any particular time. This must be handled with ack protocols, timeouts, and retry logic.',
          },
          {
            id: 'am-2',
            difficulty: 'intermediate',
            question: 'An agent sends an important task assignment via async mailbox and then, five minutes later, sends a follow-up that depends on the recipient having received and started the first message. What can go wrong, and how should the sender design around it?',
            hint: 'Think about what the sender cannot safely assume about the recipient\'s mailbox state.',
            solution: 'What can go wrong: the recipient may not have processed the first message yet when the follow-up arrives. The follow-up references a task the recipient hasn\'t seen. Processing the follow-up first produces confusion or failure. Design solution: (1) Include a prerequisite_message_id field in the follow-up — the recipient only processes it after confirming it has processed the referenced prior message. (2) Alternatively, the sender waits for an explicit ack of the first message before sending the follow-up (hybrid sync checkpoint). (3) Or bundle both messages into a single sequential message so the recipient processes them in order atomically.',
          },
          {
            id: 'am-3',
            difficulty: 'advanced',
            question: 'Design a dead-letter protocol for messages that remain unprocessed in a mailbox for longer than a threshold time. What should happen to the message, who should be notified, and how should the team recover?',
            hint: 'Think about triage: is the recipient alive? Is the message still relevant?',
            solution: 'Dead-letter protocol: (1) A watchdog monitors mailbox queue depths. When a message exceeds the age threshold, it is moved to a dead-letter queue. (2) The watchdog notifies the team lead with: { message_id, intended_recipient, age, message_type }. (3) The lead performs triage: (a) Is the recipient still active? If not, reassign the task to another agent or a new instance. (b) Is the message still relevant? If the task is complete via another path, discard. If still needed, re-deliver. (4) The lead records the incident in the audit log with its resolution action. (5) Persistent dead-lettering by the same recipient triggers a health-check and possible replacement.',
          },
        ]}
      />
    </div>
  );
}
