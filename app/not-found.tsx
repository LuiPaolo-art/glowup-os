import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-s0 flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-7xl font-semibold text-gold mb-4">404</p>
      <p className="text-t2 text-sm mb-1">Cette page n'existe pas.</p>
      <p className="text-t4 text-xs mb-8">Tu es hors du chemin prévu.</p>
      <Link
        href="/today"
        className="bg-gold text-black text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-85 transition-opacity"
      >
        Retour au plan du jour
      </Link>
    </div>
  )
}
