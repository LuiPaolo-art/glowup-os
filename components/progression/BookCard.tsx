import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Book, BookProgress } from '@/types/learning'

interface BookCardProps {
  book: Book
  progress: BookProgress
  current?: boolean
  onAddPages?: (n: number) => void
  onOpenQcm?: () => void
}

export function BookCard({ book, progress, current, onAddPages, onOpenQcm }: BookCardProps) {
  const pct       = Math.min(100, Math.round((progress.currentPage / book.totalPages) * 100))
  const daysLeft  = Math.ceil((book.totalPages - progress.currentPage) / 15)
  const isFinished = progress.currentPage >= book.totalPages
  const isValidated = progress.qcmPassed

  return (
    <div className={cn('bg-s1 border rounded-2xl overflow-hidden', current ? 'border-s3' : 'border-s2 opacity-40')}>
      <div className="flex">
        {/* Spine */}
        <div className="w-1 flex-shrink-0"
          style={{ background: `linear-gradient(180deg,${book.color}66,${book.color})` }} />

        <div className="flex-1 px-4 py-4">
          {/* Label row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] text-gold uppercase tracking-widest">
              {current
                ? isValidated ? `Validé · Livre ${book.order}/7`
                : isFinished  ? `Terminé · Livre ${book.order}/7`
                : `En cours · Livre ${book.order}/7`
                : `Livre ${book.order}/7`}
            </span>
            {isValidated && (
              <span className="text-[9px] text-state-green border border-state-green-border rounded px-1.5 py-0.5">
                ✓ QCM passé
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-semibold text-t1 leading-tight">{book.title}</h3>
          <p className="text-xs text-t3 mb-3">{book.author}</p>

          {/* Progress bar */}
          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="text-t3">
              Page {progress.currentPage} / {book.totalPages}
            </span>
            <span className={cn('font-medium', isFinished ? 'text-state-green' : 'text-t3')}>
              {pct}%{!isFinished && ` · ~${daysLeft}j`}
            </span>
          </div>
          <ProgressBar
            value={pct}
            variant={isFinished ? 'green' : 'gold'}
            className="mb-4"
          />

          {/* ── VALIDATED ──────────────────────────────────────── */}
          {current && isValidated && (
            <div className="flex items-center gap-3 bg-state-green-bg border border-state-green-border rounded-xl px-4 py-3">
              <span className="text-state-green text-lg">✓</span>
              <div>
                <p className="text-xs font-semibold text-state-green">Livre validé</p>
                <p className="text-[10px] text-state-green/70 mt-0.5">
                  Le prochain livre est débloqué.
                </p>
              </div>
            </div>
          )}

          {/* ── FINISHED BUT QCM NOT DONE ────────────────────────── */}
          {current && isFinished && !isValidated && (
            <div className="space-y-3">
              <div className="bg-gold-bg border border-gold-border rounded-xl px-4 py-3">
                <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1">
                  Lecture terminée
                </p>
                <p className="text-xs text-gold/70 leading-relaxed">
                  Tu as lu toutes les {book.totalPages} pages. Passe le QCM pour valider et débloquer le livre suivant.
                </p>
              </div>
              <button
                onClick={onOpenQcm}
                className="w-full bg-gold text-black text-sm font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity"
              >
                Passer le QCM final →
              </button>
              {progress.qcmScore !== undefined && (
                <p className="text-[10px] text-state-red text-center">
                  Dernier score : {progress.qcmScore}% — minimum requis : 70%
                </p>
              )}
            </div>
          )}

          {/* ── IN PROGRESS ──────────────────────────────────────── */}
          {current && !isFinished && (
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => onAddPages?.(15)}
                  className="bg-gold text-black text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-85 transition-opacity"
                >
                  + 15 pages ✓
                </button>
                <button
                  onClick={() => onAddPages?.(5)}
                  className="text-xs text-t3 border border-s3 px-3 py-2 rounded-lg hover:border-s4 hover:text-t2 transition-colors"
                >
                  +5
                </button>
                <button
                  onClick={() => onAddPages?.(-5)}
                  className="text-xs text-t3 border border-s3 px-3 py-2 rounded-lg hover:border-s4 hover:text-t2 transition-colors"
                >
                  −5
                </button>
              </div>
              <p className="text-[10px] text-t4">
                Objectif : {book.totalPages - progress.currentPage} pages restantes · QCM requis à la fin
              </p>
            </div>
          )}

          {/* Why this book */}
          <div className="mt-3 pt-3 border-t border-s2">
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1">Pourquoi ce livre ?</p>
            <p className="text-[11px] text-t4 leading-relaxed line-clamp-2">{book.why}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
