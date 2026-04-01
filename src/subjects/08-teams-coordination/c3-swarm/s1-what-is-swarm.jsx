import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function WhatIsSwarm() {
  return (
    <div className="prose-agents">
      <h2>What Is a Swarm?</h2>
      <p>
        A team has defined roles, structured communication, and a lead that coordinates
        the whole. A swarm is something different: a large collection of agents that
        work on the same problem without central coordination, each processing a piece
        of the work independently and contributing to a shared result. Swarms trade
        structure for scale.
      </p>

      <ConceptBlock title="Agent Swarm" number="Concept 8.10">
        An agent swarm is a collection of many homogeneous agents executing the same
        class of task across different inputs simultaneously, without direct coordination
        between individuals. Swarms are appropriate for embarrassingly parallel problems:
        tasks that can be divided into independent units where no unit depends on another.
        A swarm's power is sheer throughput — hundreds of agents processing in parallel
        can complete in minutes what a sequential agent would take hours to finish.
      </ConceptBlock>

      <p>
        The defining characteristic of a swarm is independence between workers. This is
        both a capability and a constraint. Because workers don't coordinate, they don't
        block each other — which is where the speed advantage comes from. But they also
        cannot share intermediate results, cannot adapt their work based on what other
        workers found, and cannot handle tasks where the order of operations matters.
        Swarms are not a general-purpose architecture; they are a specific tool for
        a specific class of problem.
      </p>

      <AnalogyBlock title="The Document Review Farm">
        A law firm reviewing a hundred thousand documents in discovery uses a review
        farm: dozens of lawyers working in parallel, each assigned a batch of documents,
        each using the same criteria. They don't coordinate with each other — they simply
        apply the same process to their assigned batch and submit their findings to the
        lead attorney. The lead collects everything, not individual workers. This is a
        human swarm: parallel, homogeneous, and independent.
      </AnalogyBlock>

      <NoteBlock type="intuition" title="Swarm vs Team Decision">
        When you find yourself wanting to add dozens of agents, ask: are the tasks truly
        independent? If yes, you want a swarm. If the tasks have dependencies — if the
        output of one agent shapes what another should do — you want a team. Confusing the
        two patterns results in either a swarm of dependent agents (uncoordinated chaos) or
        a team of independent workers (unnecessary coordination overhead).
      </NoteBlock>

      <ExerciseBlock
        title="Understanding Agent Swarms"
        exercises={[
          {
            id: 'ws-1',
            difficulty: 'beginner',
            question: 'List three tasks that are well-suited for a swarm architecture and three that are not. For each "not suited" task, explain which swarm characteristic it violates.',
            hint: 'Focus on task independence as the key criterion.',
            solution: 'Well-suited: (1) Transcribing 1,000 audio clips — each clip is independent. (2) Classifying 50,000 images — each image is independent. (3) Translating 200 product descriptions — each description is independent. Not suited: (1) Writing a novel — chapters depend on each other, characters must be consistent across agents. Violates independence. (2) Multi-step reasoning across a shared dataset — later steps depend on earlier findings. Violates independence. (3) Building a software system — components must integrate; design decisions in one component affect others. Violates independence.',
          },
          {
            id: 'ws-2',
            difficulty: 'intermediate',
            question: 'A swarm of 50 agents is processing customer feedback from 50,000 records. Halfway through, the classification criteria change. How does a swarm handle this compared to how a team would?',
            hint: 'Think about the broadcast mechanism for swarms and the consistency challenge.',
            solution: 'In a swarm, there is no internal coordination mechanism — the only way to update criteria is to broadcast the change from the swarm controller. Records already processed under the old criteria must be reprocessed, creating a consistency problem: some results use old criteria, some new. The swarm cannot self-correct. In a team, the lead broadcasts the change to all teammates, each acknowledges and applies it going forward. Already-completed work is flagged for review. The team can coordinate a consistent response; the swarm simply continues, producing an inconsistent output set.',
          },
          {
            id: 'ws-3',
            difficulty: 'advanced',
            question: 'Design a partitioning strategy for a swarm of 20 agents processing 10,000 items, accounting for: unequal processing times per item, agent failures during the run, and the need to ensure every item is processed exactly once.',
            hint: 'Think about dynamic work queues rather than static pre-assignment.',
            solution: 'Use a central work queue rather than pre-assignment: (1) Items are loaded into a queue, each marked "available". (2) Each agent pulls items from the queue one at a time by claiming them (marking them "in-progress" with the claiming agent\'s ID and a lease expiry). (3) The lease expiry handles agent failures: if an agent fails mid-item, its claimed item\'s lease expires and the item returns to "available" for another agent to claim. (4) On completion, the agent marks the item "done". (5) A controller monitors for items stuck in "in-progress" past their lease and returns them to the queue. This guarantees exactly-once processing across failures and handles unequal times naturally — fast agents claim more items.',
          },
        ]}
      />
    </div>
  );
}
