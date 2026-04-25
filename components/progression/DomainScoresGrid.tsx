import { DomainCard } from '@/components/ui/ScoreRing'
import type { DomainScores } from '@/types/learning'

const DOMAINS = [
  { key: 'sport',       label: 'Sport',         icon: '🏋️', color: '#6BA4D4' },
  { key: 'learning',    label: 'Apprentissage', icon: '📚', color: '#A47DC8' },
  { key: 'discipline',  label: 'Discipline',    icon: '🎯', color: '#C9A84C' },
  { key: 'constancy',   label: 'Constance',     icon: '🔥', color: '#5ACA9A' },
] as const

interface Props {
  scores: DomainScores
  deltas?: Partial<Record<keyof Omit<DomainScores,'global'>, number>>
}

export function DomainScoresGrid({ scores, deltas }: Props) {
  return (
    <div className="px-5 mb-3 grid grid-cols-2 gap-2.5">
      {DOMAINS.map(({ key, label, icon, color }) => (
        <DomainCard
          key={key}
          label={label}
          icon={icon}
          score={scores[key]}
          color={color}
          delta={deltas?.[key]}
        />
      ))}
    </div>
  )
}
