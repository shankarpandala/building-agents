import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function HumanInLoop() {
  return (
    <div className="prose-agents">
      <h2>Human in the Loop</h2>
      <p>
        Human-in-the-loop (HITL) design places a human as an active participant in an agent's
        decision-making process at defined checkpoints. Unlike pure automation, HITL systems
        do not aim to remove humans from the loop entirely — they strategically position human
        judgment where it adds the most value and where automated decisions carry the highest
        risk.
      </p>

      <ConceptBlock title="Human-in-the-Loop (HITL)" number="Concept 3.12">
        A human-in-the-loop design identifies specific decision points in an agent's execution
        where a human must review, modify, or approve before the agent continues. These
        checkpoints are pre-defined rather than reactive — they are part of the system design,
        not emergency interventions. The goal is meaningful oversight, not performative approval.
      </ConceptBlock>

      <AnalogyBlock title="Air Traffic Control">
        Aircraft autopilots handle routine flight — altitude, heading, speed. Air traffic
        controllers handle complex decisions: sequencing landings, managing conflicts, responding
        to emergencies. The human is not needed for every control input, but is essential for
        high-ambiguity, high-stakes decisions that require situational awareness across many
        concurrent systems. HITL agent design places humans in the air traffic controller role,
        not the autopilot role.
      </AnalogyBlock>

      <p>
        Effective HITL design requires matching checkpoint placement to where human judgment is
        genuinely valuable. Checkpoints placed at low-stakes, routine decisions add friction
        without adding safety. Checkpoints placed at high-stakes, novel, or irreversible
        decisions provide real value. The hardest design challenge is identifying which decisions
        are which, and building the interfaces that give humans enough context to make good
        decisions quickly.
      </p>

      <NoteBlock title="HITL requires good interfaces" type="info">
        A human-in-the-loop checkpoint is only as good as the information presented to the human.
        If the approval interface shows opaque technical details without context, the human
        cannot make an informed decision — they will either approve blindly or experience
        decision fatigue. HITL interfaces should present the decision in terms the reviewer
        understands, with clear consequences and a simple action path.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'hitl-1',
            difficulty: 'beginner',
            question:
              'What distinguishes a meaningful human-in-the-loop checkpoint from a performative one? Give one characteristic of each.',
            hint: 'Think about whether the human can actually change the outcome.',
            solution:
              'Meaningful: the human has sufficient context to make an informed decision and the authority to reject or modify the proposed action. Performative: the human is shown a confirmation dialog with insufficient context to evaluate it, or the system is designed in a way that makes rejection impractical (e.g., "approve or the entire task fails").',
          },
          {
            id: 'hitl-2',
            difficulty: 'intermediate',
            question:
              'An agent that books travel for employees has a HITL checkpoint for every booking, regardless of cost. Redesign the checkpoint strategy to be more effective without removing human oversight entirely.',
            hint: 'Think about risk-based tiering — what factors determine whether a booking needs review?',
            solution:
              'Tier checkpoints by risk: auto-approve bookings under a cost threshold that match pre-specified travel policies (e.g., economy class, preferred vendors, advance booking). Require manager review for bookings above a cost threshold or that deviate from policy. Require executive review for bookings above a higher threshold or for unusual destinations. Most bookings proceed automatically; human oversight concentrates on the decisions that warrant it.',
          },
          {
            id: 'hitl-3',
            difficulty: 'advanced',
            question:
              'As AI agents become more capable, some argue HITL becomes less necessary because the agent\'s judgment improves. Construct an argument for why HITL remains important even for highly capable agents.',
            hint: 'Think about accountability, alignment, and what "capable" actually measures.',
            solution:
              'Capability and alignment are independent. A highly capable agent that is subtly misaligned can cause much larger harm than a less capable one — capability amplifies both good and bad outcomes. Additionally, HITL provides accountability and legitimacy that cannot be replaced by performance metrics. Even if an agent makes correct decisions 99.9% of the time, the 0.1% where it is wrong requires human oversight to catch and correct. Finally, HITL is not just about catching errors — it is about maintaining human understanding of and responsibility for consequential decisions, which is a governance requirement independent of technical capability.',
          },
        ]}
      />
    </div>
  );
}
