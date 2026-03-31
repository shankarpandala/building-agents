import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function EnvironmentDetection() {
  return (
    <div className="prose-agents">
      <h2>Environment Detection</h2>
      <p>
        An agent does not always know in advance exactly where it will run — development laptop,
        staging server, production cluster, or edge environment. The capabilities, constraints,
        and safety requirements differ significantly across these environments. Environment
        detection is the process by which the bootstrap pipeline discovers and adapts to the
        actual execution context, rather than assuming a fixed environment.
      </p>

      <ConceptBlock title="Environment Detection" number="Concept 4.5">
        Environment detection is the process of discovering the execution context during
        initialization — including available resources, connected services, network constraints,
        trust boundaries, and deployment tier. The agent uses this information to select
        appropriate behavior profiles, enable or disable capabilities, and apply the correct
        permission model for the detected environment.
      </ConceptBlock>

      <p>
        The most critical distinction is between production and non-production environments.
        An agent running in development should be safe to experiment with, even if it makes
        mistakes — it should connect to sandbox services, use test data, and apply permissive
        logging. An agent in production must connect to live services, protect real user data,
        and apply strict permission models. Getting this wrong — a production agent behaving
        like a development agent — is a serious safety failure.
      </p>

      <PrincipleBlock title="Detect, Don't Assume" number="Principle 4.2">
        Never assume the environment based on build artifacts or deployment method alone.
        Explicitly detect the environment at runtime by checking authoritative signals:
        environment flags, network connectivity to specific services, or explicit configuration
        from an infrastructure authority. A misconfigured deployment pipeline could target
        production with a development build; runtime detection catches this where build-time
        assumptions cannot.
      </PrincipleBlock>

      <NoteBlock title="Capability probing" type="info">
        Beyond environment tier, agents often need to probe for specific capabilities: is the
        vector database available? Does the image generation tool respond? Can the agent reach
        external APIs from this network? Capability probing during initialization allows the
        agent to gracefully adapt to partial environments — running in degraded mode with
        available tools rather than failing when optional capabilities are absent.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'ed-1',
            difficulty: 'beginner',
            question:
              'Why is checking an environment variable like ENVIRONMENT=production not sufficient on its own to confirm that an agent is running in production? What additional checks would you combine it with?',
            hint: 'Think about how environment variables can be wrong and what other signals are independent.',
            solution:
              'Environment variables can be misconfigured, left over from a previous deployment, or intentionally spoofed. Additional checks: (1) verify connectivity to production-specific services (e.g., the production database endpoint responds on the expected host). (2) Confirm that infrastructure metadata (e.g., cloud instance tags, Kubernetes namespace) matches production values. (3) Require that a production flag be set by an infrastructure authority (e.g., injected by the deployment system, not by application config).',
          },
          {
            id: 'ed-2',
            difficulty: 'intermediate',
            question:
              'An agent is designed to use a GPU-accelerated embedding service for semantic search. At runtime, environment detection reveals that only a CPU-based fallback is available. Describe two ways the agent might adapt its behavior, and discuss the trade-offs.',
            hint: 'Think about what the agent needs the capability for, and whether slower or lower-quality is better than nothing.',
            solution:
              'Option 1: use the CPU fallback transparently — semantic search still works but is slower. Appropriate if latency is acceptable and the quality difference is small. Option 2: disable features that depend on real-time semantic search and operate in a text-matching-only mode — lower quality but predictable latency. Appropriate if the CPU fallback would make the agent too slow for the use case. The agent should log which mode it is in so operators know the capability level in use.',
          },
          {
            id: 'ed-3',
            difficulty: 'advanced',
            question:
              'Design an environment detection subsystem for an agent that could be deployed in three contexts: a developer\'s local machine, a shared staging environment, and production. What signals would you check, and how would each detected environment change the agent\'s behavior?',
            hint: 'Think about the safety and capability differences across all three environments.',
            solution:
              'Signals to check: network reachability of environment-specific endpoints, infrastructure metadata, explicit environment flags verified by multiple sources. Local: connect to mock/stub services, verbose logging enabled, no rate limits, test credentials, full debug tooling available. Staging: connect to staging service replicas with production-like data shapes, structured logging, moderate rate limits, test credentials scoped to staging, warnings on expensive operations. Production: connect to live services, minimal logging (no PII in logs), strict rate limits, production credentials with least-privilege scoping, human-in-the-loop checkpoints active for high-stakes operations.',
          },
        ]}
      />
    </div>
  );
}
