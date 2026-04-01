import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function DelegationDecision() {
  return (
    <div className="prose-agents">
      <h2>The Delegation Decision</h2>
      <p>
        Knowing the single-agent ceiling exists is not enough — you need a practical way to decide
        whether a given task warrants delegation. Delegation has real costs: coordination overhead,
        more complex error handling, and harder observability. It should be a deliberate choice,
        not a reflex.
      </p>

      <ConceptBlock title="The Delegation Decision" number="Concept 7.2">
        The delegation decision is the evaluation of whether handing a sub-task to another agent
        produces a better outcome than keeping it in the current agent's loop. It involves three
        dimensions: parallelism value (can this work happen concurrently?), specialisation value
        (does this sub-task benefit from a focused prompt and context?), and context economy (does
        keeping this work in the parent consume context that outweighs the coordination cost?).
      </ConceptBlock>

      <p>
        A useful mental test: imagine running the task twice — once inside the current agent, once
        in a fresh sub-agent. Which produces better output? Which finishes faster? If the answer is
        "sub-agent" on at least two of those three dimensions, delegation is likely worth it.
        If the answer is "it's roughly the same," the overhead of delegation probably isn't
        justified.
      </p>

      <PrincipleBlock title="Delegate for Independence, Not for Size" number="Principle 7.1">
        The best candidates for delegation are sub-tasks that can be fully specified upfront and
        completed without needing to continuously consult the parent. Task independence — not task
        size — is the primary criterion. A large but tightly coupled sub-task is often better kept
        in-process; a small but genuinely independent one may be worth delegating.
      </PrincipleBlock>

      <NoteBlock type="intuition" title="The Brief Test">
        Before delegating, ask: can you write a complete, self-contained brief for the sub-agent
        right now — all the context it needs, a clear goal, and an unambiguous success condition?
        If you cannot write that brief without referencing live state from the parent's ongoing
        reasoning, the task is not yet ready to delegate.
      </NoteBlock>

      <ExerciseBlock
        title="Making the Delegation Decision"
        exercises={[
          {
            id: 'dd-1',
            difficulty: 'beginner',
            question: 'For each of the following sub-tasks, decide whether it is a good candidate for delegation and explain why: (a) searching a database for a single record; (b) writing a full legal analysis of a contract; (c) summarising a paragraph.',
            hint: 'Apply the three dimensions: parallelism value, specialisation value, context economy.',
            solution: '(a) Searching for a single record: poor candidate — fast, low context, no specialisation benefit. (b) Legal analysis: strong candidate — domain-specialised prompt produces better output, and it is a self-contained sub-task. (c) Summarising a paragraph: poor candidate — trivial task, overhead of spawning a sub-agent would dominate.',
          },
          {
            id: 'dd-2',
            difficulty: 'intermediate',
            question: 'An orchestrating agent is halfway through a complex task and realises it needs to gather information from three different external sources. At that point, can it safely delegate the gathering? What must be true for delegation to work well here?',
            hint: 'Think about the brief test — what does each sub-agent need to know?',
            solution: 'Yes, if the orchestrator can write a complete brief for each gathering sub-agent using only information already resolved. Each sub-agent needs a specific query and an endpoint — no dependency on each other or on the parent\'s future reasoning. The gathering tasks are parallel and independent, making this a clean delegation scenario.',
          },
          {
            id: 'dd-3',
            difficulty: 'advanced',
            question: 'Design a simple scoring rubric (three criteria, each scored 0–2) that an orchestrating agent could use to decide whether to delegate a sub-task. Explain what each criterion measures and what score threshold triggers delegation.',
            hint: 'Base criteria on parallelism, independence, and specialisation.',
            solution: 'Criteria: (1) Parallelism score (0–2): 0 if the sub-task must complete before the next step; 2 if it can run concurrently with other work. (2) Independence score (0–2): 0 if the sub-task needs continuous access to parent state; 2 if it can be fully specified upfront. (3) Specialisation score (0–2): 0 if any general prompt handles it well; 2 if a focused specialist prompt produces materially better results. Threshold: delegate if total >= 4. Score 3 is marginal — consider task duration before deciding.',
          },
        ]}
      />
    </div>
  );
}
