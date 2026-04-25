'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SpiritualLessonContent } from '@/lib/mock-data/spiritualContent'

interface LessonModalProps {
  lesson: SpiritualLessonContent | null
  isCompleted: boolean
  onClose: () => void
  onMarkDone: (lessonId: string) => void
}

export function LessonModal({ lesson, isCompleted, onClose, onMarkDone }: LessonModalProps) {
  const [confirmed, setConfirmed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset confirmed state on each new lesson
  useEffect(() => { setConfirmed(false) }, [lesson?.id])

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (lesson) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lesson, onClose])

  // Lock scroll
  useEffect(() => {
    if (lesson) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lesson])

  if (!lesson) return null

  const alreadyDone = isCompleted || confirmed

  function handleMarkDone() {
    onMarkDone(lesson!.id)
    setConfirmed(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-s1 border border-s3 rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[92vh] animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle — mobile */}
        <div className="flex justify-center pt-3 sm:hidden flex-shrink-0">
          <div className="w-10 h-1 bg-s3 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-s2 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] text-t4 uppercase tracking-widest">
                Arc {lesson.arcNum} · Leçon {lesson.lessonNum}
              </span>
              <span className="text-[9px] text-t4">·</span>
              <span className="text-[9px] text-t4">{lesson.duration}</span>
              {alreadyDone && (
                <span className="text-[9px] text-state-green border border-state-green-border rounded px-1.5 py-0.5">
                  ✓ Lu
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl font-semibold text-t1 leading-snug">
              {lesson.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-t4 hover:text-t2 text-xl transition-colors mt-0.5"
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Intro */}
          <p className="text-sm text-t2 leading-relaxed italic border-l-2 border-gold pl-4 py-1">
            {lesson.intro}
          </p>

          {/* Sections */}
          {lesson.sections.map((section, i) => (
            <div key={i} className="space-y-2.5">
              <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">
                {section.heading}
              </h3>
              <div className="text-[13px] text-t3 leading-relaxed space-y-3">
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className={cn(
                    para.startsWith('—') ? 'pl-3 border-l border-s4' : '',
                  )}>
                    {para.split('\n').map((line, k) => (
                      <span key={k} className="block">{line}</span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Application */}
          <div className="bg-gold-bg border border-gold-border rounded-2xl px-4 py-4">
            <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span>⚡</span> Application concrète
            </p>
            <p className="text-xs text-gold/75 leading-relaxed">{lesson.application}</p>
          </div>

          {/* Key points */}
          <div className="bg-s2 border border-s3 rounded-2xl px-4 py-4">
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-3">
              Points-clés à retenir
            </p>
            <ul className="space-y-2">
              {lesson.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-gold flex-shrink-0 mt-0.5 text-xs">✦</span>
                  <span className="text-[12px] text-t3 leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom padding for button */}
          <div className="h-2" />
        </div>

        {/* Footer — sticky */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-s2 flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 border border-s3 text-t3 text-sm rounded-xl py-3 hover:border-s4 hover:text-t2 transition-colors"
          >
            Fermer
          </button>
          {alreadyDone ? (
            <div className="flex-1 flex items-center justify-center gap-2 bg-state-green-bg border border-state-green-border rounded-xl py-3">
              <span className="text-state-green text-sm font-medium">✓ Leçon complétée</span>
            </div>
          ) : (
            <button
              onClick={handleMarkDone}
              className="flex-1 bg-gold text-black text-sm font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity"
            >
              Marquer comme lu ✓
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
