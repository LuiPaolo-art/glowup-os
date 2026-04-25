'use client'

import { useEffect, useState } from 'react'
import { cn, formatTime } from '@/lib/utils'
import { useStore, selElapsed } from '@/lib/store'
import type { PhysicalState, Completion, Difficulty } from '@/lib/store'

const MIN_PARTIAL = 25 * 60   // 25 min → PARTIAL
const MIN_FULL    = 35 * 60   // 35 min → can declare FULL
const MAX_SESSION = 90 * 60   // 90 min → limit

// ── Phase 1 — Pre-session check ────────────────────────────────────
function PreCheck({ onReady }: { onReady: (s: PhysicalState) => void }) {
  const [sel, setSel] = useState<PhysicalState | null>(null)

  const OPTIONS: { v: PhysicalState; label: string; desc: string }[] = [
    { v: 'fresh',    label: 'En forme',  desc: 'Reposé, énergie haute' },
    { v: 'ok',       label: 'Correct',   desc: 'Normal, prêt à travailler' },
    { v: 'tired',    label: 'Fatigué',   desc: 'Un peu crevé, ça ira' },
    { v: 'exhausted',label: 'Épuisé',    desc: 'Vraiment à plat' },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs text-t2 font-medium">Avant de commencer</p>
      <p className="text-[11px] text-t4">Comment tu te sens physiquement là maintenant ?</p>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map(({ v, label, desc }) => (
          <button
            key={v}
            onClick={() => setSel(v)}
            className={cn(
              'rounded-xl border px-3 py-2.5 text-left transition-all',
              sel === v ? 'bg-gold-bg border-gold-border' : 'bg-s2 border-s3 hover:border-s4'
            )}
          >
            <p className={cn('text-xs font-medium', sel === v ? 'text-gold' : 'text-t2')}>{label}</p>
            <p className="text-[10px] text-t4 mt-0.5">{desc}</p>
          </button>
        ))}
      </div>
      {sel === 'exhausted' && (
        <div className="bg-state-red-bg border border-state-red-border rounded-xl px-3 py-2.5">
          <p className="text-xs text-state-red">⚠ État épuisé enregistré. Le coach adaptera la prochaine séance.</p>
        </div>
      )}
      <button
        disabled={!sel}
        onClick={() => sel && onReady(sel)}
        className="w-full bg-gold text-black text-sm font-semibold rounded-xl py-2.5 disabled:opacity-30 hover:opacity-85 transition-opacity"
      >
        Démarrer la séance →
      </button>
    </div>
  )
}

// ── Phase 2 — Active timer ─────────────────────────────────────────
function ActiveTimer() {
  const { timer, startTimer, stopTimer } = useStore()
  const [elapsed, setElapsed] = useState(selElapsed())

  useEffect(() => {
    const id = setInterval(() => setElapsed(selElapsed()), 500)
    return () => clearInterval(id)
  }, [])

  const over = elapsed > MAX_SESSION
  const approaching = elapsed > 75 * 60
  const timeColor = over ? 'text-state-red' : approaching ? 'text-state-yellow' : 'text-gold'

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <p className="text-[9px] text-t4 uppercase tracking-widest mb-2">
          {timer.running ? 'Séance en cours' : 'Séance en pause'}
        </p>
        <div className={cn('font-serif text-6xl font-semibold tabular leading-none mb-2', timeColor)}>
          {formatTime(elapsed)}
        </div>
        <p className={cn('text-[11px]', over ? 'text-state-red' : 'text-t4')}>
          {over ? '⚠ Dépassement du temps limite (1h30)' : `Limite : ${formatTime(MAX_SESSION)}`}
        </p>
        <div className="mt-3 h-0.5 bg-s3 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-1000', over ? 'bg-state-red' : approaching ? 'bg-state-yellow' : 'bg-gold')}
            style={{ width: `${Math.min(100, (elapsed / MAX_SESSION) * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {timer.running ? (
          <button
            onClick={stopTimer}
            className="flex-1 bg-s2 border border-s3 text-t2 text-sm font-medium rounded-xl py-3 hover:border-s4 transition-colors"
          >
            ■ Arrêter définitivement
          </button>
        ) : (
          <>
            <button
              onClick={startTimer}
              className="flex-1 bg-gold text-black text-sm font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity"
            >
              ▶ Reprendre
            </button>
            <button
              onClick={() => useStore.getState().resetTimer()}
              className="px-4 text-state-red border border-state-red-border text-sm rounded-xl py-3 hover:bg-state-red-bg transition-colors"
            >
              ✕
            </button>
          </>
        )}
      </div>
      <p className="text-[10px] text-t4 text-center">"Arrêter" est définitif — tu passes à l'évaluation.</p>
    </div>
  )
}

// ── Phase 3 — Evaluation ───────────────────────────────────────────
function Evaluation() {
  const { timer, eval: ev, setEvalField, submitEval } = useStore()
  const elapsed = timer.elapsed

  const COMPLETIONS: { v: Completion; label: string; desc: string }[] = [
    { v: 'full',    label: 'Séance complète ✓', desc: 'Tous les sets terminés' },
    { v: 'partial', label: 'Partielle (moitié+)', desc: 'Plus de la moitié faite' },
    { v: 'none',    label: 'Peu ou rien',        desc: 'Séance non terminée' },
  ]

  const DIFFICULTIES: { v: Difficulty; label: string }[] = [
    { v: 'easy',   label: 'Trop facile' },
    { v: 'medium', label: 'Idéale' },
    { v: 'hard',   label: 'Difficile' },
  ]

  // Auto-downgrade if too short
  const autoPartial = elapsed < MIN_PARTIAL
  const canDeclareCompletion = (v: Completion) => {
    if (autoPartial) return v === 'none' || v === 'partial'
    if (elapsed < MIN_FULL) return v !== 'full'
    return true
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-[9px] text-t4 uppercase tracking-widest mb-1">Durée enregistrée</p>
        <p className="font-serif text-3xl font-semibold text-gold">{formatTime(elapsed)}</p>
        {elapsed < MIN_PARTIAL && (
          <div className="mt-2 bg-state-red-bg border border-state-red-border rounded-lg px-3 py-2">
            <p className="text-[11px] text-state-red">
              Durée {formatTime(elapsed)} &lt; 25 min — séance automatiquement reclassée PARTIELLE.
            </p>
          </div>
        )}
      </div>

      {/* Completion */}
      <div>
        <p className="text-[11px] text-t4 mb-2">Tu as complété combien de la séance ?</p>
        <div className="space-y-2">
          {COMPLETIONS.map(({ v, label, desc }) => {
            const allowed = canDeclareCompletion(v)
            return (
              <button
                key={v}
                disabled={!allowed}
                onClick={() => setEvalField('completion', v)}
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-left transition-all',
                  ev.completion === v ? 'bg-gold-bg border-gold-border' : allowed ? 'bg-s2 border-s3 hover:border-s4' : 'bg-s1 border-s2 opacity-30 cursor-not-allowed'
                )}
              >
                <p className={cn('text-xs font-medium', ev.completion === v ? 'text-gold' : 'text-t2')}>{label}</p>
                <p className="text-[10px] text-t4 mt-0.5">{desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Difficulty — only if some work done */}
      {ev.completion && ev.completion !== 'none' && (
        <div>
          <p className="text-[11px] text-t4 mb-2">Niveau de difficulté ressenti ?</p>
          <div className="flex gap-2">
            {DIFFICULTIES.map(({ v, label }) => (
              <button
                key={v}
                onClick={() => setEvalField('difficulty', v)}
                className={cn(
                  'flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all',
                  ev.difficulty === v ? 'bg-gold-bg border-gold-border text-gold' : 'bg-s2 border-s3 text-t3 hover:border-s4'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <textarea
        value={ev.notes}
        onChange={e => setEvalField('notes', e.target.value)}
        placeholder="Notes libres — exos ratés, douleurs, sensations... (optionnel)"
        rows={2}
        className="w-full bg-s2 border border-s3 rounded-xl px-3 py-2.5 text-xs text-t2 placeholder:text-t4 outline-none focus:border-s4 resize-none transition-colors"
      />

      <button
        disabled={!ev.completion}
        onClick={submitEval}
        className="w-full bg-gold text-black text-sm font-semibold rounded-xl py-3 disabled:opacity-30 hover:opacity-85 transition-opacity"
      >
        Valider la séance →
      </button>
    </div>
  )
}

// ── Phase 4 — Done ─────────────────────────────────────────────────
function SessionDone() {
  const { eval: ev, timer, resetTimer } = useStore()

  const ADAPTATIONS: Partial<Record<string, string>> = {
    'full-easy':    '🚀 Trop facile. +2 reps sur chaque exercice la prochaine séance.',
    'full-medium':  '✅ Intensité parfaite. Maintiens ce niveau.',
    'full-hard':    '💪 Complété mais difficile. +30 sec de repos entre sets.',
    'partial-easy': '⚠ Partielle et facile — manque de temps ? Planifie 15 min de plus.',
    'partial-medium':'⚠ Partielle. Réduis de 1 set la prochaine fois.',
    'partial-hard': '⚠ Partielle et difficile. −1 set + +30 sec de repos.',
    'none-':        '🔄 Séance non terminée. 2 sets seulement la prochaine fois.',
  }

  const key = `${ev.completion}-${ev.difficulty ?? ''}`
  const adaptation = ADAPTATIONS[key] ?? ADAPTATIONS['none-']!

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <div className="text-4xl mb-2">✓</div>
        <p className="text-sm font-medium text-state-green">Séance validée</p>
        <p className="text-xs text-t4 mt-1">{formatTime(timer.elapsed)}</p>
      </div>
      <div className="bg-gold-bg border border-gold-border rounded-xl px-4 py-3">
        <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-1.5">Recommandation</p>
        <p className="text-xs text-gold/70 leading-relaxed">{adaptation}</p>
      </div>
      <button
        onClick={resetTimer}
        className="w-full border border-s3 text-t3 text-xs rounded-xl py-2.5 hover:border-s4 hover:text-t2 transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  )
}

// ── Rest timer ─────────────────────────────────────────────────────
export function RestTimer({ seconds }: { seconds: number }) {
  const [rem, setRem] = useState(seconds)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || rem <= 0) return
    const t = setTimeout(() => setRem(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [running, rem])

  if (!running && rem === seconds) {
    return (
      <button
        onClick={() => setRunning(true)}
        className="text-[10px] text-t4 border border-s3 rounded-md px-2 py-1 hover:border-s4 hover:text-t3 transition-colors"
      >
        ⏱ Repos {seconds}s
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn('text-xs font-medium tabular', rem <= 0 ? 'text-state-green' : 'text-gold')}>
        {rem <= 0 ? 'Go !' : `${rem}s`}
      </span>
      {rem <= 0 && (
        <button onClick={() => { setRem(seconds); setRunning(false) }} className="text-[10px] text-t4 hover:text-t3">↩</button>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────
interface SportTimerProps {
  sessionLabel: string
  onBack?: () => void
}

type Phase = 'pre' | 'active' | 'eval' | 'done'

export function SportTimer({ sessionLabel, onBack }: SportTimerProps) {
  const { timer, eval: ev, setPhysical, startTimer } = useStore()

  const phase: Phase =
    ev.submitted              ? 'done'
    : timer.locked             ? 'eval'
    : timer.running || timer.elapsed > 0 ? 'active'
    : 'pre'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-t4 hover:text-t2 transition-colors">←</button>
        )}
        <div>
          <p className="text-[9px] text-t4 uppercase tracking-widest">Calisthénie</p>
          <p className="text-sm font-semibold text-t1">{sessionLabel}</p>
        </div>
      </div>

      {phase === 'pre'    && <PreCheck onReady={s => { setPhysical(s); startTimer() }} />}
      {phase === 'active' && <ActiveTimer />}
      {phase === 'eval'   && <Evaluation />}
      {phase === 'done'   && <SessionDone />}
    </div>
  )
}
