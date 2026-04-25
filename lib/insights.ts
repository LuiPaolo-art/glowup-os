/**
 * GlowUp OS — Dynamic insights generator
 * Pure function. Produces up to 4 insights ordered by severity.
 */
import type { CoachInsight } from '@/types/coach'
import type { ReportInput }  from '@/lib/report'

const SEVERITY: Record<CoachInsight['type'], number> = {
  critical: 0,
  warning:  1,
  neutral:  2,
  positive: 3,
}

export function generateInsights(i: ReportInput): CoachInsight[] {
  const out: CoachInsight[] = []
  const prayers    = i.tasks.filter(t => ['fajr', 'prayers', 'prayers2'].includes(t.id))
  const prayerDone = prayers.filter(t => t.done).length
  const bookPct    = Math.round((i.bookPage / i.bookTotal) * 100)
  const daysLeft   = Math.ceil((i.bookTotal - i.bookPage) / 15)
  const ready      = i.exercises.filter(ex => ex.canLevelUp && ex.currentLevel < ex.maxLevel)

  // ── Sport score critique ──────────────────────────────────────────
  if (i.domainScores.sport < 50 && !i.sportDone) {
    out.push({
      id: 'sport-critical',
      icon: '⚠️',
      type: 'critical',
      text: `Sport ${i.domainScores.sport}/100 — en dessous de 50. Séance manquante aujourd'hui. Sans action, le score continue de baisser.`,
      metricLabel: 'Sport',
      metricValue: `${i.domainScores.sport}/100`,
    })
  }

  // ── Hydratation ────────────────────────────────────────────────────
  if (i.water < 6) {
    out.push({
      id: 'water',
      icon: '💧',
      type: 'warning',
      text: `Hydratation : ${i.water}/8 verres. En dessous de 6, la concentration chute de 15-20%. Objectif : ${8 - i.water} verres supplémentaires.`,
      metricLabel: 'Eau',
      metricValue: `${i.water}/8`,
    })
  }

  // ── Lecture en retard ──────────────────────────────────────────────
  if (i.domainScores.learning < 45) {
    out.push({
      id: 'reading-late',
      icon: '📖',
      type: 'warning',
      text: `Lecture en retard (${i.domainScores.learning}/100) — "${i.bookTitle}" à ${bookPct}%. Finissable dans ${daysLeft}j à 15 pages/jour.`,
      metricLabel: 'Apprentissage',
      metricValue: `${i.domainScores.learning}/100`,
    })
  }

  // ── Niveau sport disponible ────────────────────────────────────────
  if (ready.length > 0) {
    out.push({
      id: 'level-up',
      icon: '🏋️',
      type: 'positive',
      text: `Déblocage disponible : ${ready.map(e => e.name).join(', ')}. Ouvre la page Sport pour valider.`,
      metricLabel: 'Niveaux prêts',
      metricValue: `${ready.length}`,
    })
  }

  // ── Prières ────────────────────────────────────────────────────────
  if (prayers.length > 0) {
    const allDone = prayerDone === prayers.length
    out.push({
      id: 'prayers',
      icon: '🕌',
      type: allDone ? 'positive' : prayerDone >= Math.ceil(prayers.length / 2) ? 'neutral' : 'warning',
      text: allDone
        ? `Prières : ${prayerDone}/${prayers.length} — toutes faites aujourd'hui ✓.`
        : `Prières : ${prayerDone}/${prayers.length} aujourd'hui. ${prayers.length - prayerDone} restante${prayers.length - prayerDone > 1 ? 's' : ''}.`,
      metricLabel: 'Prières',
      metricValue: `${prayerDone}/${prayers.length}`,
    })
  }

  // ── Streak milestone ──────────────────────────────────────────────
  if (i.streak > 0 && i.streak % 7 === 0) {
    out.push({
      id: 'streak-milestone',
      icon: '🔥',
      type: 'positive',
      text: `Streak ${i.streak} jours — ${i.streak / 7} semaine${i.streak / 7 > 1 ? 's' : ''} consécutive${i.streak / 7 > 1 ? 's' : ''} de régularité.`,
      metricLabel: 'Streak',
      metricValue: `${i.streak}j`,
    })
  }

  // ── Sport solide (pas déjà dans critical) ──────────────────────────
  if (i.domainScores.sport >= 65 && i.sportDone) {
    out.push({
      id: 'sport-solid',
      icon: '💪',
      type: 'positive',
      text: `Sport ${i.domainScores.sport}/100 — séance du jour faite. Maintiens le rythme.`,
      metricLabel: 'Sport',
      metricValue: `${i.domainScores.sport}/100`,
    })
  }

  // Sort by severity, cap at 4
  return out
    .sort((a, b) => SEVERITY[a.type] - SEVERITY[b.type])
    .slice(0, 4)
}
