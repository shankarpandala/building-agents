import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function AskEveryTime() {
  return (
    <div className="prose-agents">
      <h2>Ask Every Time</h2>
      <p>
        The simplest permission model is also the most conservative: before taking any action,
        the agent asks a human for explicit approval. No action proceeds without a fresh
        authorization. This model trades autonomy entirely for transparency — the human is always
        in the loop, and the agent's footprint is limited to what was directly sanctioned.
      </p>

      <ConceptBlock title="Ask-Every-Time Permission Model" number="Concept 3.5">
        In the ask-every-time model, the agent proposes each action individually and waits for
        human confirmation before executing. Approval is not remembered or generalized — each
        new action requires a new approval, even if an identical action was approved moments
        before. This maximizes human control at the cost of speed and convenience.
      </ConceptBlock>

      <AnalogyBlock title="The Notary Model">
        Some legal documents require notarization — a witness who verifies identity and intent
        for each signature, every time, regardless of how many documents you've signed before.
        The notary does not say "I remember you from last week, go ahead." Every transaction is
        independently verified. Ask-every-time agents operate on the same principle.
      </AnalogyBlock>

      <p>
        This model is appropriate when the cost of a wrong action is extremely high, when the
        agent is operating in a new or unfamiliar environment, or when the actions being taken
        are genuinely novel each time. It is poorly suited to high-frequency, repetitive tasks
        where the confirmation process would overwhelm the human operator.
      </p>

      <NoteBlock title="When to use ask-every-time" type="info">
        Ask-every-time is a good starting point when deploying a new agent into production for
        the first time. It lets operators build confidence in the agent's behavior before relaxing
        the permission model. Think of it as the highest rung on a trust ladder — you start there
        and descend as trust is established.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'aet-1',
            difficulty: 'beginner',
            question:
              'Name two categories of agent tasks where an ask-every-time model is appropriate, and two categories where it is not. Explain your reasoning briefly.',
            hint: 'Think about frequency, stakes, and novelty of each task type.',
            solution:
              'Appropriate: (1) One-off destructive operations like bulk deletion or production deployments — high stakes, low frequency. (2) Actions that touch external parties like sending communications — consequences outside system. Not appropriate: (1) Routine data reads needed hundreds of times per hour. (2) Internal, reversible computations that can be rolled back trivially.',
          },
          {
            id: 'aet-2',
            difficulty: 'intermediate',
            question:
              'An agent using the ask-every-time model is helping process 200 customer support tickets. It asks for approval before labeling each ticket. Describe the likely outcome, and suggest a modification that preserves safety while being more practical.',
            hint: 'Think about what happens to the human\'s attention across 200 approvals.',
            solution:
              'The operator will experience severe alert fatigue and begin rubber-stamping approvals after the first few dozen. Safety is illusory. Modification: switch to a plan-then-execute model where the agent presents its labeling plan for all 200 tickets at once for review, then executes after a single approval of the plan — maintaining oversight without 200 interruptions.',
          },
          {
            id: 'aet-3',
            difficulty: 'intermediate',
            question:
              'What is the hidden cost of ask-every-time that is easy to miss when designing a system, but becomes apparent when operating it?',
            hint: 'Think about what this model requires from the human side of the system.',
            solution:
              'Ask-every-time requires a continuously available human with sufficient context to make informed decisions. In practice, humans go to meetings, sleep, and get distracted. The agent either blocks indefinitely waiting for approval (reducing throughput to zero) or the organization creates workarounds like auto-approvers that defeat the model\'s safety intent entirely.',
          },
        ]}
      />
    </div>
  );
}
