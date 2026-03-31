import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function DuplicateWork() {
  return (
    <div className="prose-agents">
      <h2>Duplicate Work</h2>
      <p>
        In multi-agent systems, work can be duplicated in ways that never occur in single-agent
        systems. Two sub-agents, independently briefed, may perform the same retrieval, the same
        computation, or the same analysis — unaware of each other's efforts. The output is not
        wrong, but it represents wasted resources, inconsistent results, and potential conflicts
        when the duplicate outputs disagree.
      </p>

      <ConceptBlock title="Duplicate Work in Multi-Agent Systems" number="Concept 7.10">
        Duplicate work occurs when two or more sub-agents independently perform the same task
        because the orchestrator failed to coordinate their scope. Unlike redundancy (which is
        intentional and serves fault-tolerance), duplicate work is unintentional. It wastes
        compute, introduces inconsistency (two sub-agents querying the same live source may
        receive different results if the source changes between calls), and makes the final
        integration harder when contradictory duplicates must be reconciled.
      </ConceptBlock>

      <p>
        The root cause is almost always insufficient scope definition in the brief. When multiple
        sub-agents are given overlapping domains without explicit boundaries, they will naturally
        overlap in their work. The fix is to partition scope at brief-writing time: each sub-agent
        should have a clearly defined territory that does not intersect with any other sub-agent's
        territory.
      </p>

      <NoteBlock type="intuition" title="The Scope Partition Test">
        Before launching multiple sub-agents in parallel, draw the scope boundaries for each one
        and check: do any two agents have tasks that could require the same external call, the
        same data retrieval, or the same computation? If yes, either partition the scope more
        clearly or centralise the shared step in the orchestrator before spawning the sub-agents.
      </NoteBlock>

      <WarningBlock title="Inconsistency from Duplicate Queries">
        When two sub-agents independently query a live data source (an API, a database, a web
        page), they may receive different responses if the source changes between their calls.
        Both results are accurate at their respective moments, but they are inconsistent with
        each other. An orchestrator combining them produces an incoherent output. For
        time-sensitive data, either run the query once centrally and pass the result to both
        sub-agents, or accept and document the inconsistency.
      </WarningBlock>

      <ExerciseBlock
        title="Eliminating Duplicate Work"
        exercises={[
          {
            id: 'dw-1',
            difficulty: 'beginner',
            question: 'An orchestrator launches a "competitive analysis" sub-agent and a "market positioning" sub-agent simultaneously. Both are likely to independently research the same three main competitors. How could the orchestrator prevent this duplication?',
            hint: 'Think about whether the shared research step should happen before the sub-agents are launched.',
            solution: 'The orchestrator should perform (or delegate to a single sub-agent) the competitor research first, then pass the findings as context in the briefs for both the competitive analysis and market positioning sub-agents. This way, both sub-agents work from the same research, avoid duplicate retrieval, and produce consistent results.',
          },
          {
            id: 'dw-2',
            difficulty: 'intermediate',
            question: 'Design explicit scope partition rules for three sub-agents tasked with analysing a company: one covering financial performance, one covering product strategy, and one covering organisational health. Make sure the rules prevent any topic from being covered by more than one agent.',
            hint: 'Be specific about what belongs to each agent and what falls in the gaps between them.',
            solution: 'Financial performance: covers revenue, profitability, cash flow, debt, and investor metrics. Explicitly excludes product roadmap and headcount costs (those go to strategy and org). Product strategy: covers product portfolio, roadmap, competitive positioning, and customer feedback on products. Excludes P&L impact of products (financial) and team structure behind products (org). Organisational health: covers headcount, retention, leadership, culture indicators, and hiring trends. Excludes individual product decisions (strategy) and company-level financials (financial). Rule: when a topic could belong to two agents, assign it to the agent whose core purpose it most directly serves.',
          },
          {
            id: 'dw-3',
            difficulty: 'advanced',
            question: 'Intentional redundancy (running the same task twice for fault tolerance) and unintentional duplicate work look similar from outside the system. How would you design the orchestrator so the two are always distinguishable in logs and outputs?',
            hint: 'Think about metadata, naming conventions, and how results are merged differently in each case.',
            solution: 'Design: (1) Tag every sub-agent invocation with a purpose field: "redundant" vs "unique". Redundant agents are given the same task ID; unique agents get distinct task IDs. (2) Merge logic differs: redundant results go through a comparison step (are they consistent?) before the best one is selected; unique results are collected and combined without comparison. (3) In logs, redundant invocations are grouped under one logical task; duplicate work appears as two separate logical tasks covering the same domain — detectable by comparing scope tags. (4) A post-hoc audit checks for any two "unique" tasks with overlapping domain tags — these indicate unintentional duplication.',
          },
        ]}
      />
    </div>
  );
}
