/**
 * GlowUp OS — Score computation (pure functions, no store dependency)
 *
 * In production these would use 7/14/28-day server-side data.
 * Here they compute from the current session state, giving live feedback.
 */
import type { Task } from '@/types/daily'
import type { Exercise } from '@/types/sport'
import type { DomainScores } from '@/types/learning'

// ── Sport (0-100) ─────────────────────────────────────────────────
// A — session readiness: avg(sessionsAtLevel / required) → 60 pts
// B — level progression: each unlocked level → +8 pts
export function computeSportScore(exercises: Exercise[]): number {
  if (!exercises.length) return 0
  const avgReadiness = exercises.reduce((sum, ex) => {
    const req = ex.currentLevel >= 1 ? 7 : 5
    return sum + ex.sessionsAtLevel / req
  }, 0) / exercises.length
  const levelBonus = exercises.reduce((sum, ex) => sum + ex.currentLevel * 8, 0)
  return Math.min(100, Math.round(avgReadiness * 60 + levelBonus))
}

// ── Learning (0-100) ──────────────────────────────────────────────
// A — reading progress → up to 60 pts
// B — QCM bonus → up to 30 pts (or proportional estimate if not passed)
export function computeLearningScore(
  bookPage: number,
  bookTotal: number,
  qcmPassed = false,
): number {
  const pct  = bookTotal > 0 ? bookPage / bookTotal : 0
  const read = Math.round(pct * 60)
  const qcm  = qcmPassed ? 30 : Math.round(pct * 15)
  return Math.min(100, read + qcm)
}

// ── Discipline (0-100) ────────────────────────────────────────────
// A — non-negotiable completion → 60 pts (highest weight: these define the day)
// B — all-tasks completion → 30 pts
// C — streak bonus → up to 10 pts
export function computeDisciplineScore(tasks: Task[], streak: number): number {
  const nn      = tasks.filter(t => t.priority === 'non-negotiable')
  const nnDone  = nn.filter(t => t.done).length
  const allDone = tasks.filter(t => t.done).length

  const nnScore    = nn.length > 0 ? (nnDone / nn.length) * 60 : 60
  const allScore   = tasks.length > 0 ? (allDone / tasks.length) * 30 : 0
  const streakBonus = Math.min(10, streak / 3)

  return Math.min(100, Math.round(nnScore + allScore + streakBonus))
}

// ── Constancy (0-100) ─────────────────────────────────────────────
// A — prayer completion today → up to 50 pts
// B — streak depth → up to 50 pts (21 days = full score)
export function computeConstancyScore(tasks: Task[], streak: number): number {
  const PRAYER_IDS = ['fajr', 'prayers', 'prayers2']
  const prayers    = tasks.filter(t => PRAYER_IDS.includes(t.id))
  const prayerDone = prayers.filter(t => t.done).length

  const prayerScore = prayers.length > 0
    ? Math.round((prayerDone / prayers.length) * 50)
    : 25  // neutral if no prayer tasks present

  const streakScore = Math.min(50, Math.round((streak / 21) * 50))

  return Math.min(100, prayerScore + streakScore)
}

// ── Global (0-100) ────────────────────────────────────────────────
// Weights: Discipline 30% · Sport 25% · Learning 25% · Constancy 20%
export function computeGlobalScore(d: Omit<DomainScores, 'global'>): number {
  return Math.round(
    d.discipline * 0.30 +
    d.sport      * 0.25 +
    d.learning   * 0.25 +
    d.constancy  * 0.20,
  )
}

// ── All scores at once ────────────────────────────────────────────
export function computeAllScores(
  tasks: Task[],
  exercises: Exercise[],
  bookPage: number,
  bookTotal: number,
  streak: number,
  bookQcmPassed = false,
): DomainScores {
  const sport       = computeSportScore(exercises)
  const learning    = computeLearningScore(bookPage, bookTotal, bookQcmPassed)
  const discipline  = computeDisciplineScore(tasks, streak)
  const constancy   = computeConstancyScore(tasks, streak)
  const global      = computeGlobalScore({ sport, learning, discipline, constancy })
  return { sport, learning, discipline, constancy, global }
}
