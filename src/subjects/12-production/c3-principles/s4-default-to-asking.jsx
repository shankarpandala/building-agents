import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function DefaultToAsking() {
  return (
    <div className="prose-agents">
      <h2>Default to Asking</h2>
      <p>
        Autonomous systems face a fundamental tension: they are built to act
        independently, yet their actions carry consequences they cannot fully
        evaluate. When an agent encounters ambiguity, competing interpretations,
        or a situation outside its clear mandate, the safest and most productive
        default is to ask a human rather than guess. This is not a failure of
        autonomy — it is the highest expression of it.
      </p>

      <ConceptBlock title="The Ask-First Default" number="Concept 12.12">
        Defaulting to asking means that when an agent's confidence in the correct
        course of action falls below a threshold, it pauses and requests
        clarification rather than proceeding with its best guess. This applies
        to ambiguous instructions, requests that could be interpreted multiple ways,
        situations where the consequences of a wrong action are significant, and
        any scenario where the agent would need to make assumptions about the
        user's intent. The cost of asking is a brief delay. The cost of guessing
        wrong can be irreversible damage.
      </ConceptBlock>

      <AnalogyBlock title="The Pharmacist's Verification Call">
        When a pharmacist receives a prescription that is ambiguous — the handwriting
        is unclear, the dosage seems unusual, or the medication could interact with
        something the patient already takes — the pharmacist calls the doctor to
        verify. They do not guess. They do not fill what they think was probably
        intended. The brief delay of a phone call is trivial compared to the
        consequence of dispensing the wrong medication. An agent that defaults to
        asking follows the same logic: a moment of clarification prevents
        potentially serious errors.
      </AnalogyBlock>

      <p>
        Many agent failures trace back to a moment where the agent chose to
        interpret rather than inquire. The user said something ambiguous, and the
        agent picked the interpretation that seemed most likely and acted on it.
        Sometimes the guess is right. But when it is wrong, the user faces the
        compound problem of an incorrect action plus the effort of understanding
        what the agent thought they meant and why.
      </p>

      <PrincipleBlock title="Uncertainty Is Information" number="Principle 12.8">
        When an agent is uncertain, that uncertainty itself is valuable signal. It
        means the request was ambiguous, the context was insufficient, or the
        situation is novel. Surfacing that uncertainty to the user — by asking a
        targeted question — gives the user the opportunity to provide the missing
        information. Hiding the uncertainty behind a confident guess deprives the
        user of the chance to correct course before action is taken.
      </PrincipleBlock>

      <NoteBlock title="Asking Well Is a Skill" type="tip">
        Defaulting to asking does not mean asking about everything. An agent that
        asks too many questions is as frustrating as one that never asks. The skill
        is in identifying which uncertainties matter — those where different
        interpretations would lead to meaningfully different actions. If all
        reasonable interpretations lead to the same action, the agent should
        proceed. If they diverge, the agent should ask.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'dta-1',
            difficulty: 'beginner',
            question: 'A user tells an agent: "Clean up the data." This could mean removing duplicates, fixing formatting, deleting old records, or several other things. What should the agent do?',
            hint: 'Think about how many different valid interpretations exist and what happens if the agent picks the wrong one.',
            solution: 'The agent should ask for clarification before taking any action. "Clean up the data" is critically ambiguous — deleting old records is irreversible and very different from fixing formatting. The agent should present the most likely interpretations it has identified and ask the user to specify which they mean: "I can interpret this several ways — would you like me to remove duplicate entries, standardize the formatting of existing fields, remove records older than a certain date, or something else?" This costs a single exchange of clarification and prevents the potentially severe consequences of the wrong interpretation.'
          },
          {
            id: 'dta-2',
            difficulty: 'intermediate',
            question: 'How does an agent decide which uncertainties are worth asking about and which are safe to resolve independently? What criteria separate the two?',
            hint: 'Think about the consequences of guessing wrong in each case.',
            solution: 'Criteria for deciding whether to ask: (1) Consequence magnitude — if guessing wrong would cause irreversible harm (data loss, sending wrong information to users, breaking a production system), always ask. If guessing wrong leads to a trivially correctable outcome, proceeding is acceptable. (2) Interpretation divergence — if the ambiguity leads to fundamentally different actions (delete vs. archive), ask. If all interpretations lead to essentially the same action with minor variations, proceed. (3) User signal — if the user has given context that narrows the interpretation to one likely meaning, proceed. If the request is bare and could mean many things, ask. (4) Reversibility — if the action can be easily undone, the cost of a wrong guess is low. If it cannot, the cost is high and asking is warranted. The general rule: ask when the cost of being wrong exceeds the cost of the delay.'
          },
          {
            id: 'dta-3',
            difficulty: 'advanced',
            question: 'An agent operates in a high-throughput environment where it handles hundreds of requests per hour. Pausing to ask for clarification on every ambiguous request would create an unacceptable bottleneck. How do you design a system that preserves the ask-first principle without crippling throughput?',
            hint: 'Think about categorizing uncertainty and handling different categories differently.',
            solution: 'Design a tiered approach: (1) Pre-classified patterns — analyze historical requests to identify common ambiguities and their resolutions. When a new request matches a known ambiguity pattern, apply the historically correct interpretation automatically. This handles the majority of routine ambiguity without asking. (2) Confidence thresholds — set different thresholds for different consequence levels. Low-consequence actions proceed at lower confidence; high-consequence actions require higher confidence before proceeding without asking. (3) Batch clarification — collect ambiguous requests and present them to a human reviewer in batches rather than one at a time, reducing interrupt frequency. (4) Graceful degradation — for requests that need clarification, take the safest partial action (e.g., flag the record for review rather than deleting or modifying it) and queue the clarification question. (5) Feedback loop — when clarifications are provided, feed them back into the classification system to reduce future ambiguity. This preserves the principle while acknowledging operational constraints.'
          }
        ]}
      />
    </div>
  );
}
