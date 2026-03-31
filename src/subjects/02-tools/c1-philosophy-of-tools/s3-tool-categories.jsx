import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function ToolCategories() {
  return (
    <div className="prose-agents">
      <h2>Categories of Tools</h2>
      <p>
        Tools are not a monolithic category. They differ dramatically in what they do, what
        they touch, and what risks they carry. Understanding the natural categories of tools
        helps agents — and their designers — reason about which tools are appropriate in a
        given context, and what safeguards each category demands.
      </p>

      <ConceptBlock title="Read vs. Write Tools" number="Concept 2.3">
        The most fundamental distinction in tool classification is between tools that observe
        the world and tools that change it. Read tools retrieve information without side effects —
        they are inherently safer to invoke speculatively. Write tools modify state — files,
        databases, messages, external services — and carry real-world consequences. This
        distinction determines how much caution an agent should exercise before invoking a tool.
      </ConceptBlock>

      <h3>A Taxonomy of Tool Categories</h3>
      <ul>
        <li>
          <strong>Information retrieval:</strong> Fetch facts, data, or documents from external
          sources. These are read-only and safe to retry. Examples: web search, database queries,
          file reads, API lookups.
        </li>
        <li>
          <strong>Computation:</strong> Perform calculations or transformations that the agent
          cannot reliably do through language alone. These are deterministic and side-effect-free.
          Examples: arithmetic, unit conversion, data parsing, regex matching.
        </li>
        <li>
          <strong>State mutation:</strong> Create, update, or delete persistent state somewhere
          in the world. These are consequential and often irreversible. Examples: writing files,
          inserting database records, updating configuration.
        </li>
        <li>
          <strong>Communication:</strong> Send messages or notifications to other agents,
          systems, or people. Once sent, these cannot be unsent. Examples: email, webhooks,
          push notifications, API calls that trigger downstream processes.
        </li>
        <li>
          <strong>Delegation:</strong> Hand off a task to another agent or subprocess. These
          tools multiply the agent's capabilities but also amplify any errors in its judgment.
          Examples: spawning subagents, calling specialized models, invoking pipelines.
        </li>
      </ul>

      <h3>Why Categories Shape Risk</h3>
      <p>
        Each category carries a different risk profile. Information retrieval tools can be
        retried freely — if one fails, the agent asks again. Computation tools are deterministic
        and reversible in effect (the world is unchanged). But state mutation and communication
        tools carry lasting consequences. A mistaken file deletion or a prematurely sent email
        cannot be automatically undone.
      </p>
      <p>
        Agents should apply proportional caution: more deliberation before write operations,
        explicit confirmation before irreversible communication, and careful scoping before
        delegation. The category a tool belongs to is a signal about the level of care required
        before invoking it.
      </p>

      <NoteBlock title="Reversibility as a First Principle" type="intuition">
        When evaluating how carefully to use a tool, ask: "If this invocation is wrong, can it
        be undone?" Read tools can always be retried. Computation leaves no mark. But writes and
        sends are often permanent. Reversibility is not the only consideration, but it is the
        most important one for calibrating an agent's caution before it acts.
      </NoteBlock>

      <ExerciseBlock
        title="Tool Categories in Practice"
        exercises={[
          {
            id: 'tc-1',
            difficulty: 'beginner',
            question: 'Classify each of the following tools into one of the five categories: (a) a tool that looks up a customer record by ID, (b) a tool that converts a temperature from Celsius to Fahrenheit, (c) a tool that posts a message to a Slack channel, (d) a tool that assigns a sub-task to a specialized research agent.',
            hint: 'Focus on whether each tool reads, computes, mutates, communicates, or delegates.',
            solution: '(a) Information retrieval — reads a record without side effects. (b) Computation — deterministic transformation with no side effects. (c) Communication — sends an irreversible message to external parties. (d) Delegation — hands off work to another agent.',
          },
          {
            id: 'tc-2',
            difficulty: 'intermediate',
            question: 'An agent has both a "search_web" tool and a "send_email" tool. A user asks it to "research the top competitors and send me a summary." Why might the agent treat these two tools very differently, even within a single workflow?',
            hint: 'Consider what happens if the agent makes a mistake with each tool.',
            solution: 'A mistake with search_web is harmless — the agent can retry with different terms, and no external state is changed. A mistake with send_email cannot be undone. The agent should invest more care in verifying the email content is accurate and complete before sending. It might also want to confirm with the user before committing to the irreversible communication step.',
          },
          {
            id: 'tc-3',
            difficulty: 'advanced',
            question: 'Delegation tools are described as both capability-multiplying and error-amplifying. Explain what this means and how an agent designer should account for it.',
            hint: 'Think about how a wrong premise passed to a subagent compounds through that subagent\'s actions.',
            solution: 'Delegation multiplies capability because the subagent can do things the parent cannot do alone. But if the parent agent passes incorrect context or a flawed instruction, the subagent acts on that flaw — potentially taking many consequential actions before the error surfaces. The wrong premise is amplified through all downstream tool calls the subagent makes. Designers should ensure delegation tools include clear scope boundaries, require explicit task descriptions, and surface subagent outcomes back to the parent for review before irreversible consequences are triggered.',
          },
        ]}
      />
    </div>
  );
}
