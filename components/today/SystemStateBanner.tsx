'use client'

import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'

export function SystemStateBanner() {
  const { user, domainScores } = useStore()
  const state = user.systemState

  if (state === 'green') return null

  const isRed = state === 'red'

  const config = isRed
    ? {
        icon: '○',
        label: 'MODE REPRISE',
        title: 'Essentiels uniquement',
        body: `Discipline ${domainScores.discipline}/100. Seules les tâches non-négociables sont affichées. Le reste est suspendu.`,
        exit: 'Pour en sortir : complétion > 50% pendant 3 jours consécutifs.',
        what: [
          'Sport, lecture et bonus sont masqués',
          'Fais tes 3 non-négociables — c\'est suffisant',
          'Tu peux utiliser un JOI pour protéger ton streak',
        ],
        bg:    'bg-state-red-bg border-state-red-border',
        text:  'text-state-red',
        muted: 'text-state-red/60',
        dot:   '#CA6060',
      }
    : {
        icon: '◐',
        label: 'MODE ADAPTATIF',
        title: 'Volume réduit',
        body: `Discipline ${domainScores.discipline}/100. Les objectifs sont allégés automatiquement.`,
        exit: 'Pour en sortir : 5 jours consécutifs à 65%+ de complétion.',
        what: [
          'Lecture : 8 pages au lieu de 15',
          'Sport : 2 exercices au lieu de 4',
          'Bonus : désactivés',
        ],
        bg:    'bg-state-yellow-bg border-state-yellow-border',
        text:  'text-state-yellow',
        muted: 'text-state-yellow/60',
        dot:   '#C9A84C',
      }

  return (
    <div className={cn(
      'mx-5 mb-3 rounded-2xl border px-4 py-3 transition-all duration-300 animate-fade-in',
      config.bg
    )}>
      <div className="flex items-start gap-3">
        {/* Animated state dot */}
        <div className="flex-shrink-0 mt-0.5 flex items-center gap-1.5">
          <span className={cn('text-base', config.text)}>{config.icon}</span>
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Title row */}
          <div>
            <p className={cn('text-[9px] uppercase tracking-widest font-semibold', config.text)}>
              {config.label}
            </p>
            <p className={cn('text-xs font-medium mt-0.5', config.text)}>
              {config.title}
            </p>
          </div>

          {/* Body */}
          <p className={cn('text-[11px] leading-relaxed', config.muted)}>
            {config.body}
          </p>

          {/* What changes — bullet list */}
          <ul className="space-y-0.5">
            {config.what.map((item, i) => (
              <li key={i} className={cn('text-[10px] flex items-start gap-1.5', config.muted)}>
                <span className="flex-shrink-0 mt-0.5">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Exit condition */}
          <p className={cn('text-[10px] font-medium pt-0.5 border-t', config.text,
            isRed ? 'border-state-red-border' : 'border-state-yellow-border'
          )}>
            {config.exit}
          </p>
        </div>
      </div>
    </div>
  )
}
