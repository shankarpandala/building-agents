import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ClarityOverCleverness() {
  return (
    <div className="prose-agents">
      <h2>Prefer Clarity Over Cleverness</h2>
      <p>
        Agents that produce clever, compact, or elegant solutions often create more
        problems than they solve. Cleverness optimizes for the moment of creation.
        Clarity optimizes for every moment after — every review, every debugging
        session, every modification by a future reader who was not present when
        the solution was written. In production agent systems, clarity is not a
        stylistic preference. It is an operational requirement.
      </p>

      <ConceptBlock title="Clarity as an Engineering Principle" number="Concept 12.11">
        Clarity means that an agent's outputs — its reasoning, its actions, its
        generated artifacts — can be understood by a competent reader without
        requiring special insight or reverse-engineering. A clear solution reveals
        its intent on first reading. A clever solution requires the reader to
        reconstruct the author's reasoning to understand why it works. In agent
        systems, where outputs are reviewed under time pressure and often by
        people who did not initiate the request, clarity directly determines
        whether the output is trusted, adopted, or discarded.
      </ConceptBlock>

      <AnalogyBlock title="The Emergency Exit Sign">
        Emergency exit signs are not elegant. They are not subtle. They use large
        text, bright colors, and universal symbols. No one looks at an emergency
        exit sign and admires its design — but everyone can find the exit in a
        crisis. An agent's outputs should have the same quality: unmistakable in
        their meaning, requiring no interpretation, functional under stress. The
        moment someone has to puzzle over what the agent did or why, clarity has
        failed.
      </AnalogyBlock>

      <p>
        Cleverness in agent outputs takes many forms: overly abstract solutions that
        generalize beyond the current need, terse actions that compress multiple
        intentions into a single step, or sophisticated approaches when a
        straightforward one would suffice. Each of these makes the output harder
        to verify, harder to debug, and harder to modify. The cost is paid not by
        the agent but by every human who interacts with its output afterward.
      </p>

      <PrincipleBlock title="Optimize for the Reader, Not the Writer" number="Principle 12.7">
        An agent's output is written once and read many times. The agent bears no
        cost from verbosity or simplicity — it does not get tired, bored, or
        impatient. But every human reader bears the full cost of obscurity. An
        agent should therefore always choose the approach that minimizes the reader's
        effort, even when a more compact or elegant alternative exists. The
        agent's sophistication should be invisible; its outputs should look simple.
      </PrincipleBlock>

      <WarningBlock title="Cleverness Hides Bugs">
        A solution that is difficult to understand is also difficult to verify.
        When a reviewer cannot easily trace the logic of an agent's output, they
        face a choice: spend significant time understanding it, or approve it on
        trust. Neither option is safe. Difficult-to-understand outputs are where
        bugs hide — not because cleverness is inherently wrong, but because
        reduced readability reduces the probability that errors will be caught
        during review.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'cc-1',
            difficulty: 'beginner',
            question: 'Why does clarity matter more for agent-generated outputs than for outputs written by a human developer who is present to explain their work?',
            hint: 'Think about who is available to answer questions about the output.',
            solution: 'When a human writes something clever, they are usually available to explain it — in a code review, in a team discussion, or through comments they chose to add. An agent is not present after it produces its output. There is no one to ask "why did you do it this way?" The output must stand alone and explain itself. Additionally, agent outputs are often reviewed under time pressure with limited context about the agent\'s reasoning process. If the intent is not immediately clear from the output itself, the reviewer must either spend disproportionate time reconstructing the reasoning or accept the output without full understanding — both of which are costly.'
          },
          {
            id: 'cc-2',
            difficulty: 'intermediate',
            question: 'An agent has two approaches to solve a problem: one is straightforward but takes five steps, the other is elegant and accomplishes the same result in two steps. The two-step approach uses a non-obvious technique. Which should the agent choose, and why?',
            hint: 'Think about the total cost across the lifetime of the output, not just the moment of creation.',
            solution: 'The agent should choose the five-step straightforward approach. The cost of producing those extra steps is zero for the agent. The benefit is that every future reader — the person reviewing the output, the developer debugging an issue months later, the team member modifying it for a new requirement — can follow the logic without needing to understand the non-obvious technique. The two-step approach saves visual space but costs cognitive effort on every reading. Over the lifetime of the output, the cumulative reader cost of the clever solution far exceeds the one-time production cost of the straightforward one. Clarity compounds in value; cleverness compounds in cost.'
          },
          {
            id: 'cc-3',
            difficulty: 'advanced',
            question: 'How would you evaluate whether an agent system is producing sufficiently clear outputs? What metrics or review processes would reveal a clarity problem?',
            hint: 'Think about signals from the people who consume the agent\'s outputs.',
            solution: 'Signals of a clarity problem: (1) Review time — if reviewers spend disproportionate time on agent outputs compared to human outputs of similar scope, the outputs may be unclear. Track average review duration. (2) Clarification requests — if users frequently ask follow-up questions about what the agent did or why, the outputs are not self-explanatory. Track the rate of "what did you do?" questions. (3) Rejection rate — if a high percentage of agent outputs are rejected or significantly modified before acceptance, the agent may be producing work that does not match expectations, often a clarity issue. (4) Revert rate — outputs that are accepted but later reverted suggest they were not fully understood during review. (5) Structured review — periodically have someone unfamiliar with the original request attempt to understand an agent\'s output purely from the output itself. If they cannot, the output failed the clarity test. These metrics should be tracked over time to detect trends.'
          }
        ]}
      />
    </div>
  );
}
