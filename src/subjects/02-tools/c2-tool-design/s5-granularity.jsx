import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function Granularity() {
  return (
    <div className="prose-agents">
      <h2>Tool Granularity</h2>
      <p>
        One of the subtlest decisions in tool design is scope: how much should one tool do?
        A tool that does too little forces the agent to orchestrate many small steps to
        accomplish a simple goal. A tool that does too much removes the agent's ability to
        reason flexibly about what to do at each stage. Getting granularity right is the art
        of tool design — it requires understanding both the agent's cognitive process and the
        operational reality of the domain.
      </p>

      <ConceptBlock title="The Granularity Spectrum" number="Concept 2.9">
        Tools can be placed on a spectrum from fine-grained (small, single-purpose, composable)
        to coarse-grained (large, multi-step, opaque). Fine-grained tools give agents maximum
        flexibility but require more invocations and more coordination. Coarse-grained tools
        reduce invocation count but hide intermediate state from the agent, making error
        handling and adaptation harder. Neither extreme is universally correct — the right
        granularity depends on the task, the failure mode, and the agent's need for visibility.
      </ConceptBlock>

      <h3>The Cost of Too Fine</h3>
      <p>
        When tools are too granular, the agent must manage the coordination overhead. A task
        that could be accomplished in one call now requires a chain of five. Each link in that
        chain is a potential failure point. The agent must carry intermediate results across
        steps, track state between calls, and correctly sequence operations. This is not
        impossible — but it compounds risk and complexity in ways that often outweigh
        the benefits of flexibility.
      </p>

      <h3>The Cost of Too Coarse</h3>
      <p>
        When tools are too coarse-grained, the agent loses visibility into what happened.
        If a "process entire order" tool fails halfway through, the agent does not know which
        steps succeeded and which did not. It cannot partially retry, cannot report accurate
        status, and cannot adapt intelligently. Coarse tools are also harder to test, harder
        to reason about, and tend to accumulate complexity over time as new edge cases are
        folded in.
      </p>
      <p>
        Perhaps most importantly, coarse tools undermine the agent's reasoning loop. Agents
        are designed to plan, act, observe, and adapt. A tool that executes an opaque sequence
        of ten operations collapses this loop — the agent can no longer observe intermediate
        state and adapt accordingly. The tool makes decisions the agent should be making.
      </p>

      <PrincipleBlock title="Match Granularity to the Failure Surface" number="Principle 2.7">
        The right granularity for a tool is often determined by asking: "Where do failures
        happen, and does the agent need to respond differently to each one?" If every failure
        in a process requires the same response (abort and report), a coarser tool is fine.
        If different failures require different recovery strategies, the tool should be split
        at the points where the response strategy diverges — giving the agent a chance to
        observe what happened and decide what to do next.
      </PrincipleBlock>

      <NoteBlock title="The Goldilocks Principle of Tool Design" type="intuition">
        The best tools are not so small that the agent drowns in coordination, and not so
        large that the agent is blind to what happened. A useful heuristic: a tool should
        complete a logical unit of work that has a single, clear success condition and a
        small number of distinct failure modes. If you find yourself writing "and then it
        does X, and then Y, and then Z" in the description, consider splitting.
      </NoteBlock>

      <ExerciseBlock
        title="Tool Granularity Decisions"
        exercises={[
          {
            id: 'gr-1',
            difficulty: 'beginner',
            question: 'Consider an e-commerce agent that needs to: validate a coupon, calculate the discounted price, apply the discount to the cart, and record the coupon redemption. Should these be one tool or four? Argue both sides.',
            hint: 'Think about what happens if the tool fails midway, and whether the agent needs to respond differently to each failure.',
            solution: 'Case for one tool: it prevents partial application (discount applied but redemption not recorded), reduces invocation overhead, and the agent rarely needs to do these steps independently. Case for four tools: each step has distinct failure modes (coupon expired vs. discount calculation error vs. cart service down vs. database write failure), each failure warrants a different response, and separating them lets the agent observe and adapt. The answer depends on failure recovery needs: if partial application is dangerous, one atomic tool; if granular error handling matters, split them.',
          },
          {
            id: 'gr-2',
            difficulty: 'intermediate',
            question: 'An agent toolset has a "get_full_user_context" tool that fetches a user\'s profile, their recent orders, their open support tickets, and their subscription status — all in one call. What are the operational tradeoffs of this design versus four separate tools?',
            hint: 'Consider performance, failure handling, and what the agent actually needs in different workflow scenarios.',
            solution: 'Coarse design advantages: one round-trip, simpler agent orchestration, consistent data snapshot across all four sources. Coarse design disadvantages: if the agent only needs the subscription status, it still pays for everything. If orders fetch fails, the entire call fails even if profile and subscription are fine. The agent cannot retry individual failures. Fine-grained design advantages: fetch only what is needed, recover from partial failures independently, cache each result separately. Disadvantage: more round-trips, risk of data inconsistency across calls made at different times. The right design often ends up as a middle ground: one tool per logical entity (user_profile, order_history, etc.).',
          },
          {
            id: 'gr-3',
            difficulty: 'advanced',
            question: 'How does the intended autonomy level of the agent affect decisions about tool granularity? Should a high-autonomy agent (one that runs unsupervised for long periods) have coarser or finer tools than a low-autonomy agent (one that confirms each step with a human)?',
            hint: 'Think about how each agent handles failure and what information it needs to adapt without human guidance.',
            solution: 'High-autonomy agents generally need finer-grained tools, counterintuitively. Because they cannot ask a human when something goes wrong, they need maximum visibility into what happened at each step and maximum flexibility to choose a recovery strategy. Coarse tools fail opaquely, which is tolerable when a human can investigate — but catastrophic when the agent must self-recover. Low-autonomy agents, by contrast, can handle coarser tools more safely: when a tool fails, the agent can surface the ambiguity to the human for guidance. The human provides the recovery judgment the coarse tool cannot.',
          },
        ]}
      />
    </div>
  );
}
