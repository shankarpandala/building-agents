import React from 'react';
import ConceptBlock from '../../../components/content/ConceptBlock.jsx';
import AnalogyBlock from '../../../components/content/AnalogyBlock.jsx';
import NoteBlock from '../../../components/content/NoteBlock.jsx';
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx';

export default function Sandboxing() {
  return (
    <div className="prose-agents">
      <h2>Sandboxing</h2>
      <p>
        Sandboxing is the practice of running an agent inside an isolated environment that limits
        what real-world effects it can have. The sandbox acts as a physical boundary: regardless
        of what the agent attempts to do, its actions cannot reach outside the sandbox boundary.
        This transforms a permission model question ("should the agent be allowed to do X?") into
        an environment design question ("can the environment be designed so X is impossible?").
      </p>

      <ConceptBlock title="Sandboxing" number="Concept 3.13">
        A sandbox is an isolated execution environment that constrains an agent's ability to
        affect external systems. The sandbox enforces boundaries at the infrastructure level —
        network isolation, filesystem restrictions, process limits, and resource caps — making
        certain classes of harm structurally impossible rather than merely policy-prohibited.
        No agent instruction or permission grant can break a well-designed sandbox.
      </ConceptBlock>

      <AnalogyBlock title="The Terrarium">
        A terrarium is a glass enclosure for plants and small animals. The inhabitants can live,
        grow, and interact with each other normally. But they cannot escape the glass. The glass
        is not a set of rules the inhabitants follow; it is a physical boundary they cannot
        cross. An agent sandbox works the same way — the boundary is structural, not behavioral.
      </AnalogyBlock>

      <p>
        Sandboxes serve two safety roles. First, they limit blast radius: even a completely
        compromised or misbehaving agent cannot affect systems outside the sandbox. Second, they
        enable experimentation: an agent can be tested against realistic conditions inside a
        sandbox without risk to production systems. This makes sandboxes valuable both as safety
        controls and as development tools.
      </p>

      <NoteBlock title="Sandboxes are not perfect" type="warning">
        No sandbox is absolutely impermeable. Side channels, escape vulnerabilities, and supply
        chain attacks can all compromise sandbox integrity. Sandboxing is one layer in a
        defense-in-depth strategy — it dramatically reduces risk but should not be the only
        control. Combine sandboxing with least privilege, monitoring, and human oversight for
        robust safety.
      </NoteBlock>

      <ExerciseBlock
        title="Check Your Understanding"
        exercises={[
          {
            id: 'sb-1',
            difficulty: 'beginner',
            question:
              'What is the fundamental difference between a rule-based permission that says "the agent should not contact external APIs" and a sandbox that prevents external network connections?',
            hint: 'Think about what enforces each constraint and whether the agent\'s own behavior matters.',
            solution:
              'The rule depends on the agent (and its permission checker) following the constraint — it is a behavioral restriction that could be bypassed if the agent or its permission system is compromised. The sandbox enforces the constraint at the infrastructure level: the network is literally unreachable, regardless of what the agent attempts. The sandbox makes the behavior structurally impossible, not just policy-prohibited.',
          },
          {
            id: 'sb-2',
            difficulty: 'intermediate',
            question:
              'You are designing a sandbox for an agent that needs to: read production logs, generate reports, and email those reports to a fixed list of recipients. Describe the sandbox constraints you would apply.',
            hint: 'Think about the three capabilities the agent needs and what each implies for the sandbox.',
            solution:
              'Network: allow outbound connections only to the email relay, and only to the specific recipients in the allowlist — no other outbound access. Filesystem: read-only access to the log directory, write access only to a designated output directory. Compute: resource caps to prevent runaway processes. No access to any production database, API, or internal service beyond the log files.',
          },
          {
            id: 'sb-3',
            difficulty: 'advanced',
            question:
              'An agent inside a well-sandboxed environment produces a report that a human reads and then acts on in the production system. Is the sandbox still providing full protection? What residual risk exists?',
            hint: 'Think about the human as the vector between the sandbox and production.',
            solution:
              'The sandbox prevents direct agent actions on production, but it cannot prevent indirect influence through human behavior. If the agent\'s output is manipulated (via prompt injection or deliberate misinformation in the logs it reads), the human acting on that output becomes the vector for harm. This is sometimes called "indirect prompt injection" — the agent influences production through human intermediaries. Defense: audit and validate agent outputs before acting on them, and treat agent-generated recommendations as proposals requiring independent verification for high-stakes actions.',
          },
        ]}
      />
    </div>
  );
}
