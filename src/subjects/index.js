import { subject as s1 } from './01-thinking-in-agents/meta.js'
import { subject as s2 } from './02-tools/meta.js'
import { subject as s3 } from './03-trust-and-safety/meta.js'
import { subject as s4 } from './04-agent-runtime/meta.js'
import { subject as s5 } from './05-prompt-engineering/meta.js'
import { subject as s6 } from './06-state-and-memory/meta.js'
import { subject as s7 } from './07-delegation/meta.js'
import { subject as s8 } from './08-teams-coordination/meta.js'
import { subject as s9 } from './09-protocols/meta.js'
import { subject as s10 } from './10-workflows/meta.js'
import { subject as s11 } from './11-integration/meta.js'
import { subject as s12 } from './12-production/meta.js'

export const CURRICULUM = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12]
export default CURRICULUM

export function getCurriculumById(id) {
  return CURRICULUM.find((s) => s.id === id) || null
}

export function getChapterById(subjectId, chapterId) {
  return getCurriculumById(subjectId)?.chapters?.find((c) => c.id === chapterId) || null
}

export function getSectionById(subjectId, chapterId, sectionId) {
  return getChapterById(subjectId, chapterId)?.sections?.find((s) => s.id === sectionId) || null
}

export function getSubjectSectionCount(subjectId) {
  const s = getCurriculumById(subjectId)
  if (!s) return 0
  return s.chapters?.reduce((a, c) => a + (c.sections?.length || 0), 0) || 0
}

export function getAdjacentSections(subjectId, chapterId, sectionId) {
  const flat = []
  for (const subj of CURRICULUM) {
    for (const ch of subj.chapters || []) {
      for (const sec of ch.sections || []) {
        flat.push({ subjectId: subj.id, chapterId: ch.id, sectionId: sec.id, title: sec.title, subjectTitle: subj.title })
      }
    }
  }
  const i = flat.findIndex((f) => f.subjectId === subjectId && f.chapterId === chapterId && f.sectionId === sectionId)
  if (i === -1) return { prev: null, next: null }
  const prev = i > 0 ? { ...flat[i - 1], crossesSubject: flat[i - 1].subjectId !== subjectId } : null
  const next = i < flat.length - 1 ? { ...flat[i + 1], crossesSubject: flat[i + 1].subjectId !== subjectId } : null
  return { prev, next }
}

export function resolveBuildsOn(str) {
  if (!str) return null
  const [subjectId, chapterId, sectionId] = str.split('/')
  const section = getSectionById(subjectId, chapterId, sectionId)
  if (!section) return null
  return { subjectId, chapterId, sectionId, title: section.title, subjectTitle: getCurriculumById(subjectId)?.title || subjectId }
}
