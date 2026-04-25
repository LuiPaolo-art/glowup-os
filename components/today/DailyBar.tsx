import { cn } from '@/lib/utils'
import type { DailyStats } from '@/types/daily'

export function DailyBar({ stats }: { stats: DailyStats }) {
  const { done, total, pct } = stats
  const color = pct >= 75 ? 'text-state-green' : pct >= 50 ? 'text-gold' : 'text-t3'
  return (
    <div className="px-5 pb-4">
      <div className="flex justify-between text-[11px] mb-1.5">
        <span className="text-t3">{done} / {total} tâches</span>
        <span className={cn('font-medium', color)}>{pct}%</span>
      </div>
      <div className="h-0.5 bg-s3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#8A6020,#E8C97A,#C9A84C)', backgroundSize: '200% 100%' }}
        />
      </div>
    </div>
  )
}
