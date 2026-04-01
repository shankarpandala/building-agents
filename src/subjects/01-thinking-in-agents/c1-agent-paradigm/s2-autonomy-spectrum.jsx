import ConceptBlock from '../../../components/content/ConceptBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function AutonomySpectrum() {
  return (
    <div className="prose-agents">
      <h2>The Autonomy Spectrum</h2>
      <p>
        Autonomy is not all-or-nothing. Between a system that does exactly what it is told at each
        step and one that sets its own goals and acts entirely independently lies a wide range of
        designs. Understanding where a system sits on this spectrum — and where you <em>want</em> it
        to sit — is one of the most important decisions in agent design.
      </p>

      <ConceptBlock title="The Autonomy Spectrum" number="1.2">
        <p>
          The autonomy spectrum runs from <strong>fully corrigible</strong> (the system only acts
          when instructed and defers every decision to a human) to <strong>fully autonomous</strong>
          (the system sets its own goals and acts without human input). Most practical agents should
          sit somewhere in the middle — capable enough to handle multi-step tasks independently, but
          structured to surface uncertainty and seek confirmation at consequential decision points.
        </p>
      </ConceptBlock>

      <p>
        At the corrigible end, you get predictability and control but lose efficiency. Every decision
        requires a human in the loop, which negates most of the value of automation. At the
        autonomous end, you gain speed and scale but lose oversight. Errors compound without
        correction, and the system may pursue proxies for your goal rather than the goal itself.
      </p>

      <p>
        Most real-world agentic systems are best designed as <strong>human-in-the-loop</strong> or
        <strong> human-on-the-loop</strong>. In the first pattern, the agent pauses and asks before
        taking irreversible or high-stakes actions. In the second, the agent proceeds but makes its
        reasoning transparent so that a human can intervene if something goes wrong.
      </p>

      <PrincipleBlock title="Match Autonomy to Stakes" number="1.1">
        <p>
          The appropriate level of autonomy for an agent depends on the reversibility and consequence
          of its actions. Reading a file is reversible and low-stakes — the agent can proceed without
          asking. Deleting records or sending emails is irreversible and potentially high-stakes —
          the agent should confirm. Design autonomy levels per action type, not per system.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Trust is earned incrementally" type="tip">
        <p>
          A new agent operating in a new environment should start with lower autonomy and expand it
          as its reliability is established. This mirrors how we extend trust to human workers: more
          oversight during onboarding, less as they demonstrate judgment. Starting with high autonomy
          and dialing it back after problems is far more costly.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex2-1',
            difficulty: 'beginner',
            question: 'Place these three systems on the autonomy spectrum and justify each placement: (a) a system that drafts emails but requires human approval before sending; (b) a system that books calendar events based on described preferences; (c) a system that asks "what should I do next?" after every single action.',
            hint: 'Think about how much decision-making power the human retains in each case.',
            solution: '(c) is at the corrigible extreme — it delegates every decision to the human. (a) is mid-spectrum — it exercises judgment in drafting but defers on the consequential action of sending. (b) is more autonomous — it interprets preferences and acts without per-action confirmation, though it operates within a defined scope.'
          },
          {
            id: 'ex2-2',
            difficulty: 'intermediate',
            question: 'Why might a fully autonomous agent be dangerous even if it is highly capable and well-intentioned? What failure modes does high autonomy introduce that capability alone cannot fix?',
            hint: 'Consider misalignment between the agent\'s model of your goal and your actual goal, and the role of error correction.',
            solution: 'High capability does not eliminate goal misspecification — the agent may pursue a proxy for your goal rather than the goal itself, and do so very effectively. Without human checkpoints, errors in goal interpretation compound: each action built on a flawed premise makes the situation harder to recover. Autonomy also removes the correction signal that would catch mistakes early. A highly capable, fully autonomous agent can cause more harm than a less capable one precisely because it acts faster and more thoroughly on its (possibly wrong) understanding.'
          },
          {
            id: 'ex2-3',
            difficulty: 'advanced',
            question: 'Design an autonomy policy for an agent that manages a team\'s project tracker. Specify which actions it can take without confirmation, which require a single approver, and which require explicit sign-off from a manager. Justify each classification.',
            hint: 'Classify by reversibility and blast radius — how hard is it to undo, and how many people are affected?',
            solution: 'No confirmation needed: reading tasks, generating status summaries, adding comments, creating draft tasks in a personal workspace. Single approver: assigning tasks to team members, moving tasks between stages, updating due dates. Manager sign-off: closing or deleting tasks, changing project scope, reassigning ownership of a project, archiving a project. The pattern is that read and draft operations are safe to automate; actions that affect others\' work warrant a check; structural or destructive changes require explicit authority.'
          }
        ]}
      />
    </div>
  )
}
