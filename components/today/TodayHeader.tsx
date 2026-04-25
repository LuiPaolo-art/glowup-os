import { StateBadge } from '@/components/ui/Badge'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { scoreDeltaDisplay, todayLabel } from '@/lib/utils'
import type { User } from '@/types/user'
import type { DailyStats } from '@/types/daily'

interface TodayHeaderProps { user: User; stats: DailyStats }

export function TodayHeader({ user, stats }: TodayHeaderProps) {
  const delta = scoreDeltaDisplay(user.globalScoreDelta)
  return (
    <div className="px-5 pt-5 pb-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-t4 text-xs tracking-wide">{todayLabel()}</p>
        <StateBadge state={user.systemState} />
      </div>
      <div className="flex items-start justify-between mt-1">
        <div>
          <h1 className="font-serif text-[26px] font-semibold text-t1 tracking-tight leading-tight">
            {user.streak.current === 0 ? 'Prêt à commencer ?' : `Salut, ${user.name}`}
          </h1>
          <p className="text-t3 text-xs mt-1 leading-snug">
            {user.streak.current === 0
              ? 'Commence ta première journée. Coche tes 3 non-négociables.'
              : <span className="flex items-center gap-1.5">
                  <span className="text-t1 font-semibold">{user.globalScore}</span>
                  <span className="text-t3">score global</span>
                  <span className={`font-medium ${delta.color}`}>{delta.text}</span>
                </span>
            }
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* JOI disponibles */}
          {user.joi.available > 0 && (
            <div className="text-center">
              <div className="text-xl font-semibold text-t2 leading-none">{user.joi.available}</div>
              <div className="text-[9px] text-t4 uppercase tracking-widest mt-0.5">JOI</div>
            </div>
          )}
          {/* Streak */}
          <div className="text-center">
            <div className="text-xl font-semibold text-gold leading-none">{user.streak.current}</div>
            <div className="text-[9px] text-t4 uppercase tracking-widest mt-0.5">🔥 jours</div>
          </div>
          <ScoreRing value={stats.pct} />
        </div>
      </div>
    </div>
  )
}
