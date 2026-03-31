import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function MeasureTwice() {
  return (
    <div className="prose-agents">
      <h2>Measure Twice, Cut Once</h2>
      <p>
        Speed is often celebrated in autonomous systems. An agent that acts quickly
        feels responsive, capable, efficient. But speed without verification is
        recklessness. The most dangerous agent is not the slow one — it is the fast
        one that is confidently wrong. Before taking any action with significant
        consequences, an agent should verify its understanding, confirm its plan,
        and only then execute. The brief pause for confirmation is not overhead.
        It is the mechanism that prevents catastrophe.
      </p>

      <ConceptBlock title="Confirmation Before Irreversible Action" number="Concept 12.13">
        The measure-twice principle requires that before an agent executes an action
        that cannot be easily undone, it performs a verification step. This may mean
        presenting a plan to the user for approval, double-checking that the target
        of the action matches what was intended, or validating preconditions before
        proceeding. The key insight is that not all actions are equal: reading a file
        is trivially reversible (just stop reading), but deleting a database table
        is not. The level of caution should be proportional to the irreversibility
        of the action.
      </ConceptBlock>

      <AnalogyBlock title="The Demolition Protocol">
        Before a building is demolished, engineers verify the address, confirm the
        permits, check that adjacent structures will not be affected, ensure the
        area is evacuated, and review the demolition plan one final time. No one
        considers this excessive. The irreversibility of demolition demands it. An
        agent about to execute a destructive or irreversible operation should follow
        the same graduated protocol: the more permanent the action, the more
        verification it warrants.
      </AnalogyBlock>

      <p>
        Many production incidents involving agents share a common structure: the
        agent was given a correct request, interpreted it correctly, formulated a
        correct plan — and then executed it against the wrong target. The plan was
        right but the context was wrong. A verification step — confirming the
        target, checking the environment, validating that preconditions hold —
        catches exactly this class of error.
      </p>

      <PrincipleBlock title="Caution Is Strength, Not Weakness" number="Principle 12.9">
        An agent that pauses before irreversible actions is not slow or timid. It
        is disciplined. Speed matters for reversible operations where mistakes are
        cheap to fix. For irreversible operations, the only thing that matters is
        correctness. A system that executes irreversible actions quickly and
        incorrectly creates damage that no amount of subsequent speed can repair.
        Building in verification for high-stakes actions is engineering maturity,
        not excessive caution.
      </PrincipleBlock>

      <WarningBlock title="The Wrong-Environment Problem">
        One of the most common catastrophic agent errors is executing the right
        action in the wrong environment — running a destructive operation against
        a production system when it was meant for a test system. Verification
        steps that explicitly confirm the target environment before destructive
        actions are not optional safeguards. They are load-bearing components
        of a safe system.
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'mt-1',
            difficulty: 'beginner',
            question: 'What makes an action "irreversible" in the context of agent systems? Give three examples of irreversible actions and three examples of easily reversible ones.',
            hint: 'Think about whether the state before the action can be fully restored after it.',
            solution: 'An action is irreversible if the state it changes cannot be fully restored to its prior condition, or if restoration would be prohibitively expensive. Irreversible examples: (1) Deleting records from a database without a backup. (2) Sending a message or notification to external users. (3) Publishing content to a public-facing system. Reversible examples: (1) Reading a file — no state is changed. (2) Creating a draft document — it can be deleted. (3) Adding an item to a list — it can be removed. The key distinction is not whether an action changes state, but whether the prior state can be recovered cheaply and completely.'
          },
          {
            id: 'mt-2',
            difficulty: 'intermediate',
            question: 'Design a graduated verification system where the level of confirmation required scales with the irreversibility of the action. What levels would you define, and what actions would fall into each?',
            hint: 'Think about a spectrum from "no confirmation needed" to "multiple confirmations required."',
            solution: 'Graduated levels: (1) No confirmation — fully reversible, read-only operations. The agent proceeds immediately. Examples: reading files, searching data, listing resources. (2) Implicit confirmation — low-risk state changes that are easily reversible. The agent announces what it will do and proceeds unless stopped. Examples: creating a draft, writing to a staging environment, adding a comment. (3) Explicit confirmation — moderate-risk changes that are costly to reverse. The agent presents its plan and waits for user approval before executing. Examples: modifying configuration, updating records, deploying to a non-production environment. (4) Enhanced confirmation — high-risk, irreversible actions. The agent presents the plan, explicitly names the target and consequences, and requires the user to confirm with specifics (not just "yes" but confirming the target name). Examples: deleting data, sending to external users, deploying to production. (5) Requires human execution — actions so consequential that the agent should only prepare the plan, not execute it. Examples: financial transactions above a threshold, actions affecting many users simultaneously.'
          },
          {
            id: 'mt-3',
            difficulty: 'advanced',
            question: 'A team argues that requiring confirmation for destructive actions slows the agent down and defeats the purpose of automation. How would you respond, and how would you design a system that satisfies both safety and efficiency concerns?',
            hint: 'Think about where the real time cost is and what kinds of confirmation can be pre-authorized.',
            solution: 'Response to the objection: The purpose of automation is to reliably produce correct outcomes, not to produce outcomes quickly. An agent that is fast but occasionally destroys the wrong data is not efficient — it is a liability. The time spent on confirmation is measured in seconds; the time spent recovering from an irreversible mistake is measured in hours or days. That said, the system can be designed to minimize friction: (1) Pre-authorization — for routine destructive operations with well-defined parameters (e.g., deleting temp files older than 30 days), the user can pre-authorize the pattern once. The agent confirms against the pattern, not the user. (2) Batched confirmation — instead of confirming each action individually, the agent presents a batch plan ("I will perform these 15 deletions") for a single approval. (3) Dry-run mode — the agent executes a dry run that shows what would happen without actually doing it, then requests a single confirmation to proceed. (4) Confidence-based gating — if the agent is highly confident in the target and parameters (exact match to a known pattern), it proceeds with lighter confirmation. Novel or unusual targets trigger heavier confirmation. This satisfies safety without creating unnecessary friction for routine operations.'
          }
        ]}
      />
    </div>
  );
}
