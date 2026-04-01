import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function TypesOfSpecialists() {
  return (
    <div className="prose-agents">
      <h2>Types of Specialist Sub-Agents</h2>
      <p>
        Not all sub-agents are alike. When an orchestrator delegates, it can choose from several
        archetypes — each shaped by the kind of work it excels at. Understanding these archetypes
        helps an orchestrator match the right sub-agent type to the right task rather than spawning
        generic workers for every job.
      </p>

      <ConceptBlock title="Specialist Sub-Agent Archetypes" number="Concept 7.3">
        A specialist sub-agent is a sub-agent configured with a narrow, focused prompt and tool
        set aimed at one category of work. Common archetypes include: the <strong>researcher</strong>
        (retrieves and summarises information from sources), the <strong>executor</strong> (carries
        out deterministic actions like writing files or calling APIs), the <strong>critic</strong>
        (evaluates output quality and flags issues), and the <strong>planner</strong> (breaks a
        vague objective into concrete steps). Each archetype has a characteristic input, output,
        and failure mode.
      </ConceptBlock>

      <p>
        Archetypes are not rigid categories — they are design patterns. A single sub-agent might
        blend researcher and critic behaviour. The value of naming these patterns is not to
        enforce strict separation but to prompt intentional design. When you know what role a
        sub-agent is playing, you can write a sharper prompt, choose the right tools, and
        anticipate how it can fail.
      </p>

      <AnalogyBlock title="The Hospital Specialist Referral">
        A general practitioner diagnoses broadly, then refers patients to cardiologists,
        radiologists, or surgeons for specific work. Each specialist has deep expertise in a
        narrow domain, the right equipment, and a clear protocol for what they return to the GP.
        The GP does not try to perform the MRI scan or the bypass surgery — they delegate to
        the right specialist and integrate the results into an overall care plan.
      </AnalogyBlock>

      <NoteBlock type="note" title="The Critic Archetype">
        The critic sub-agent is underused but highly valuable. Rather than having an orchestrator
        self-evaluate its own work — which suffers from the same blind spots as the original
        reasoning — a separate critic agent reviews output with a clean perspective. Because the
        critic starts with no prior commitment to the output, it catches errors the producer missed.
      </NoteBlock>

      <ExerciseBlock
        title="Matching Archetypes to Tasks"
        exercises={[
          {
            id: 'ts-1',
            difficulty: 'beginner',
            question: 'For each archetype — researcher, executor, critic, planner — give one concrete task that fits well and one task that fits poorly. Explain your reasoning.',
            hint: 'Think about what input each archetype needs and what it returns.',
            solution: 'Researcher: good fit = "find all published papers on X from 2023"; poor fit = "deploy the application" (execution, not retrieval). Executor: good fit = "write these five files to disk"; poor fit = "evaluate the quality of this essay" (judgement, not action). Critic: good fit = "review this draft for logical consistency"; poor fit = "search the web for recent news" (retrieval, not evaluation). Planner: good fit = "outline the steps to migrate a database"; poor fit = "execute step 3 of the migration plan" (execution, not planning).',
          },
          {
            id: 'ts-2',
            difficulty: 'intermediate',
            question: 'An orchestrator is producing a research report. Design a pipeline using at least three specialist archetypes. Specify what each sub-agent receives as input, what it returns, and how the orchestrator uses its output.',
            hint: 'Think about what needs to happen before synthesis can occur.',
            solution: 'Pipeline: (1) Planner receives the report topic and returns a structured outline with section titles and research questions. (2) Researcher(s) — one per section — receive a single research question and return a summary with source citations. (3) Critic receives the assembled draft and returns a list of gaps, inconsistencies, or unsupported claims. Orchestrator incorporates the critic\'s feedback before finalising the report.',
          },
          {
            id: 'ts-3',
            difficulty: 'advanced',
            question: 'What are the failure modes specific to the critic archetype? How would you design the critic\'s prompt and task brief to minimise each failure mode?',
            hint: 'Consider what can go wrong when the critic has too little context, too much context, or the wrong evaluation criteria.',
            solution: 'Failure modes: (1) Under-specification — critic lacks criteria, produces vague feedback. Fix: include explicit rubric in the brief. (2) Leniency bias — critic is too agreeable. Fix: instruct the critic to find at least N issues and to assume the work may contain errors. (3) Context starvation — critic doesn\'t know the original goal, so it evaluates against the wrong standard. Fix: always include the original task specification in the critic\'s brief alongside the output to review. (4) Over-correction — critic flags style preferences as errors. Fix: distinguish required corrections from optional suggestions in the rubric.',
          },
        ]}
      />
    </div>
  );
}
