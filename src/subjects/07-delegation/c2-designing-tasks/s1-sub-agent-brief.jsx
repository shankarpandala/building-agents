import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function SubAgentBrief() {
  return (
    <div className="prose-agents">
      <h2>Writing a Sub-Agent Brief</h2>
      <p>
        The quality of delegation hinges almost entirely on the quality of the brief given to
        the sub-agent. A vague brief produces vague work. A brief with missing context forces the
        sub-agent to guess. A brief with conflicting signals produces confused output. Investing
        care in the brief is the highest-leverage act an orchestrator can perform.
      </p>

      <ConceptBlock title="The Sub-Agent Brief" number="Concept 7.5">
        A sub-agent brief is the complete specification passed to a sub-agent at the moment of
        delegation. A well-formed brief contains four elements: the <strong>goal</strong>
        (what outcome is expected), the <strong>context</strong> (the relevant background the
        sub-agent cannot infer), the <strong>constraints</strong> (boundaries on how the work
        should be done), and the <strong>output format</strong> (how the result should be
        returned). Missing any element forces the sub-agent to improvise, which often leads to
        results the orchestrator cannot use.
      </ConceptBlock>

      <AnalogyBlock title="The Project Manager's Assignment Slip">
        A good project manager doesn't hand a task to a team member with just "figure out the
        database migration." They write: here is the goal, here is what you already know about
        the system, here are the constraints (no downtime, finish by Friday), and here is what
        I need back from you (a migration script and a rollback plan). Each element prevents a
        different category of failure. The goal prevents misaligned effort. The context prevents
        wasted research. The constraints prevent boundary violations. The output format prevents
        unusable deliverables.
      </AnalogyBlock>

      <PrincipleBlock title="The Brief Must Be Self-Contained" number="Principle 7.3">
        A sub-agent should be able to complete its task using only the brief and its own tools.
        If the sub-agent would need to ask clarifying questions to proceed, the brief is
        incomplete. Write the brief as if the sub-agent has no memory of prior conversations
        and no access to the orchestrator's current reasoning — because it doesn't.
      </PrincipleBlock>

      <ExerciseBlock
        title="Crafting Sub-Agent Briefs"
        exercises={[
          {
            id: 'sab-1',
            difficulty: 'beginner',
            question: 'Review this brief: "Search the web for information about the topic and summarise what you find." Identify which of the four brief elements (goal, context, constraints, output format) are missing or underspecified.',
            hint: 'Check each element: is the goal clear? Is any context given? Are there constraints? Is the output format defined?',
            solution: 'Goal: partially present but missing specificity (what topic? what kind of information?). Context: entirely absent — no background on why this information is needed or what the orchestrator already knows. Constraints: absent — no time period, source type, length, or quality criteria. Output format: absent — the sub-agent does not know whether to return bullet points, prose, citations, or a structured object.',
          },
          {
            id: 'sab-2',
            difficulty: 'intermediate',
            question: 'Write an improved version of the brief: "Search the web for information about the topic and summarise what you find." The topic is recent advances in battery technology for electric vehicles. The orchestrator needs three key findings with source URLs, each fitting in one sentence, for inclusion in a technical report.',
            hint: 'Include all four elements and be specific.',
            solution: 'Improved brief: "Goal: Identify three notable advances in lithium-ion or solid-state battery technology for electric vehicles published in the last 18 months. Context: This summary will be included in a technical report for automotive engineers; assume a technical audience. Constraints: Only use sources from recognised technical publications, industry reports, or peer-reviewed outlets. Avoid marketing material. Output format: Return exactly three findings. Each finding: one sentence (max 30 words) describing the advance, plus the URL of the primary source."',
          },
          {
            id: 'sab-3',
            difficulty: 'advanced',
            question: 'An orchestrator is delegating a task that depends on a decision it made earlier in its reasoning (e.g., it chose Strategy B over Strategy A). How should it encode that prior decision in the sub-agent brief without passing the entire conversation history?',
            hint: 'Think about extracting only the relevant resolved facts, not the full reasoning chain.',
            solution: 'The orchestrator should extract the decision as a resolved fact: "The approach chosen for this project is Strategy B (incremental rollout, starting with the EU region). Do not consider Strategy A." It passes only the conclusion and the constraints that flow from it — not the deliberation. This keeps the brief concise while giving the sub-agent the context it needs. Passing the full history risks confusing the sub-agent with superseded considerations.',
          },
        ]}
      />
    </div>
  );
}
