import { cn } from '@/lib/utils'
import { Pips } from '@/components/ui/ProgressBar'
import type { Exercise, SportWeek } from '@/types/sport'

interface SportCardProps {
  exercises: Exercise[]
  week: SportWeek
  onLevelUp?: (id: string) => void
}

export function SportCard({ exercises, week, onLevelUp }: SportCardProps) {
  return (
    <div className="bg-s1 border border-s3 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-s2 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-t4 uppercase tracking-widest mb-0.5">Sport · Calisthénie</p>
          <p className="text-sm font-semibold text-t1">Push — Haut du corps</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-t1">{week.done}/{week.planned}</p>
          <p className="text-[10px] text-t3">séances · 7j</p>
        </div>
      </div>

      {/* Exercises */}
      <div className="divide-y divide-s2">
        {exercises.map(ex => {
          const level = ex.levels[ex.currentLevel]
          const req   = ex.sessionsRequired
          const isMax = ex.currentLevel >= ex.maxLevel

          return (
            <div key={ex.id} className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] text-t4 uppercase tracking-wider">{ex.name}</span>
                  {isMax && <span className="text-[9px] text-gold border border-gold-border rounded px-1">MAX</span>}
                  {ex.canLevelUp && !isMax && (
                    <span className="text-[9px] text-state-green border border-state-green-border rounded px-1">✓ Prêt</span>
                  )}
                </div>
                <p className="text-sm font-medium text-t1">{level.name}</p>
                <p className="text-[11px] text-gold mt-0.5">{level.sets}</p>
                <p className="text-[10px] text-t4 mt-0.5 line-clamp-1">{level.tip}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Pips done={ex.sessionsAtLevel} total={req} />
                  <span className="text-[10px] text-t4">{ex.sessionsAtLevel}/{req}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className={cn('w-2 h-2 rounded-full', i <= ex.currentLevel ? 'bg-gold' : 'bg-s3')} />
                  ))}
                </div>
                <span className="text-[10px] text-t4">Niv. {ex.currentLevel + 1}/3</span>
                {ex.canLevelUp && !isMax && (
                  <button
                    onClick={() => onLevelUp?.(ex.id)}
                    className="text-[10px] text-gold border border-gold-border rounded-md px-2 py-1 hover:bg-gold-bg transition-colors"
                  >
                    Niveau ↑
                  </button>
                )}
                {!ex.canLevelUp && !isMax && (
                  <span className="text-[10px] text-t4">🔒 {req - ex.sessionsAtLevel} rest.</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
