import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  gold?: boolean
  onClick?: () => void
}

export function Card({ children, className, gold, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border',
        gold ? 'bg-gold-bg border-gold-border' : 'bg-s1 border-s3',
        onClick && 'cursor-pointer hover:border-s4 transition-colors',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardRow({ children, className, border = true }: {
  children: React.ReactNode
  className?: string
  border?: boolean
}) {
  return (
    <div className={cn('px-4 py-3', border && 'border-b border-s2 last:border-b-0', className)}>
      {children}
    </div>
  )
}
