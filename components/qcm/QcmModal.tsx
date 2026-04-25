'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { ProgressBar } from '@/components/ui/ProgressBar'

// ── Question card ──────────────────────────────────────────────────
function QuestionCard() {
  const { qcm, answerQcm, nextQcmQ } = useStore()
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const q        = qcm.questions[qcm.index]
  const answered = qcm.answers[qcm.index]
  const revealed = answered !== null && answered !== undefined
  const isLast   = qcm.index === qcm.questions.length - 1

  // Reset selection on new question
  useEffect(() => {
    setSelectedIdx(null)
  }, [qcm.index])

  if (!q) return null

  function pick(idx: number) {
    if (revealed) return
    setSelectedIdx(idx)
    answerQcm(idx)
  }

  return (
    <div className="space-y-4">
      {/* Question text */}
      <p className="text-sm font-medium text-t1 leading-relaxed">{q.text}</p>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && i === q.correctIndex
          const isWrong   = revealed && selectedIdx === i && i !== q.correctIndex
          const isChosen  = !revealed && selectedIdx === i

          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={revealed}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border text-sm leading-snug transition-all duration-150',
                isCorrect && 'bg-state-green-bg border-state-green-border text-state-green',
                isWrong   && 'bg-state-red-bg border-state-red-border text-state-red',
                isChosen  && !revealed && 'bg-gold-bg border-gold-border text-gold',
                !revealed && !isChosen && 'bg-s2 border-s3 text-t3 hover:border-s4 hover:text-t2',
                revealed && i !== q.correctIndex && selectedIdx !== i && 'bg-s1 border-s2 text-t4 opacity-50',
              )}
            >
              <span className="font-medium text-[11px] mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
              {isCorrect && <span className="ml-2 text-[11px]">✓</span>}
              {isWrong   && <span className="ml-2 text-[11px]">✗</span>}
            </button>
          )
        })}
      </div>

      {/* Explanation — visible once answered */}
      {revealed && (
        <div className={cn(
          'rounded-xl px-4 py-3 text-xs leading-relaxed space-y-1.5 animate-fade-in',
          selectedIdx === q.correctIndex
            ? 'bg-state-green-bg border border-state-green-border'
            : 'bg-state-red-bg border border-state-red-border'
        )}>
          <p className={cn('font-semibold text-[11px]',
            selectedIdx === q.correctIndex ? 'text-state-green' : 'text-state-red'
          )}>
            {selectedIdx === q.correctIndex ? '✓ Correct' : '✗ Incorrect'}
            {selectedIdx !== q.correctIndex && (
              <span className="font-normal text-state-green ml-1">
                — Bonne réponse : {q.options[q.correctIndex]}
              </span>
            )}
          </p>
          <p className={cn('leading-relaxed',
            selectedIdx === q.correctIndex ? 'text-state-green/70' : 'text-state-red/70'
          )}>
            {q.explanation}
          </p>
        </div>
      )}

      {/* Manual next — only shown after answering */}
      {revealed && (
        <button
          onClick={nextQcmQ}
          className="w-full bg-gold text-black text-sm font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity animate-fade-in"
        >
          {isLast ? 'Voir le résultat →' : 'Question suivante →'}
        </button>
      )}
    </div>
  )
}

// ── Results screen ─────────────────────────────────────────────────
function ResultsScreen() {
  const { qcm, closeQcm, openQcm } = useStore()
  const [showDetail, setShowDetail] = useState(true)

  const score   = qcm.score ?? 0
  const correct = qcm.answers.filter((a, i) => a === qcm.questions[i]?.correctIndex).length
  const passed  = score >= 70
  const color   = score >= 80 ? '#5ACA9A' : score >= 70 ? '#C9A84C' : '#CA6060'

  function retry() {
    const { contextType, contextId, questions } = qcm
    if (contextType && contextId) openQcm(contextType, contextId, questions)
  }

  return (
    <div className="space-y-5">

      {/* ── Score header ─────────────────────────────────────── */}
      <div className="text-center py-2">
        <div className="text-6xl font-serif font-bold mb-2 tabular" style={{ color }}>
          {score}%
        </div>
        <p className="text-sm text-t3">
          {correct}/{qcm.questions.length} bonnes réponses
        </p>
        <p className={cn('text-xs mt-2 font-semibold', passed ? 'text-state-green' : 'text-state-red')}>
          {passed ? '✓ QCM validé' : '✗ Score insuffisant'}
        </p>
      </div>

      {/* ── Result message ───────────────────────────────────── */}
      {passed ? (
        <div className="bg-state-green-bg border border-state-green-border rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-state-green mb-1">Validé. Tu peux passer à la suite.</p>
          <p className="text-[11px] text-state-green/70 leading-relaxed">
            Tu as intégré les concepts clés. Le contenu suivant est débloqué.
          </p>
        </div>
      ) : (
        <div className="bg-state-red-bg border border-state-red-border rounded-xl px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-state-red">
            Tu n'as pas encore validé. Relis le contenu puis réessaie.
          </p>
          <p className="text-[11px] text-state-red/70 leading-relaxed">
            Identifie les questions ratées ci-dessous, relis les sections correspondantes, puis refais le QCM. Il n'y a pas de délai — tu peux recommencer immédiatement.
          </p>
        </div>
      )}

      {/* ── Correction détaillée ─────────────────────────────── */}
      <div>
        <button
          onClick={() => setShowDetail(s => !s)}
          className="flex items-center gap-2 w-full text-left mb-2 group"
        >
          <p className="text-[9px] text-t4 uppercase tracking-widest flex-1">
            Correction détaillée
          </p>
          <svg
            viewBox="0 0 16 16" fill="none"
            className={cn('w-3 h-3 text-t4 transition-transform', showDetail && 'rotate-180')}
            stroke="currentColor" strokeWidth={2}
          >
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showDetail && (
          <div className="space-y-3 animate-fade-in">
            {qcm.questions.map((q, i) => {
              const userAnswerIdx = qcm.answers[i]
              const isCorrect     = userAnswerIdx === q.correctIndex
              const userAnswer    = userAnswerIdx !== null && userAnswerIdx !== undefined
                ? q.options[userAnswerIdx]
                : 'Sans réponse'
              const correctAnswer = q.options[q.correctIndex]

              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-xl border px-4 py-3 space-y-2',
                    isCorrect
                      ? 'bg-state-green-bg border-state-green-border'
                      : 'bg-state-red-bg border-state-red-border'
                  )}
                >
                  {/* Question + result badge */}
                  <div className="flex items-start gap-2">
                    <span className={cn('flex-shrink-0 font-semibold text-sm mt-0.5',
                      isCorrect ? 'text-state-green' : 'text-state-red'
                    )}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <p className={cn('text-[12px] font-medium leading-snug flex-1',
                      isCorrect ? 'text-state-green' : 'text-state-red'
                    )}>
                      {q.text}
                    </p>
                  </div>

                  {/* Answers */}
                  <div className="pl-5 space-y-1">
                    {!isCorrect && (
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] text-state-red/70 w-16 flex-shrink-0 pt-0.5">
                          Ta réponse
                        </span>
                        <span className="text-[11px] text-state-red/80 leading-snug line-through">
                          {userAnswer}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <span className={cn('text-[10px] w-16 flex-shrink-0 pt-0.5',
                        isCorrect ? 'text-state-green/70' : 'text-state-green'
                      )}>
                        {isCorrect ? 'Correct' : 'Bonne rép.'}
                      </span>
                      <span className={cn('text-[11px] leading-snug font-medium',
                        isCorrect ? 'text-state-green/80' : 'text-state-green'
                      )}>
                        {correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="pl-5">
                    <p className={cn('text-[11px] leading-relaxed italic',
                      isCorrect ? 'text-state-green/60' : 'text-state-red/60'
                    )}>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Actions ──────────────────────────────────────────── */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={closeQcm}
          className="flex-1 border border-s3 text-t3 text-xs rounded-xl py-3 hover:border-s4 hover:text-t2 transition-colors"
        >
          Fermer
        </button>
        {!passed && (
          <button
            onClick={retry}
            className="flex-1 bg-gold text-black text-xs font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity"
          >
            Réessayer →
          </button>
        )}
        {passed && (
          <button
            onClick={closeQcm}
            className="flex-1 bg-state-green-bg border border-state-green-border text-state-green text-xs font-semibold rounded-xl py-3"
          >
            Continuer ✓
          </button>
        )}
      </div>
    </div>
  )
}

// ── Modal wrapper ──────────────────────────────────────────────────
export function QcmModal() {
  const { qcm, closeQcm } = useStore()
  if (!qcm.active) return null

  const progress = Math.round((qcm.index / qcm.questions.length) * 100)

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-lg bg-s1 rounded-t-3xl sm:rounded-3xl border border-s3 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-s1 px-5 py-4 border-b border-s2 flex items-center justify-between z-10">
          <div className="flex-1 mr-4">
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-1.5">
              {qcm.contextType} · QCM
            </p>
            <ProgressBar value={qcm.done ? 100 : progress} size="xs" />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {!qcm.done && <span className="text-xs text-t3">{qcm.index+1}/{qcm.questions.length}</span>}
            <button onClick={closeQcm} className="text-t4 hover:text-t2 text-xl transition-colors">×</button>
          </div>
        </div>

        <div className="px-5 py-5">
          {qcm.done ? <ResultsScreen /> : <QuestionCard />}
        </div>
      </div>
    </div>
  )
}

// ── Trigger button ─────────────────────────────────────────────────
export function QcmTrigger({
  label, score, onStart, disabled, className,
}: {
  label: string; score?: number; onStart: () => void; disabled?: boolean; className?: string
}) {
  return (
    <button
      onClick={onStart} disabled={disabled}
      className={cn(
        'text-xs font-medium py-2.5 px-4 rounded-xl border transition-all',
        score !== undefined && score >= 70
          ? 'text-state-green border-state-green-border hover:bg-state-green-bg'
          : 'text-gold border-gold-border hover:bg-gold-bg',
        disabled && 'opacity-30 cursor-not-allowed',
        className
      )}
    >
      {label}{score !== undefined && ` (${score}%)`}
    </button>
  )
}
