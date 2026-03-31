import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function SecureTunneling() {
  return (
    <div className="prose-agents">
      <h2>Secure Tunneling</h2>
      <p>
        When an agent operates on a remote machine, every message between the agent and
        its orchestrator — including instructions, tool results, and sensitive outputs —
        travels across a network. That network must be treated as untrusted. Secure
        tunneling is the mechanism that protects this communication.
      </p>

      <ConceptBlock title="Secure Tunnel" number="Concept 11.7">
        A secure tunnel is an encrypted, authenticated channel between two endpoints.
        It ensures that messages cannot be read by third parties (confidentiality),
        cannot be tampered with in transit (integrity), and originate from the expected
        sender (authenticity). For agents, a secure tunnel protects both instructions
        going to the agent and outputs coming back.
      </ConceptBlock>

      <p>
        The threat model for agent communication is not hypothetical. Instructions
        sent in plaintext can be observed and modified. An adversary who can inject
        or alter messages in the communication channel between an orchestrator and
        an agent can effectively redirect the agent's behavior — causing it to take
        actions that were never authorized by the human operator.
      </p>

      <PrincipleBlock title="Treat Every Network as Untrusted" number="Principle 11.2">
        An agent should never send sensitive data over an unencrypted channel, even
        within a "private" network. Internal networks can be compromised, cloud VPCs
        can be misconfigured, and co-located services can be malicious. End-to-end
        encryption from orchestrator to agent is the only reliable way to ensure
        the communication channel has not been subverted.
      </PrincipleBlock>

      <WarningBlock title="Credential Exposure in Transit">
        Agent instructions often contain credentials, API keys, or tokens needed to
        perform tasks. If these travel over an unencrypted channel, they are exposed
        to anyone who can observe the network. This is not a theoretical risk — leaked
        credentials are one of the most common causes of security incidents. Always
        encrypt the channel before sending any sensitive material.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'st-1',
            difficulty: 'beginner',
            question: 'What are the three properties a secure tunnel provides? Why does each matter for agent communication specifically?',
            hint: 'Consider what happens if each property is absent.',
            solution: 'Confidentiality ensures that sensitive instructions, credentials, and outputs cannot be read by a third party intercepting the traffic. Integrity ensures that messages cannot be silently altered — an attacker cannot change "delete test files" to "delete all files." Authenticity ensures the agent is actually talking to its intended orchestrator and not an impersonator injecting rogue instructions. All three matter because agents act on their instructions directly, so a compromised channel means compromised behavior.'
          },
          {
            id: 'st-2',
            difficulty: 'intermediate',
            question: 'An agent needs to connect to a remote machine that is behind a firewall with no public IP address. Describe a tunneling approach that would allow this without opening public ports.',
            hint: 'Think about which side initiates the connection.',
            solution: 'The remote machine can initiate an outbound connection to a relay server (or directly to the orchestrator if it is reachable). Because the connection is outbound, no inbound port needs to be opened through the firewall. This is commonly implemented as a persistent WebSocket or gRPC connection that the agent maintains. The orchestrator sends instructions as messages over this existing connection. This is sometimes called "reverse tunneling" — the agent reaches out rather than waiting to be reached.'
          },
          {
            id: 'st-3',
            difficulty: 'advanced',
            question: 'How should an agent respond if its secure tunnel drops mid-task? What behaviors are acceptable and what would be dangerous?',
            hint: 'Think about partial completion, side effects already taken, and the risk of resuming without the orchestrator\'s knowledge.',
            solution: 'Acceptable behaviors: pause all new actions immediately, store current state to persistent storage, attempt to re-establish the tunnel with exponential backoff, and resume only after the orchestrator explicitly re-authorizes continuation (not automatically). Dangerous behaviors: continuing to take actions without the orchestrator\'s awareness (the human can no longer observe or intervene), silently discarding completed work, or retrying failed actions without checking whether they already succeeded (risking double execution of destructive operations).'
          }
        ]}
      />
    </div>
  );
}
