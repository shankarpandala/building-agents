import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function ClassifierBased() {
  return (
    <div className="prose-agents">
      <h2>Classifier-Based Permissions</h2>
      <p>
        Rule-based models work well for well-defined action spaces but struggle with novelty.
        Classifier-based permission models address this by using a learned model — rather than
        explicit rules — to decide whether an action is safe, risky, or requires escalation.
        The classifier generalizes from examples to handle situations that rules could not
        anticipate.
      </p>

      <ConceptBlock title="Classifier-Based Permission Model" number="Concept 3.8">
        In a classifier-based permission model, each proposed action is evaluated by a trained
        model that assigns it a risk score or category. Actions below a risk threshold proceed
        automatically. Actions above the threshold are blocked or escalated. The classifier's
        behavior is not determined by explicit rules but by patterns learned from labeled
        examples of safe and unsafe actions.
      </ConceptBlock>

      <AnalogyBlock title="Email Spam Filters">
        A spam filter does not have an exhaustive list of spam messages — there are too many and
        they evolve too quickly. Instead, it learns patterns that correlate with spam across
        millions of examples and applies those patterns to messages it has never seen. A
        classifier-based permission model applies the same approach: learn what "risky action"
        looks like, then apply that understanding to novel situations.
      </AnalogyBlock>

      <p>
        Classifier-based models handle ambiguity and novelty much better than rule sets.
        They can recognize that an action is semantically dangerous even if no explicit rule
        covers it. However, they introduce new risks: false positives block legitimate actions,
        false negatives let dangerous actions through, and the decision boundary is opaque —
        it is not always possible to explain why a specific action was flagged.
      </p>

      <NoteBlock title="Combining classifiers with rules" type="info">
        The most robust permission systems layer both approaches. Hard rules encode absolute
        constraints that no classifier should be able to override — certain actions are always
        denied, full stop. The classifier handles the large middle ground of ambiguous cases
        that rules cannot anticipate. This gives you the predictability of rules where stakes
        are highest, and the flexibility of classifiers everywhere else.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'cb-1',
            difficulty: 'beginner',
            question:
              'What is the key advantage of classifier-based permissions over rule-based permissions when the agent operates in a domain where the range of possible actions is very large or unpredictable?',
            hint: 'Think about what rules require vs. what classifiers require to work.',
            solution:
              'Rules require the designers to enumerate all possible dangerous actions in advance — impossible when the action space is vast or evolving. Classifiers generalize from examples to handle actions that were never explicitly defined as safe or unsafe. They can recognize dangerous intent in forms that no specific rule anticipated.',
          },
          {
            id: 'cb-2',
            difficulty: 'intermediate',
            question:
              'A classifier-based safety model has a 2% false negative rate — it fails to flag 2% of truly dangerous actions as risky. At what volume of actions per day does this become a serious operational problem, and what compensating controls would you add?',
            hint: 'Think about absolute numbers at scale.',
            solution:
              'At 1,000 actions per day, 2% means 20 dangerous actions slip through — likely unacceptable. At 10,000 actions per day, that\'s 200. Compensating controls: (1) Post-hoc audit sampling of approved actions to catch misclassifications. (2) Rate limiting to cap potential damage from any single false-negative cluster. (3) Hard rules for the most catastrophic action classes regardless of classifier score.',
          },
          {
            id: 'cb-3',
            difficulty: 'advanced',
            question:
              'An adversary discovers that slightly rephrasing a dangerous instruction causes the classifier to score it as safe. What is this attack called, and what architectural approach makes the system more robust to it?',
            hint: 'This is a well-known class of attack against learned models.',
            solution:
              'This is an adversarial example or prompt injection attack against the classifier. Robustness approaches: (1) Semantic ensemble — run multiple independent classifiers and require consensus to approve. (2) Normalization — strip surface variation before classification so rephrasing doesn\'t change the semantic input. (3) Defense in depth — do not rely solely on the classifier; layer it with rule-based hard stops and post-execution monitoring.',
          },
        ]}
      />
    </div>
  );
}
