'use client'

import { PageHeader }        from '@/components/layout/PageHeader'
import { DomainScoresGrid }  from '@/components/progression/DomainScoresGrid'
import { BookCard }          from '@/components/progression/BookCard'
import { ArcCard }           from '@/components/progression/ArcCard'
import { SportCard }         from '@/components/progression/SportCard'
import { HeatmapCalendar }   from '@/components/progression/HeatmapCalendar'
import { SectionLabel }      from '@/components/ui/Divider'
import { Badge }             from '@/components/ui/Badge'
import { QcmModal, QcmTrigger } from '@/components/qcm/QcmModal'
import { useStore } from '@/lib/store'
import {
  MOCK_BOOKS, MOCK_ARCS,
  MOCK_SPORT_WEEK, MOCK_HEATMAP,
  QCM_ATOMIC_HABITS,
} from '@/lib/mock-data'
import type { BookProgress } from '@/types/learning'

export default function ProgressionPage() {
  const { user, bookPage, addPages, openQcm, exercises, levelUp, domainScores, sessionBaseScores,
          bookQcmPassed, bookQcmScore, arcQcmScores, currentBookIndex, unlockedBookIds } = useStore()

  const book     = MOCK_BOOKS[currentBookIndex] ?? MOCK_BOOKS[0]
  const progress: BookProgress = {
    bookId:       book.id,
    currentPage:  bookPage,
    isComplete:   bookPage >= book.totalPages,
    qcmPassed:    bookQcmPassed,
    qcmScore:     bookQcmScore ?? undefined,
  }

  // Score deltas relative to session start (0 at load, updates as user acts)
  const deltas = {
    sport:      domainScores.sport      - sessionBaseScores.sport,
    learning:   domainScores.learning   - sessionBaseScores.learning,
    discipline: domainScores.discipline - sessionBaseScores.discipline,
    constancy:  domainScores.constancy  - sessionBaseScores.constancy,
  }

  // Dynamic "prochains déblocages" from store exercises + active arc
  type Unlock = { label: string; val: string; ok: boolean }
  const nextUnlocks: Unlock[] = []

  // 1. Exercises ready to level up
  exercises
    .filter(ex => ex.canLevelUp && ex.currentLevel < ex.maxLevel)
    .forEach(ex => nextUnlocks.push({
      label: `${ex.name} → Niv. ${ex.currentLevel + 2}`,
      val: 'Prêt !', ok: true,
    }))

  // 2. Exercises closest to unlocking (top 2, not yet ready)
  exercises
    .filter(ex => !ex.canLevelUp && ex.currentLevel < ex.maxLevel)
    .sort((a, b) => {
      const ra = a.currentLevel >= 1 ? 7 : 5
      const rb = b.currentLevel >= 1 ? 7 : 5
      return (b.sessionsAtLevel / rb) - (a.sessionsAtLevel / ra)
    })
    .slice(0, 2)
    .forEach(ex => {
      const req = ex.currentLevel >= 1 ? 7 : 5
      const rem = req - ex.sessionsAtLevel
      nextUnlocks.push({
        label: `${ex.name} → Niv. ${ex.currentLevel + 2} — ${rem} séance${rem > 1 ? 's' : ''} restante${rem > 1 ? 's' : ''}`,
        val: `${ex.sessionsAtLevel}/${req}`, ok: false,
      })
    })

  // 3. Active arc lesson progress
  MOCK_ARCS
    .filter(a => a.status === 'active')
    .forEach(arc => {
      const done  = arc.lessons.filter(l => l.done).length
      const total = arc.lessons.length
      nextUnlocks.push({
        label: `Arc ${arc.num} — ${done}/${total} leçons · QCM final`,
        val: `${done}/${total}`, ok: done === total,
      })
    })

  const topUnlocks = nextUnlocks.slice(0, 3)

  return (
    <div className="min-h-screen bg-s0">
      <QcmModal />

      <PageHeader
        title="Progression"
        subtitle={`Cycle 1 · Semaine ${user.cycle.week} · ${user.cycle.phase}`}
        right={
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-semibold text-gold">{user.globalScore}</span>
            <span className="text-[11px] font-medium text-state-green">+{user.globalScoreDelta}</span>
          </div>
        }
      />

      {/* Scores */}
      <SectionLabel>Scores par domaine</SectionLabel>
      <DomainScoresGrid scores={domainScores} deltas={deltas} />

      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl px-4 py-3">
        <p className="text-[9px] text-t4 uppercase tracking-widest mb-2.5">Prochains déblocages</p>
        {topUnlocks.length === 0 ? (
          <p className="text-xs text-t4">Aucun déblocage disponible.</p>
        ) : (
          <div className="space-y-2">
            {topUnlocks.map((u, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={u.ok ? 'text-state-green' : 'text-t4'}>{u.ok ? '✓' : '○'}</span>
                <span className="text-xs text-t2 flex-1">{u.label}</span>
                <Badge variant={u.ok ? 'success' : 'default'}>{u.val}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book */}
      <SectionLabel>Lecture en cours</SectionLabel>
      <div className="mx-5 mb-3">
        <BookCard
          book={book}
          progress={progress}
          current
          onAddPages={progress.isComplete ? undefined : addPages}
          onOpenQcm={progress.isComplete && !bookQcmPassed
            ? () => openQcm('book', book.id, QCM_ATOMIC_HABITS)
            : undefined
          }
        />
      </div>

      {/* Books list */}
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-s2">
          <p className="text-[9px] text-t4 uppercase tracking-widest">Ordre de lecture · 0/{MOCK_BOOKS.length} terminés</p>
        </div>
        <div className="divide-y divide-s2">
        {MOCK_BOOKS.map((b, i) => {
            const isCurrent    = i === currentBookIndex
            const isUnlocked   = unlockedBookIds.includes(b.id)
            const isCompleted  = isUnlocked && i < currentBookIndex
            const prevBook     = i > 0 ? MOCK_BOOKS[i - 1] : null
            return (
              <div key={b.id} className={`flex items-center gap-3 px-4 py-3 ${!isUnlocked ? 'opacity-30' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${
                  isCompleted ? 'bg-gold text-black' : isCurrent ? 'border border-gold text-gold' : 'border border-s4 text-t4'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${isCurrent ? 'text-t1' : isCompleted ? 'text-t3' : 'text-t3'}`}>{b.title}</p>
                  <p className="text-[10px] text-t4">
                    {b.author} · {b.totalPages}p
                    {!isUnlocked && prevBook && (
                      <span className="ml-1">· Valide « {prevBook.title} » pour débloquer</span>
                    )}
                  </p>
                </div>
                {isCurrent && <Badge variant="gold">En cours</Badge>}
                {isCompleted && <Badge variant="success">✓</Badge>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Arcs */}
      <SectionLabel>Arcs d'apprentissage</SectionLabel>
      <div className="mx-5 mb-4 space-y-2.5">
        {MOCK_ARCS.map(arc => (
          <ArcCard
            key={arc.id}
            arc={{ ...arc, finalQcmScore: arcQcmScores[arc.id] ?? arc.finalQcmScore }}
            onOpenQcm={arc.id === 'arc-1'
              ? (phase) => openQcm(
                  phase === 'pre' ? 'arc-pre' : 'arc-final',
                  arc.id,
                  QCM_ARC1_FINAL
                )
              : undefined
            }
          />
        ))}
      </div>

      {/* Sport */}
      <SectionLabel className="mt-1">Sport · Calisthénie</SectionLabel>
      <div className="mx-5 mb-4">
        <SportCard exercises={exercises} week={MOCK_SPORT_WEEK} onLevelUp={levelUp} />
      </div>

      {/* Heatmap */}
      <SectionLabel>Historique 28 jours</SectionLabel>
      <div className="mx-5 mb-4">
        <HeatmapCalendar data={MOCK_HEATMAP} />
      </div>

      <div className="h-4" />
    </div>
  )
}
