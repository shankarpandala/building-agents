import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function SecretsSensitive() {
  return (
    <div className="prose-agents">
      <h2>Secrets and Sensitive Data</h2>
      <p>
        Agents frequently need to interact with credentials, API keys, personal data, and other
        sensitive information to do their jobs. How this sensitive data flows through an agent
        system — and where it comes to rest — is one of the most critical safety and privacy
        design decisions an agent architect makes.
      </p>

      <ConceptBlock title="Secrets in Agent Systems" number="Concept 3.14">
        Secrets are any values that grant access or convey sensitive information: API keys,
        passwords, tokens, personal identifiers, or confidential content. In agent systems,
        secrets are dangerous because they can appear in multiple places: the prompt, the
        conversation history, tool call arguments, tool responses, and logs. Each location is
        a potential exposure point that must be designed and monitored carefully.
      </ConceptBlock>

      <p>
        The most common secret management mistake in agent systems is injecting secrets directly
        into the agent's context — the prompt or conversation history. Once a secret is in the
        context, it can be echoed back in agent responses, logged by debugging tools, persisted
        in conversation history, or leaked through prompt injection. The preferred pattern is
        for agents to trigger secret-using operations rather than handling secrets directly.
      </p>

      <WarningBlock title="Secrets in context windows persist">
        When a secret enters an agent's context window, it is treated like any other text — it
        may be included in future turns, summarized, logged, or surfaced in error messages. Do
        not assume that an agent will "know" not to repeat sensitive values. Architectural
        controls, not behavioral instructions, are the right mechanism for keeping secrets out
        of agent outputs.
      </WarningBlock>

      <PrincipleBlock title="Agents Should Trigger, Not Handle" number="Principle 3.6">
        Prefer designs where agents trigger operations that use secrets rather than receiving
        the secrets themselves. An agent that calls a tool named "send_authenticated_request"
        is safer than one that receives an API key and constructs the request itself. The secret
        stays in the tool layer, the agent only sees the result. This pattern applies to all
        sensitive data: the agent reasons about it, but a separate layer handles it.
      </PrincipleBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ss-1',
            difficulty: 'beginner',
            question:
              'A developer wants to give an agent access to a third-party weather API. They propose including the API key directly in the system prompt. Describe two specific risks this creates.',
            hint: 'Think about where the system prompt content might end up beyond the initial API call.',
            solution:
              '(1) The API key may appear in the agent\'s responses if the user asks about the system configuration or if the agent inadvertently echoes context. (2) If conversation history is logged or persisted, the API key will appear in plaintext logs accessible to anyone with log access — creating a persistent exposure that outlasts the conversation itself.',
          },
          {
            id: 'ss-2',
            difficulty: 'intermediate',
            question:
              'Design an architecture for an agent that needs to make authenticated calls to a financial data API. The agent should never see the API key directly. What components are needed and how do they interact?',
            hint: 'Think about the "trigger, not handle" principle.',
            solution:
              'Components: (1) A credential store (e.g., a secrets manager) that holds the API key. (2) A proxy tool service that the agent can call with a request description. (3) The proxy service retrieves the API key from the credential store, makes the authenticated call, and returns only the response data to the agent. The agent calls the proxy tool — it never sees the credential. The key exists only in the credential store and the proxy service\'s memory during execution.',
          },
          {
            id: 'ss-3',
            difficulty: 'advanced',
            question:
              'An agent is processing customer support tickets that contain PII (names, email addresses, account numbers). The agent needs this information to resolve tickets but it should not be stored in conversation history permanently. Describe a data handling architecture that balances these requirements.',
            hint: 'Think about what needs to persist, what should be ephemeral, and how to link them without exposing the sensitive data.',
            solution:
              'Use a reference-token pattern: store PII in a secure, access-controlled customer data store. The agent operates on opaque customer identifiers (tokens) rather than actual PII in its context. When PII is needed for a specific operation, the agent calls a tool that resolves the token to PII internally, performs the operation, and returns a non-PII result. Conversation history stores only tokens. PII access is logged in a dedicated audit system separate from conversation logs, with retention policies aligned to data governance requirements.',
          },
        ]}
      />
    </div>
  );
}
