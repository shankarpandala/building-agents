import { useParams, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { getCurriculumById, getChapterById, getSectionById, getAdjacentSections, resolveBuildsOn } from '../subjects/index.js'
import DifficultyBadge from '../components/navigation/DifficultyBadge.jsx'
import PrevNextNav from '../components/navigation/PrevNextNav.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import useProgress from '../hooks/useProgress.js'

// Registry mapping section keys to lazy-loaded content components.
const CONTENT_REGISTRY = {
  // Subject 1 — Thinking in Agents
  'thinking-in-agents/c1-agent-paradigm/s1-what-makes-agent': lazy(() => import('../subjects/01-thinking-in-agents/c1-agent-paradigm/s1-what-makes-agent.jsx')),
  'thinking-in-agents/c1-agent-paradigm/s2-autonomy-spectrum': lazy(() => import('../subjects/01-thinking-in-agents/c1-agent-paradigm/s2-autonomy-spectrum.jsx')),
  'thinking-in-agents/c1-agent-paradigm/s3-agents-vs-assistants': lazy(() => import('../subjects/01-thinking-in-agents/c1-agent-paradigm/s3-agents-vs-assistants.jsx')),
  'thinking-in-agents/c1-agent-paradigm/s4-when-you-need-agent': lazy(() => import('../subjects/01-thinking-in-agents/c1-agent-paradigm/s4-when-you-need-agent.jsx')),
  'thinking-in-agents/c2-agent-loop/s1-sense-think-act': lazy(() => import('../subjects/01-thinking-in-agents/c2-agent-loop/s1-sense-think-act.jsx')),
  'thinking-in-agents/c2-agent-loop/s2-observation': lazy(() => import('../subjects/01-thinking-in-agents/c2-agent-loop/s2-observation.jsx')),
  'thinking-in-agents/c2-agent-loop/s3-reasoning': lazy(() => import('../subjects/01-thinking-in-agents/c2-agent-loop/s3-reasoning.jsx')),
  'thinking-in-agents/c2-agent-loop/s4-action': lazy(() => import('../subjects/01-thinking-in-agents/c2-agent-loop/s4-action.jsx')),
  'thinking-in-agents/c2-agent-loop/s5-feedback-loop': lazy(() => import('../subjects/01-thinking-in-agents/c2-agent-loop/s5-feedback-loop.jsx')),
  'thinking-in-agents/c3-grounding/s1-language-action-gap': lazy(() => import('../subjects/01-thinking-in-agents/c3-grounding/s1-language-action-gap.jsx')),
  'thinking-in-agents/c3-grounding/s2-grounding-tools': lazy(() => import('../subjects/01-thinking-in-agents/c3-grounding/s2-grounding-tools.jsx')),
  'thinking-in-agents/c3-grounding/s3-grounding-context': lazy(() => import('../subjects/01-thinking-in-agents/c3-grounding/s3-grounding-context.jsx')),
  'thinking-in-agents/c3-grounding/s4-hallucination-drift': lazy(() => import('../subjects/01-thinking-in-agents/c3-grounding/s4-hallucination-drift.jsx')),

  // Subject 2 — Tools
  'tools/c1-philosophy-of-tools/s1-why-tools': lazy(() => import('../subjects/02-tools/c1-philosophy-of-tools/s1-why-tools.jsx')),
  'tools/c1-philosophy-of-tools/s2-good-tool': lazy(() => import('../subjects/02-tools/c1-philosophy-of-tools/s2-good-tool.jsx')),
  'tools/c1-philosophy-of-tools/s3-tool-categories': lazy(() => import('../subjects/02-tools/c1-philosophy-of-tools/s3-tool-categories.jsx')),
  'tools/c1-philosophy-of-tools/s4-tool-contract': lazy(() => import('../subjects/02-tools/c1-philosophy-of-tools/s4-tool-contract.jsx')),
  'tools/c2-tool-design/s1-naming-description': lazy(() => import('../subjects/02-tools/c2-tool-design/s1-naming-description.jsx')),
  'tools/c2-tool-design/s2-input-schemas': lazy(() => import('../subjects/02-tools/c2-tool-design/s2-input-schemas.jsx')),
  'tools/c2-tool-design/s3-output-design': lazy(() => import('../subjects/02-tools/c2-tool-design/s3-output-design.jsx')),
  'tools/c2-tool-design/s4-idempotency': lazy(() => import('../subjects/02-tools/c2-tool-design/s4-idempotency.jsx')),
  'tools/c2-tool-design/s5-granularity': lazy(() => import('../subjects/02-tools/c2-tool-design/s5-granularity.jsx')),
  'tools/c3-tool-composition/s1-choosing-right-tool': lazy(() => import('../subjects/02-tools/c3-tool-composition/s1-choosing-right-tool.jsx')),
  'tools/c3-tool-composition/s2-sequential-composition': lazy(() => import('../subjects/02-tools/c3-tool-composition/s2-sequential-composition.jsx')),
  'tools/c3-tool-composition/s3-parallel-composition': lazy(() => import('../subjects/02-tools/c3-tool-composition/s3-parallel-composition.jsx')),
  'tools/c3-tool-composition/s4-tool-chaining': lazy(() => import('../subjects/02-tools/c3-tool-composition/s4-tool-chaining.jsx')),
  'tools/c3-tool-composition/s5-graceful-failure': lazy(() => import('../subjects/02-tools/c3-tool-composition/s5-graceful-failure.jsx')),

  // Subject 3 — Trust and Safety
  'trust-and-safety/c1-safety-problem/s1-why-boundaries': lazy(() => import('../subjects/03-trust-and-safety/c1-safety-problem/s1-why-boundaries.jsx')),
  'trust-and-safety/c1-safety-problem/s2-blast-radius': lazy(() => import('../subjects/03-trust-and-safety/c1-safety-problem/s2-blast-radius.jsx')),
  'trust-and-safety/c1-safety-problem/s3-reversible-irreversible': lazy(() => import('../subjects/03-trust-and-safety/c1-safety-problem/s3-reversible-irreversible.jsx')),
  'trust-and-safety/c1-safety-problem/s4-cost-asking-vs-acting': lazy(() => import('../subjects/03-trust-and-safety/c1-safety-problem/s4-cost-asking-vs-acting.jsx')),
  'trust-and-safety/c2-permission-models/s1-ask-every-time': lazy(() => import('../subjects/03-trust-and-safety/c2-permission-models/s1-ask-every-time.jsx')),
  'trust-and-safety/c2-permission-models/s2-plan-then-execute': lazy(() => import('../subjects/03-trust-and-safety/c2-permission-models/s2-plan-then-execute.jsx')),
  'trust-and-safety/c2-permission-models/s3-rule-based': lazy(() => import('../subjects/03-trust-and-safety/c2-permission-models/s3-rule-based.jsx')),
  'trust-and-safety/c2-permission-models/s4-classifier-based': lazy(() => import('../subjects/03-trust-and-safety/c2-permission-models/s4-classifier-based.jsx')),
  'trust-and-safety/c2-permission-models/s5-full-trust': lazy(() => import('../subjects/03-trust-and-safety/c2-permission-models/s5-full-trust.jsx')),
  'trust-and-safety/c3-designing-safety/s1-least-privilege': lazy(() => import('../subjects/03-trust-and-safety/c3-designing-safety/s1-least-privilege.jsx')),
  'trust-and-safety/c3-designing-safety/s2-fail-closed': lazy(() => import('../subjects/03-trust-and-safety/c3-designing-safety/s2-fail-closed.jsx')),
  'trust-and-safety/c3-designing-safety/s3-human-in-loop': lazy(() => import('../subjects/03-trust-and-safety/c3-designing-safety/s3-human-in-loop.jsx')),
  'trust-and-safety/c3-designing-safety/s4-sandboxing': lazy(() => import('../subjects/03-trust-and-safety/c3-designing-safety/s4-sandboxing.jsx')),
  'trust-and-safety/c3-designing-safety/s5-secrets-sensitive': lazy(() => import('../subjects/03-trust-and-safety/c3-designing-safety/s5-secrets-sensitive.jsx')),

  // Subject 4 — Agent Runtime
  'agent-runtime/c1-initialization/s1-cold-start': lazy(() => import('../subjects/04-agent-runtime/c1-initialization/s1-cold-start.jsx')),
  'agent-runtime/c1-initialization/s2-bootstrap-pipeline': lazy(() => import('../subjects/04-agent-runtime/c1-initialization/s2-bootstrap-pipeline.jsx')),
  'agent-runtime/c1-initialization/s3-trust-gates': lazy(() => import('../subjects/04-agent-runtime/c1-initialization/s3-trust-gates.jsx')),
  'agent-runtime/c1-initialization/s4-parallel-init': lazy(() => import('../subjects/04-agent-runtime/c1-initialization/s4-parallel-init.jsx')),
  'agent-runtime/c1-initialization/s5-environment-detection': lazy(() => import('../subjects/04-agent-runtime/c1-initialization/s5-environment-detection.jsx')),
  'agent-runtime/c2-conversation-engine/s1-turns': lazy(() => import('../subjects/04-agent-runtime/c2-conversation-engine/s1-turns.jsx')),
  'agent-runtime/c2-conversation-engine/s2-message-history': lazy(() => import('../subjects/04-agent-runtime/c2-conversation-engine/s2-message-history.jsx')),
  'agent-runtime/c2-conversation-engine/s3-tool-loop': lazy(() => import('../subjects/04-agent-runtime/c2-conversation-engine/s3-tool-loop.jsx')),
  'agent-runtime/c2-conversation-engine/s4-stop-conditions': lazy(() => import('../subjects/04-agent-runtime/c2-conversation-engine/s4-stop-conditions.jsx')),
  'agent-runtime/c2-conversation-engine/s5-streaming': lazy(() => import('../subjects/04-agent-runtime/c2-conversation-engine/s5-streaming.jsx')),
  'agent-runtime/c3-resource-management/s1-token-budgeting': lazy(() => import('../subjects/04-agent-runtime/c3-resource-management/s1-token-budgeting.jsx')),
  'agent-runtime/c3-resource-management/s2-context-compaction': lazy(() => import('../subjects/04-agent-runtime/c3-resource-management/s2-context-compaction.jsx')),
  'agent-runtime/c3-resource-management/s3-cost-tracking': lazy(() => import('../subjects/04-agent-runtime/c3-resource-management/s3-cost-tracking.jsx')),
  'agent-runtime/c3-resource-management/s4-rate-limits': lazy(() => import('../subjects/04-agent-runtime/c3-resource-management/s4-rate-limits.jsx')),
  'agent-runtime/c3-resource-management/s5-session-persistence': lazy(() => import('../subjects/04-agent-runtime/c3-resource-management/s5-session-persistence.jsx')),

  // Subject 5 — Prompt Engineering
  'prompt-engineering/c1-system-prompt/s1-identity': lazy(() => import('../subjects/05-prompt-engineering/c1-system-prompt/s1-identity.jsx')),
  'prompt-engineering/c1-system-prompt/s2-capabilities': lazy(() => import('../subjects/05-prompt-engineering/c1-system-prompt/s2-capabilities.jsx')),
  'prompt-engineering/c1-system-prompt/s3-constraints': lazy(() => import('../subjects/05-prompt-engineering/c1-system-prompt/s3-constraints.jsx')),
  'prompt-engineering/c1-system-prompt/s4-tone-style': lazy(() => import('../subjects/05-prompt-engineering/c1-system-prompt/s4-tone-style.jsx')),
  'prompt-engineering/c1-system-prompt/s5-dynamic-prompts': lazy(() => import('../subjects/05-prompt-engineering/c1-system-prompt/s5-dynamic-prompts.jsx')),
  'prompt-engineering/c2-routing-intent/s1-understanding-intent': lazy(() => import('../subjects/05-prompt-engineering/c2-routing-intent/s1-understanding-intent.jsx')),
  'prompt-engineering/c2-routing-intent/s2-matching-capabilities': lazy(() => import('../subjects/05-prompt-engineering/c2-routing-intent/s2-matching-capabilities.jsx')),
  'prompt-engineering/c2-routing-intent/s3-disambiguation': lazy(() => import('../subjects/05-prompt-engineering/c2-routing-intent/s3-disambiguation.jsx')),
  'prompt-engineering/c2-routing-intent/s4-fallback-strategies': lazy(() => import('../subjects/05-prompt-engineering/c2-routing-intent/s4-fallback-strategies.jsx')),
  'prompt-engineering/c3-context-window/s1-what-goes-in': lazy(() => import('../subjects/05-prompt-engineering/c3-context-window/s1-what-goes-in.jsx')),
  'prompt-engineering/c3-context-window/s2-tool-contributed': lazy(() => import('../subjects/05-prompt-engineering/c3-context-window/s2-tool-contributed.jsx')),
  'prompt-engineering/c3-context-window/s3-priority': lazy(() => import('../subjects/05-prompt-engineering/c3-context-window/s3-priority.jsx')),
  'prompt-engineering/c3-context-window/s4-sliding-window': lazy(() => import('../subjects/05-prompt-engineering/c3-context-window/s4-sliding-window.jsx')),
  'prompt-engineering/c3-context-window/s5-information-density': lazy(() => import('../subjects/05-prompt-engineering/c3-context-window/s5-information-density.jsx')),

  // Subject 6 — State and Memory
  'state-and-memory/c1-session-state/s1-conversation-history': lazy(() => import('../subjects/06-state-and-memory/c1-session-state/s1-conversation-history.jsx')),
  'state-and-memory/c1-session-state/s2-application-state': lazy(() => import('../subjects/06-state-and-memory/c1-session-state/s2-application-state.jsx')),
  'state-and-memory/c1-session-state/s3-derived-state': lazy(() => import('../subjects/06-state-and-memory/c1-session-state/s3-derived-state.jsx')),
  'state-and-memory/c1-session-state/s4-side-effects': lazy(() => import('../subjects/06-state-and-memory/c1-session-state/s4-side-effects.jsx')),
  'state-and-memory/c2-persistent-memory/s1-project-memory': lazy(() => import('../subjects/06-state-and-memory/c2-persistent-memory/s1-project-memory.jsx')),
  'state-and-memory/c2-persistent-memory/s2-user-memory': lazy(() => import('../subjects/06-state-and-memory/c2-persistent-memory/s2-user-memory.jsx')),
  'state-and-memory/c2-persistent-memory/s3-team-memory': lazy(() => import('../subjects/06-state-and-memory/c2-persistent-memory/s3-team-memory.jsx')),
  'state-and-memory/c2-persistent-memory/s4-memory-hierarchy': lazy(() => import('../subjects/06-state-and-memory/c2-persistent-memory/s4-memory-hierarchy.jsx')),
  'state-and-memory/c2-persistent-memory/s5-auto-extracted': lazy(() => import('../subjects/06-state-and-memory/c2-persistent-memory/s5-auto-extracted.jsx')),
  'state-and-memory/c3-sessions/s1-session-identity': lazy(() => import('../subjects/06-state-and-memory/c3-sessions/s1-session-identity.jsx')),
  'state-and-memory/c3-sessions/s2-transcripts': lazy(() => import('../subjects/06-state-and-memory/c3-sessions/s2-transcripts.jsx')),
  'state-and-memory/c3-sessions/s3-resuming': lazy(() => import('../subjects/06-state-and-memory/c3-sessions/s3-resuming.jsx')),
  'state-and-memory/c3-sessions/s4-long-running': lazy(() => import('../subjects/06-state-and-memory/c3-sessions/s4-long-running.jsx')),

  // Subject 7 — Delegation
  'delegation/c1-when-to-delegate/s1-single-agent-ceiling': lazy(() => import('../subjects/07-delegation/c1-when-to-delegate/s1-single-agent-ceiling.jsx')),
  'delegation/c1-when-to-delegate/s2-delegation-decision': lazy(() => import('../subjects/07-delegation/c1-when-to-delegate/s2-delegation-decision.jsx')),
  'delegation/c1-when-to-delegate/s3-types-specialists': lazy(() => import('../subjects/07-delegation/c1-when-to-delegate/s3-types-specialists.jsx')),
  'delegation/c1-when-to-delegate/s4-foreground-background': lazy(() => import('../subjects/07-delegation/c1-when-to-delegate/s4-foreground-background.jsx')),
  'delegation/c2-designing-tasks/s1-sub-agent-brief': lazy(() => import('../subjects/07-delegation/c2-designing-tasks/s1-sub-agent-brief.jsx')),
  'delegation/c2-designing-tasks/s2-scoping-capabilities': lazy(() => import('../subjects/07-delegation/c2-designing-tasks/s2-scoping-capabilities.jsx')),
  'delegation/c2-designing-tasks/s3-isolation': lazy(() => import('../subjects/07-delegation/c2-designing-tasks/s3-isolation.jsx')),
  'delegation/c2-designing-tasks/s4-collecting-results': lazy(() => import('../subjects/07-delegation/c2-designing-tasks/s4-collecting-results.jsx')),
  'delegation/c3-anti-patterns/s1-over-delegation': lazy(() => import('../subjects/07-delegation/c3-anti-patterns/s1-over-delegation.jsx')),
  'delegation/c3-anti-patterns/s2-duplicate-work': lazy(() => import('../subjects/07-delegation/c3-anti-patterns/s2-duplicate-work.jsx')),
  'delegation/c3-anti-patterns/s3-context-overload': lazy(() => import('../subjects/07-delegation/c3-anti-patterns/s3-context-overload.jsx')),
  'delegation/c3-anti-patterns/s4-orphan-agents': lazy(() => import('../subjects/07-delegation/c3-anti-patterns/s4-orphan-agents.jsx')),

  // Subject 8 — Teams and Coordination
  'teams-coordination/c1-team-architecture/s1-what-is-team': lazy(() => import('../subjects/08-teams-coordination/c1-team-architecture/s1-what-is-team.jsx')),
  'teams-coordination/c1-team-architecture/s2-team-lead': lazy(() => import('../subjects/08-teams-coordination/c1-team-architecture/s2-team-lead.jsx')),
  'teams-coordination/c1-team-architecture/s3-teammates': lazy(() => import('../subjects/08-teams-coordination/c1-team-architecture/s3-teammates.jsx')),
  'teams-coordination/c1-team-architecture/s4-team-lifecycle': lazy(() => import('../subjects/08-teams-coordination/c1-team-architecture/s4-team-lifecycle.jsx')),
  'teams-coordination/c2-communication/s1-point-to-point': lazy(() => import('../subjects/08-teams-coordination/c2-communication/s1-point-to-point.jsx')),
  'teams-coordination/c2-communication/s2-broadcast': lazy(() => import('../subjects/08-teams-coordination/c2-communication/s2-broadcast.jsx')),
  'teams-coordination/c2-communication/s3-async-mailboxes': lazy(() => import('../subjects/08-teams-coordination/c2-communication/s3-async-mailboxes.jsx')),
  'teams-coordination/c2-communication/s4-approval-flows': lazy(() => import('../subjects/08-teams-coordination/c2-communication/s4-approval-flows.jsx')),
  'teams-coordination/c2-communication/s5-shutdown-protocols': lazy(() => import('../subjects/08-teams-coordination/c2-communication/s5-shutdown-protocols.jsx')),
  'teams-coordination/c3-swarm/s1-what-is-swarm': lazy(() => import('../subjects/08-teams-coordination/c3-swarm/s1-what-is-swarm.jsx')),
  'teams-coordination/c3-swarm/s2-execution-backends': lazy(() => import('../subjects/08-teams-coordination/c3-swarm/s2-execution-backends.jsx')),
  'teams-coordination/c3-swarm/s3-identity-visibility': lazy(() => import('../subjects/08-teams-coordination/c3-swarm/s3-identity-visibility.jsx')),
  'teams-coordination/c3-swarm/s4-shared-state': lazy(() => import('../subjects/08-teams-coordination/c3-swarm/s4-shared-state.jsx')),
  'teams-coordination/c3-swarm/s5-conflict-resolution': lazy(() => import('../subjects/08-teams-coordination/c3-swarm/s5-conflict-resolution.jsx')),

  // Subject 9 — Protocols
  'protocols/c1-interoperability/s1-tool-fragmentation': lazy(() => import('../subjects/09-protocols/c1-interoperability/s1-tool-fragmentation.jsx')),
  'protocols/c1-interoperability/s2-universal-protocol': lazy(() => import('../subjects/09-protocols/c1-interoperability/s2-universal-protocol.jsx')),
  'protocols/c1-interoperability/s3-client-server': lazy(() => import('../subjects/09-protocols/c1-interoperability/s3-client-server.jsx')),
  'protocols/c1-interoperability/s4-runtime-discovery': lazy(() => import('../subjects/09-protocols/c1-interoperability/s4-runtime-discovery.jsx')),
  'protocols/c2-connecting/s1-consuming-tools': lazy(() => import('../subjects/09-protocols/c2-connecting/s1-consuming-tools.jsx')),
  'protocols/c2-connecting/s2-exposing-capabilities': lazy(() => import('../subjects/09-protocols/c2-connecting/s2-exposing-capabilities.jsx')),
  'protocols/c2-connecting/s3-auth-across-boundaries': lazy(() => import('../subjects/09-protocols/c2-connecting/s3-auth-across-boundaries.jsx')),
  'protocols/c2-connecting/s4-handling-large-responses': lazy(() => import('../subjects/09-protocols/c2-connecting/s4-handling-large-responses.jsx')),
  'protocols/c3-protocol-design/s1-loose-coupling': lazy(() => import('../subjects/09-protocols/c3-protocol-design/s1-loose-coupling.jsx')),
  'protocols/c3-protocol-design/s2-resource-discovery': lazy(() => import('../subjects/09-protocols/c3-protocol-design/s2-resource-discovery.jsx')),
  'protocols/c3-protocol-design/s3-permission-bridging': lazy(() => import('../subjects/09-protocols/c3-protocol-design/s3-permission-bridging.jsx')),
  'protocols/c3-protocol-design/s4-versioning': lazy(() => import('../subjects/09-protocols/c3-protocol-design/s4-versioning.jsx')),

  // Subject 10 — Workflows
  'workflows/c1-skill-concept/s1-what-is-skill': lazy(() => import('../subjects/10-workflows/c1-skill-concept/s1-what-is-skill.jsx')),
  'workflows/c1-skill-concept/s2-identifying-patterns': lazy(() => import('../subjects/10-workflows/c1-skill-concept/s2-identifying-patterns.jsx')),
  'workflows/c1-skill-concept/s3-builtin-vs-custom': lazy(() => import('../subjects/10-workflows/c1-skill-concept/s3-builtin-vs-custom.jsx')),
  'workflows/c1-skill-concept/s4-skill-invocation': lazy(() => import('../subjects/10-workflows/c1-skill-concept/s4-skill-invocation.jsx')),
  'workflows/c2-designing-skills/s1-parameterized-templates': lazy(() => import('../subjects/10-workflows/c2-designing-skills/s1-parameterized-templates.jsx')),
  'workflows/c2-designing-skills/s2-tool-requirements': lazy(() => import('../subjects/10-workflows/c2-designing-skills/s2-tool-requirements.jsx')),
  'workflows/c2-designing-skills/s3-composing-skills': lazy(() => import('../subjects/10-workflows/c2-designing-skills/s3-composing-skills.jsx')),
  'workflows/c2-designing-skills/s4-domain-skills': lazy(() => import('../subjects/10-workflows/c2-designing-skills/s4-domain-skills.jsx')),
  'workflows/c3-automation/s1-scheduled-agents': lazy(() => import('../subjects/10-workflows/c3-automation/s1-scheduled-agents.jsx')),
  'workflows/c3-automation/s2-event-driven': lazy(() => import('../subjects/10-workflows/c3-automation/s2-event-driven.jsx')),
  'workflows/c3-automation/s3-hook-automation': lazy(() => import('../subjects/10-workflows/c3-automation/s3-hook-automation.jsx')),
  'workflows/c3-automation/s4-ci-agents': lazy(() => import('../subjects/10-workflows/c3-automation/s4-ci-agents.jsx')),

  // Subject 11 — Integration
  'integration/c1-ide-integration/s1-bridge-pattern': lazy(() => import('../subjects/11-integration/c1-ide-integration/s1-bridge-pattern.jsx')),
  'integration/c1-ide-integration/s2-permission-delegation': lazy(() => import('../subjects/11-integration/c1-ide-integration/s2-permission-delegation.jsx')),
  'integration/c1-ide-integration/s3-inline-vs-external': lazy(() => import('../subjects/11-integration/c1-ide-integration/s3-inline-vs-external.jsx')),
  'integration/c1-ide-integration/s4-interactive-sessions': lazy(() => import('../subjects/11-integration/c1-ide-integration/s4-interactive-sessions.jsx')),
  'integration/c2-remote/s1-remote-machines': lazy(() => import('../subjects/11-integration/c2-remote/s1-remote-machines.jsx')),
  'integration/c2-remote/s2-secure-tunneling': lazy(() => import('../subjects/11-integration/c2-remote/s2-secure-tunneling.jsx')),
  'integration/c2-remote/s3-message-translation': lazy(() => import('../subjects/11-integration/c2-remote/s3-message-translation.jsx')),
  'integration/c2-remote/s4-cross-machine': lazy(() => import('../subjects/11-integration/c2-remote/s4-cross-machine.jsx')),
  'integration/c3-extensibility/s1-plugin-architecture': lazy(() => import('../subjects/11-integration/c3-extensibility/s1-plugin-architecture.jsx')),
  'integration/c3-extensibility/s2-discovery-loading': lazy(() => import('../subjects/11-integration/c3-extensibility/s2-discovery-loading.jsx')),
  'integration/c3-extensibility/s3-plugins-add-capabilities': lazy(() => import('../subjects/11-integration/c3-extensibility/s3-plugins-add-capabilities.jsx')),
  'integration/c3-extensibility/s4-plugin-lifecycle': lazy(() => import('../subjects/11-integration/c3-extensibility/s4-plugin-lifecycle.jsx')),

  // Subject 12 — Production
  'production/c1-testing/s1-testing-tools': lazy(() => import('../subjects/12-production/c1-testing/s1-testing-tools.jsx')),
  'production/c1-testing/s2-e2e-testing': lazy(() => import('../subjects/12-production/c1-testing/s2-e2e-testing.jsx')),
  'production/c1-testing/s3-multi-turn-tests': lazy(() => import('../subjects/12-production/c1-testing/s3-multi-turn-tests.jsx')),
  'production/c1-testing/s4-adversarial-testing': lazy(() => import('../subjects/12-production/c1-testing/s4-adversarial-testing.jsx')),
  'production/c2-observability/s1-telemetry': lazy(() => import('../subjects/12-production/c2-observability/s1-telemetry.jsx')),
  'production/c2-observability/s2-cost-monitoring': lazy(() => import('../subjects/12-production/c2-observability/s2-cost-monitoring.jsx')),
  'production/c2-observability/s3-session-replay': lazy(() => import('../subjects/12-production/c2-observability/s3-session-replay.jsx')),
  'production/c2-observability/s4-health-checks': lazy(() => import('../subjects/12-production/c2-observability/s4-health-checks.jsx')),
  'production/c3-principles/s1-do-what-asked': lazy(() => import('../subjects/12-production/c3-principles/s1-do-what-asked.jsx')),
  'production/c3-principles/s2-respect-patterns': lazy(() => import('../subjects/12-production/c3-principles/s2-respect-patterns.jsx')),
  'production/c3-principles/s3-clarity-over-cleverness': lazy(() => import('../subjects/12-production/c3-principles/s3-clarity-over-cleverness.jsx')),
  'production/c3-principles/s4-default-to-asking': lazy(() => import('../subjects/12-production/c3-principles/s4-default-to-asking.jsx')),
  'production/c3-principles/s5-measure-twice': lazy(() => import('../subjects/12-production/c3-principles/s5-measure-twice.jsx')),
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function AgentIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 dark:text-indigo-700" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <line x1="12" y1="7" x2="12" y2="11" />
      <line x1="7" y1="16" x2="7" y2="16" strokeWidth="2.5" />
      <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2.5" />
      <line x1="17" y1="16" x2="17" y2="16" strokeWidth="2.5" />
    </svg>
  )
}

function ComingSoonPlaceholder({ section }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 px-8 py-16 text-center dark:border-indigo-800/40 dark:bg-indigo-950/10"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <AgentIcon />
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Content Being Prepared
        </h2>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          The interactive content for{' '}
          <strong className="font-semibold text-gray-700 dark:text-gray-300">
            {section.title}
          </strong>{' '}
          is being prepared. It will include clear concept explanations, practical analogies,
          hands-on exercises, and best practices from real-world agent deployments.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {['Concepts', 'Analogies', 'Exercises', 'Best Practices'].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function PrerequisiteBanner({ section, subjectId, chapterId }) {
  if (!section?.buildsOn) return null
  const prereq = resolveBuildsOn(section.buildsOn)
  if (!prereq) return null

  const isSameSubject = prereq.subjectId === subjectId
  const href = `/subjects/${prereq.subjectId}/${prereq.chapterId}/${prereq.sectionId}`

  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-950/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
        <span className="font-medium">Builds on: </span>
        <Link
          to={href}
          className="underline decoration-amber-400/60 underline-offset-2 hover:decoration-amber-600 dark:decoration-amber-600/60 dark:hover:decoration-amber-400 transition-colors"
        >
          {prereq.title}
        </Link>
        {!isSameSubject && (
          <span className="ml-1 text-amber-700 dark:text-amber-400/80">
            ({prereq.subjectTitle})
          </span>
        )}
      </div>
    </div>
  )
}

function SectionContent({ subjectId, chapterId, sectionId, section }) {
  const key = `${subjectId}/${chapterId}/${sectionId}`
  const ContentComponent = CONTENT_REGISTRY[key]
  if (ContentComponent) {
    return (
      <Suspense fallback={<div className="py-16 text-center text-gray-400">Loading content…</div>}>
        <ContentComponent />
      </Suspense>
    )
  }
  return <ComingSoonPlaceholder section={section} />
}

export default function SectionPage() {
  const { subjectId, chapterId, sectionId } = useParams()
  const { isComplete, markComplete } = useProgress()

  const subject = getCurriculumById(subjectId)
  const chapter = getChapterById(subjectId, chapterId)
  const section = getSectionById(subjectId, chapterId, sectionId)
  const done = isComplete(subjectId, chapterId, sectionId)

  if (!subject || !chapter || !section) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-5xl" aria-hidden="true">🤖</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Section Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Could not find section "{sectionId}".
        </p>
        <Link
          to="/"
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const { prev, next } = getAdjacentSections(subjectId, chapterId, sectionId)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: subject.title, href: `/subjects/${subjectId}` },
    { label: chapter.title, href: `/subjects/${subjectId}/${chapterId}` },
    { label: section.title },
  ]

  function handleMarkComplete() {
    if (!done) {
      markComplete(subjectId, chapterId, sectionId)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Section Header */}
      <div
        className="relative border-b border-gray-200 dark:border-gray-800"
        style={{ background: `linear-gradient(135deg, ${subject.colorHex}10 0%, transparent 50%)` }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ backgroundColor: subject.colorHex }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-3xl px-6 py-8 pl-10">
          <Breadcrumbs items={breadcrumbs} />

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl leading-snug">
              {section.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <DifficultyBadge level={section.difficulty} />
              {section.readingMinutes && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon />
                  {section.readingMinutes} min read
                </span>
              )}
              {done && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <CheckIcon />
                  Completed
                </span>
              )}
            </div>

            {section.description && (
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {section.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Prerequisite banner */}
        <PrerequisiteBanner section={section} subjectId={subjectId} chapterId={chapterId} />

        {/* Dynamically loaded content or "Coming Soon" */}
        <SectionContent
          subjectId={subjectId}
          chapterId={chapterId}
          sectionId={sectionId}
          section={section}
        />

        {/* Mark as complete */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleMarkComplete}
            disabled={done}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
              done
                ? 'cursor-default bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
            aria-label={done ? 'Section already marked complete' : 'Mark this section as complete'}
          >
            {done ? (
              <>
                <CheckIcon />
                Marked as Complete
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>

        {/* Prev / Next navigation */}
        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  )
}
