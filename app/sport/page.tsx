'use client'

import { PageHeader }    from '@/components/layout/PageHeader'
import { SectionLabel }  from '@/components/ui/Divider'
import { SportTimer }    from '@/components/sport/SportTimer'
import { ExerciseList }  from '@/components/sport/ExerciseList'
import { Pips }          from '@/components/ui/ProgressBar'
import { useStore }      from '@/lib/store'
import { MOCK_SPORT_WEEK } from '@/lib/mock-data'
import { SPORT_PLAN }    from '@/types/sport'

const TODAY_TYPE = SPORT_PLAN[new Date().getDay()]
const LABELS: Record<string, string> = { push: 'Push — Haut du corps', legs: 'Legs — Bas du corps', rest: 'Repos actif — Marche 20 min' }

export default function SportPage() {
  const { timer, eval: ev, exercises, levelUp } = useStore()
  const { done, planned, fullCount, avgDuration } = MOCK_SPORT_WEEK

  const sessionDone = ev.submitted
  const sessionActive = timer.running || timer.elapsed > 0

  return (
    <div className="min-h-screen bg-s0">
      <PageHeader
        title="Sport"
        subtitle="Calisthénie · Programme Push / Legs"
        right={
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-t1">{done}/{planned}</p>
              <p className="text-[9px] text-t4">séances 7j</p>
            </div>
          </div>
        }
      />

      {/* Week stats */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Séances', value: `${done}/${planned}`, color: done >= planned ? '#5ACA9A' : '#C9A84C' },
          { label: 'Complètes', value: `${fullCount}`, color: '#C9A84C' },
          { label: 'Durée moy.', value: `${avgDuration}min`, color: '#6BA4D4' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-s1 border border-s3 rounded-xl px-3 py-3 text-center">
            <p className="text-lg font-semibold" style={{ color }}>{value}</p>
            <p className="text-[9px] text-t4 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Today plan */}
      <SectionLabel>Séance du jour</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-s2 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-0.5">
              {['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][new Date().getDay()]}
            </p>
            <p className="text-sm font-semibold text-t1">{LABELS[TODAY_TYPE]}</p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
            TODAY_TYPE === 'rest' ? 'text-t3 border-s3 bg-s2'
            : TODAY_TYPE === 'push' ? 'text-gold border-gold-border bg-gold-bg'
            : 'text-d-sport border-blue-800 bg-blue-950/30'
          }`}>
            {TODAY_TYPE === 'rest' ? 'Repos' : TODAY_TYPE === 'push' ? 'Push' : 'Legs'}
          </span>
        </div>

        {/* Timer */}
        {TODAY_TYPE !== 'rest' && (
          <div className="px-4 py-4">
            <SportTimer sessionLabel={LABELS[TODAY_TYPE]} />
          </div>
        )}

        {TODAY_TYPE === 'rest' && (
          <div className="px-4 py-4 text-center">
            <p className="text-2xl mb-2">🧘</p>
            <p className="text-sm text-t2 font-medium">Repos actif</p>
            <p className="text-xs text-t4 mt-1">20 min de marche · Récupération optimale</p>
            <p className="text-[10px] text-t4 mt-3 leading-relaxed">
              La récupération n'est pas une pause — c'est une partie de la progression.
            </p>
          </div>
        )}
      </div>

      {/* Exercise list — visible during or after session */}
      {(sessionActive || sessionDone) && TODAY_TYPE !== 'rest' && (
        <>
          <SectionLabel>Exercices</SectionLabel>
          <div className="mx-5 mb-4 bg-s0 border border-s3 rounded-2xl overflow-hidden">
            <ExerciseList exercises={exercises} onLevelUp={levelUp} />
          </div>
        </>
      )}

      {/* All exercises — progression overview */}
      {!sessionActive && !sessionDone && TODAY_TYPE !== 'rest' && (
        <>
          <SectionLabel>Progression par exercice</SectionLabel>
          <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
            {exercises.map((ex, i) => {
              const level = ex.levels[ex.currentLevel]
              const req = ex.currentLevel >= 1 ? 7 : 5
              return (
                <div key={ex.id} className={`flex items-center gap-3 px-4 py-3 ${i < exercises.length - 1 ? 'border-b border-s2' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-t1">{level.name}</p>
                    <p className="text-[10px] text-gold">{level.sets}</p>
                    <Pips done={ex.sessionsAtLevel} total={req} className="mt-1.5" />
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex gap-1 justify-end mb-1">
                      {[0,1,2].map(j => (
                        <div key={j} className={`w-2 h-2 rounded-full ${j <= ex.currentLevel ? 'bg-gold' : 'bg-s3'}`} />
                      ))}
                    </div>
                    {ex.canLevelUp
                      ? <span className="text-[9px] text-state-green">✓ Prêt</span>
                      : <span className="text-[9px] text-t4">{req - ex.sessionsAtLevel} rest.</span>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Weekly schedule */}
      <SectionLabel>Planning hebdomadaire</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        {['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'].map((day, i) => {
          const type = SPORT_PLAN[i]
          const isToday = i === new Date().getDay()
          return (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-s2 last:border-0 ${isToday ? 'bg-gold-bg/40' : ''}`}>
              <span className={`text-xs font-medium w-8 ${isToday ? 'text-gold' : 'text-t3'}`}>{day}</span>
              <span className={`text-xs flex-1 ${isToday ? 'text-t1' : 'text-t3'}`}>
                {LABELS[type]}
              </span>
              {isToday && <span className="text-[9px] text-gold border border-gold-border rounded px-1.5 py-0.5">Aujourd'hui</span>}
            </div>
          )
        })}
      </div>

      <div className="h-4" />
    </div>
  )
}
