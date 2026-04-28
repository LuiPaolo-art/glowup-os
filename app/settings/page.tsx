'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PageHeader }   from '@/components/layout/PageHeader'
import { SectionLabel } from '@/components/ui/Divider'
import { Badge }        from '@/components/ui/Badge'
import { useStore }     from '@/lib/store'

const DAYS_FR = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
const SPORT_PLAN: Record<number, { label: string; color: string }> = {
  0: { label: 'Repos actif', color: '#444' },
  1: { label: 'Push',        color: '#C9A84C' },
  2: { label: 'Legs',        color: '#6BA4D4' },
  3: { label: 'Repos actif', color: '#444' },
  4: { label: 'Push',        color: '#C9A84C' },
  5: { label: 'Repos actif', color: '#444' },
  6: { label: 'Legs',        color: '#6BA4D4' },
}

function Row({ icon, label, desc, right, danger, onClick }: {
  icon: string; label: string; desc?: string
  right?: React.ReactNode; danger?: boolean; onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-3 border-b border-s2 last:border-0',
        onClick && 'cursor-pointer hover:bg-s2 transition-colors'
      )}
    >
      <span className="text-base w-6 text-center flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', danger ? 'text-state-red' : 'text-t2')}>{label}</p>
        {desc && <p className="text-[10px] text-t4 mt-0.5">{desc}</p>}
      </div>
      {right ? <div className="flex-shrink-0">{right}</div> : onClick && <span className="text-t4">→</span>}
    </div>
  )
}

export default function SettingsPage() {
  const { user, apiKeySet, setApiKey } = useStore()
  const [keyInput, setKeyInput] = useState('')
  const [keySaved, setKeySaved] = useState(false)

  function saveKey() {
    if (!keyInput.trim()) return
    setApiKey()
    setKeySaved(true)
    setKeyInput('')
  }

  return (
    <div className="min-h-screen bg-s0">
      <PageHeader title="Réglages" subtitle="Configuration du système" />

      {/* Profile */}
      <SectionLabel>Profil</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <div className="px-4 py-4 border-b border-s2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-bg border border-gold-border flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-semibold">{user.name[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-t1">{user.name}</p>
              <p className="text-[10px] text-t4">Cycle {user.cycle.week} · {user.level.label}</p>
            </div>
            <Badge variant="gold">Score {user.globalScore}</Badge>
          </div>
        </div>
        <Row icon="🔥" label="Streak actuel"         right={<span className="text-xs text-gold">{user.streak.current} jours</span>} />
        <Row icon="⚡" label="JOI disponibles"       desc="Jours Off Intelligents" right={<span className="text-xs text-t2">{user.joi.available}/{user.joi.max}</span>} />
        <Row icon="🛡" label="Score de fiabilité" desc="SFU — disponible après 7 jours d'utilisation" right={
          <span className="text-xs text-t4">—</span>
        } />
        <Row icon="🔄" label="État système"          right={
          <Badge variant={user.systemState === 'green' ? 'success' : user.systemState === 'yellow' ? 'warning' : 'danger'}>
            {user.systemState === 'green' ? 'Performance' : user.systemState === 'yellow' ? 'Adaptatif' : 'Reprise'}
          </Badge>
        } />
      </div>

      {/* Coach IA */}
      <SectionLabel>Coach IA</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={cn('w-2 h-2 rounded-full', (apiKeySet || keySaved) ? 'bg-state-green' : 'bg-s3')} />
            <p className="text-xs text-t2">{(apiKeySet || keySaved) ? 'Coach IA connecté' : 'Coach IA non configuré'}</p>
          </div>
          <p className="text-[11px] text-t4 leading-relaxed mb-3">
            1. Va sur <span className="text-gold">console.anthropic.com</span> → API Keys<br />
            2. Crée une clé et colle-la ici — stockée localement
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 bg-s2 border border-s3 text-t2 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-s4 transition-colors placeholder:text-t4"
            />
            <button
              onClick={saveKey}
              disabled={!keyInput.trim()}
              className="text-xs font-medium bg-gold text-black rounded-xl px-4 py-2.5 disabled:opacity-30 hover:opacity-85 transition-opacity"
            >
              Sauver
            </button>
          </div>
          {keySaved && <p className="text-[10px] text-state-green mt-2">✓ Clé API sauvegardée</p>}
        </div>
      </div>

      {/* Sport schedule */}
      <SectionLabel>Programme sport</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        {DAYS_FR.map((day, i) => {
          const plan = SPORT_PLAN[i]
          return (
            <Row key={i} icon={i === 0 || i === 3 || i === 5 ? '🧘' : i === 1 || i === 4 ? '💪' : '🦵'}
              label={day}
              right={<span className="text-xs font-medium" style={{ color: plan.color }}>{plan.label}</span>}
            />
          )
        })}
        <div className="px-4 py-3 border-t border-s2">
          <p className="text-[10px] text-t4 leading-relaxed">
            Push (Lun & Jeu) + Legs (Mar & Sam) + Repos actif (Mer, Ven, Dim). Récupération optimale entre groupes musculaires.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <SectionLabel>Notifications</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <Row icon="🔔" label="Activer les notifications" desc="Rappels prières, sport, lecture"
          onClick={() => 'Notification' in window && Notification.requestPermission()}
        />
        <Row icon="📵" label="Max par jour" right={<span className="text-xs text-t3">4 max.</span>} />
        <Row icon="🌙" label="Silence nocturne" right={<span className="text-xs text-t3">23h – 06h</span>} />
      </div>

      {/* Data controls */}
      <SectionLabel>Données</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden">
        <Row icon="📤" label="Exporter mes données" desc="JSON · Progression complète"
          onClick={() => {
            const key = Object.keys(localStorage).find(k => k.startsWith('glowup-'))
            const data = key ? localStorage.getItem(key) : '{}'
            const blob = new Blob([data ?? '{}'], { type: 'application/json' })
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
            a.download = `glowup-export-${new Date().toISOString().split('T')[0]}.json`; a.click()
          }}
        />
        <Row icon="🗑" label="Remettre à zéro" desc="Efface toutes les données — irréversible" danger
          onClick={() => { if (confirm('Effacer TOUTES les données ?')) { localStorage.clear(); location.reload() } }}
        />
      </div>

      {/* Version */}
      <div className="px-5 pb-8 text-center space-y-1">
        <p className="text-[10px] text-t4">GlowUp OS v4.0 · Step 2</p>
        <p className="text-[10px] text-t4">Next.js 14 · TypeScript · Zustand</p>
      </div>
    </div>
  )
}
