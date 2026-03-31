import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function UnderstandingIntentSection() {
  return (
    <div className="prose-agents">
      <p>
        Routing begins with understanding. Before an agent or router can direct a
        request to the right handler, it must accurately interpret what the user actually
        wants — which is often not the same as what they literally said.
      </p>

      <ConceptBlock title="User Intent" number="Concept 5.6">
        User intent is the underlying goal a message is trying to achieve. It has three
        layers: the <strong>surface request</strong> (what was asked), the
        <strong>underlying need</strong> (why it was asked), and the
        <strong>success condition</strong> (what a satisfying response looks like).
        Routing on surface requests alone produces mismatches; routing on underlying
        need produces appropriate handling.
      </ConceptBlock>

      <AnalogyBlock title="The Library Reference Desk">
        A patron who asks "where are the cookbooks?" has a surface request (location),
        an underlying need (cook a meal or learn to cook), and a success condition
        (finding a book that helps). A skilled librarian might ask "any particular cuisine
        or skill level?" before pointing to a shelf. Intent-aware routing does the
        same — it probes enough to route accurately without interrogating the user.
      </AnalogyBlock>

      <p>
        Intent can be decomposed into four types: <strong>informational</strong> (the
        user wants to learn something), <strong>transactional</strong> (the user wants
        to take an action), <strong>navigational</strong> (the user wants to reach a
        specific resource), and <strong>conversational</strong> (the user wants to
        engage in dialogue). Each type maps naturally to different agent capabilities
        and response formats.
      </p>

      <NoteBlock type="intuition" title="Implicit Intent Signals">
        Intent is often revealed through context clues rather than explicit statements.
        Tone (urgent versus exploratory), prior turn history, time of day, and the
        user's role all contribute. A query from a developer account is more likely
        technical; the same query from a billing account is more likely financial.
      </NoteBlock>

      <ExerciseBlock
        title="Understanding Intent Practice"
        exercises={[
          {
            id: 'e5-6-1',
            difficulty: 'beginner',
            question: 'For the message "I can\'t log in," identify the surface request, underlying need, and likely success condition.',
            hint: 'Surface = what they said. Underlying = what they actually want. Success = what resolves the situation.',
            solution: 'Surface: report of inability to log in. Underlying need: regain access to their account. Success condition: being logged in again, or having a clear path to recovery (reset instructions, support ticket, escalation).',
          },
          {
            id: 'e5-6-2',
            difficulty: 'intermediate',
            question: 'Classify these intents as informational, transactional, navigational, or conversational: (a) "What\'s the refund policy?" (b) "Cancel my subscription." (c) "Take me to my invoices." (d) "I\'m frustrated with this product."',
            hint: 'Focus on what action the user wants the system to take.',
            solution: '(a) Informational. (b) Transactional. (c) Navigational. (d) Conversational — requires empathy and listening, not a specific action.',
          },
          {
            id: 'e5-6-3',
            difficulty: 'advanced',
            question: 'A user sends: "Just make it work." There is no prior context in this conversation. Describe the intent-resolution strategy an agent should use before attempting to respond.',
            hint: 'Consider what clarification is necessary, how to phrase it, and how many clarifying turns are acceptable.',
            solution: 'With zero context, the agent cannot infer intent. It should ask one targeted clarifying question that covers the most likely ambiguities: "I want to help — could you tell me what you\'re trying to do and what\'s happening instead?" Limit to one question per turn. If context clues exist (user is on a specific product page, prior ticket history), use those to hypothesize the most likely intent before asking.',
          },
        ]}
      />
    </div>
  );
}
