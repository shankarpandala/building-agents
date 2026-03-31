import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function IdentitySection() {
  return (
    <div className="prose-agents">
      <p>
        Every agent has a fundamental sense of self that shapes how it interprets requests,
        frames responses, and decides what falls within its remit. This identity is not
        implied — it must be explicitly constructed in the system prompt before the
        conversation begins.
      </p>

      <ConceptBlock title="Agent Identity" number="Concept 5.1">
        An agent's identity is the stable, declared self-description that governs its
        behavior across all interactions. It answers three questions: who the agent is,
        what domain it operates in, and whose interests it serves. Without a clear identity,
        the agent defaults to a general-purpose assistant — often not the right fit.
      </ConceptBlock>

      <p>
        Identity has three layers: a <strong>name and role</strong> that anchor the agent
        in a context, a <strong>domain scope</strong> that defines what topics and tasks
        are in-bounds, and an <strong>authority relationship</strong> that clarifies who
        the agent is serving and on whose behalf it acts.
      </p>

      <AnalogyBlock title="Job Description">
        A new employee reads their job description before their first day. It tells them
        their title, their team, their responsibilities, and implicitly what is not their
        job. A system prompt identity section serves exactly this role — it orients the
        agent so it never wonders whether a given request belongs to it.
      </AnalogyBlock>

      <PrincipleBlock title="Identity Before Instructions" number="Principle 5.1">
        Establish who the agent is before telling it what to do. Instructions are
        interpreted through the lens of identity. An ambiguous instruction lands
        differently on a customer support agent versus a research assistant — get the
        identity right first.
      </PrincipleBlock>

      <ExerciseBlock
        title="Identity Practice"
        exercises={[
          {
            id: 'e5-1-1',
            difficulty: 'beginner',
            question: 'A software company wants an agent to help developers debug issues. Write a two-sentence identity declaration that establishes name, role, and domain scope.',
            hint: 'Include: who the agent is, what product or platform it covers, and who it serves.',
            solution: 'Example: "You are Debugger, a technical support agent for Acme Dev Platform. You help software developers diagnose, troubleshoot, and resolve issues with Acme APIs, SDKs, and infrastructure."',
          },
          {
            id: 'e5-1-2',
            difficulty: 'intermediate',
            question: 'What problems arise when two different agents share an identical identity declaration? Describe at least two failure modes.',
            hint: 'Think about routing, user expectations, and behavioral consistency.',
            solution: 'Users receive inconsistent experiences because each agent interprets identical instructions differently. Routing systems cannot distinguish between agents, causing misdirected conversations. Monitoring becomes impossible because logs from both agents are indistinguishable.',
          },
          {
            id: 'e5-1-3',
            difficulty: 'intermediate',
            question: 'How should an agent\'s declared identity change when it is deployed for a white-label partner versus a direct customer? What stays the same?',
            hint: 'Consider brand, domain scope, and core behavioral rules.',
            solution: 'Name and brand should reflect the partner. Core domain scope and behavioral rules remain identical. The authority relationship may shift to name the partner as the operator. Hardcoded safety rules never change regardless of white-labeling.',
          },
        ]}
      />
    </div>
  );
}
