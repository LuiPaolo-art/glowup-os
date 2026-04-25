import { cn } from '@/lib/utils'
import { Pips } from '@/components/ui/ProgressBar'
import { RestTimer } from './SportTimer'
import type { Exercise } from '@/types/sport'

export function ExerciseList({ exercises, onLevelUp }: { exercises: Exercise[]; onLevelUp?: (id: string) => void }) {
  return (
    <div className="divide-y divide-s2">
      {exercises.map(ex => {
        const level = ex.levels[ex.currentLevel]
        const req   = ex.sessionsRequired
        const isMax = ex.currentLevel >= ex.maxLevel

        return (
          <div key={ex.id} className="px-4 py-3 flex gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] text-t4 uppercase tracking-wider">{ex.name}</span>
                {isMax && <span className="text-[9px] text-gold border border-gold-border rounded px-1">★ MAX</span>}
                {ex.canLevelUp && !isMax && (
                  <span className="text-[9px] text-state-green border border-state-green-border rounded px-1">✓ Prêt</span>
                )}
              </div>
              <p className="text-sm font-semibold text-t1">{level.name}</p>
              <p className="text-xs text-gold mt-0.5">{level.sets}</p>
              <p className="text-[10px] text-t4 mt-0.5 line-clamp-1 leading-snug">{level.tip}</p>
              <div className="flex items-center gap-2 mt-2">
                <Pips done={ex.sessionsAtLevel} total={req} />
                <span className="text-[10px] text-t4">{ex.sessionsAtLevel}/{req} séances</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className={cn('w-2 h-2 rounded-full', i <= ex.currentLevel ? 'bg-gold' : 'bg-s3')} />
                ))}
              </div>
              <span className="text-[10px] text-t4">Niv. {ex.currentLevel+1}/3</span>
              <RestTimer seconds={ex.currentLevel >= 1 ? 90 : 60} />
              {ex.canLevelUp && !isMax && (
                <button
                  onClick={() => onLevelUp?.(ex.id)}
                  className="text-[10px] text-gold border border-gold-border rounded-md px-2 py-1 hover:bg-gold-bg transition-colors"
                >
                  Niveau ↑
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
