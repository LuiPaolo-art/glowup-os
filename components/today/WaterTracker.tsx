'use client'

import { cn } from '@/lib/utils'

interface WaterTrackerProps {
  initial?: number
  onUpdate?: (n: number) => void
}

export function WaterTracker({ initial = 0, onUpdate }: WaterTrackerProps) {
  const count = initial

  function click(i: number) {
    const next = i < count ? i : i + 1
    onUpdate?.(next)
  }

  return (
    <div className="mx-5 mb-3 bg-s1 border border-s3 rounded-2xl px-4 py-3">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[10px] text-t4 uppercase tracking-widest">Hydratation — 2 L objectif</span>
        <span className="text-xs font-medium text-blue-400">{count}/8</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 8 }, (_, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            className={cn(
              'flex-1 h-8 rounded-lg border text-sm transition-all',
              i < count
                ? 'bg-blue-950 border-blue-800 opacity-90'
                : 'bg-s2 border-s3 opacity-25 hover:opacity-40'
            )}
          >
            💧
          </button>
        ))}
      </div>
      {count >= 8 && (
        <p className="text-[10px] text-state-green mt-2 text-center">✓ Objectif hydratation atteint</p>
      )}
    </div>
  )
}
