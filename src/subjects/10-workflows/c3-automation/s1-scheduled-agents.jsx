import ConceptBlock from '../../../components/content/ConceptBlock'
import AnalogyBlock from '../../../components/content/AnalogyBlock'
import PrincipleBlock from '../../../components/content/PrincipleBlock'
import WarningBlock from '../../../components/content/WarningBlock'
import ExerciseBlock from '../../../components/content/ExerciseBlock'

export default function ScheduledAgents() {
  return (
    <div className="prose-agents">
      <h2>Scheduled Agents</h2>
      <p>
        Not every agent task is triggered by a human in the moment. Some tasks need
        to happen regularly — every morning, every hour, every Monday. Scheduled agents
        run on a timer, executing recurring workflows without requiring someone to
        remember to start them. They are the heartbeat of an automated development
        practice.
      </p>

      <ConceptBlock title="Scheduled Agent" number="10.9">
        <p>
          A scheduled agent is an agent configured to execute a specific skill or workflow
          at predetermined intervals. The schedule is typically defined using cron-style
          expressions that specify when the agent runs. Scheduled agents operate without
          human initiation — they wake up, perform their task, report results, and go
          dormant until the next scheduled run. They are ideal for tasks that must happen
          consistently regardless of whether anyone remembers to trigger them.
        </p>
      </ConceptBlock>

      <AnalogyBlock title="The Night Security Guard">
        <p>
          A night security guard walks the same patrol route at regular intervals — not
          because something has gone wrong, but because consistent monitoring prevents
          problems from growing undetected. A scheduled agent serves the same function:
          it patrols the codebase, the infrastructure, or the project status at regular
          intervals, catching issues early before they compound into crises.
        </p>
      </AnalogyBlock>

      <p>
        The power of scheduled agents lies in consistency. Humans are unreliable at
        recurring tasks — they forget, they get busy, they skip a week. Scheduled
        agents never forget. But this reliability creates its own risks: a misconfigured
        scheduled agent produces incorrect results just as reliably as a correct one
        produces good results. The damage from a bad scheduled agent compounds over time.
      </p>

      <PrincipleBlock title="Scheduled Agents Need Monitoring, Not Just Scheduling" number="10.7">
        <p>
          Setting up a schedule is the easy part. The hard part is ensuring the scheduled
          agent continues to produce correct, useful results over time. Every scheduled
          agent needs a monitoring layer that tracks: did it run? Did it succeed? Were
          the results consistent with expectations? Did it take an unusual amount of time?
          An unmonitored scheduled agent is an assumption that everything is fine — and
          assumptions degrade.
        </p>
      </PrincipleBlock>

      <WarningBlock title="Schedule creep wastes resources silently">
        <p>
          Teams tend to add scheduled agents but rarely remove them. Over months, the
          schedule fills with agents running tasks that are no longer relevant — checking
          deprecated services, generating reports nobody reads, scanning repositories
          that have been archived. Periodically audit scheduled agents and remove those
          that no longer serve a purpose. Every scheduled agent should have an owner
          and a justification for continued operation.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Exercises"
        exercises={[
          {
            id: 'sa-1',
            difficulty: 'beginner',
            question: 'A team wants a scheduled agent that checks for outdated dependencies every Monday morning. What information should the agent report, and who should receive the report?',
            hint: 'Think about what makes a dependency report actionable versus just noisy.',
            solution: 'The agent should report: (1) dependencies with available updates, categorized by severity (security patches vs. minor updates vs. major version changes), (2) how far behind each dependency is (one version vs. twenty), (3) whether any outdated dependency has known security vulnerabilities. The report should go to the team\'s primary communication channel and specifically mention the team member responsible for dependency maintenance. A report that lists every available update equally is noisy; a report that highlights security-critical updates and ranks others by staleness is actionable. The Monday timing gives the team a full work week to address issues.'
          },
          {
            id: 'sa-2',
            difficulty: 'intermediate',
            question: 'A scheduled agent runs every hour to check system health. One night, the system it monitors goes down, and the agent generates 8 consecutive failure alerts before anyone responds. How should the scheduling system handle repeated identical failures?',
            hint: 'Think about alert fatigue and escalation strategies.',
            solution: 'The scheduling system should implement alert deduplication and escalation. (1) First failure: send a standard alert to the on-call channel. (2) Second consecutive identical failure: mark the alert as "persistent" and escalate to the on-call individual directly. (3) Third and subsequent: suppress duplicate alerts but maintain a running counter. Send a single summary every N failures (e.g., "System health check has failed 8 consecutive times since 11 PM — issue remains unresolved"). (4) When the check finally succeeds: send a recovery notification with the total downtime duration. This prevents alert fatigue while ensuring the issue is escalated appropriately. The key principle is that repeated identical alerts carry no new information — escalation and summarization carry the signal without the noise.'
          }
        ]}
      />
    </div>
  )
}
