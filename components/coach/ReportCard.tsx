import { cn } from '@/lib/utils'
import type { CoachReport } from '@/types/coach'

function Pill({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 bg-s2 rounded-lg px-2.5 py-1.5">
      <span className="text-[9px] text-t4 uppercase tracking-wider">{label}</span>
      <span className={cn('text-[11px] font-medium', ok === true ? 'text-state-green' : ok === false ? 'text-state-red' : 'text-t2')}>
        {value}
      </span>
    </div>
  )
}

export function ReportCard({ report, compact }: { report: CoachReport; compact?: boolean }) {
  const m = report.metrics
  return (
    <div className="bg-s1 border border-s3 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-s2 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-t4 uppercase tracking-widest mb-0.5">Rapport quotidien</p>
          <p className="text-xs text-t3">{report.date}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-semibold text-gold">{m.score}</span>
          <span className={cn('text-[10px] font-medium', m.scoreDelta > 0 ? 'text-state-green' : m.scoreDelta < 0 ? 'text-state-red' : 'text-t4')}>
            {m.scoreDelta > 0 ? '+' : ''}{m.scoreDelta}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-4 py-3 border-b border-s2">
        <div className="flex gap-2 flex-wrap">
          <Pill label="Complétion" value={`${Math.round(m.completionRate*100)}%`} ok={m.completionRate >= 0.65} />
          <Pill label="Sport"      value={m.sportDone ? '✓' : '✗'}              ok={m.sportDone} />
          <Pill label="Lecture"    value={`${m.pagesRead}p`}                     ok={m.pagesRead >= 15} />
          <Pill label="Eau"        value={`${m.water}/8`}                        ok={m.water >= 6} />
          <Pill label="Prières"    value={`${m.prayers}/5`}                      ok={m.prayers >= 5} />
        </div>
      </div>

      {/* Content */}
      {!compact && (
        <div className="px-4 py-3 space-y-4">
          <div>
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-1.5">Constat</p>
            <p className="text-xs text-t3 leading-relaxed">{report.constat}</p>
          </div>
          <div>
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-1.5">Analyse</p>
            <p className="text-xs text-t3 leading-relaxed">{report.analyse}</p>
          </div>
          <div>
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-2">3 Actions</p>
            <ol className="space-y-2">
              {report.actions.map((a, i) => (
                <li key={i} className="flex gap-2 text-xs text-t3 leading-relaxed">
                  <span className="text-gold font-semibold flex-shrink-0">{i+1}.</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-gold-bg border border-gold-border rounded-xl px-3 py-2.5">
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1">Défi du jour</p>
            <p className="text-xs text-gold/70 leading-relaxed">{report.defi}</p>
          </div>
        </div>
      )}
    </div>
  )
}
