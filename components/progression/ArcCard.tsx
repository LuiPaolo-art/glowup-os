'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Arc } from '@/types/learning'

interface ArcCardProps {
  arc: Arc
  onOpenQcm?: (phase: 'pre' | 'final') => void
}

export function ArcCard({ arc, onOpenQcm }: ArcCardProps) {
  const [open, setOpen] = useState(arc.status === 'active')
  const done = arc.lessons.filter(l => l.done).length
  const pct  = arc.lessons.length > 0 ? Math.round((done / arc.lessons.length) * 100) : 0

  // QCM is available only when the arc is active, has content, AND a handler was provided
  const qcmAvailable = arc.status === 'active' && arc.lessons.length > 0 && !!onOpenQcm

  return (
    <div className={cn(
      'bg-s1 border rounded-2xl overflow-hidden',
      arc.status === 'completed' ? 'border-state-green-border' : 'border-s3',
      arc.status === 'locked'    && 'opacity-40'
    )}>

      {/* ── Header (toggle) ─────────────────────────────────── */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-s2 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
        disabled={arc.status === 'locked'}
      >
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ background: arc.status === 'locked' ? '#2A2A2A' : arc.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[9px] uppercase tracking-widest font-medium"
              style={{ color: arc.status === 'locked' ? '#444' : arc.color }}
            >
              Arc {arc.num}
              {arc.status === 'completed' && ' · Validé ✓'}
              {arc.status === 'locked'    && ' · Verrouillé 🔒'}
              {arc.status === 'active'    && ' · En cours'}
            </span>
            <span className="text-[9px] text-t4">{arc.durationDays}j · {arc.passScore}% req.</span>
          </div>
          <p className="text-sm font-semibold text-t1">{arc.title}</p>
          <p className="text-[11px] text-t3 mt-0.5">{arc.description}</p>
          {arc.status === 'active' && arc.lessons.length > 0 && (
            <ProgressBar value={pct} size="xs" className="mt-2" />
          )}
        </div>
        {arc.status !== 'locked' && (
          <svg
            viewBox="0 0 16 16" fill="none"
            className={cn('w-3.5 h-3.5 text-t4 flex-shrink-0 mt-1 transition-transform', open && 'rotate-180')}
            stroke="currentColor" strokeWidth={2}
          >
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* ── Locked: show unlock conditions only ─────────────── */}
      {arc.status === 'locked' && arc.unlockConditions.length > 0 && (
        <div className="px-4 py-3 border-t border-s2 space-y-1.5">
          <p className="text-[9px] text-t4 uppercase tracking-widest mb-2">Conditions de déblocage</p>
          {arc.unlockConditions.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={c.met ? 'text-state-green' : 'text-state-red'}>
                {c.met ? '✓' : '○'}
              </span>
              <span className="text-[11px] text-t3">{c.label}</span>
              {c.value && <span className="ml-auto text-[10px] text-t4">{c.value}</span>}
            </div>
          ))}
        </div>
      )}

      {/* ── Active + no content yet ──────────────────────────── */}
      {arc.status === 'active' && arc.lessons.length === 0 && (
        <div className="border-t border-s2 px-4 py-4 text-center">
          <p className="text-xs text-t3 mb-0.5">Contenu bientôt disponible</p>
          <p className="text-[10px] text-t4">Les leçons de cet arc sont en cours de rédaction.</p>
        </div>
      )}

      {/* ── Active + content: lessons + QCM ─────────────────── */}
      {open && arc.status === 'active' && arc.lessons.length > 0 && (
        <div className="border-t border-s2 animate-slide-up">
          {arc.lessons.map((l, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-s2 last:border-0">
              <span className={l.done ? 'text-state-green' : 'text-t4'}>
                {l.done ? '✓' : '○'}
              </span>
              <span className={cn('text-[11px] flex-1', l.done ? 'text-t3 line-through' : 'text-t2')}>
                {l.number} — {l.title}
              </span>
              {l.qcmScore !== undefined && (
                <span className="text-[10px] text-gold">{l.qcmScore}%</span>
              )}
            </div>
          ))}

          {/* QCM section — only rendered when handler exists */}
          {qcmAvailable ? (
            <div className="flex gap-2 px-4 py-3">
              <button
                onClick={() => onOpenQcm('pre')}
                className={cn(
                  'flex-1 text-[11px] font-medium py-2 rounded-lg border transition-colors',
                  arc.preQcmScore
                    ? 'text-state-green border-state-green-border hover:bg-state-green-bg'
                    : 'text-t3 border-s3 hover:border-s4'
                )}
              >
                QCM initial {arc.preQcmScore !== undefined ? `(${arc.preQcmScore}%)` : '→'}
              </button>
              <button
                onClick={() => onOpenQcm('final')}
                className="flex-1 text-[11px] font-medium py-2 rounded-lg border border-gold-border text-gold hover:bg-gold-bg transition-colors"
              >
                QCM final ({arc.passScore}%) →
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 border-t border-s2">
              <p className="text-[10px] text-t4 text-center">QCM bientôt disponible</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
