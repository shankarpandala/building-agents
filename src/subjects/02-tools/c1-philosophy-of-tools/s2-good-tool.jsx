import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function GoodTool() {
  return (
    <div className="prose-agents">
      <h2>What Makes a Good Tool</h2>
      <p>
        Not all tools are created equal. A poorly designed tool can confuse an agent, produce
        unreliable results, or create dangerous side effects that are difficult to reverse. A
        well-designed tool does the opposite: it is predictable, honest about its capabilities,
        and easy for the agent to reason about. The quality of a tool shapes the quality of
        every agent that uses it.
      </p>

      <PrincipleBlock title="Tools Should Do One Thing Well" number="Principle 2.1">
        A good tool has a single, clearly bounded responsibility. It does not try to be clever
        or combine multiple concerns. When a tool's scope is narrow and its behavior is
        predictable, the agent can reason about it accurately — including when not to use it.
        Overloaded tools breed confusion and error.
      </PrincipleBlock>

      <h3>The Properties That Matter</h3>
      <p>
        Good tools share a cluster of properties that make them trustworthy partners in the
        agent's reasoning loop:
      </p>
      <ul>
        <li>
          <strong>Clarity:</strong> The tool's name and description tell the agent exactly what
          it does and when to use it. There is no ambiguity about its purpose.
        </li>
        <li>
          <strong>Predictability:</strong> Given the same inputs, a good tool behaves
          consistently. The agent can build reliable mental models about its behavior.
        </li>
        <li>
          <strong>Honesty:</strong> A good tool accurately reports success, failure, and
          partial results. It does not silently swallow errors or return misleading outputs.
        </li>
        <li>
          <strong>Safety:</strong> A good tool makes it difficult to cause accidental harm.
          Destructive operations are clearly marked. Irreversible actions require confirmation.
        </li>
      </ul>

      <ConceptBlock title="Tool Trustworthiness" number="Concept 2.2">
        An agent's trust in a tool is built through consistent, honest behavior over time.
        A tool that sometimes silently fails, sometimes returns stale data, or sometimes
        interprets its inputs loosely destroys the agent's ability to reason reliably. Trust
        is not a nice-to-have — it is the foundation of the entire tool-agent relationship.
        Untrustworthy tools produce untrustworthy agents.
      </ConceptBlock>

      <h3>The Problem of Silent Failure</h3>
      <p>
        One of the most dangerous failure modes in tool design is silent failure: the tool
        appears to succeed but either did nothing or did something wrong. When a tool silently
        fails, the agent has no signal to reconsider its plan. It continues onward, building
        further actions on a false foundation. By the time the error surfaces — if it surfaces
        at all — the agent may be many steps deep into a broken workflow.
      </p>
      <p>
        Good tools fail loudly. They surface errors explicitly, describe what went wrong, and
        give the agent the information it needs to adapt. A loud failure is a recoverable
        failure. A silent one often is not.
      </p>

      <NoteBlock title="Honesty Over Convenience" type="tip">
        It can be tempting to design tools that "do their best" and return something even when
        the request cannot be properly fulfilled. Resist this temptation. An agent that receives
        a partial or fabricated result will reason as if it received a real one. Honest error
        reporting — even when it means returning nothing — is always the better choice.
      </NoteBlock>

      <ExerciseBlock
        title="Properties of Good Tools"
        exercises={[
          {
            id: 'gt-1',
            difficulty: 'beginner',
            question: 'Consider a tool called "get_data" that can search a database, read a file, or call an external API depending on a mode parameter. What problems might this cause for an agent trying to use it?',
            hint: 'Think about predictability and the mental model the agent needs to form.',
            solution: 'The agent must understand three different behaviors from one tool, which increases the risk of misuse. The mode parameter adds decision complexity. Error messages become ambiguous. The tool\'s description cannot be concise. Splitting into three separate, focused tools (search_database, read_file, call_api) is almost always superior.',
          },
          {
            id: 'gt-2',
            difficulty: 'intermediate',
            question: 'A tool is designed to send an email. When the recipient address is invalid, it silently discards the message and returns a success response. Trace the chain of problems this causes in an agent workflow.',
            hint: 'Follow the agent\'s reasoning after it believes the email was sent.',
            solution: 'The agent believes the email succeeded. It may mark the task complete, move to the next step, or report success to the user. The intended recipient never receives the message, but no one knows. The user may wait indefinitely for a reply. Debugging is extremely difficult because all logs show success. The fix is simple: return a clear error when the address is invalid.',
          },
          {
            id: 'gt-3',
            difficulty: 'advanced',
            question: 'How does the concept of "tool trustworthiness" relate to the reliability of agents built on top of those tools? Can a trustworthy agent be built from untrustworthy tools?',
            hint: 'Think about how errors propagate through a reasoning chain.',
            solution: 'No — agent reliability is bounded by the reliability of its tools. Each tool invocation is a point where external reality enters the agent\'s reasoning. If that entry point is noisy, inconsistent, or dishonest, all downstream reasoning is built on a flawed foundation. You can add error-handling logic, but you cannot fully compensate for a tool that lies about its outputs. Trustworthy agents require trustworthy tools as a prerequisite.',
          },
        ]}
      />
    </div>
  );
}
