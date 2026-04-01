import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function PermissionDelegation() {
  return (
    <div className="prose-agents">
      <h2>Permission Delegation</h2>
      <p>
        An IDE integration gives an agent access to sensitive resources: source code,
        configuration files, terminal commands, and build systems. Deciding what the agent
        is allowed to do — and who decides — is one of the most important design questions
        in IDE integration.
      </p>

      <ConceptBlock title="Permission Delegation" number="Concept 11.2">
        Permission delegation is the mechanism by which a human operator grants the agent
        a scoped set of capabilities within their environment. The human retains ultimate
        authority but temporarily delegates specific rights — such as read access to a
        directory, or the ability to run tests — to the agent for the duration of a task.
      </ConceptBlock>

      <p>
        The key word is <em>scoped</em>. Granting an agent total access to everything
        in the environment is almost never necessary and carries real risk. Instead, the
        agent should receive only the permissions required for the current task. A code
        review agent needs read access; it does not need write access. A test runner
        needs to execute tests; it does not need to modify source files.
      </p>

      <WarningBlock title="Ambient Authority is Dangerous">
        When an agent automatically inherits all the permissions of the user who launched it,
        this is called ambient authority. It means the agent can do anything the user can do —
        delete production data, push to main, or send emails. Most tasks require far less than
        this. Scoping permissions explicitly prevents accidental or malicious overreach.
      </WarningBlock>

      <NoteBlock title="Delegation Is Revocable" type="note">
        Good permission systems allow the operator to revoke delegated rights at any time —
        not just at the end of a task. If the agent's behavior becomes unexpected, the human
        should be able to instantly withdraw access without waiting for the task to complete.
        Revocability is a critical safety property.
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'pd-1',
            difficulty: 'beginner',
            question: 'What is the principle of least privilege and why does it apply directly to IDE integrations?',
            hint: 'Think about what "minimum necessary access" means in the context of code and files.',
            solution: 'The principle of least privilege states that a system should be granted only the minimum permissions required to accomplish its current task. In IDE integrations, this means an agent should not automatically have access to every file, command, and service available to the developer. Scoped permissions reduce the blast radius if the agent makes a mistake or behaves unexpectedly — it cannot damage what it cannot access.'
          },
          {
            id: 'pd-2',
            difficulty: 'intermediate',
            question: 'A developer launches an agent to write documentation for a module. List the permissions the agent needs and the permissions it explicitly should not have.',
            hint: 'Map the task to its actual resource requirements.',
            solution: 'The agent needs: read access to the source files in the target module, write access to the documentation output location, and perhaps read access to existing docs for style reference. It should not have: write access to source files, terminal execution rights, access to secrets or environment variables, access to other modules, or network access. The task is documentation — nothing else is required.'
          },
          {
            id: 'pd-3',
            difficulty: 'advanced',
            question: 'How should a permission system handle an agent that requests additional permissions mid-task because it discovers the original scope was insufficient?',
            hint: 'Think about trust, transparency, and the human in the loop.',
            solution: 'The agent should surface a clear, explicit request explaining what additional permission it needs and why. The human then decides whether to grant it. The agent should not acquire additional access silently or work around the scope limit. This creates an auditable trail of what the agent accessed and provides the human with checkpoints for oversight. The system should make these requests easy to understand and approve or deny.'
          }
        ]}
      />
    </div>
  );
}
