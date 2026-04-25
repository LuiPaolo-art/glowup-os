import { cn } from '@/lib/utils'
import type { CoachInsight } from '@/types/coach'

const STYLES: Record<CoachInsight['type'], string> = {
  positive: 'border-state-green-border bg-state-green-bg',
  neutral:  'border-s3 bg-s1',
  warning:  'border-state-yellow-border bg-state-yellow-bg',
  critical: 'border-state-red-border bg-state-red-bg',
}

const TEXT_COLORS: Record<CoachInsight['type'], string> = {
  positive: 'text-state-green',
  neutral:  'text-t2',
  warning:  'text-state-yellow',
  critical: 'text-state-red',
}

export function InsightsPanel({ insights }: { insights: CoachInsight[] }) {
  return (
    <div className="mx-5 mb-3 space-y-2">
      {insights.map(ins => (
        <div key={ins.id} className={cn('flex gap-3 rounded-xl border px-4 py-3', STYLES[ins.type])}>
          <span className="text-base flex-shrink-0 mt-0.5">{ins.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-t2 leading-relaxed">{ins.text}</p>
            {ins.metricLabel && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[9px] text-t4 uppercase tracking-wider">{ins.metricLabel}</span>
                <span className={cn('text-[11px] font-medium', TEXT_COLORS[ins.type])}>{ins.metricValue}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
