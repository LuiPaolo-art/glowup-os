'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/today',        label: "Auj.",    symbol: '◎' },
  { href: '/progression',  label: 'Progrès', symbol: '▦' },
  { href: '/coach',        label: 'Coach',   symbol: '⬡' },
  { href: '/spirituality', label: 'Esprit',  symbol: '☽' },
  { href: '/sport',        label: 'Sport',   symbol: '▲' },
  { href: '/settings',     label: 'Config',  symbol: '⚙' },
]

export function MobileNav() {
  const path = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-s1 border-t border-s3 flex pb-safe">
      {NAV.map(({ href, label, symbol }) => {
        const active = path.startsWith(href)
        return (
          <Link key={href} href={href} className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 text-[9px] uppercase tracking-wider font-medium transition-colors',
            active ? 'text-gold' : 'text-t4 hover:text-t2'
          )}>
            <span className="text-lg leading-none">{symbol}</span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

