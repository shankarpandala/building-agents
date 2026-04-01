import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ScopingCapabilities() {
  return (
    <div className="prose-agents">
      <h2>Scoping Sub-Agent Capabilities</h2>
      <p>
        Every sub-agent is equipped with tools and permissions at the moment it is created.
        Choosing which tools to give a sub-agent is not a minor implementation detail — it
        determines what the sub-agent can do, what it cannot do, and what damage it can cause
        if it reasons incorrectly. Capability scoping is a safety and design decision in equal
        measure.
      </p>

      <ConceptBlock title="Capability Scoping" number="Concept 7.6">
        Capability scoping is the deliberate restriction of a sub-agent's tools and permissions
        to only those required for its assigned task. A sub-agent that only needs to read a
        database should not have write permissions. One that only needs to search the web should
        not have access to the file system. Narrowing the capability set reduces the blast radius
        of mistakes and makes the sub-agent's behaviour easier to predict and audit.
      </ConceptBlock>

      <p>
        Two principles drive capability scoping. The first is the <em>principle of least
        privilege</em>: grant only what is needed for the task at hand. The second is
        <em> clarity of purpose</em>: a tightly scoped tool set shapes the sub-agent's
        behaviour. An agent that can only search and summarise will not be tempted to start
        writing files. The constraints in the tool set reinforce the constraints in the prompt.
      </p>

      <PrincipleBlock title="Tools as Implicit Permissions" number="Principle 7.4">
        Every tool granted to a sub-agent is an implicit permission. Granting a tool says
        "this agent is allowed to do this." Granting a destructive tool without need is not
        just wasteful — it is a signal that the scoping was not carefully considered.
        Tool grants should be as deliberate as permission grants in any other security-conscious
        system.
      </PrincipleBlock>

      <WarningBlock title="The Temptation of the Full Toolkit">
        A common mistake is to give every sub-agent the same comprehensive tool set "just in
        case." This eliminates the safety benefit of scoping, makes sub-agent behaviour harder
        to predict, and increases the surface area for errors. Sub-agents with broad capabilities
        sometimes use tools that were not intended for their task — not because they are
        misbehaving, but because those tools appeared relevant to their reasoning.
      </WarningBlock>

      <ExerciseBlock
        title="Scoping Capabilities Correctly"
        exercises={[
          {
            id: 'sc-1',
            difficulty: 'beginner',
            question: 'A sub-agent\'s task is to summarise five web pages. List the tools it needs and the tools it should explicitly not have. Justify each exclusion.',
            hint: 'Think about what actions the task requires versus what actions could cause unintended side effects.',
            solution: 'Needs: web fetch/browser tool (to retrieve page content), text processing or summarisation capability. Should not have: file write tools (no need to persist output directly), database access (irrelevant to the task), email or notification tools (no communication needed), code execution (summarisation is language-only). Each exclusion prevents a category of unintended action.',
          },
          {
            id: 'sc-2',
            difficulty: 'intermediate',
            question: 'A sub-agent is assigned to validate a set of configuration files and report any errors. During validation it discovers the files contain what looks like a security vulnerability. With a read-only tool set, what happens? Is that the right outcome?',
            hint: 'Consider the difference between reporting and acting, and whether the sub-agent should fix or flag.',
            solution: 'With a read-only tool set, the sub-agent can only report the vulnerability — it cannot fix it. This is the correct outcome: fixing a security vulnerability is a consequential action that should go through the orchestrator and likely require human review. A sub-agent with write permissions might attempt an automated fix that inadvertently breaks other configurations. Read-only scoping forces the decision back to the appropriate authority level.',
          },
          {
            id: 'sc-3',
            difficulty: 'advanced',
            question: 'Design a capability tiering model for sub-agents in a content publishing workflow. Define three tiers (read-only, write-draft, publish) and specify which tasks belong in each tier and why.',
            hint: 'Think about the reversibility and blast radius of each tier\'s actions.',
            solution: 'Tier 1 (read-only): research agents, fact-checkers, content auditors — their mistakes are costless because no state changes. Tier 2 (write-draft): copywriters, editors — they can create and modify draft content but cannot publish. Errors are recoverable; a human or reviewer agent can catch problems before they go live. Tier 3 (publish): the final publishing agent — should be narrow in scope, only able to mark content as published after receiving explicit approval signal. The progression from tier to tier mirrors increasing irreversibility of action.',
          },
        ]}
      />
    </div>
  );
}
