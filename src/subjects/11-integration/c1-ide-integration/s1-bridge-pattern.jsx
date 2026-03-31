import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function BridgePattern() {
  return (
    <div className="prose-agents">
      <h2>The Bridge Pattern</h2>
      <p>
        When an agent needs to operate inside a developer's environment — reading files,
        running commands, understanding project structure — it cannot simply connect directly
        to every tool and editor on its own. A mediating layer is required. This mediating
        layer is called a bridge.
      </p>

      <ConceptBlock title="The IDE Bridge" number="Concept 11.1">
        A bridge is a process that sits between the agent and the developer's environment.
        It translates the agent's abstract requests — "read this file," "run this test" —
        into concrete operations within the specific IDE or editor being used. The bridge
        owns the knowledge of how to talk to the environment; the agent only needs to know
        how to talk to the bridge.
      </ConceptBlock>

      <p>
        This separation of concerns is deliberate. The agent should not need to know whether
        it is operating inside VS Code, a JetBrains IDE, or a terminal. By delegating
        environment-specific knowledge to the bridge, the same agent logic can work across
        many different host environments without modification.
      </p>

      <AnalogyBlock title="The Embassy Interpreter">
        An ambassador does not need to speak every language of every country they visit.
        They bring an interpreter who handles the local communication. The bridge plays
        the role of that interpreter — fluent in the language of the host environment,
        converting the agent's standardized requests into whatever the environment expects.
      </AnalogyBlock>

      <NoteBlock title="Bridges Are Thin by Design" type="tip">
        A well-designed bridge does as little logic as possible. Its job is translation,
        not decision-making. The more behavior a bridge accumulates, the harder it becomes
        to reason about what the agent is actually doing. Keep bridges thin, testable,
        and focused purely on the translation task.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'bp-1',
            difficulty: 'beginner',
            question: 'Why is it beneficial to separate the bridge from the agent rather than having the agent directly invoke IDE-specific APIs?',
            hint: 'Think about what changes when the IDE changes.',
            solution: 'If the agent calls IDE-specific APIs directly, every change in the IDE requires changing the agent. With a bridge, only the bridge needs updating. The agent remains stable while bridges for different environments can evolve independently. This also makes testing easier — the agent can be tested with a mock bridge that simulates an environment without a real IDE present.'
          },
          {
            id: 'bp-2',
            difficulty: 'intermediate',
            question: 'A bridge is said to be "thin by design." What risks arise when a bridge becomes thick — accumulating significant logic of its own?',
            hint: 'Consider where bugs would live and how testing would work.',
            solution: 'A thick bridge becomes a second agent — making decisions that should belong to the agent. Behavior becomes split across two places, making debugging difficult. Tests must now cover bridge logic separately, and subtle differences between what the agent intends and what the bridge executes can cause hard-to-trace errors. The agent loses full visibility into what is happening in the environment.'
          },
          {
            id: 'bp-3',
            difficulty: 'advanced',
            question: 'Design a minimal interface for an IDE bridge. What operations would it need to expose, and what properties should those operations have?',
            hint: 'Think about what an agent needs to understand and manipulate code.',
            solution: 'A minimal IDE bridge interface would expose: read file contents (given a path), write file contents, list directory structure, execute a command and return output, get cursor or selection position, and open/navigate to a location. Each operation should be synchronous from the agent\'s perspective, return explicit errors rather than silently failing, and avoid side-channel state that would make the bridge\'s behavior unpredictable.'
          }
        ]}
      />
    </div>
  );
}
