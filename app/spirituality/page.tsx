'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PageHeader }   from '@/components/layout/PageHeader'
import { SectionLabel } from '@/components/ui/Divider'
import { ProgressBar }  from '@/components/ui/ProgressBar'
import { QcmModal, QcmTrigger } from '@/components/qcm/QcmModal'
import { LessonModal }  from '@/components/spirituality/LessonModal'
import { useStore }     from '@/lib/store'
import { QCM_ARC1_FINAL } from '@/lib/mock-data/qcm'
import { SPIRIT_LESSON_CONTENT, ARC_LESSON_IDS } from '@/lib/mock-data/spiritualContent'
import type { SpiritualLessonContent } from '@/lib/mock-data/spiritualContent'

// ── Mock spiritual data ────────────────────────────────────────────
const PRAYERS = [
  { id: 'fajr',    label: 'Fajr',    window: '04:30 – lever', done: true,  doneAt: '05:47', inWindow: true },
  { id: 'dhuhr',   label: 'Dhuhr',   window: '12:30 – 15:00', done: true,  doneAt: '13:12', inWindow: true },
  { id: 'asr',     label: 'Asr',     window: '15:30 – Maghrib', done: false, doneAt: null, inWindow: false },
  { id: 'maghrib', label: 'Maghrib', window: 'Coucher – 1h',  done: false, doneAt: null, inWindow: false },
  { id: 'isha',    label: 'Isha',    window: '20:00 – 04:00', done: false, doneAt: null, inWindow: false },
]

const PRAYER_AVG = { fajr: 71, dhuhr: 86, asr: 57, maghrib: 86, isha: 71 }

const HADITHS = [
  { text: "Les actes les plus aimés d'Allah sont ceux accomplis de manière constante, même s'ils sont peu nombreux.", src: 'Boukhari & Muslim' },
  { text: "Ton corps a des droits sur toi.", src: 'Boukhari' },
  { text: "La recherche de la connaissance est une obligation pour chaque musulman.", src: 'Ibn Majah' },
  { text: "Le fort n'est pas celui qui terrasse les autres, mais celui qui se maîtrise lui-même lorsqu'il est en colère.", src: 'Boukhari & Muslim' },
  { text: "Les actes ne valent que par les intentions, et chaque homme n'aura que ce qu'il a eu intention de faire.", src: 'Boukhari & Muslim' },
]

const SPIRITUAL_ARCS = [
  {
    num: 1, title: 'Fondements de la Foi (Aqidah)', color: '#C9A84C',
    description: 'Le Tawhid, les six piliers de la foi, le sens de la création.',
    status: 'active' as const, passScore: 70,
    lessonIds: ARC_LESSON_IDS[1],
    preScore: 58, finalScore: undefined, finalAttempts: 0,
  },
  {
    num: 2, title: 'La Prière (Salah)', color: '#6BA4D4',
    description: 'Histoire, Khushu\', nawafil et prière collective.',
    status: 'locked' as const, passScore: 75,
    lessonIds: ARC_LESSON_IDS[2],
    preScore: undefined, finalScore: undefined, finalAttempts: 0,
  },
  {
    num: 3, title: 'Histoires des Prophètes', color: '#A47DC8',
    description: 'Ibrahim, Moussa, Muhammad ﷺ et les Compagnons.',
    status: 'locked' as const, passScore: 70,
    lessonIds: [],
    preScore: undefined, finalScore: undefined, finalAttempts: 0,
  },
  {
    num: 4, title: 'Éthique et Comportement (Akhlaq)', color: '#5ACA9A',
    description: 'Sincérité, colère, droits des autres, intention.',
    status: 'locked' as const, passScore: 75,
    lessonIds: [],
    preScore: undefined, finalScore: undefined, finalAttempts: 0,
  },
]

// ── Prayer tracker ─────────────────────────────────────────────────
function PrayerTracker() {
  const [prayers, setPrayers] = useState(PRAYERS)
  const { setTaskDone } = useStore()
  const done = prayers.filter(p => p.done).length

  function toggle(id: string) {
    setPrayers(ps => {
      const next = ps.map(p =>
        p.id === id
          ? { ...p, done: !p.done, doneAt: !p.done ? new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : null }
          : p
      )

      // Sync to store tasks so report/insights reflect actual prayer state
      const byId = (name: string) => next.find(p => p.id === name)

      // fajr → task 'fajr'
      if (id === 'fajr') {
        setTaskDone('fajr', byId('fajr')!.done)
      }
      // dhuhr + asr → task 'prayers' (done if either is done)
      if (id === 'dhuhr' || id === 'asr') {
        setTaskDone('prayers', !!(byId('dhuhr')?.done || byId('asr')?.done))
      }
      // maghrib + isha → task 'prayers2' (done if either is done)
      if (id === 'maghrib' || id === 'isha') {
        setTaskDone('prayers2', !!(byId('maghrib')?.done || byId('isha')?.done))
      }

      return next
    })
  }

  return (
    <div className="mx-5 mb-3 bg-s1 border border-s3 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-s2 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-t4 uppercase tracking-widest mb-0.5">Prières du jour</p>
          <p className="text-xs text-t3">5 prières · {done}/5 effectuées</p>
        </div>
        <span className={cn('text-xl font-semibold', done === 5 ? 'text-state-green' : 'text-gold')}>{done}/5</span>
      </div>
      <div className="divide-y divide-s2">
        {prayers.map(p => (
          <div key={p.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-s2 transition-colors" onClick={() => toggle(p.id)}>
            <button
              onClick={e => { e.stopPropagation(); toggle(p.id) }}
              className={cn('w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all',
                p.done ? 'bg-gold border-gold animate-check' : 'border-s4 hover:border-gold-dim'
              )}
            >
              {p.done && <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2"><path d="M1 4l3 3 5-6" stroke="#000" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-medium', p.done ? 'text-t1' : 'text-t2')}>{p.label}</span>
                {!p.inWindow && p.done && <span className="text-[9px] text-state-yellow border border-state-yellow-border rounded px-1">Hors plage</span>}
              </div>
              <p className="text-[10px] text-t4">{p.window}</p>
            </div>
            {p.doneAt && <span className="text-[10px] text-t3 flex-shrink-0">{p.doneAt}</span>}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-s2 flex items-center justify-between">
        <div className="flex gap-3 text-xs">
          <span className="text-state-green">✓ Azkar matin · 06:05</span>
          <span className="text-t4">○ Azkar soir</span>
        </div>
        <span className="text-xs text-t3">Coran : 3 pages</span>
      </div>
    </div>
  )
}

// ── Prayer stats 7d ────────────────────────────────────────────────
function PrayerStats() {
  return (
    <div className="mx-5 mb-3 bg-s1 border border-s3 rounded-2xl px-4 py-4">
      <p className="text-[9px] text-t4 uppercase tracking-widest mb-3">Régularité 7 jours</p>
      <div className="space-y-3">
        {Object.entries(PRAYER_AVG).map(([name, pct]) => {
          const label = name[0].toUpperCase() + name.slice(1)
          return (
            <div key={name} className="flex items-center gap-3">
              <span className="text-xs text-t3 w-20 flex-shrink-0">{label}</span>
              <ProgressBar
                value={pct}
                variant={pct >= 80 ? 'green' : pct >= 50 ? 'gold' : 'blue'}
                size="xs"
                className="flex-1"
              />
              <span className={cn('text-[11px] font-medium w-8 text-right flex-shrink-0',
                pct >= 80 ? 'text-state-green' : pct >= 50 ? 'text-gold' : 'text-state-red'
              )}>
                {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Spiritual arc card ─────────────────────────────────────────────
interface SpiritualArcDef {
  num: number
  title: string
  description: string
  color: string
  status: 'locked' | 'active' | 'completed'
  passScore: number
  lessonIds: string[]
  preScore?: number
  finalScore?: number
  finalAttempts: number
}

function SpiritualArcCard({
  arc,
  completedIds,
  onOpenLesson,
}: {
  arc: SpiritualArcDef
  completedIds: string[]
  onOpenLesson: (lesson: SpiritualLessonContent) => void
}) {
  const [open, setOpen] = useState(arc.status === 'active')
  const { openQcm } = useStore()

  const lessonContents = arc.lessonIds.map(id => SPIRIT_LESSON_CONTENT[id]).filter(Boolean)
  const doneLessons    = arc.lessonIds.filter(id => completedIds.includes(id)).length
  const totalLessons   = arc.lessonIds.length
  const pct            = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0
  const hasContent     = totalLessons > 0

  return (
    <div className={cn(
      'bg-s1 border rounded-2xl overflow-hidden',
      arc.status === 'locked' ? 'border-s2 opacity-40' : 'border-s3'
    )}>
      <button
        disabled={arc.status === 'locked'}
        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-s2 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ background: arc.status === 'locked' ? '#2A2A2A' : arc.color }} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] uppercase tracking-widest font-medium"
              style={{ color: arc.status === 'locked' ? '#444' : arc.color }}>
              Arc {arc.num}
              {arc.status === 'active'    && ' \u00b7 En cours'}
              {arc.status === 'completed' && ' \u00b7 Valid\u00e9 \u2713'}
              {arc.status === 'locked'    && ' \u00b7 Verrouill\u00e9'}
            </span>
            {hasContent && arc.status === 'active' && (
              <span className="text-[9px] text-t4">{doneLessons}/{totalLessons} le\u00e7ons</span>
            )}
          </div>
          <p className="text-sm font-semibold text-t1">{arc.title}</p>
          <p className="text-[11px] text-t3 mt-0.5">{arc.description}</p>
          {arc.status === 'active' && hasContent && (
            <ProgressBar value={pct} size="xs" className="mt-2" />
          )}
        </div>
        {arc.status !== 'locked' && (
          <svg viewBox="0 0 16 16" fill="none"
            className={cn('w-3.5 h-3.5 text-t4 flex-shrink-0 mt-1 transition-transform', open && 'rotate-180')}
            stroke="currentColor" strokeWidth={2}>
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Active arc with no content yet */}
      {arc.status === 'active' && !hasContent && (
        <div className="border-t border-s2 px-4 py-4 text-center">
          <p className="text-xs text-t3 mb-0.5">Contenu bient\u00f4t disponible</p>
          <p className="text-[10px] text-t4">Les le\u00e7ons de cet arc sont en cours de r\u00e9daction.</p>
        </div>
      )}

      {/* Active arc with lessons */}
      {open && arc.status === 'active' && hasContent && (
        <div className="border-t border-s2 animate-slide-up">
          {lessonContents.map((lesson) => {
            const isDone = completedIds.includes(lesson.id)
            return (
              <button
                key={lesson.id}
                onClick={() => onOpenLesson(lesson)}
                className="w-full flex items-center gap-3 px-4 py-3 border-b border-s2 last:border-0 hover:bg-s2 transition-colors text-left group"
              >
                <span className={isDone ? 'text-state-green' : 'text-t4'}>
                  {isDone ? '\u2713' : '\u25cb'}
                </span>
                <span className={cn('text-[11px] flex-1 leading-snug',
                  isDone ? 'text-t3 line-through' : 'text-t2')}>
                  {lesson.lessonNum} \u2014 {lesson.title}
                </span>
                <span className="text-[10px] text-t4 flex-shrink-0">{lesson.duration}</span>
                <span className="text-[10px] text-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  Lire \u2192
                </span>
              </button>
            )
          })}

          {/* QCM — only for arc 1 which has real questions */}
          {arc.num === 1 && (
            <div className="flex gap-2 px-4 py-3">
              <QcmTrigger
                label="QCM initial"
                score={arc.preScore}
                onStart={() => openQcm('arc-pre', `arc-${arc.num}`, QCM_ARC1_FINAL)}
                className="flex-1"
              />
              <QcmTrigger
                label={`QCM final (${arc.passScore}%)`}
                score={arc.finalScore}
                onStart={() => openQcm('arc-final', `arc-${arc.num}`, QCM_ARC1_FINAL)}
                className="flex-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Hadith archive ────────────────────────────────────────────────
const HADITH_ARCHIVE = [
  { text: "Les actes les plus aim\u00e9s d'Allah sont ceux accomplis de mani\u00e8re constante, m\u00eame s'ils sont peu nombreux.", src: 'Boukhari & Muslim' },
  { text: "Ton corps a des droits sur toi.", src: 'Boukhari' },
  { text: "La recherche de la connaissance est une obligation pour chaque musulman.", src: 'Ibn Majah' },
  { text: "Le fort n'est pas celui qui terrasse les autres, mais celui qui se ma\u00eetrise lui-m\u00eame lorsqu'il est en col\u00e8re.", src: 'Boukhari & Muslim' },
]

// ── Page ──────────────────────────────────────────────────────────
export default function SpiritualityPage() {
  const {
    completedSpiritLessons,
    markSpiritLessonDone,
    openQcm,
  } = useStore()

  const [activeLesson, setActiveLesson] = useState<SpiritualLessonContent | null>(null)

  const { spiritualScore, prayerAverage7d } = {
    spiritualScore: 62,
    prayerAverage7d: { fajr: 71, dhuhr: 86, asr: 57, maghrib: 86, isha: 71 } as Record<string, number>,
  }

  const avgFajr = prayerAverage7d.fajr

  return (
    <div className="min-h-screen bg-s0">
      <QcmModal />

      <LessonModal
        lesson={activeLesson}
        isCompleted={activeLesson ? completedSpiritLessons.includes(activeLesson.id) : false}
        onClose={() => setActiveLesson(null)}
        onMarkDone={(id) => markSpiritLessonDone(id)}
      />

      <PageHeader
        title="Spiritualit\u00e9"
        subtitle="Aqidah \u00b7 Salah \u00b7 Akhlaq"
        right={
          <div className="text-right">
            <div className="text-xl font-semibold text-gold">{spiritualScore}</div>
            <div className="text-[10px] text-t4">score</div>
          </div>
        }
      />

      {/* Quick stats */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Fajr 7j',     value: `${avgFajr}%`,                           color: avgFajr >= 70 ? '#5ACA9A' : '#C9A84C' },
          { label: 'Cours lus',   value: `${completedSpiritLessons.length}`,       color: '#C9A84C' },
          { label: 'Arc actuel',  value: '1/4',                                   color: '#C9A84C' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-s1 border border-s3 rounded-xl px-3 py-3 text-center">
            <div className="text-lg font-semibold" style={{ color }}>{value}</div>
            <div className="text-[9px] text-t4 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Pri\u00e8res du jour</SectionLabel>
      <PrayerTracker />

      <SectionLabel className="mt-1">R\u00e9gularit\u00e9 7 jours</SectionLabel>
      <PrayerStats />

      <SectionLabel className="mt-1">Parcours spirituel</SectionLabel>
      <div className="mx-5 mb-4 space-y-2.5">
        {SPIRITUAL_ARCS.map(arc => (
          <SpiritualArcCard
            key={arc.num}
            arc={arc}
            completedIds={completedSpiritLessons}
            onOpenLesson={(lesson) => setActiveLesson(lesson)}
          />
        ))}
      </div>

      <SectionLabel>Hadiths de r\u00e9f\u00e9rence</SectionLabel>
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl overflow-hidden divide-y divide-s2">
        {HADITH_ARCHIVE.map((h, i) => (
          <div key={i} className="px-4 py-3">
            <p className="font-serif text-sm italic text-t3 leading-relaxed">"{h.text}"</p>
            <p className="text-[10px] text-t4 mt-1.5">\u2014 {h.src}</p>
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  )
}
