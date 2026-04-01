import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function OverDelegation() {
  return (
    <div className="prose-agents">
      <h2>Over-Delegation</h2>
      <p>
        Delegation is a tool, and like any tool it can be overused. An orchestrator that
        reflexively delegates every sub-task — regardless of size, complexity, or independence —
        creates a system that is harder to reason about, slower, and more prone to failure than
        a single agent handling the same work directly. This pattern is called over-delegation.
      </p>

      <ConceptBlock title="Over-Delegation" number="Concept 7.9">
        Over-delegation occurs when an orchestrator delegates sub-tasks that would be more
        efficiently handled within its own reasoning loop. The signs are: an orchestrator that
        spawns sub-agents for trivial one-step tasks; delegation chains where every level
        immediately delegates to the next without doing any work; and orchestrators whose
        coordination overhead exceeds the value produced by any individual sub-agent.
      </ConceptBlock>

      <p>
        The appeal of over-delegation is understandable. Delegation feels like architecture.
        Breaking work into pieces feels like good design. But the purpose of delegation is to
        overcome a real limitation — parallelism, specialisation, context economy — not to
        add structure for its own sake. When the limitation doesn't exist, delegation adds
        latency, complexity, and failure modes without compensating benefit.
      </p>

      <AnalogyBlock title="The Manager Who Delegates Everything">
        A manager who delegates every task — including reading their own emails and writing
        single-sentence replies — is not being strategic. They spend more time writing
        delegation briefs and reviewing results than the tasks originally required. Their
        direct reports are overwhelmed with trivial assignments while the manager adds no
        value. Good management means knowing which decisions to make yourself and which to
        hand off. The same applies to orchestrating agents.
      </AnalogyBlock>

      <WarningBlock title="The Delegation Depth Trap">
        Over-delegation often compounds across layers. An orchestrator over-delegates to a
        sub-agent, which in turn over-delegates to its own sub-agents. Each layer adds latency
        and reduces visibility. By the time results surface back up the chain, the overhead
        has dwarfed the task. Cap delegation depth intentionally and review any chain deeper
        than two or three levels.
      </WarningBlock>

      <ExerciseBlock
        title="Recognising and Preventing Over-Delegation"
        exercises={[
          {
            id: 'od-1',
            difficulty: 'beginner',
            question: 'For each of the following tasks, decide if delegation is justified or if it is over-delegation: (a) convert a list of strings to uppercase; (b) translate a 5,000-word document into three languages; (c) check if a number is even.',
            hint: 'Consider whether parallelism, specialisation, or context economy applies.',
            solution: '(a) Over-delegation: trivial in-line operation, no parallelism benefit, no specialisation needed. (b) Justified: three independent translations benefit from parallel specialist sub-agents; the task is substantial and self-contained. (c) Over-delegation: single-step deterministic operation, spawning a sub-agent for this is absurd overhead.',
          },
          {
            id: 'od-2',
            difficulty: 'intermediate',
            question: 'An orchestrator delegates a task to Sub-agent A. Sub-agent A\'s entire job is to call Sub-agent B and pass the result back. Sub-agent B does the same to Sub-agent C, which actually does the work. Describe the problems with this design.',
            hint: 'Think about latency, failure propagation, and what value A and B actually add.',
            solution: 'Problems: (1) Pure overhead — A and B contribute no value; each adds a round-trip of latency and an additional point of failure. (2) Failure propagation is harder to debug — if C fails, the error must propagate back through B and A before the orchestrator sees it, obscuring the original failure point. (3) Context dilution — each handoff may paraphrase or lose precision from the original brief. The orchestrator should delegate directly to C.',
          },
          {
            id: 'od-3',
            difficulty: 'advanced',
            question: 'Design a heuristic the orchestrating agent could apply before delegating any sub-task to catch likely over-delegation. The heuristic should involve estimated task duration, independence score, and minimum delegation overhead. Give a worked example.',
            hint: 'Express the condition as: delegate if [estimated work time] > [overhead] AND [independence is high].',
            solution: 'Heuristic: Delegate if (estimated_task_time > 3 * delegation_overhead) AND (independence_score >= 2). Reasoning: the task must take meaningfully longer than the coordination cost to justify it; and it must be genuinely independent. Example: estimating a ten-step research task at 60 seconds, with 5 seconds of delegation overhead — ratio is 12x, well above 3x threshold. Independence is high (self-contained, no parent state needed). Delegate. Counterexample: converting a string to uppercase — estimated 0.1 seconds, overhead 5 seconds, ratio 0.02x. Don\'t delegate.',
          },
        ]}
      />
    </div>
  );
}
