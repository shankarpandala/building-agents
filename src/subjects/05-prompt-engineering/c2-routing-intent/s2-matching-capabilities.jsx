import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function MatchingCapabilitiesSection() {
  return (
    <div className="prose-agents">
      <p>
        Once intent is understood, routing must match it to the right capability.
        This matching step is what separates a well-orchestrated multi-agent system
        from a single overloaded agent that tries to handle everything.
      </p>

      <ConceptBlock title="Capability Matching" number="Concept 5.7">
        Capability matching is the process of mapping a classified intent to the agent,
        tool, or workflow best equipped to fulfill it. Matching operates on three axes:
        <strong> domain fit</strong> (does this agent's declared scope cover this topic?),
        <strong> function fit</strong> (does this agent have the tools needed to fulfill
        the action?), and <strong>authority fit</strong> (is this agent authorized to
        act on this user's behalf for this request?).
      </ConceptBlock>

      <p>
        In a multi-agent system, the router maintains a registry of available agents
        and their declared capabilities. Each incoming intent is scored against the
        registry. A strong match on all three axes routes directly. Weak or ambiguous
        matches trigger clarification or escalation.
      </p>

      <PrincipleBlock title="Route to Specialization" number="Principle 5.4">
        When intent matches multiple agents, prefer the most specialized one.
        A specialist agent has deeper prompting, more relevant tools, and clearer
        scope boundaries than a generalist. Routing to a generalist is a fallback,
        not a preference.
      </PrincipleBlock>

      <NoteBlock type="note" title="Authority Fit">
        Domain and function fit are easy to check, but authority fit is often overlooked.
        Even if an agent is technically capable of fulfilling a request, it may not be
        authorized to do so for this user at this time. Authority rules must be checked
        as part of every routing decision, not as an afterthought.
      </NoteBlock>

      <ExerciseBlock
        title="Capability Matching Practice"
        exercises={[
          {
            id: 'e5-7-1',
            difficulty: 'beginner',
            question: 'A system has three agents: BillingBot (billing and payments), TechBot (technical support), and OrderBot (order tracking). A user says "My payment failed and now I can\'t access my order." Which agent should handle this, and why?',
            hint: 'The request spans two domains. Consider whether to split, escalate, or pick one.',
            solution: 'BillingBot should handle it first — the root cause is a payment issue. After resolution, the agent can confirm whether order access is restored or hand off to OrderBot. Alternatively, a triage agent can split the request into two parallel threads. Never route the entire conversation to TechBot; it lacks billing context.',
          },
          {
            id: 'e5-7-2',
            difficulty: 'intermediate',
            question: 'What information should a capability registry entry contain for each agent to enable accurate routing?',
            hint: 'Think about what a router needs to evaluate all three matching axes.',
            solution: 'Domain scope (list of covered topics and keywords), supported intents (informational, transactional, etc.), required tools list, authority rules (which user roles or account states qualify), confidence threshold for routing, and a fallback specification if no strong match exists.',
          },
          {
            id: 'e5-7-3',
            difficulty: 'advanced',
            question: 'Design a scoring function that combines domain fit, function fit, and authority fit into a routing decision. What weights would you assign and how would you handle ties?',
            hint: 'Consider which axis is disqualifying versus which is preferential.',
            solution: 'Authority fit is a gate, not a score — if it fails, the agent is ineligible. Domain fit and function fit are scored separately (e.g., 0–1 each). A combined score is computed as domain_fit × 0.6 + function_fit × 0.4. In case of a tie, prefer the agent with the narrower domain (more specialized). If still tied, route to the agent with lower current load.',
          },
        ]}
      />
    </div>
  );
}
