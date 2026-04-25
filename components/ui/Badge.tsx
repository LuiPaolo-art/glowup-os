import { cn } from '@/lib/utils'
import type { SystemState } from '@/types/user'
import { SYSTEM_STATE_META } from '@/types/user'

// ── System state badge ─────────────────────────────────────────────
interface StateBadgeProps { state: SystemState; className?: string }

export function StateBadge({ state, className }: StateBadgeProps) {
  const m = SYSTEM_STATE_META[state]
  const variants: Record<SystemState, string> = {
    green:  'bg-state-green-bg border-state-green-border text-state-green',
    yellow: 'bg-state-yellow-bg border-state-yellow-border text-state-yellow',
    red:    'bg-state-red-bg border-state-red-border text-state-red',
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border', variants[state], className)}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: m.dotColor }} />
      {m.label}
    </span>
  )
}

// ── Generic badge ──────────────────────────────────────────────────
type Variant = 'default' | 'gold' | 'success' | 'warning' | 'danger'

const VARIANTS: Record<Variant, string> = {
  default: 'bg-s3 text-t2 border-s4',
  gold:    'bg-gold-bg text-gold border-gold-border',
  success: 'bg-state-green-bg text-state-green border-state-green-border',
  warning: 'bg-state-yellow-bg text-state-yellow border-state-yellow-border',
  danger:  'bg-state-red-bg text-state-red border-state-red-border',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border tracking-wide', VARIANTS[variant], className)}>
      {children}
    </span>
  )
}
