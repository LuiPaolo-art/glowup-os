/**
 * GlowUp OS — Dynamic daily report generator
 * Pure function: same input → same output. No side-effects, no store dependency.
 */
import type { CoachReport } from '@/types/coach'
import type { Task } from '@/types/daily'
import type { Exercise } from '@/types/sport'
import type { DomainScores } from '@/types/learning'

export interface ReportInput {
  tasks: Task[]
  exercises: Exercise[]
  domainScores: DomainScores
  globalScore: number
  globalScoreDelta: number
  streak: number
  water: number
  bookPage: number
  bookTotal: number
  bookTitle: string
  sportDone: boolean
  systemState: string
}

export function generateDailyReport(i: ReportInput): CoachReport {
  const done      = i.tasks.filter(t => t.done).length
  const total     = i.tasks.length
  const pct       = total > 0 ? Math.round((done / total) * 100) : 0
  const prayers   = i.tasks.filter(t => ['fajr', 'prayers', 'prayers2'].includes(t.id))
  const pDone     = prayers.filter(t => t.done).length
  const pLeft     = i.bookTotal - i.bookPage
  const daysLeft  = Math.ceil(pLeft / 15)
  const bookPct   = Math.round((i.bookPage / i.bookTotal) * 100)

  // Weakest domain
  const ranked = (
    [
      ['Sport', i.domainScores.sport],
      ['Apprentissage', i.domainScores.learning],
      ['Discipline', i.domainScores.discipline],
      ['Constance', i.domainScores.constancy],
    ] as [string, number][]
  ).sort(([, a], [, b]) => a - b)
  const [weakestName, weakestScore] = ranked[0]

  // Exercises ready for level-up
  const ready = i.exercises.filter(ex => ex.canLevelUp && ex.currentLevel < ex.maxLevel)

  // ── Constat ──────────────────────────────────────────────────────
  const constat = [
    `${pct}% de complétion · ${done}/${total} tâches.`,
    `Sport : ${i.sportDone ? 'fait ✓' : 'non fait ✗'}.`,
    `Lecture : p.${i.bookPage}/${i.bookTotal} (${bookPct}%) de "${i.bookTitle}".`,
    `Eau : ${i.water}/8. Prières : ${pDone}/${prayers.length}.`,
  ].join(' ')

  // ── Analyse ──────────────────────────────────────────────────────
  const pts: string[] = []

  if (i.domainScores.sport >= 65)
    pts.push(`Sport solide (${i.domainScores.sport}/100).`)
  else
    pts.push(`Sport à renforcer (${i.domainScores.sport}/100)${!i.sportDone ? ' — séance du jour manquante' : ''}.`)

  if (i.domainScores.learning >= 50)
    pts.push(`Lecture en bonne voie (${i.domainScores.learning}/100).`)
  else
    pts.push(`Lecture en retard (${i.domainScores.learning}/100) — finissable dans ${daysLeft}j à 15p/j.`)

  if (ready.length > 0)
    pts.push(`Niveau suivant disponible : ${ready.map(e => e.name).join(', ')}.`)

  pts.push(`Point faible de la semaine : ${weakestName} (${weakestScore}/100).`)

  const analyse = pts.join(' ')

  // ── 3 Actions ────────────────────────────────────────────────────
  const actions: string[] = []

  // Action 1 — sport
  if (!i.sportDone)
    actions.push(`Démarre ta séance Push maintenant. 45 min suffisent. Le chrono t'attend.`)
  else
    actions.push(`Sport fait. Récupère bien — prochaine séance dans 2 jours.`)

  // Action 2 — lecture / apprentissage
  if (i.domainScores.learning < 50)
    actions.push(`Lis 15 pages de "${i.bookTitle}" avant 22h. Tu passeras à p.${i.bookPage + 15}/${i.bookTotal}.`)
  else
    actions.push(`Continue la lecture — ${pLeft} pages restantes, finissable dans ${daysLeft} jours.`)

  // Action 3 — eau / prières / streak
  if (i.water < 6)
    actions.push(`Bois ${8 - i.water} verres supplémentaires avant ce soir (${i.water}/8 actuellement).`)
  else if (pDone < prayers.length)
    actions.push(`Il reste ${prayers.length - pDone} prière${prayers.length - pDone > 1 ? 's' : ''} aujourd'hui.`)
  else
    actions.push(`Streak ${i.streak} jours. Maintiens 65%+ pour rester en mode Performance.`)

  // ── Défi ─────────────────────────────────────────────────────────
  let defi: string

  if (!i.sportDone)
    defi = `Complète ta séance Push en moins de 65 min et évalue-la honnêtement.`
  else if (i.domainScores.learning < i.domainScores.sport - 20)
    defi = `Lis 20 pages ce soir (au lieu de 15) — rattraper l'écart apprentissage / sport en une session.`
  else if (ready.length > 0)
    defi = `Débloque le niveau suivant de "${ready[0].name}" à ta prochaine séance.`
  else
    defi = `Termine les 3 Non-Négociables avant midi. Ça définit la journée dès le matin.`

  // ── Alerte (mode non-vert) ────────────────────────────────────────
  const alert =
    i.systemState !== 'green'
      ? `Mode ${i.systemState === 'yellow' ? 'Adaptatif' : 'Reprise'} actif — discipline ${i.domainScores.discipline}/100. Focus sur les Non-Négociables uniquement.`
      : undefined

  // ── Retour ───────────────────────────────────────────────────────
  return {
    id: `report-${new Date().toISOString().split('T')[0]}`,
    date: new Date().toISOString().split('T')[0],
    constat,
    analyse,
    actions,
    defi,
    alert,
    metrics: {
      completionRate: pct / 100,
      sportDone: i.sportDone,
      pagesRead: i.bookPage,
      water: i.water,
      prayers: pDone,
      score: i.globalScore,
      scoreDelta: i.globalScoreDelta,
    },
  }
}
