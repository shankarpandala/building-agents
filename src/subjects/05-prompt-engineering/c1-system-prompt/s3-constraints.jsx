import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ConstraintsSection() {
  return (
    <div className="prose-agents">
      <p>
        Constraints are the complement of capabilities — the explicit boundaries of what
        the agent will not do, cannot do, or must always do regardless of user requests.
        A well-constrained agent is predictable, safe, and trustworthy.
      </p>

      <ConceptBlock title="Agent Constraints" number="Concept 5.3">
        Constraints fall into three categories. <strong>Hard constraints</strong> are
        absolute and inviolable — behaviors the agent must always or never perform
        regardless of context. <strong>Soft constraints</strong> are defaults that can
        be adjusted by the operator or user within defined limits. <strong>Scoping
        constraints</strong> define the domain boundary, redirecting out-of-scope
        requests without refusal.
      </ConceptBlock>

      <p>
        The distinction between hard and soft constraints matters enormously in practice.
        Hard constraints require no reasoning — the agent simply refuses or always
        complies. Soft constraints involve contextual judgment. Mixing the two categories
        without labeling them creates agents that are either overly rigid or dangerously
        flexible in the wrong places.
      </p>

      <PrincipleBlock title="Constraints Are Policy, Not Punishment" number="Principle 5.2">
        Constraints exist to protect users, operators, and the agent's own integrity —
        not to make the agent less useful. Frame constraints positively where possible:
        instead of "never discuss competitors," try "focus exclusively on our products
        so you can give accurate, up-to-date advice."
      </PrincipleBlock>

      <WarningBlock title="The Constraint Loophole Problem">
        Constraints written as negations ("do not discuss X") are easier to route around
        than constraints written as positive scopes ("only discuss Y"). Users can craft
        requests that technically avoid the negation while achieving the disallowed
        outcome. Prefer positive framing when designing hard limits.
      </WarningBlock>

      <ExerciseBlock
        title="Constraints Practice"
        exercises={[
          {
            id: 'e5-3-1',
            difficulty: 'beginner',
            question: 'Classify the following constraints as hard or soft: (a) never share another user\'s data, (b) respond in formal English, (c) do not discuss pricing, (d) always end with a satisfaction check.',
            hint: 'Hard = no exception ever. Soft = could reasonably be adjusted by context.',
            solution: '(a) Hard — privacy is absolute. (b) Soft — a user could request casual language. (c) Depends: hard if a legal requirement, soft if just a default policy deferring to sales. (d) Soft — could be turned off for brief factual queries.',
          },
          {
            id: 'e5-3-2',
            difficulty: 'intermediate',
            question: 'An agent\'s constraint says "do not provide medical advice." A user asks if they should stop taking their medication before surgery. How should the agent respond, and why is the constraint insufficient on its own?',
            hint: 'Consider both the safety imperative and the scope of "medical advice."',
            solution: 'The agent should acknowledge the constraint, explicitly recommend the user consult their doctor or surgeon, and note the urgency if pre-surgery timing is involved. The constraint is insufficient because it does not specify what to do instead — constraints need complementary redirection instructions for safety-critical edge cases.',
          },
          {
            id: 'e5-3-3',
            difficulty: 'advanced',
            question: 'Design a constraint hierarchy for an agent that serves both free-tier and paid-tier users. Which constraints are universal, which are tier-specific, and how are tier-specific constraints activated?',
            hint: 'Think about what the system prompt can know at instantiation time versus what it must check dynamically.',
            solution: 'Universal constraints apply regardless of tier (safety, privacy, legal). Tier-specific constraints (rate limits, feature access) are injected into the system prompt at session creation based on the authenticated user\'s tier. The prompt template uses a slot like {{user_tier_constraints}} so the constraint text is pulled from a configuration store at instantiation, never hardcoded.',
          },
        ]}
      />
    </div>
  );
}
