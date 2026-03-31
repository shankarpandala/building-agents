import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock';
import PrincipleBlock from '../../../components/content/PrincipleBlock';
import WarningBlock from '../../../components/content/WarningBlock';
import ExerciseBlock from '../../../components/content/ExerciseBlock';

export default function InputSchemas() {
  return (
    <div className="prose-agents">
      <h2>Designing Input Schemas</h2>
      <p>
        A tool's input schema is the formal specification of what the tool expects to receive.
        For agents, this schema serves as both a guide and a guardrail: it tells the agent how
        to construct a valid invocation, and it prevents malformed inputs from reaching the
        tool's internals. Schema design is one of the most precision-sensitive tasks in tool
        engineering — small choices here have large consequences downstream.
      </p>

      <ConceptBlock title="Schemas as Executable Contracts" number="Concept 2.6">
        Unlike a description, which is prose that the agent reads and interprets, an input schema
        is a formal structure that is enforced at runtime. If the agent provides the wrong type
        or omits a required field, the schema rejects the call before execution begins. This
        makes schemas the last line of defense against malformed invocations — and the first
        place an agent can receive concrete feedback about what it got wrong.
      </ConceptBlock>

      <h3>Field Design Principles</h3>
      <p>
        Each field in an input schema is a commitment. Design them to be as specific as necessary
        and as permissive as safely possible:
      </p>
      <ul>
        <li>
          <strong>Choose the narrowest type that works:</strong> If a field should always be a
          positive integer, say so. Do not accept strings and validate internally — reject invalid
          types at the schema level where the feedback is immediate and structured.
        </li>
        <li>
          <strong>Mark fields required or optional deliberately:</strong> Optional fields with
          defaults should have those defaults stated explicitly. An agent must know whether
          omitting a field changes the tool's behavior, and how.
        </li>
        <li>
          <strong>Describe each field:</strong> Every field deserves a one-line description
          that explains its purpose and any constraints. A field named "limit" without a
          description leaves the agent guessing whether it means a count, a size in bytes,
          or a time limit.
        </li>
        <li>
          <strong>Use enumerations for constrained choices:</strong> If a parameter accepts
          only specific values, list them as an enumeration. This prevents the agent from
          inventing plausible-but-invalid values.
        </li>
      </ul>

      <PrincipleBlock title="Be Strict at the Boundary" number="Principle 2.4">
        Input validation should happen as early as possible — at the schema level, not deep
        inside the tool's logic. An input that fails at the boundary gives the agent an
        immediate, structured signal about what to correct. An input that passes schema
        validation but fails inside the tool gives the agent a confusing error that is harder
        to act on. Push validation outward, toward the interface.
      </PrincipleBlock>

      <h3>The Danger of Overly Permissive Schemas</h3>
      <p>
        Accepting too much is as dangerous as accepting too little. A schema that accepts any
        string for a field that should be a date allows the agent to pass malformed values that
        the tool must then interpret. This interpretation is where silent failures and unexpected
        behavior are born. A schema that accepts only strings matching a specific date format
        eliminates an entire class of bugs before they can occur.
      </p>

      <WarningBlock title="Do Not Accept What You Cannot Handle">
        A common mistake is designing schemas that accept broad inputs "for flexibility" and then
        relying on internal logic to handle edge cases. Every edge case your schema accepts is an
        obligation you must fulfill in code. Permissive schemas create silent obligations. Narrow
        schemas make obligations explicit. Default to strict, and only loosen when there is a
        clear and justified need.
      </WarningBlock>

      <ExerciseBlock
        title="Input Schema Design"
        exercises={[
          {
            id: 'is-1',
            difficulty: 'beginner',
            question: 'A tool searches for users by status. The "status" parameter currently accepts any string. What problems does this create, and how would you improve the schema for this parameter?',
            hint: 'Think about what values are actually valid and what happens when an invalid value is passed.',
            solution: 'Accepting any string means an agent could pass "actve" (typo), "ACTIVE" (wrong case), or "online" (wrong vocabulary). The tool must then decide how to handle each case — silently normalize, silently fail, or error inconsistently. The fix is to declare status as an enumeration with the valid values explicitly listed (e.g., ["active", "inactive", "pending"]). The agent is guided to correct values, and invalid inputs are rejected at the boundary.',
          },
          {
            id: 'is-2',
            difficulty: 'intermediate',
            question: 'You are designing a tool that fetches a paginated list of records. What fields would you include in the input schema, and for each, what type, constraints, and description would you specify?',
            hint: 'Think about what information the tool needs: what to fetch, how many, and where in the list to start.',
            solution: 'Suggested schema: (1) "query" — string, required, max 500 chars, "The search terms to filter records by." (2) "page" — integer, optional, default 1, minimum 1, "The page number to retrieve, starting from 1." (3) "page_size" — integer, optional, default 20, minimum 1, maximum 100, "Number of records per page." Each constraint is justified: query length prevents abuse, page minimum prevents invalid pages, page_size maximum prevents overloading the backend.',
          },
          {
            id: 'is-3',
            difficulty: 'advanced',
            question: 'Consider a tool whose schema has evolved over time: it now has 12 input fields, most of which are optional with complex interdependencies (field C is only relevant when field A is set to "advanced" mode). What design problem has occurred, and how would you address it?',
            hint: 'Think about what happens to an agent\'s ability to reason about correct invocation as a schema grows in complexity.',
            solution: 'The schema has accumulated complexity that the agent must model entirely in its head. Interdependent optional fields create an exponential space of valid and invalid combinations that cannot be fully captured in standard type schemas. The design problem is conflation: the tool is trying to serve multiple distinct use cases. The solution is usually to split into separate tools by mode ("run_basic_analysis" vs "run_advanced_analysis"), each with its own clean, independent schema. Alternatively, a single required "mode" field can serve as a top-level discriminator with clearly scoped sub-schemas for each mode.',
          },
        ]}
      />
    </div>
  );
}
