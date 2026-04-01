import ConceptBlock from '../../../components/content/ConceptBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ResourceDiscovery() {
  return (
    <div className="prose-agents">
      <h2>Resource Discovery and Navigation</h2>
      <p>
        Tool discovery tells an agent what capabilities exist. Resource discovery takes this
        further: it lets an agent explore the data and objects that tools operate on, not just
        the tools themselves. When an agent can discover and navigate resources as well as
        capabilities, it gains the ability to work with large, dynamic datasets without needing
        hard-coded knowledge of their structure.
      </p>

      <ConceptBlock title="Resource Discovery" number="9.10">
        <p>
          Resource discovery is the ability to enumerate the specific data objects, documents,
          or entities that a tool can act on — and to navigate their relationships. Rather than
          hard-coding resource identifiers, an agent uses discovery to find what is available,
          select relevant items, and follow links between related resources to build context
          before taking action.
        </p>
      </ConceptBlock>

      <p>
        A protocol that supports resource discovery lets agents behave more like explorers than
        executors. An executor knows exactly what it wants and calls for it directly. An explorer
        can navigate an unfamiliar environment — following links, reading descriptions, narrowing
        scope — until it finds the right resource to act on. This is especially valuable in
        enterprise contexts where data structures are complex and not fully known at design time.
      </p>

      <PrincipleBlock title="Resources Should Be Self-Describing" number="9.6">
        <p>
          Each resource returned through a protocol should include enough information for an
          agent to decide whether it is relevant and what actions can be taken on it — without
          requiring a separate request. A resource that provides only an identifier forces the
          agent to make a follow-up call for every resource it encounters. Self-describing
          resources make exploration efficient.
        </p>
      </PrincipleBlock>

      <NoteBlock title="Discovery depth should be bounded" type="note">
        <p>
          Resource graphs can be arbitrarily deep — a document links to folders, which link to
          projects, which link to teams, which link to organizations. Agents exploring resource
          graphs without depth limits can spend enormous time navigating before doing any useful
          work. Well-designed protocols provide filters, relevance signals, or explicit depth
          hints to keep discovery focused.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-10-1',
            difficulty: 'beginner',
            question: 'An agent is tasked with updating a specific document but only has the document\'s title, not its ID. The protocol supports resource discovery. Describe the steps the agent should take to find and then update the correct document.',
            hint: 'Think about the sequence: discover, filter, confirm, act.',
            solution: 'Step 1: Call the resource discovery endpoint with the document title as a search filter. Step 2: Review the returned resources — if multiple documents share the title, the agent needs additional signals (author, date, content snippet) to select the right one. Step 3: Confirm the selected resource by examining its description or a preview before taking any action. Step 4: Use the discovered resource\'s identifier to call the update tool. The key is not to conflate discovery and action — always confirm you have the right resource before modifying it.'
          },
          {
            id: 'ex9-10-2',
            difficulty: 'intermediate',
            question: 'A protocol allows an agent to navigate from a project resource to its child tasks, from tasks to their assignees, and from assignees to their other tasks. An agent needs to find all tasks assigned to people working on a specific project. What is the most efficient navigation path, and what is the risk of a naive traversal?',
            hint: 'Think about fan-out: how many requests does each navigation step require, and how quickly can the number grow?',
            solution: 'Most efficient path: fetch the project, get its task list (one call), extract unique assignees from the task list (no additional calls if tasks include assignee info), then for each unique assignee fetch their full task list. The risk of naive traversal: starting from assignees and navigating to all their projects first would fetch all projects for all assignees — including projects unrelated to the one we care about. That creates enormous fan-out. The efficient path always starts from the constrained resource (the specific project) and expands outward only as far as needed, avoiding the explosion of visiting unconstrained resources first.'
          },
          {
            id: 'ex9-10-3',
            difficulty: 'advanced',
            question: 'Design a resource discovery response format that lets an agent determine, from a single response, whether a resource is relevant to its task, what actions it can take on the resource, and where to find related resources — without requiring additional calls.',
            hint: 'Think about the three categories of metadata an agent needs: relevance signals, capability links, and relationship links.',
            solution: 'The response should include: (1) Identity: a stable ID, human-readable name, and resource type. (2) Relevance signals: a description, key attributes (dates, tags, status), and a relevance score if the request included a search query. (3) Available actions: a list of protocol-standard actions the caller is permitted to take on this resource (read, update, delete, comment), reflecting the caller\'s current permissions — not all possible actions. (4) Relationship links: named links to related resources (parent, children, related items), including the resource type at the other end so the agent can decide whether to follow them without making the request. The actions and relationships should use stable protocol identifiers, not implementation-specific field names, maintaining loose coupling.'
          }
        ]}
      />
    </div>
  )
}
