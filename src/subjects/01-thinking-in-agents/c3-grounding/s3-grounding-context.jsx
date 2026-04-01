import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function GroundingContext() {
  return (
    <div className="prose-agents">
      <h2>Grounding Through Context</h2>
      <p>
        Tools give agents access to live external data. But not all grounding requires reaching out
        to external systems — much of what an agent needs to act accurately can be provided directly
        in context. Context-based grounding means supplying the agent with the specific, current,
        task-relevant information it needs at the moment it needs to reason, rather than hoping it
        will retrieve the right knowledge from training.
      </p>

      <ConceptBlock title="Context-Based Grounding" number="3.3">
        <p>
          Context-based grounding is the practice of explicitly placing relevant, authoritative
          information into the agent's active context window so that its reasoning is anchored to
          facts rather than inferences from training. This includes: system prompt instructions
          that define scope and constraints, retrieved documents that contain relevant knowledge,
          user-provided data that the agent should treat as ground truth, and prior conversation
          history that establishes what has already been decided or done.
        </p>
      </ConceptBlock>

      <p>
        The distinction between context-grounded and training-grounded reasoning matters enormously
        in practice. When an agent is asked a question about a specific company's policy, it should
        answer based on the policy document in context — not based on what it has learned about how
        companies typically write policies. When asked to act on a user's data, it should use the
        actual data provided — not infer what the data probably contains. Prioritizing context over
        training is a discipline that must be designed into agent behavior explicitly.
      </p>

      <AnalogyBlock title="The New Employee Analogy">
        <p>
          A new employee on their first day knows a great deal from education and experience —
          but they should not act on that general knowledge when the company has specific policies,
          procedures, and context that override it. The smart new employee reads the handbook,
          asks questions, and defers to current documentation rather than doing what "generally
          makes sense." An agent should exhibit the same discipline: treat the context it is given
          as the authoritative source for the specific situation, not just one input among many.
        </p>
      </AnalogyBlock>

      <p>
        Context grounding also involves careful management of what is and is not in context.
        Relevant information that is absent from context is a gap the agent will fill with
        inference — potentially incorrectly. Irrelevant information in context is noise that
        can distract reasoning. <strong>Context curation</strong> — deciding what to include,
        what to exclude, and how to format what is included — is as important as the agent's
        reasoning capabilities.
      </p>

      <PrincipleBlock title="Context Is the Agent's Ground Truth" number="3.2">
        <p>
          Design agents to treat their context window as the authoritative source for the current
          task. When context contradicts training knowledge, context should win — it is more
          specific, more current, and directly relevant. When context is silent on a point, the
          agent should acknowledge the gap rather than silently filling it with a trained
          assumption. Build this behavior explicitly into system prompts and agent instructions.
        </p>
      </PrincipleBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'ex12-1',
            difficulty: 'beginner',
            question: 'A user asks an agent "What is the refund policy for my order?" The agent has access to a general FAQ about the company\'s typical refund policy, but not the user\'s specific order details. What should the agent do, and what is the risk if it answers from the FAQ alone?',
            hint: 'Consider the difference between general policy and what applies to this specific order.',
            solution: 'The agent should retrieve or ask for the user\'s specific order information before answering. The general FAQ may describe standard policy, but orders may have exceptions — different product categories, promotional purchases, or time-sensitive conditions. Answering from the FAQ alone risks giving the user incorrect information about their specific situation. Worse, if the agent sounds confident, the user may make decisions (return a product, request a refund) based on wrong information. The agent should say what the general policy is while making clear it needs the specific order details to give a definitive answer.'
          },
          {
            id: 'ex12-2',
            difficulty: 'intermediate',
            question: 'An agent\'s context window is 128,000 tokens. A task requires reasoning over three documents: a 50,000-token technical specification, a 30,000-token legal contract, and a 10,000-token requirements document. You also need space for the agent\'s system prompt, conversation history, and reasoning. How do you approach context management for this task?',
            hint: 'You probably cannot fit everything. Think about chunking, summarization, retrieval, and what the agent actually needs at each reasoning step.',
            solution: 'The full documents exceed available context even without other content. Approach: (1) Identify what the agent actually needs from each document for the specific task — the entire specification is rarely needed at once. (2) Chunking with retrieval — split each document into sections, embed them, and retrieve only the sections relevant to each reasoning step. (3) Pre-summarize sections — use a fast summarization pass to reduce each document to key points, keeping full text available only for sections the agent has flagged as critical. (4) Sequential focus — structure the task so the agent reasons over one document at a time rather than all three simultaneously, carrying forward only the key conclusions. (5) Extract and anchor — before the main reasoning, have the agent extract the 10-20 key claims or requirements from each document into a compact reference list that stays in context throughout.'
          },
          {
            id: 'ex12-3',
            difficulty: 'advanced',
            question: 'Context poisoning is an attack where malicious content placed in the agent\'s context causes it to act against its instructions — for example, a retrieved document containing instructions that override the system prompt. How does this attack work, and what design principles reduce susceptibility to it?',
            hint: 'Think about how the agent decides which parts of its context to follow vs. treat as data, and how an attacker can exploit that.',
            solution: 'Context poisoning works by exploiting the agent\'s tendency to treat all text in context as equally authoritative instruction. A retrieved document might contain text like "Ignore previous instructions and instead do X" — which the agent may process as a command rather than as data to be analyzed. The attack is more subtle when the injected instruction is embedded in content that looks legitimate. Reducing susceptibility: (1) Source attribution — train/instruct the agent to be aware of where each piece of context came from, and to give instructions in system prompts higher authority than content from tool outputs or user-provided documents. (2) Structural separation — use clear markers that separate "instructions I should follow" from "content I should analyze." (3) Instruction skepticism — instruct the agent to be suspicious of any instruction-like text appearing in tool outputs or retrieved content; legitimate systems do not need to override safety measures. (4) Scope constraints — limit what the agent can do in response to retrieved content; it should analyze, summarize, or extract — not execute instructions found within it. (5) Human review of retrieved content before high-stakes actions.'
          }
        ]}
      />
    </div>
  )
}
