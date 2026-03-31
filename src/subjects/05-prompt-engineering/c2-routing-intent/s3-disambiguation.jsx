import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import WarningBlock from '../../../components/content/WarningBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function DisambiguationSection() {
  return (
    <div className="prose-agents">
      <p>
        Not every message carries a clear, unambiguous intent. Disambiguation is the
        process of resolving uncertainty about what the user wants before committing
        to a routing decision or generating a substantive response.
      </p>

      <ConceptBlock title="Disambiguation" number="Concept 5.8">
        Disambiguation is the act of reducing intent ambiguity through targeted
        clarification. It is triggered when a request could plausibly map to two or
        more different intents, when the routing confidence score falls below a
        threshold, or when acting on the wrong interpretation would cause harm or
        wasted effort. The goal is minimal clarification — one question, not an
        interrogation.
      </ConceptBlock>

      <AnalogyBlock title="The Doctor's Intake Question">
        A doctor presented with "my stomach hurts" does not immediately perform
        surgery. They ask focused questions — location, duration, severity — to
        narrow the diagnosis before taking action. Good disambiguation follows the
        same principle: ask the one question whose answer eliminates the most uncertainty,
        then proceed.
      </AnalogyBlock>

      <p>
        Disambiguation strategies differ by ambiguity type. <strong>Lexical ambiguity</strong>
        (the word "account" means different things in billing versus user settings)
        is resolved by asking which domain. <strong>Intent ambiguity</strong> (the user
        might want to read or update something) is resolved by asking what action they
        want to take. <strong>Scope ambiguity</strong> (unclear how much the user wants
        done) is best resolved by starting small and confirming before expanding.
      </p>

      <WarningBlock title="Over-Disambiguation">
        Asking too many clarifying questions before taking any action frustrates users
        and signals that the system is incompetent. When a plausible interpretation
        exists, act on it and offer to correct. Reserve explicit clarification for
        cases where acting on the wrong interpretation would cause irreversible harm.
      </WarningBlock>

      <ExerciseBlock
        title="Disambiguation Practice"
        exercises={[
          {
            id: 'e5-8-1',
            difficulty: 'beginner',
            question: 'A user messages "update my account." What are the two or three most likely intents, and what single question would best resolve the ambiguity?',
            hint: 'Think about what "account" and "update" could each mean.',
            solution: 'Likely intents: (1) update billing information, (2) update contact details, (3) update notification preferences. Single question: "What would you like to update — your billing info, contact details, or notification settings?" Offering options is faster than open-ended "what do you mean?"',
          },
          {
            id: 'e5-8-2',
            difficulty: 'intermediate',
            question: 'When should an agent act on its best-guess interpretation rather than asking for clarification? Give two criteria.',
            hint: 'Consider reversibility and cost of being wrong.',
            solution: 'Criterion 1: The action is reversible — if wrong, it can be undone without significant harm. Criterion 2: The confidence on the leading interpretation is high enough that asking would feel condescending given the context. When both are true, act and confirm: "I\'ve updated your email address — is that what you needed?"',
          },
          {
            id: 'e5-8-3',
            difficulty: 'advanced',
            question: 'Design a disambiguation protocol for a voice-based agent where back-and-forth clarification is especially costly (users hang up). What techniques reduce disambiguation turns?',
            hint: 'Think about front-loaded context, structured confirmations, and progressive commitment.',
            solution: 'Techniques: (1) Use all available context (user account, prior calls, current menu state) to pre-narrow the intent space before asking. (2) Present multi-part confirmations: "I think you want to pay your bill — shall I apply your saved card ending in 4321?" (3) Use progressive commitment: attempt the most conservative interpretation, report the result, and offer expansion. (4) Batch ambiguities: "To pay your bill I need to confirm: amount and card — is $45.00 on your card ending 4321 correct?"',
          },
        ]}
      />
    </div>
  );
}
