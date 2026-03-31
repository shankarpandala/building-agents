import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function WhyTools() {
  return (
    <div className="prose-agents">
      <h2>Why Agents Need Tools</h2>
      <p>
        A language model, at its core, is a function that takes text in and produces text out.
        It reasons, it synthesizes, it infers — but everything happens inside that boundary.
        The world, however, does not live in text. Prices change, files get updated, APIs respond,
        databases grow. To act meaningfully in the world, an agent must reach beyond language.
        That reaching is what tools are for.
      </p>

      <ConceptBlock title="What a Tool Is" number="Concept 2.1">
        A tool is a named, callable capability that an agent can invoke to interact with something
        outside its own reasoning process. Tools bridge the gap between the agent's internal world
        of language and the external world of state, computation, and real effects. Without tools,
        an agent can only describe the world. With tools, it can change it.
      </ConceptBlock>

      <p>
        Think about what makes a human expert effective. A doctor does not diagnose from pure
        memory alone — they order tests, check lab results, consult imaging. An engineer does not
        design in their head only — they run simulations, inspect materials, measure tolerances.
        Expertise is the ability to direct external instruments intelligently. The same is true
        for agents.
      </p>

      <AnalogyBlock title="The Surgeon's Instruments">
        A surgeon's skill is not in their hands alone but in their mastery of when and how to use
        each instrument. A scalpel, a clamp, a suture — each has a precise purpose. Using the
        wrong instrument, or using the right one at the wrong moment, causes harm. The surgeon's
        judgment about which tool to reach for, and when to hold back, is the real expertise.
        An agent's relationship to its tools is the same.
      </AnalogyBlock>

      <h3>The Fundamental Limitation Tools Solve</h3>
      <p>
        Language models have a knowledge cutoff. They cannot see what happened after training ended.
        They cannot read a specific file on a specific server. They cannot check whether an order
        has shipped or a payment has cleared. This is not a flaw to be fixed — it is the nature
        of the architecture. Tools are the designed solution: the agent reasons about <em>what
        to do</em>, and tools carry those intentions into reality.
      </p>
      <p>
        Tools also enable verification. An agent that can only reason may hallucinate facts with
        confidence. An agent that can query a real database, call a real API, or read a real file
        can ground its reasoning in verified state. This is one of the most important properties
        tools bring to agents: they introduce a reality check into the reasoning loop.
      </p>

      <ExerciseBlock
        title="Why Tools Matter"
        exercises={[
          {
            id: 'wt-1',
            difficulty: 'beginner',
            question: 'Name three categories of tasks that are impossible for a tool-less agent but become possible once tools are added. For each, explain what specific limitation the tool overcomes.',
            hint: 'Think about time (cutoff), state (external systems), and computation (precise calculation).',
            solution: 'Examples: (1) Real-time data lookup — overcomes the knowledge cutoff by fetching live information. (2) File manipulation — overcomes the text-only boundary by reading/writing persistent state. (3) Exact arithmetic or computation — overcomes probabilistic reasoning by delegating to deterministic execution.',
          },
          {
            id: 'wt-2',
            difficulty: 'intermediate',
            question: 'An agent is asked to summarize a customer\'s order history. Without tools, how would it respond, and what are the risks? With a database query tool, how does the situation change?',
            hint: 'Consider what the agent "knows" versus what it can "verify".',
            solution: 'Without tools, the agent can only describe a generic process or fabricate plausible-sounding data — a serious hallucination risk in a business context. With a database query tool, the agent retrieves actual records and grounds its summary in verified facts, making the response both accurate and auditable.',
          },
          {
            id: 'wt-3',
            difficulty: 'intermediate',
            question: 'Why is the distinction between "describing an action" and "performing an action" important when thinking about what tools enable?',
            hint: 'Think about the difference between telling someone how to send an email versus actually sending it.',
            solution: 'Describing an action has no real-world effect — it is pure language. Performing an action changes state in the world: a file is written, a message is sent, a record is updated. Tools collapse the gap between these two, which is powerful but also means the agent now bears responsibility for real consequences. This is why tool design and invocation judgment both matter enormously.',
          },
        ]}
      />
    </div>
  );
}
