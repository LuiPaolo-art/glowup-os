import { cn } from '@/lib/utils'

const DAYS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']

function rateColor(r: number): string {
  if (r === 0)   return '#0F0F0F'
  if (r < 0.5)   return '#2E1E00'
  if (r < 0.75)  return '#6A4A00'
  return '#C9A84C'
}

export function HeatmapCalendar({ data }: { data: number[] }) {
  const total = data.reduce((s, d) => s + d, 0)
  const isEmpty = total === 0
  const avg  = !isEmpty && data.length ? Math.round(total / data.length * 100) : 0
  const good = !isEmpty ? data.filter(d => d >= 0.75).length : 0

  return (
    <div className="bg-s1 border border-s3 rounded-2xl px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[9px] text-t4 uppercase tracking-widest">Complétion · 28 jours</p>
        {!isEmpty && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-t3">{avg}% moy.</span>
            <span className="text-[10px] text-gold">{good} jours ≥75%</span>
          </div>
        )}
      </div>

      {isEmpty ? (
        <div className="py-8 text-center">
          <p className="text-t4 text-xs">Aucune session enregistrée pour le moment.</p>
          <p className="text-t4 text-[10px] mt-1">Complète ta première séance pour démarrer l'historique.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map(d => <div key={d} className="text-[8px] text-t4 text-center">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {data.map((r, i) => (
              <div
                key={i}
                title={`${Math.round(r * 100)}%`}
                className="aspect-square rounded-sm hover:scale-110 transition-transform cursor-default"
                style={{ backgroundColor: rateColor(r) }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {([['#0F0F0F','Aucune'],['#2E1E00','<50%'],['#6A4A00','<75%'],['#C9A84C','75%+']] as const).map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: c }} />
                <span className="text-[9px] text-t4">{l}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
