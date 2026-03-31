import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function SessionIdentitySection() {
  return (
    <div className="prose-agents">
      <p>
        Every agent interaction happens within a session — a bounded unit of
        communication with a defined start and end. Session identity is the set of
        attributes that uniquely identify a session and determine who is in it, what
        permissions are active, and what context should be loaded.
      </p>

      <ConceptBlock title="Session Identity" number="Concept 6.10">
        Session identity is the bundle of attributes that uniquely define a conversation
        instance. It includes: a unique session identifier, the authenticated user
        identity, the operator context (which deployment or product this session
        belongs to), the session creation time, and the access permissions active
        for this session. Session identity is established at the start of the
        conversation and persists throughout.
      </ConceptBlock>

      <AnalogyBlock title="The Hotel Check-In">
        When a guest checks in, they receive a key card encoded with their room number,
        their access level (standard guest versus VIP), and their checkout date.
        Every interaction with the hotel's systems — elevator, gym, restaurant —
        reads that card to determine what is allowed. A session token works the same way:
        it carries the identity and permissions that govern what the agent may access
        and do on behalf of this user, in this context, for this duration.
      </AnalogyBlock>

      <p>
        Session identity drives two critical functions. First, it enables
        <strong> personalization</strong> — the right user memory, preferences, and
        history are loaded for this user. Second, it enforces <strong>authorization</strong>
        — only resources and actions permitted for this user in this operator context
        are accessible. A session with a corrupted or spoofed identity can violate
        both personalization and authorization.
      </p>

      <NoteBlock type="note" title="Session vs. Conversation">
        A session and a conversation are related but distinct. A session is a technical
        authentication and authorization context. A conversation is the sequence of
        messages. A single session can contain multiple conversations (if a user starts
        a new topic without re-authenticating). A single conversation might span
        multiple sessions (if a user logs out and resumes). Track both identifiers
        independently.
      </NoteBlock>

      <ExerciseBlock
        title="Session Identity Practice"
        exercises={[
          {
            id: 'e6-10-1',
            difficulty: 'beginner',
            question: 'List the minimum set of attributes a session identity record should contain for a multi-tenant SaaS agent platform. Explain why each attribute is necessary.',
            hint: 'Think about isolation, authorization, and traceability.',
            solution: 'Session ID (unique, for tracing and resumption), User ID (who this session belongs to), Tenant/Operator ID (which deployment — ensures memory and tools are scoped correctly), Authentication timestamp (session freshness for security), Permission set (what this user is allowed to do), Expiration time (when the session must be re-authenticated).',
          },
          {
            id: 'e6-10-2',
            difficulty: 'intermediate',
            question: 'A user opens the same agent in two browser tabs simultaneously, creating two active sessions. What problems can arise, and how should the system handle them?',
            hint: 'Consider state conflicts, duplicate actions, and user experience.',
            solution: 'Problems: (1) Both sessions may independently fetch and modify the same application state, causing conflicts. (2) A user action in tab A may be invisible to tab B, leading to duplicate submissions. (3) Conversation history diverges between sessions. Handling: notify the user that multiple sessions are active. For mutating actions, apply an optimistic lock tied to the session that first initiated the action. Offer session consolidation on login.',
          },
          {
            id: 'e6-10-3',
            difficulty: 'advanced',
            question: 'How should session identity be designed to support auditing? What information must be captured at session creation to enable a complete audit trail of the session\'s actions months later?',
            hint: 'Think about who needs to read the audit trail and what questions it must answer.',
            solution: 'At session creation, capture and immutably store: session ID, user ID with their role at time of session, operator/tenant ID, authentication method and timestamp, IP address and user agent (for fraud analysis), permission set snapshot (not just a role name — the actual permissions as they were at that moment). During the session, each action is logged against the session ID with its own timestamp. Months later, the audit trail must answer: who did what, with what permissions, on what timeline, authorized by whom.',
          },
        ]}
      />
    </div>
  );
}
