import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function CapabilitiesSection() {
  return (
    <div className="prose-agents">
      <p>
        After establishing identity, the system prompt must specify what the agent can
        actually do. Capabilities are the positive surface area of the agent — an explicit
        list of actions, topics, and task types it is equipped and authorized to handle.
      </p>

      <ConceptBlock title="Declared Capabilities" number="Concept 5.2">
        Capabilities are the set of tasks and topics an agent is explicitly prepared to
        perform. They span two dimensions: <strong>functional capabilities</strong>
        (what actions the agent can take — answer questions, draft documents, query
        databases) and <strong>domain capabilities</strong> (what subject matter the
        agent knows about and is authorized to address).
      </ConceptBlock>

      <p>
        Declaring capabilities serves the agent, the operator, and the user simultaneously.
        The agent gains a clear frame for self-assessment — it can evaluate whether a
        request maps to something it was built for. The operator gains predictability.
        The user gains confidence that the agent is genuinely equipped to help, not
        improvising outside its expertise.
      </p>

      <NoteBlock type="tip" title="Capability Precision">
        Vague capability statements like "help with anything related to finance" create
        ambiguity. Prefer specific statements: "answer questions about account balances,
        transaction history, and bill payments." Precision reduces hallucination about
        in-scope tasks.
      </NoteBlock>

      <WarningBlock title="Capability Inflation">
        Listing capabilities the agent does not reliably possess trains users to expect
        more than the system can deliver. When the agent fails at a declared capability,
        trust collapses disproportionately. It is better to under-declare and over-deliver.
      </WarningBlock>

      <ExerciseBlock
        title="Capabilities Practice"
        exercises={[
          {
            id: 'e5-2-1',
            difficulty: 'beginner',
            question: 'An HR agent is told it can "help employees with HR-related questions." Rewrite this as three precise capability statements.',
            hint: 'Break the vague description into concrete, specific task types.',
            solution: 'Example: (1) Answer questions about leave balances, accrual rules, and request procedures. (2) Explain company benefits including health insurance options, retirement plans, and enrollment windows. (3) Guide employees through the onboarding checklist and first-week administrative tasks.',
          },
          {
            id: 'e5-2-2',
            difficulty: 'intermediate',
            question: 'Explain why a capability declaration and a tool list are not the same thing. Give an example where they diverge.',
            hint: 'A capability is what the agent can do from the user\'s perspective; a tool is a technical mechanism.',
            solution: 'A capability is a user-facing promise ("I can retrieve your order status"). A tool is the technical implementation (an API call to the order management system). They diverge when the same capability relies on multiple tools, or when a tool exists but the agent is not authorized to expose its results to users.',
          },
          {
            id: 'e5-2-3',
            difficulty: 'advanced',
            question: 'Design a capability declaration strategy for an agent whose abilities will expand over time as new tools are integrated. How do you avoid over-promising?',
            hint: 'Think about versioned prompts, phased rollouts, and how to signal uncertainty.',
            solution: 'Declare only capabilities backed by currently integrated tools. When a capability is in beta, explicitly mark it as such: "currently in preview, may not work in all cases." Maintain a prompt version so capability changes are auditable. Never declare a capability until it passes acceptance testing end-to-end.',
          },
        ]}
      />
    </div>
  );
}
