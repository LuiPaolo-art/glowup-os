'use client'

import { useRouter } from 'next/navigation'
import { TodayHeader }       from '@/components/today/TodayHeader'
import { DailyBar }          from '@/components/today/DailyBar'
import { HadithCard }        from '@/components/today/HadithCard'
import { CoachCard }         from '@/components/today/CoachCard'
import { WaterTracker }      from '@/components/today/WaterTracker'
import { TaskBlock }         from '@/components/today/TaskBlock'
import { SportSheet }        from '@/components/today/SportSheet'
import { DocuModal }         from '@/components/today/DocuModal'
import { SystemStateBanner } from '@/components/today/SystemStateBanner'
import { SectionLabel }      from '@/components/ui/Divider'
import { QcmModal }          from '@/components/qcm/QcmModal'
import { useStore, useStats } from '@/lib/store'
import { generateDailyReport } from '@/lib/report'
import type { Task, TaskPriority } from '@/types/daily'

// ── Yellow-mode label overrides ───────────────────────────────────
// When adaptive mode is active, some task sublabels show a reduced target.
const YELLOW_SUBLABELS: Record<string, string> = {
  lecture:      'Atomic Habits — 8 pages (mode adaptatif)',
  sport:        'Lun & Jeu · séance allégée — 2 exercices',
  journal:      '5 min (mode adaptatif)',
  documentaire: '~8 min · contenu court',
}

function applyYellowOverrides(tasks: Task[]): Task[] {
  return tasks.map(t =>
    YELLOW_SUBLABELS[t.id]
      ? { ...t, sublabel: YELLOW_SUBLABELS[t.id] }
      : t
  )
}

export default function TodayPage() {
  const router = useRouter()
  const {
    user, tasks, water, exercises,
    bookPage, domainScores, joiUsedToday,
    setWater, toggleTask, openSportSheet, useJOI, openDocuModal,
  } = useStore()

  const stats       = useStats()
  const state       = user.systemState

  // Apply yellow-mode sublabel overrides
  const displayTasks = state === 'yellow' ? applyYellowOverrides(tasks) : tasks
  const byPrio = (p: TaskPriority) => displayTasks.filter(t => t.priority === p)

  const report = generateDailyReport({
    tasks,
    exercises,
    domainScores,
    globalScore:      user.globalScore,
    globalScoreDelta: user.globalScoreDelta,
    streak:           user.streak.current,
    water,
    bookPage,
    bookTotal:  320,
    bookTitle:  'Atomic Habits',
    sportDone:  tasks.find(t => t.id === 'sport')?.done ?? false,
    systemState: state,
  })

  function handleToggle(id: string) {
    if (id === 'sport') { openSportSheet(); return }
    toggleTask(id)
  }

  function handleAction(id: string) {
    if (id === 'lecture')      router.push('/progression')
    if (id === 'sport')        openSportSheet()
    if (id === 'documentaire') openDocuModal()
  }

  return (
    <div className="min-h-screen bg-s0">
      <QcmModal />
      <SportSheet />
      <DocuModal />

      <TodayHeader user={user} stats={stats} />
      <DailyBar stats={stats} />
      <SystemStateBanner />

      {/* JOI actif */}
      {joiUsedToday && (
        <div className="mx-5 mb-3 bg-s1 border border-s3 rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-lg flex-shrink-0">⚡</span>
          <div className="flex-1">
            <p className="text-xs font-medium text-t1">Jour Off Intelligent activé</p>
            <p className="text-[10px] text-t4 mt-0.5">Streak maintenu · Reprends demain</p>
          </div>
          <span className="text-[10px] text-gold border border-gold-border rounded px-2 py-0.5">
            {user.joi.available} restants
          </span>
        </div>
      )}

      {/* Bouton JOI */}
      {!joiUsedToday && user.joi.available > 0 && state !== 'green' && (
        <div className="mx-5 mb-3">
          <button
            onClick={useJOI}
            className="w-full flex items-center justify-between bg-s1 border border-s3 rounded-2xl px-4 py-3 hover:border-s4 transition-colors group"
          >
            <div className="text-left">
              <p className="text-xs font-medium text-t2">Utiliser un JOI</p>
              <p className="text-[10px] text-t4 mt-0.5">
                Jour Off Intelligent · {user.joi.available} disponibles · Streak protégé
              </p>
            </div>
            <span className="text-t4 group-hover:text-t2 transition-colors">→</span>
          </button>
        </div>
      )}

      <HadithCard />
      <CoachCard report={report} />
      <WaterTracker initial={water} onUpdate={setWater} />

      {/* ── Mode rouge : non-négociables seulement ─────────────── */}
      {state === 'red' && (
        <>
          <SectionLabel className="mt-1">Non-négociables — Mode Reprise</SectionLabel>
          <div className="mx-5 mb-3 bg-state-red-bg border border-state-red-border rounded-2xl px-4 py-3">
            <p className="text-xs text-state-red font-medium mb-1">
              Concentre-toi uniquement sur l'essentiel aujourd'hui.
            </p>
            <p className="text-[10px] text-state-red/70 leading-relaxed">
              Les tâches importantes et bonus sont suspendues. Fais tes 3 non-négociables — c'est suffisant pour aujourd'hui.
            </p>
          </div>
          <TaskBlock
            priority="non-negotiable"
            tasks={byPrio('non-negotiable')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen
          />
        </>
      )}

      {/* ── Mode jaune : tout visible, bonus atténué ───────────── */}
      {state === 'yellow' && (
        <>
          <SectionLabel className="mt-1">Plan du jour — Mode Adaptatif</SectionLabel>
          <TaskBlock
            priority="non-negotiable"
            tasks={byPrio('non-negotiable')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen
          />
          <TaskBlock
            priority="important"
            tasks={byPrio('important')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen
          />
          {/* Bonus visually dimmed */}
          <div className="opacity-50 pointer-events-none select-none" aria-hidden>
            <TaskBlock
              priority="bonus"
              tasks={byPrio('bonus')}
              onToggle={() => {}}
              defaultOpen={false}
            />
          </div>
          <p className="px-5 mb-3 text-[10px] text-t4">
            Les tâches bonus sont désactivées en mode adaptatif.
          </p>
        </>
      )}

      {/* ── Mode vert : affichage complet normal ───────────────── */}
      {state === 'green' && (
        <>
          <SectionLabel className="mt-1">Plan du jour</SectionLabel>
          <TaskBlock
            priority="non-negotiable"
            tasks={byPrio('non-negotiable')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen
          />
          <TaskBlock
            priority="important"
            tasks={byPrio('important')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen
          />
          <TaskBlock
            priority="bonus"
            tasks={byPrio('bonus')}
            onToggle={handleToggle}
            onAction={handleAction}
            defaultOpen={false}
          />
        </>
      )}

      <div className="h-4" />
    </div>
  )
}
