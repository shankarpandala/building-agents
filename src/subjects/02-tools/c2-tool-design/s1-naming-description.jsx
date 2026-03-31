import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import NoteBlock from '../../../components/content/NoteBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function NamingDescription() {
  return (
    <div className="prose-agents">
      <h2>Naming and Describing Tools</h2>
      <p>
        An agent decides whether and how to use a tool primarily from its name and description.
        Unlike a human developer who can explore documentation, run experiments, and ask for
        help, an agent must infer the full contract of a tool from the words given to it at
        invocation time. This makes naming and description the most consequential design
        decisions in tool creation.
      </p>

      <PrincipleBlock title="Names Are Contracts in Miniature" number="Principle 2.3">
        A tool's name is the first thing an agent sees and the most memorable signal it carries.
        A good name communicates the tool's action and its target in a few words — enough that
        the agent can form an accurate mental model before reading a single word of description.
        A bad name forces the agent to rely entirely on the description — and descriptions are
        frequently incomplete.
      </PrincipleBlock>

      <h3>Anatomy of a Good Tool Name</h3>
      <p>
        Strong tool names follow a consistent pattern: a verb that describes what the tool does,
        followed by a noun that describes what it acts on. This pattern makes the tool's purpose
        immediately clear and allows agents to distinguish between related tools without confusion.
      </p>
      <ul>
        <li><strong>Action-first:</strong> Start with the verb — fetch, search, create, update, delete, send, list.</li>
        <li><strong>Specific nouns:</strong> "get_user_profile" is better than "get_user" — it tells the agent what specifically it retrieves.</li>
        <li><strong>Avoid ambiguity:</strong> "process_data" tells the agent almost nothing. "transform_csv_to_json" tells it exactly what happens.</li>
        <li><strong>Consistent conventions:</strong> If most tools use snake_case, all should. Inconsistency increases cognitive load on the agent.</li>
      </ul>

      <ConceptBlock title="The Description's Job" number="Concept 2.5">
        A tool's description has two responsibilities: it must explain what the tool does when
        things go right, and it must explain what the tool does when things go wrong. Descriptions
        that only cover the happy path leave the agent without guidance for the majority of
        real-world situations, which rarely go exactly as planned. A description should be a
        concise but complete specification, not a marketing statement.
      </ConceptBlock>

      <h3>What a Good Description Includes</h3>
      <p>
        A useful tool description answers these questions explicitly:
      </p>
      <ul>
        <li>What does this tool do in plain terms?</li>
        <li>When should an agent prefer this tool over alternatives?</li>
        <li>What are the important constraints on its use?</li>
        <li>What does it return on success?</li>
        <li>What does it return (or what error does it raise) on failure?</li>
      </ul>
      <p>
        Descriptions that read like bureaucratic documentation — covering everything vaguely and
        nothing specifically — are worse than shorter descriptions that cover the essential cases
        precisely. Agents do not benefit from length; they benefit from clarity.
      </p>

      <NoteBlock title="Descriptions Are Read at Decision Time" type="tip">
        The agent reads a tool's description when it is deciding whether to call that tool.
        Every word the agent must parse is cognitive overhead. Write descriptions that are dense
        with useful signal, not padded with phrases like "this tool is designed to allow you to..."
        Get to the point immediately: what it does, when to use it, and what to expect.
      </NoteBlock>

      <ExerciseBlock
        title="Naming and Describing Tools"
        exercises={[
          {
            id: 'nd-1',
            difficulty: 'beginner',
            question: 'Rank these tool names from best to worst and explain your reasoning: "do_thing", "process", "send_invoice_email", "email_tool", "communicate".',
            hint: 'Evaluate each name on: does it convey the action, the target, and the scope?',
            solution: 'Best to worst: (1) "send_invoice_email" — precise verb, precise noun, clear scope. (2) "email_tool" — identifies the domain but lacks an action. (3) "communicate" — too vague: is it email? SMS? Chat? (4) "process" — completely undescribed action with no target. (5) "do_thing" — conveys nothing at all.',
          },
          {
            id: 'nd-2',
            difficulty: 'intermediate',
            question: 'Write a two-sentence description for a tool that searches a product catalog by keyword. The first sentence should cover the happy path; the second should cover what happens when no results are found or the query is invalid.',
            hint: 'The happy path needs to specify what is returned. The failure path needs to specify what signal the agent receives.',
            solution: 'Example: "Searches the product catalog and returns a list of matching items including name, SKU, price, and availability, ordered by relevance. Returns an empty list when no products match the query; returns an error if the query string is blank or exceeds 200 characters."',
          },
          {
            id: 'nd-3',
            difficulty: 'advanced',
            question: 'An agent toolset has these two tools: "get_record" and "fetch_data". Both retrieve information from different sources. What problems does this naming create, and how would you fix it?',
            hint: 'Think about how the agent must distinguish between them and what information it lacks.',
            solution: 'The agent cannot tell from the names alone what source each tool accesses, what kind of record or data is involved, or when to prefer one over the other. Both names are ambiguous. Fixes: rename to reflect both the action and the target source — for example, "get_customer_profile_from_crm" and "fetch_transaction_log_from_warehouse". The agent can now make accurate tool-selection decisions without having to memorize descriptions.',
          },
        ]}
      />
    </div>
  );
}
