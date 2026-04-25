import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number        // 0-100
  variant?: 'gold' | 'green' | 'blue' | 'purple'
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

const FILLS = {
  gold:   'from-gold-dim via-gold to-gold-light',
  green:  'from-green-800 via-state-green to-green-400',
  blue:   'from-blue-900 via-d-sport to-blue-400',
  purple: 'from-purple-900 via-d-learn to-purple-400',
}
const HEIGHTS = { xs: 'h-0.5', sm: 'h-1', md: 'h-1.5' }

export function ProgressBar({ value, variant = 'gold', size = 'sm', className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div className={cn('w-full bg-s3 rounded-full overflow-hidden', HEIGHTS[size], className)}>
      <div
        className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', FILLS[variant])}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// Session pips for sport
export function Pips({ done, total, className }: { done: number; total: number; className?: string }) {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={cn('w-1.5 h-1.5 rounded-full transition-colors', i < done ? 'bg-gold' : 'bg-s3')} />
      ))}
    </div>
  )
}
