import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ContextOverload() {
  return (
    <div className="prose-agents">
      <h2>Context Overload</h2>
      <p>
        One of the benefits of delegation is that sub-agents get clean, focused contexts.
        But that benefit disappears when orchestrators pass too much context into each brief.
        Context overload is the anti-pattern of providing a sub-agent with far more background
        than it needs — often the orchestrator's entire conversation history — in an attempt
        to be thorough. The result is a sub-agent that struggles to identify what is relevant
        and often performs worse than it would with less information.
      </p>

      <ConceptBlock title="Context Overload" number="Concept 7.11">
        Context overload occurs when a sub-agent's input contains so much information that the
        signal relevant to its task is diluted by noise. Language models attend to everything in
        their context window, which means irrelevant content competes for attention with the
        content that matters. A sub-agent given the full history of a complex project when it
        only needs three specific facts will often produce outputs that reflect the distracting
        content rather than the relevant signal.
      </ConceptBlock>

      <p>
        The natural impulse is to provide more context because it feels safer — the sub-agent
        can pick what it needs. But this assumption is flawed. Sub-agents are not efficient
        skimmers. They reason over their full context, and long contexts with buried relevant
        information produce less reliable outputs than short contexts with the right information
        front and centre.
      </p>

      <PrincipleBlock title="Extract, Don't Dump" number="Principle 7.6">
        When preparing a sub-agent brief, extract only the facts the sub-agent needs and
        discard everything else. This requires the orchestrator to do the filtering work
        itself — which is harder than passing everything through. But the effort pays off in
        sub-agent output quality. A two-paragraph brief with the right three facts will
        outperform a twenty-page dump every time.
      </PrincipleBlock>

      <WarningBlock title="The 'Just In Case' Dump">
        A frequent form of context overload is passing the entire prior conversation "just in
        case" the sub-agent needs something in it. This is almost never the right choice.
        Prior conversation contains tentative reasoning, rejected options, intermediate
        thoughts, and other artifacts that confuse rather than help. The orchestrator should
        resolve its own reasoning first and pass only the settled conclusions.
      </WarningBlock>

      <ExerciseBlock
        title="Diagnosing and Fixing Context Overload"
        exercises={[
          {
            id: 'co-1',
            difficulty: 'beginner',
            question: 'An orchestrator passes its entire 10,000-token conversation history to a sub-agent whose only task is to format a list of five names into alphabetical order. What is wrong here, and what should the brief contain instead?',
            hint: 'Think about what the sub-agent actually needs to perform this task.',
            solution: 'The sub-agent needs only the five names and the instruction to return them alphabetically. Nothing else in the 10,000-token history is relevant. The inflated context wastes tokens, slows inference, and risks the sub-agent latching onto irrelevant content. The brief should be: "Return the following names in alphabetical order: [list of five names]. Output format: a JSON array of strings."',
          },
          {
            id: 'co-2',
            difficulty: 'intermediate',
            question: 'An orchestrator has spent twenty reasoning steps exploring three different approaches to a problem before settling on Approach C. It now delegates implementation to a sub-agent. Which parts of those twenty steps should appear in the sub-agent brief, and which should be omitted?',
            hint: 'Distinguish between the decision (relevant) and the deliberation (usually not).',
            solution: 'Include: the final decision (Approach C was chosen), the key constraints that led to it (e.g., Approach A was rejected due to latency, Approach B due to cost), and any implementation-relevant specifications derived from those steps. Omit: the full deliberation process, the details of Approaches A and B unless they contain constraints that still apply, and any tentative conclusions that were later revised. The sub-agent needs to know what to build and why, not the full history of how the decision was reached.',
          },
          {
            id: 'co-3',
            difficulty: 'advanced',
            question: 'Design a context extraction protocol for an orchestrator preparing to delegate. Define the steps it should follow to distil its current state into a minimal, high-quality brief. Include how it decides what is relevant.',
            hint: 'Think of it as a compression algorithm with a relevance filter.',
            solution: 'Protocol: (1) Write the task goal first. (2) For each piece of information in the orchestrator\'s current state, ask: "If the sub-agent didn\'t have this, would it make a worse decision or take a wrong action?" If yes, include it. If no, exclude it. (3) Convert any relevant information from conversational form to declarative facts (e.g., "we considered X but rejected it because Y" becomes "X is not an option because Y"). (4) Check the resulting brief length: if it exceeds ~500 tokens for a routine task, review for additional cuts. (5) Verify completeness by reading the brief cold — could a fresh agent do the task correctly from this alone?',
          },
        ]}
      />
    </div>
  );
}
