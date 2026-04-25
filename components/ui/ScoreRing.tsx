interface ScoreRingProps {
  value: number   // 0-100
  size?: number
  stroke?: number
}

export function ScoreRing({ value, size = 52, stroke = 3.5 }: ScoreRingProps) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(100, Math.max(0, value)) / 100)
  const cx = size / 2

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1E1E1E" strokeWidth={stroke} />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke="#C9A84C" strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.34,1.56,0.64,1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C' }}>{value}%</span>
      </div>
    </div>
  )
}

// Domain score card
interface DomainCardProps {
  label: string
  icon: string
  score: number
  color: string
  delta?: number
}

export function DomainCard({ label, icon, score, color, delta }: DomainCardProps) {
  return (
    <div className="bg-s1 border border-s3 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-t2">{icon} {label}</span>
        {delta !== undefined && delta !== 0 && (
          <span className={`text-[10px] font-medium ${delta > 0 ? 'text-state-green' : 'text-state-red'}`}>
            {delta > 0 ? '+' : ''}{delta}
          </span>
        )}
      </div>
      <div className="flex items-end gap-1.5 mb-2">
        <span className="text-3xl font-semibold leading-none" style={{ color }}>{score}</span>
        <span className="text-t3 text-xs mb-0.5">/100</span>
      </div>
      <div className="w-full h-1 bg-s3 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}
