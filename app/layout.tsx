import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'

export const metadata: Metadata = {
  title: 'GlowUp OS',
  description: 'Système de progression personnel · Exigeant, structuré, durable.',
}

export const viewport: Viewport = {
  themeColor: '#080808',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-[210px] min-h-screen pb-20 lg:pb-8">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}
