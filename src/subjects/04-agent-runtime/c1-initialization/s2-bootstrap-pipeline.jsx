import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function BootstrapPipeline() {
  return (
    <div className="prose-agents">
      <h2>The Bootstrap Pipeline</h2>
      <p>
        Initialization is not a single event — it is a pipeline of ordered steps, each building
        on the previous one. The bootstrap pipeline defines the sequence of operations that
        transforms a bare runtime environment into a fully operational agent session. Understanding
        this pipeline is essential for diagnosing failures, optimizing performance, and ensuring
        that each session starts in a known-good state.
      </p>

      <ConceptBlock title="Bootstrap Pipeline" number="Concept 4.2">
        The bootstrap pipeline is the ordered sequence of initialization steps that an agent
        runtime executes before the first user interaction. Each step has defined inputs,
        outputs, and failure modes. Steps that depend on each other must execute in order;
        steps that are independent can be parallelized. The pipeline is complete when all
        required components are initialized, validated, and connected.
      </ConceptBlock>

      <p>
        A typical bootstrap pipeline moves through distinct phases. Configuration loading
        assembles all the parameters the agent needs. Context assembly builds the system prompt
        and any initial conversation context. Resource provisioning connects to external
        services, tools, and data stores. Validation confirms that the assembled state is
        consistent and complete. Only after all phases complete successfully is the session
        declared ready.
      </p>

      <PrincipleBlock title="Fail Fast on Bootstrap Errors" number="Principle 4.1">
        Bootstrap failures should be detected and reported immediately, before any user turn is
        processed. An agent that starts in a degraded state and handles the first user message
        incorrectly is harder to debug than one that refuses to start and logs a clear error.
        Treat initialization failures as first-class errors, not background warnings to be
        addressed later.
      </PrincipleBlock>

      <NoteBlock title="Bootstrap pipeline vs. request pipeline" type="note">
        The bootstrap pipeline runs once per session. The request pipeline runs for every
        user message — it retrieves context, calls the model, handles tool calls, and returns
        a response. These two pipelines have very different performance and reliability
        requirements. Bootstrap can afford more thoroughness (validation, retries, health
        checks); the request pipeline must be optimized for latency.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'bp-1',
            difficulty: 'beginner',
            question:
              'Order these bootstrap steps from first to last and briefly explain why each must precede the next: (a) validate that the user has the required permissions, (b) load the agent\'s configuration from storage, (c) retrieve the user\'s conversation history, (d) assemble the system prompt.',
            hint: 'Think about what each step depends on.',
            solution:
              '(b) Load configuration — this must happen first as other steps depend on configuration values. (a) Validate permissions — you need configuration to know what permissions are required. (c) Retrieve conversation history — you need user identity confirmed before fetching their history. (d) Assemble system prompt — you need configuration, permissions, and context (including history) to build a complete system prompt.',
          },
          {
            id: 'bp-2',
            difficulty: 'intermediate',
            question:
              'A bootstrap step that retrieves user preferences fails 3% of the time due to a slow database. The team proposes catching the error and continuing with default preferences. What are the arguments for and against this approach?',
            hint: 'Think about user experience, correctness, and the nature of the dependency.',
            solution:
              'For: improves availability — 97% of sessions work normally, 3% degrade gracefully rather than failing entirely. Against: the agent behaves incorrectly for 3% of sessions without any visible signal — users may not realize their preferences are being ignored. The right choice depends on what the failing step controls. For cosmetic preferences, degradation is fine. For permissions or safety settings, silent defaults would be dangerous.',
          },
          {
            id: 'bp-3',
            difficulty: 'advanced',
            question:
              'Design a bootstrap pipeline for an agent that serves multiple tenants, where each tenant has their own system prompt template, tool configuration, and permission set. What are the key design challenges?',
            hint: 'Think about isolation between tenants and the performance implications of per-tenant initialization.',
            solution:
              'Key challenges: (1) Isolation — tenant A\'s configuration must never leak into tenant B\'s session. Address with strict namespacing and per-tenant validation. (2) Performance — loading per-tenant configuration from scratch for every session is slow. Address with a cached tenant configuration layer with invalidation hooks. (3) Configuration versioning — a tenant may update their configuration mid-session. Address by locking configuration at session start and applying updates only to new sessions.',
          },
        ]}
      />
    </div>
  );
}
