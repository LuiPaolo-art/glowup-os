import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('px-5 mb-2 text-[9px] text-t4 uppercase tracking-widest font-medium', className)}>
      {children}
    </p>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-s2 mx-4', className)} />
}
