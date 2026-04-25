'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CoachReport } from '@/types/coach'

export function CoachCard({ report }: { report: CoachReport }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-5 mb-3 bg-gold-bg border border-gold-border rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-black/10 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="w-7 h-7 rounded-full bg-black/20 border border-gold-border flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-gold text-xs">⬡</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-0.5">Coach IA · Rapport du jour</p>
          <p className="text-xs text-gold/70 leading-snug line-clamp-2">{report.constat}</p>
        </div>
        <svg viewBox="0 0 16 16" fill="none" className={cn('w-3.5 h-3.5 text-gold-dim flex-shrink-0 mt-1 transition-transform', open && 'rotate-180')} stroke="currentColor" strokeWidth={2}>
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gold-border px-4 py-3 space-y-4 animate-slide-up">
          <div>
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1.5">Analyse</p>
            <p className="text-xs text-gold/60 leading-relaxed">{report.analyse}</p>
          </div>
          <div>
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-2">3 Actions</p>
            <ol className="space-y-2">
              {report.actions.map((a, i) => (
                <li key={i} className="flex gap-2 text-xs text-gold/60 leading-relaxed">
                  <span className="text-gold font-semibold flex-shrink-0">{i + 1}.</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-black/20 rounded-xl px-3 py-2.5">
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1">Défi du jour</p>
            <p className="text-xs text-gold/70 leading-relaxed">{report.defi}</p>
          </div>
          {report.alert && (
            <div className="bg-state-red-bg border border-state-red-border rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-state-red uppercase tracking-widest mb-1">⚠ Alerte</p>
              <p className="text-xs text-state-red/70 leading-relaxed">{report.alert}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
