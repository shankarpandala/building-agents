import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ForegroundBackground() {
  return (
    <div className="prose-agents">
      <h2>Foreground and Background Delegation</h2>
      <p>
        When an orchestrator delegates a task, it must decide whether to wait for the result
        before continuing or move on and collect the result later. This choice — foreground versus
        background — affects throughput, complexity, and how the orchestrator manages its own
        context and state.
      </p>

      <ConceptBlock title="Foreground vs Background Delegation" number="Concept 7.4">
        In <strong>foreground delegation</strong>, the orchestrator invokes a sub-agent and blocks
        until it receives the result. The sub-agent's output feeds directly into the next step.
        In <strong>background delegation</strong>, the orchestrator hands off work and continues
        its own processing, collecting results asynchronously at a later point. Foreground is
        simpler and keeps reasoning sequential; background unlocks parallelism but requires the
        orchestrator to manage pending work and handle late or missing results.
      </ConceptBlock>

      <p>
        Foreground delegation is the right default when the result of the sub-task is
        immediately required — when the next reasoning step depends on knowing the outcome.
        Background delegation pays off when multiple independent sub-tasks can run concurrently
        and the orchestrator has meaningful work to do while waiting. Using background delegation
        for everything creates complexity without benefit; using foreground delegation for
        everything sacrifices the parallelism advantage of multi-agent systems.
      </p>

      <PrincipleBlock title="Match Delegation Mode to Data Dependency" number="Principle 7.2">
        Use foreground delegation when the sub-task result is a prerequisite for the next
        decision. Use background delegation when the sub-task is independent of the orchestrator's
        next steps. The dependency structure of the task — not the desire for speed — should
        drive the choice.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Collecting Background Results">
        When using background delegation, design explicit collection points: moments in the
        orchestrator's plan where it pauses, gathers all outstanding sub-agent results, and
        integrates them before proceeding. Collecting too early (before results are ready)
        wastes cycles; collecting too late (after the orchestrator has already made decisions
        that depended on those results) causes errors.
      </NoteBlock>

      <ExerciseBlock
        title="Foreground vs Background Trade-offs"
        exercises={[
          {
            id: 'fb-1',
            difficulty: 'beginner',
            question: 'Give one scenario where foreground delegation is clearly the right choice and one where background delegation is clearly better. Explain the key difference.',
            hint: 'Focus on whether the orchestrator can make progress before the sub-agent finishes.',
            solution: 'Foreground: the orchestrator asks a sub-agent to retrieve the current stock price before deciding whether to generate a buy or sell recommendation. The decision cannot proceed without the price. Background: the orchestrator delegates five independent data-gathering tasks simultaneously and will synthesise results later; it can do other planning work while they run.',
          },
          {
            id: 'fb-2',
            difficulty: 'intermediate',
            question: 'An orchestrator uses background delegation for three sub-agents. One sub-agent fails partway through. Describe two different strategies for handling this and the trade-offs of each.',
            hint: 'Think about retry, skip, and fallback strategies.',
            solution: '(1) Retry with timeout: the orchestrator waits a fixed period and re-delegates the failed task. Simple to implement, but increases latency and requires careful timeout tuning. (2) Graceful degradation: the orchestrator marks the sub-task as failed, proceeds with available results, and notes the gap in its final output. Faster overall, but the output is incomplete — acceptable if partial results have value.',
          },
          {
            id: 'fb-3',
            difficulty: 'advanced',
            question: 'Design a collection-point strategy for an orchestrator managing ten background sub-agents whose results are needed in three different later stages of the plan. How should the orchestrator group and time its collection points?',
            hint: 'Think about grouping sub-agents by which stage depends on them, not by when they finish.',
            solution: 'Group sub-agents by the stage that consumes their output: sub-agents whose results feed Stage A are collected just before Stage A begins; sub-agents for Stage B are collected before Stage B. This minimises idle waiting (the orchestrator proceeds until it needs a group\'s results) without requiring all results upfront. The orchestrator maintains a dependency map: stage -> required sub-agent IDs. Before each stage, it checks whether required results are available, blocks if not, and resumes as soon as the group is complete.',
          },
        ]}
      />
    </div>
  );
}
