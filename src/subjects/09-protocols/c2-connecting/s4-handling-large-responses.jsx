import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import NoteBlock from '../../../components/content/NoteBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function HandlingLargeResponses() {
  return (
    <div className="prose-agents">
      <h2>Handling Large Tool Responses</h2>
      <p>
        Many real-world tools return far more data than an agent can use in a single reasoning
        step. A database query might return thousands of rows; a web scrape might return an entire
        page of HTML; a document retrieval might return a lengthy file. How an agent handles
        responses that exceed its practical processing capacity is a critical design concern.
      </p>

      <ConceptBlock title="Response Overflow" number="9.8">
        <p>
          Response overflow occurs when a tool returns more data than the agent can effectively
          include in its context window or process in a single step. Without a strategy for
          handling overflow, agents either truncate data silently (losing potentially important
          information) or become unable to continue until the response is managed down to a
          usable size.
        </p>
      </ConceptBlock>

      <p>
        Three strategies address overflow. <strong>Pagination</strong> lets the agent request
        results in chunks, processing each chunk before requesting the next. <strong>Projection</strong>
        narrows the request itself — asking the tool for only the fields or records that are
        needed rather than accepting everything and discarding most of it. <strong>Summarization</strong>
        uses a separate step to condense a large response into the salient facts before passing
        them forward. Each strategy has different tradeoffs in latency, precision, and complexity.
      </p>

      <AnalogyBlock title="Drinking from a Firehose">
        <p>
          Imagine being handed a firehose and told to drink from it. You could try to take in
          everything and spill most of it, or you could turn down the pressure (project your
          request), drink in sips (paginate), or have someone filter it into a glass for you
          (summarize). Each method works, but the right choice depends on how thirsty you are,
          how long you have, and whether the flavor of each sip matters.
        </p>
      </AnalogyBlock>

      <NoteBlock title="Ask the tool to do the filtering" type="tip">
        <p>
          Whenever possible, push filtering and projection into the tool call itself rather
          than handling it client-side. A tool that returns only the 5 most relevant results
          is almost always better than one that returns 500 results that the agent then has
          to sort through. Well-designed tools accept query parameters that narrow their
          output to what is actually needed.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex9-8-1',
            difficulty: 'beginner',
            question: 'A tool returns a list of 10,000 customer records. The agent needs to find the 5 most recently created. What is the most efficient strategy, and why is loading all 10,000 records into context a bad approach?',
            hint: 'Think about what work can be done at the tool level versus what must be done by the agent.',
            solution: 'The most efficient strategy is projection at the tool level: request only the 5 most recently created records, sorted by creation date, directly in the query. Loading all 10,000 records is wasteful because it consumes context space, adds latency, and requires the agent to sort through irrelevant data. The agent is not a good place to do database-style operations — the tool is. Always prefer pushing filters into the tool call over processing large results client-side.'
          },
          {
            id: 'ex9-8-2',
            difficulty: 'intermediate',
            question: 'An agent needs to process all records in a result set of unknown total size. Design a pagination strategy that handles the case where new records are added to the set while the agent is paginating through it.',
            hint: 'Consider cursor-based pagination versus offset-based pagination. Which is stable when the underlying data changes?',
            solution: 'Use cursor-based pagination rather than offset-based. Offset pagination (page 1 = records 0-99, page 2 = records 100-199) breaks when new records are inserted at the beginning — the offset shifts and the agent may see duplicate or skipped records. Cursor-based pagination uses a stable identifier (e.g., the ID of the last seen record) as the starting point for each subsequent request. New records inserted before the cursor position do not affect subsequent pages. The agent should also record which cursors it has processed so that if it is interrupted and restarted, it can resume from the last checkpoint rather than starting over.'
          },
          {
            id: 'ex9-8-3',
            difficulty: 'advanced',
            question: 'A tool returns a 50,000-word document as a single response. The agent needs to answer a specific question about a topic mentioned somewhere in the document. Compare the tradeoffs of three approaches: (1) summarize the whole document first, (2) paginate through it looking for the relevant section, (3) use a separate embedding search to locate the relevant passage.',
            hint: 'Consider latency, information loss, and the precision of each approach for the specific use case.',
            solution: '(1) Whole-document summarization: fast to implement, but summarization may discard the specific detail the agent needs, especially if the topic is minor. High information loss risk. (2) Paginated reading: complete but slow — the agent reads every page even if the answer is near the end. Guarantees no information loss but wastes significant processing time. (3) Embedding search: fastest and most precise for targeted questions — it jumps directly to the relevant passage. Requires a pre-built or on-the-fly embedding index, adding infrastructure complexity. Recommendation: for targeted factual questions about long documents, embedding search is strongly preferable. For questions that require synthesizing the whole document, summarization (with careful prompt design to preserve specifics) may be necessary. Pagination is rarely the right choice for length documents unless the agent must process every section.'
          }
        ]}
      />
    </div>
  )
}
