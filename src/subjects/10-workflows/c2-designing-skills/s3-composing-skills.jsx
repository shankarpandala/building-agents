import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ComposingSkills() {
  return (
    <div className="prose-agents">
      <h2>Composing Skills</h2>
      <p>
        Simple skills handle single tasks well. But real workflows are multi-step:
        analyze, then transform, then validate, then report. Rather than building
        monolithic skills that handle every step, the more powerful approach is to
        compose simple skills into complex workflows — letting each skill do one
        thing well and chaining them together.
      </p>

      <ConceptBlock title="Skill Composition" number="10.7">
        <p>
          Skill composition is the practice of building complex workflows by connecting
          simpler skills in sequence, in parallel, or in conditional branches. A composed
          workflow defines the order of execution, how data flows from one skill's output
          to the next skill's input, and what happens when an intermediate skill fails.
          Composition turns a library of small, focused skills into a system capable of
          handling sophisticated multi-step processes.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="Assembly Line Manufacturing">
        <p>
          A car factory does not have one enormous machine that takes in raw steel and
          produces a finished car. It has stations: one stamps body panels, another welds
          the frame, another installs the engine, another paints. Each station does one
          thing expertly. The assembly line composes these stations into a complete
          manufacturing process. Skill composition works the same way — each skill is a
          station, and the composition defines the line.
        </p>
      </AnalogyBlock>

      <p>
        The critical challenge in composition is the interface between skills. The output
        of one skill must be compatible with the input of the next. When skills are
        designed independently, these interfaces often mismatch — one produces a summary
        as free text while the next expects structured data. Successful composition
        requires deliberate interface design.
      </p>

      <PrincipleBlock title="Design Skills for Composition, Not Just Standalone Use" number="10.5">
        <p>
          A skill designed only for direct user invocation often produces human-readable
          output that is difficult for another skill to parse. Skills designed for
          composition produce structured, predictable output that both humans and
          downstream skills can consume. When building a skill, ask: "Could another skill
          use my output as its input?" If the answer is no, the skill is a dead end in
          any composed workflow.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Deep composition chains amplify failures">
        <p>
          A chain of ten skills where each depends on the previous one has ten points of
          failure. If any skill fails, everything downstream is blocked. Worse, errors
          can propagate subtly — a slightly wrong output from skill three may not cause
          skill four to fail, but may cause skill seven to produce nonsense. Keep
          composition chains as short as practical, and validate intermediate results
          at key checkpoints.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'cs-1',
            difficulty: 'beginner',
            question: 'You have three skills: "gather-requirements" (outputs a list of requirements), "generate-tests" (takes requirements, outputs test descriptions), and "estimate-effort" (takes test descriptions, outputs time estimates). How would you compose them into a single workflow? What data flows between each step?',
            hint: 'Trace the output of each skill and how it becomes the input of the next.',
            solution: 'The composition is a linear chain: gather-requirements → generate-tests → estimate-effort. Data flow: (1) gather-requirements produces a structured list of requirements (each with an ID, description, and priority). (2) generate-tests consumes this list and produces a list of test descriptions (each linked to a requirement ID). (3) estimate-effort consumes the test descriptions and produces time estimates per test. The final output is a report mapping requirements → tests → time estimates. The key design requirement is that each skill\'s output format is exactly what the next skill expects as input — this must be defined in the interface contracts, not left to chance.'
          },
          {
            id: 'cs-2',
            difficulty: 'intermediate',
            question: 'A composed workflow fails at step 4 of 6. The first three steps completed successfully and produced side effects (files were created, notifications were sent). How should the composition framework handle this partial failure?',
            hint: 'Consider what "rollback" means when some side effects are irreversible, and what information the user needs.',
            solution: 'The framework should: (1) Stop execution immediately — do not attempt steps 5 and 6 with missing input from step 4. (2) Preserve all outputs from steps 1-3 so they are not lost. (3) Record the exact failure point and error from step 4. (4) For reversible side effects (created files), offer rollback. For irreversible side effects (sent notifications), document what was already done so the user can account for it. (5) Enable "resume from step 4" — after the user fixes the issue, the workflow should be able to restart from the failure point using preserved outputs from steps 1-3, without re-executing completed work. Partial failure handling must be designed into the composition framework, not added as an afterthought.'
          },
          {
            id: 'cs-3',
            difficulty: 'advanced',
            question: 'Design a composition pattern where two skills run in parallel (both analyzing the same input from different angles) and their outputs are merged by a third skill. What challenges does parallel composition introduce that sequential composition avoids?',
            hint: 'Think about timing, partial failures, and how to merge potentially contradictory outputs.',
            solution: 'Pattern: fan-out/fan-in. The input is sent to both skills simultaneously. A synchronization point waits for both to complete, then passes both outputs to the merge skill. Challenges unique to parallel composition: (1) Timing — one skill may finish in seconds, the other in minutes. The framework must decide whether to wait for both or proceed after a timeout. (2) Partial failure — if one parallel branch fails, should the merge proceed with only one input or should the entire workflow fail? This depends on whether the merge skill can produce useful output from a single input. (3) Contradictory outputs — the two analyses may reach different conclusions. The merge skill must have a resolution strategy (e.g., weighted synthesis, flagging disagreements). (4) Resource contention — if both skills use the same tools or APIs simultaneously, they may interfere with each other. The framework should manage shared resource access across parallel branches.'
          }
        ]}
      />
    </div>
  )
}
