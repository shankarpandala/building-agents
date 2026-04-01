import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import AnalogyBlock from '../../../components/content/AnalogyBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function SequentialComposition() {
  return (
    <div className="prose-agents">
      <h2>Sequential Tool Composition</h2>
      <p>
        Most agent tasks cannot be accomplished with a single tool call. They require a
        sequence of steps: gather information, process it, act on the result, verify the
        outcome. Sequential composition is the pattern of chaining tool invocations one
        after another, where each step's output informs the next step's input. It is the
        fundamental building block of agent workflows.
      </p>

      <ConceptBlock title="Sequential Composition" number="Concept 2.11">
        Sequential composition is the arrangement of tool calls into an ordered sequence
        where the agent completes one invocation, observes the result, updates its internal
        state, and then decides what to invoke next. Unlike a fixed pipeline, sequential
        composition is agent-directed: the agent chooses each next step based on what it
        has learned so far. This adaptive sequencing is what distinguishes an intelligent
        agent from a rigid script.
      </ConceptBlock>

      <h3>The Observe-Decide Loop</h3>
      <p>
        At the heart of sequential composition is a loop: the agent observes the result
        of one tool call, reasons about what it means, and decides whether to continue,
        branch, retry, or stop. This loop is the mechanism by which agents adapt to
        reality. Each tool call is not just a computation — it is a query to the world
        that updates the agent's beliefs and informs its next decision.
      </p>
      <p>
        The quality of sequential composition depends on how well the agent uses each
        observation. An agent that ignores partial results, fails to propagate important
        context across steps, or does not adjust its plan when tool outputs are unexpected
        is not truly composing sequentially — it is just executing a fixed script with
        extra steps.
      </p>

      <AnalogyBlock title="The Detective's Investigation">
        A detective does not arrive at a crime scene with a fixed list of people to arrest.
        They gather evidence, form a hypothesis, gather more evidence that confirms or
        challenges that hypothesis, revise, and eventually reach a conclusion. Each clue
        gathered changes what they look for next. Sequential composition works the same way:
        the agent forms a goal, gathers the first piece of relevant information, and lets
        what it learns shape every subsequent step. The investigation adapts to reality.
      </AnalogyBlock>

      <PrincipleBlock title="Each Step Should Justify the Next" number="Principle 2.9">
        In a well-composed sequence, every tool invocation either directly accomplishes
        part of the goal or provides information necessary to plan the next step. If an
        agent is invoking a tool and cannot clearly articulate how the result will inform
        or advance the task, that invocation is likely unnecessary. Purposeless tool calls
        waste capacity and introduce noise into the agent's reasoning context.
      </PrincipleBlock>

      <h3>Managing State Across Steps</h3>
      <p>
        Sequential composition requires the agent to carry state across steps. Information
        retrieved in step one must be available in step three. Errors encountered in step
        two must influence whether step three runs at all. This state management is often
        where sequential composition breaks down: earlier context is forgotten, error signals
        are not propagated, or the agent loses track of what it was originally trying to do.
      </p>
      <p>
        Effective sequential composition requires explicit attention to what information is
        load-bearing across steps — what the agent absolutely must not lose between invocations.
        Design workflows so that critical identifiers, permissions, and observations are
        surfaced at each step rather than assumed to be retained.
      </p>

      <ExerciseBlock
        title="Sequential Composition"
        exercises={[
          {
            id: 'sq-1',
            difficulty: 'beginner',
            question: 'An agent must accomplish this goal: "Find the most recent support ticket for customer ID 4821, and update its priority to high." Describe the sequence of tool calls needed and what information must be carried from step to step.',
            hint: 'What does the agent need to know before it can call the update tool?',
            solution: 'Step 1: call "get_support_tickets_by_customer(customer_id=4821, sort=recent)" to find all tickets. Step 2: examine the results to identify the most recent ticket ID — this is the critical piece of state to carry forward. Step 3: call "update_ticket_priority(ticket_id=<result from step 2>, priority=high)". The ticket ID is the load-bearing state that bridges the two steps. Without explicitly tracking it, step 3 cannot proceed correctly.',
          },
          {
            id: 'sq-2',
            difficulty: 'intermediate',
            question: 'An agent is in the middle of a five-step workflow. Step 3 returns an unexpected but valid result: the record the agent was looking for does not exist. How should a well-designed sequential composition handle this, versus how a poorly designed one would?',
            hint: 'Think about what "observe and adapt" means in practice when reality does not match expectations.',
            solution: 'Well-designed: the agent treats the "not found" as a signal, not an error. It pauses to assess: Was the ID correct? Should it search by other criteria? Should it create the record? It updates its plan based on what it learned and branches to the appropriate next action. Poorly designed: the agent either stops with an error, or worse, continues as if the record exists — passing a null or placeholder into step 4, which corrupts the rest of the workflow. The key difference is whether the agent treats each result as informative and plan-shaping, or as something to silently handle and continue past.',
          },
          {
            id: 'sq-3',
            difficulty: 'advanced',
            question: 'How does context window limitation affect sequential composition, and what design strategies can mitigate this problem for long agent workflows?',
            hint: 'Consider what happens to earlier tool results as the workflow grows longer.',
            solution: 'As a sequential workflow grows longer, earlier tool results are pushed further back in the agent\'s context and may become truncated or effectively invisible to the agent\'s reasoning. The agent may "forget" critical state from early steps. Mitigation strategies include: (1) Summarization — after each step, distilling results into a compact working memory that captures only the load-bearing information. (2) Anchoring — periodically restating the original goal and key accumulated facts. (3) Workflow structuring — breaking long workflows into bounded sub-goals, each with their own compact context. (4) Explicit handoff artifacts — having the agent write key state to an external scratchpad tool that can be re-read as needed, rather than relying on context alone.',
          },
        ]}
      />
    </div>
  );
}
