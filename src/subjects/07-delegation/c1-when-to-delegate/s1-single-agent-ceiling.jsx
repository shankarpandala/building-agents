import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function SingleAgentCeiling() {
  return (
    <div className="prose-agents">
      <h2>The Single-Agent Ceiling</h2>
      <p>
        A single agent running in a loop is a powerful thing. It can plan, use tools, recover from
        errors, and carry out multi-step tasks — all within one continuous thread of reasoning.
        But that single thread has natural limits. As tasks grow longer, broader, or more
        parallel in nature, a lone agent begins to strain. Understanding where that strain starts
        is the first step toward knowing when to delegate.
      </p>

      <ConceptBlock title="The Single-Agent Ceiling" number="Concept 7.1">
        The single-agent ceiling is the point at which one agent's context window, sequential
        execution, or skill set becomes the bottleneck. Past this ceiling, adding more instructions
        to the same agent yields diminishing returns — or outright failure. The ceiling is not a
        flaw; it is an architectural signal that the problem requires more than one worker.
      </ConceptBlock>

      <p>
        Three forces drive an agent toward its ceiling. First, <strong>context length</strong>:
        every observation, tool call, and intermediate result consumes tokens. Long-running tasks
        can exhaust the window, forcing the agent to lose earlier context. Second,
        <strong> serial execution</strong>: an agent works step-by-step. Tasks with independent
        sub-problems waste time when forced through a single pipeline. Third,
        <strong> domain breadth</strong>: an agent prompted to be a generalist at everything
        is usually excellent at nothing in particular.
      </p>

      <AnalogyBlock title="The One-Person Consultancy">
        A freelance consultant can handle a small engagement solo — a few interviews, a report,
        a presentation. But a project that requires simultaneous legal review, financial modelling,
        and technical audit cannot be done by one person without serious delays and quality
        trade-offs. The engagement has outgrown a solo worker. The answer is not to work the
        consultant harder; it is to assemble a team.
      </AnalogyBlock>

      <NoteBlock type="tip" title="Signals You Have Hit the Ceiling">
        Watch for these signs: the agent repeatedly re-reads earlier context as if it forgot it;
        tasks that could proceed in parallel are stuck waiting on each other; the agent produces
        shallow results on topics that deserve deep expertise; or the task simply exceeds the
        maximum context length of the model.
      </NoteBlock>

      <ExerciseBlock
        title="Recognising the Single-Agent Ceiling"
        exercises={[
          {
            id: 'sac-1',
            difficulty: 'beginner',
            question: 'List three observable symptoms that suggest a single agent has reached its ceiling on a task. For each symptom, explain the underlying architectural cause.',
            hint: 'Think about context length, sequential bottlenecks, and knowledge breadth separately.',
            solution: '(1) Repeating earlier mistakes or ignoring prior context — caused by context window exhaustion. (2) Tasks completing far slower than expected despite simple sub-steps — caused by forced serial execution of parallelisable work. (3) Shallow or generic answers on specialised topics — caused by a single generalist prompt unable to match domain-specific depth.',
          },
          {
            id: 'sac-2',
            difficulty: 'intermediate',
            question: 'A task requires researching five independent topics and then synthesising them into a report. Why does a single-agent approach struggle here, and what exactly would a delegated approach fix?',
            hint: 'Consider both the parallelism opportunity and the context budget separately.',
            solution: 'A single agent must research all five topics sequentially, each consuming context. By the time it reaches synthesis, earlier research may have been displaced or compressed. A delegated approach assigns each research topic to a separate sub-agent, running in parallel. Each sub-agent has a clean context for its domain. The orchestrating agent then receives only the final summaries — a small, high-signal input rather than the full accumulated history.',
          },
          {
            id: 'sac-3',
            difficulty: 'advanced',
            question: 'Under what conditions would splitting a task across multiple agents actually make performance worse rather than better? Identify at least two such conditions.',
            hint: 'Think about coordination overhead and tasks where sub-results depend tightly on each other.',
            solution: '(1) High-interdependence tasks: if every sub-result depends on the previous one, parallelism offers no benefit but adds hand-off latency and serialisation overhead. (2) Short tasks: the overhead of spawning, briefing, and collecting results from sub-agents may exceed the time the task itself would take in a single agent. (3) Tasks requiring shared evolving state: if each agent needs to read and write to the same state, synchronisation complexity can introduce errors and deadlocks that would not exist in a single sequential agent.',
          },
        ]}
      />
    </div>
  );
}
