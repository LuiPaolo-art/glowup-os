'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/today',        label: "Aujourd'hui", symbol: '◎' },
  { href: '/progression',  label: 'Progression',  symbol: '▦' },
  { href: '/coach',        label: 'Coach',         symbol: '⬡' },
  { href: '/spirituality', label: 'Spiritualité',  symbol: '☽' },
  { href: '/sport',        label: 'Sport',          symbol: '▲' },
  { href: '/settings',     label: 'Réglages',      symbol: '⚙' },
]

export function Sidebar() {
  const path = usePathname()
  return (
    <aside className="hidden lg:flex flex-col w-[210px] min-h-screen fixed left-0 top-0 bg-s1 border-r border-s3 z-30">
      <div className="px-6 pt-7 pb-6 border-b border-s3">
        <span className="font-serif text-xl text-gold tracking-tight">GlowUp OS</span>
        <p className="text-[10px] text-t4 tracking-widest mt-0.5">v4.0</p>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {NAV.map(({ href, label, symbol }) => {
          const active = path.startsWith(href)
          return (
            <Link key={href} href={href} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              active ? 'bg-gold-bg border border-gold-border text-gold' : 'text-t2 hover:bg-s2 hover:text-t1'
            )}>
              <span className={cn('text-base leading-none flex-shrink-0', active ? 'text-gold' : 'text-t4')}>{symbol}</span>
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 py-4 border-t border-s3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-bg border border-gold-border flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-xs font-semibold">H</span>
          </div>
          <div className="min-w-0">
            <p className="text-t1 text-sm font-medium truncate">Hosni</p>
            <p className="text-t4 text-[10px]">Semaine 4 · Cycle 1</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

