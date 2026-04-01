import ConceptBlock from '../../../components/content/ConceptBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function HallucinationDrift() {
  return (
    <div className="prose-agents">
      <h2>Hallucination and Drift</h2>
      <p>
        Two failure modes characterize grounding problems in agents: hallucination, which is the
        production of false information presented as fact, and drift, which is the gradual departure
        from the original goal or constraints over many loop iterations. Both are rooted in the
        language–action gap, but they manifest differently and require different mitigations.
        Together, they represent some of the most practically significant risks in deployed agent
        systems.
      </p>

      <ConceptBlock title="Hallucination in Agents" number="3.4a">
        <p>
          Hallucination occurs when an agent produces information that is factually incorrect,
          unverifiable, or fabricated — but expressed with the same fluency and apparent confidence
          as accurate information. In a single-turn assistant, hallucination produces a wrong answer.
          In an agent loop, hallucination in an early step produces a wrong <em>action</em>, which
          produces wrong observations, which ground further wrong actions. The compounding effect
          makes hallucination significantly more dangerous in agentic contexts than in conversational
          ones.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Goal Drift in Agents" number="3.4b">
        <p>
          Goal drift occurs when an agent's behavior gradually diverges from the original task intent
          over many iterations. The agent may produce correct actions in each individual step, but
          the cumulative effect of small re-interpretations, scope expansions, or attentional shifts
          carries it far from the original goal. Drift is insidious because no single step is
          obviously wrong — the problem is the trajectory, not any individual action.
        </p>
      </ConceptBlock>

      <p>
        Hallucination has two proximate causes in agent contexts. First, the agent reasons from
        a premise it believes to be true but which is actually a confabulation from training — a
        plausible-sounding but invented fact. Second, the agent fills in gaps in its observations
        with inferences rather than acknowledging uncertainty — it assumes rather than checks. The
        cure for both is the same: design agents to distinguish explicitly between what they know
        from context versus what they are inferring, and to treat inferences as hypotheses requiring
        verification rather than facts to act on.
      </p>

      <WarningBlock title="Drift is hard to see from inside the loop">
        <p>
          A drifting agent does not experience itself as drifting — each step seems like a
          reasonable response to the current situation. It is only from the outside, comparing the
          agent's current activity to the original goal, that the divergence becomes visible. This
          is why external oversight is not optional in long-running agent tasks: the agent cannot
          reliably self-monitor for drift because it loses its reference frame as the loop
          progresses.
        </p>
      </WarningBlock>

      <p>
        Goal drift is often triggered by two patterns. <strong>Scope creep</strong> happens when
        the agent encounters a related problem it was not asked to solve and begins addressing it
        anyway — often because it seems useful or because the original task's edges are fuzzy.
        <strong> Proxy substitution</strong> happens when the original goal becomes hard to achieve
        and the agent shifts toward a measurable proxy — something that looks like progress but
        does not actually advance the real goal. Both can be mitigated by periodically re-anchoring
        the agent to the original task statement.
      </p>

      <NoteBlock title="Re-grounding as a loop component" type="tip">
        <p>
          For long-running agents, add an explicit re-grounding step to the loop: periodically
          have the agent compare its current activity to the original goal and ask whether it is
          still on track. This is especially important after any unexpected observation or change
          of direction. The cost is small; the benefit of catching drift early is large.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex13-1',
            difficulty: 'beginner',
            question: 'An agent is asked to "schedule a team lunch for next Friday." In its first step, it hallucinates that one team member is unavailable on Fridays (because it seems plausible for that person\'s role). How does this single hallucination potentially affect the rest of the task?',
            hint: 'Trace the downstream effects: what actions does the agent take next, and how do they build on the hallucinated fact?',
            solution: 'The agent, believing the team member is unavailable Friday, may: search for Thursday availability instead, find a time that works for everyone on Thursday, book the restaurant for Thursday, and send invitations for Thursday. The original request was for Friday. The entire downstream task is built on a false premise. This illustrates how a single hallucination in step one propagates cleanly through all subsequent steps — each step is "correct" given the premise, but the premise is wrong. The fix: the agent should retrieve actual calendar data before assuming any individual\'s availability rather than inferring it.'
          },
          {
            id: 'ex13-2',
            difficulty: 'intermediate',
            question: 'An agent starts with the goal "clean up the project\'s documentation." After 20 loop iterations, it is reorganizing the file system structure, adding new documentation pages that were never mentioned, and updating code comments. Describe the drift that occurred and identify at what point each form of drift began.',
            hint: 'Trace which steps are within scope, which are expansions of scope, and which have left the original goal behind entirely.',
            solution: 'The original goal — clean up documentation — has scope. Likely drift progression: (1) Iterations 1-8: fixing typos, improving clarity — on target. (2) Iterations 9-12: reorganizing documentation files into better folders — border case; reorganization was implied by "clean up" but is a higher-impact change than fixing prose. (3) Iterations 13-16: adding new documentation that was missing — scope creep; "clean up" does not mean "add new content," but the agent reasoned that it would be helpful. (4) Iterations 17-20: updating code comments — well outside scope; this is a different type of artifact entirely. The agent followed a chain of locally reasonable decisions but lost its reference frame. Re-grounding after iterations 8 and 13 would likely have caught the drift.'
          },
          {
            id: 'ex13-3',
            difficulty: 'advanced',
            question: 'Design a hallucination detection strategy for an agent that produces research reports. The agent searches the web, reads sources, and synthesizes findings. At what points in this process is hallucination risk highest, and what specific checks would you build into the agent loop at each high-risk point?',
            hint: 'Consider the transition points where information moves from one form to another — these are where confabulation tends to occur.',
            solution: 'High-risk points and checks: (1) Query formation — the agent may generate search queries based on assumptions rather than facts. Check: have the agent state its assumptions explicitly before searching, making them visible for verification. (2) Source interpretation — when reading a retrieved document, the agent may fill gaps or extend claims beyond what the source says. Check: require the agent to quote the source directly rather than paraphrasing for any specific factual claim. (3) Cross-source synthesis — combining claims from multiple sources creates opportunities for fabricating connections that were never stated. Check: require citations for every synthesized claim, and include a verification step where the agent re-reads sources for any claim marked as uncertain. (4) Summary generation — compressing findings into a report narrative involves the highest hallucination risk, as the agent generates new text at length. Check: run a verification pass where the agent reads the draft and highlights any claim it cannot trace back to a specific source; those claims are flagged for human review or removed. (5) Confidence calibration — build in explicit uncertainty notation, so claims with weaker source support are flagged differently from claims directly stated in authoritative sources.'
          }
        ]}
      />
    </div>
  )
}
