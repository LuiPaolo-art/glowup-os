import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, right, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between px-5 pt-6 pb-4', className)}>
      <div>
        <h1 className="font-serif text-2xl font-semibold text-t1 tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-t4 text-xs mt-0.5 tracking-wide">{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-3 flex-shrink-0 ml-4">{right}</div>}
    </div>
  )
}
