import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Isolation() {
  return (
    <div className="prose-agents">
      <h2>Isolating Sub-Agents</h2>
      <p>
        When multiple sub-agents run in the same system, they share an environment: the same
        file system paths, the same external APIs, potentially the same databases. Without
        deliberate isolation, sub-agents can interfere with each other in ways that are hard
        to debug and harder to predict. Isolation is the design practice that prevents those
        collisions.
      </p>

      <ConceptBlock title="Sub-Agent Isolation" number="Concept 7.7">
        Isolation is the property that one sub-agent's actions cannot unintentionally affect
        another sub-agent's work. Isolation operates at multiple levels: <strong>context
        isolation</strong> (each sub-agent has its own conversation context without access to
        others'), <strong>data isolation</strong> (sub-agents write to separate namespaces,
        directories, or records), and <strong>tool isolation</strong> (tools do not share
        mutable internal state). A system with poor isolation produces race conditions, corrupt
        shared state, and outputs that depend on execution ordering in unpredictable ways.
      </ConceptBlock>

      <p>
        Context isolation is automatic in most agent frameworks — each sub-agent starts a
        fresh conversation. Data isolation requires deliberate design. If two sub-agents both
        write to the same file path or the same database table, the last writer wins — or
        worse, both writes partially succeed and the result is malformed. The solution is
        namespacing: giving each sub-agent a unique scope for any shared resource it touches.
      </p>

      <NoteBlock type="intuition" title="The Namespace Pattern">
        A simple and effective isolation strategy is to assign each sub-agent a unique ID at
        creation time and use that ID as a prefix or namespace for any resource it creates.
        Sub-agent A writes to <code>task-A/output.json</code>; sub-agent B writes to
        <code>task-B/output.json</code>. The orchestrator knows where to find each result
        and there is no possibility of collision.
      </NoteBlock>

      <WarningBlock title="Shared Tool State">
        Some tools maintain internal state — a browser session, an authenticated API client,
        a database connection pool. If sub-agents share a tool instance, one agent's actions
        (logging in, navigating, modifying session state) affect the tool's state for all
        other agents using it. Either give each sub-agent its own tool instance or design
        tools to be stateless and re-entrant.
      </WarningBlock>

      <ExerciseBlock
        title="Designing for Isolation"
        exercises={[
          {
            id: 'iso-1',
            difficulty: 'beginner',
            question: 'Three sub-agents are all writing their outputs to a single shared "results" file. Describe two ways this can go wrong, even if each agent produces correct output individually.',
            hint: 'Think about concurrent writes and overwriting.',
            solution: '(1) Race condition: two agents finish at nearly the same time and both write to the file simultaneously. Depending on the file system, this produces a corrupt or interleaved file. (2) Overwriting: the last agent to write replaces the earlier agents\' results entirely, so only one result is preserved. Even with sequential writes, the output format may not support appending multiple results correctly.',
          },
          {
            id: 'iso-2',
            difficulty: 'intermediate',
            question: 'An orchestrator spawns five researcher sub-agents to query the same external API. The API has a rate limit of 10 requests per minute. How does poor isolation lead to rate limit errors, and how would you design around this?',
            hint: 'Think about what each agent sees when it decides how many requests to make.',
            solution: 'Each agent independently decides how many requests to make based on its own task, with no visibility into the other agents\' request counts. Together they exceed the rate limit, causing failures. Design solutions: (1) Route all API calls through a shared, rate-aware proxy tool that queues requests across agents. (2) Pre-allocate request quotas per agent in the brief ("you may make at most 2 API calls"). (3) Stagger agent launch times so they don\'t all burst simultaneously.',
          },
          {
            id: 'iso-3',
            difficulty: 'advanced',
            question: 'Design an isolation contract for a multi-agent data-processing pipeline where sub-agents read from a shared input dataset and write results to a shared output store. What rules must each sub-agent follow, and how does the orchestrator enforce them?',
            hint: 'Think about read vs write isolation separately, and about what the orchestrator tracks.',
            solution: 'Read isolation: sub-agents may read any record from the input dataset but must not modify it. Enforced by granting read-only access to the input store. Write isolation: each sub-agent writes only to its own namespace (e.g., keyed by agent ID) in the output store. Enforced by scoping the write tool to a specific path prefix at creation time. The orchestrator tracks a registry of agent IDs to output paths and uses this to collect and merge results after all agents complete. Collision-free merging is guaranteed because paths never overlap.',
          },
        ]}
      />
    </div>
  );
}
