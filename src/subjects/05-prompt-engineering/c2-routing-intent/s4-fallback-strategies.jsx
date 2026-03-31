import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import PrincipleBlock from '../../../components/content/PrincipleBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function FallbackStrategiesSection() {
  return (
    <div className="prose-agents">
      <p>
        Routing will not always find a match. Requests fall outside scope, capability
        registries have gaps, and users ask things no agent was designed to handle.
        Fallback strategies define what happens in those cases — they are the safety
        net of the routing layer.
      </p>

      <ConceptBlock title="Fallback Strategy" number="Concept 5.9">
        A fallback strategy is the predefined response path activated when no capable
        handler is found for a given intent. Fallbacks range from graceful redirection
        (pointing the user to the right resource) to human escalation (transferring to
        a person) to informative refusal (clearly explaining what the agent cannot do
        and why). A good fallback preserves user dignity and forward momentum.
      </ConceptBlock>

      <p>
        There are three classes of fallback: <strong>capability fallbacks</strong>
        trigger when the intent is recognized but no agent can fulfill it.
        <strong> Confidence fallbacks</strong> trigger when the intent cannot be
        classified at all. <strong>Authority fallbacks</strong> trigger when an agent
        could fulfill the request but is not permitted to for this user. Each class
        requires a different response.
      </p>

      <PrincipleBlock title="A Fallback Is Still a Service" number="Principle 5.5">
        Falling back is not the same as failing. A fallback that clearly tells the user
        what the agent cannot help with, and provides a concrete next step, is a
        successful interaction. An agent that hallucinates a response rather than
        falling back gracefully causes real harm. Failing loudly and helpfully beats
        succeeding silently and incorrectly.
      </PrincipleBlock>

      <NoteBlock type="tip" title="Fallback Design">
        Every fallback message should contain three elements: an acknowledgment of
        the user's request, a clear statement of what the agent cannot do in this
        context, and a specific next step. "I can't help with that" is never an
        acceptable complete response.
      </NoteBlock>

      <ExerciseBlock
        title="Fallback Strategy Practice"
        exercises={[
          {
            id: 'e5-9-1',
            difficulty: 'beginner',
            question: 'Write a fallback response for a customer support agent that receives a request about a competitor\'s product. Use the three required elements.',
            hint: 'Acknowledge, explain scope, provide a next step.',
            solution: 'Example: "I appreciate you reaching out! I\'m only able to help with questions about [Company] products and services, so I\'m not the right resource for [Competitor] questions. For that, I\'d suggest checking [Competitor]\'s support page directly. Is there anything about your [Company] account I can help you with?"',
          },
          {
            id: 'e5-9-2',
            difficulty: 'intermediate',
            question: 'An agent receives a message that scores below its confidence threshold for every intent classifier. What should it do differently compared to a capability fallback?',
            hint: 'The distinction is between "I know what you want but can\'t help" versus "I don\'t know what you want."',
            solution: 'A capability fallback explains scope limitations. A confidence fallback should first try to elicit a clearer request: "I want to make sure I understand what you need — could you tell me more about what you\'re trying to do?" Only after a second unclear message should it escalate to human support or suggest a self-service directory.',
          },
          {
            id: 'e5-9-3',
            difficulty: 'advanced',
            question: 'Design a tiered fallback cascade for a high-volume support system. What triggers each tier, and how do you prevent the cascade from becoming a dead-end loop?',
            hint: 'Think about escalation paths and loop detection.',
            solution: 'Tier 1: Capability fallback — redirect to correct agent or resource. Tier 2: Confidence fallback — ask one clarifying question. Tier 3: Generalist agent — attempt with reduced confidence threshold. Tier 4: Human escalation — with full conversation summary. Loop prevention: track fallback count per session. After two failed tiers, skip directly to human escalation rather than cycling back. Include a session-level "already tried" flag so the same fallback is never triggered twice for identical inputs.',
          },
        ]}
      />
    </div>
  );
}
