'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { SportTimer } from '@/components/sport/SportTimer'
import { ExerciseList } from '@/components/sport/ExerciseList'

export function SportSheet() {
  const { sportSheetOpen, closeSportSheet, eval: ev, timer, exercises, levelUp } = useStore()
  const sheetRef = useRef<HTMLDivElement>(null)

  // Close on backdrop click
  function onBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      // Only close if session not active
      if (!timer.running && !timer.locked) closeSportSheet()
    }
  }

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !timer.running && !timer.locked) closeSportSheet()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [timer.running, timer.locked, closeSportSheet])

  // Prevent body scroll when open
  useEffect(() => {
    if (sportSheetOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sportSheetOpen])

  // Auto-close 2.5 s after session validated
  useEffect(() => {
    if (!ev.submitted) return
    const t = setTimeout(() => closeSportSheet(), 2500)
    return () => clearTimeout(t)
  }, [ev.submitted, closeSportSheet])

  if (!sportSheetOpen) return null

  const sessionDone = ev.submitted

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 animate-fade-in"
      onClick={onBackdrop}
    >
      <div
        ref={sheetRef}
        className="w-full sm:max-w-lg bg-s1 border border-s3 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-s3 rounded-full" />
        </div>

        {/* Close button — only when session done or not started */}
        {(!timer.running && !timer.locked || sessionDone) && (
          <div className="flex justify-end px-4 pt-3 pb-0 sm:pt-4">
            <button
              onClick={closeSportSheet}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-s2 text-t3 hover:bg-s3 hover:text-t2 transition-colors text-sm"
            >
              ×
            </button>
          </div>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
          {/* Timer section */}
          <SportTimer sessionLabel="Push — Haut du corps" />

          {/* Exercise list — visible once session starts */}
          {(timer.running || timer.elapsed > 0) && !sessionDone && (
            <div>
              <p className="text-[9px] text-t4 uppercase tracking-widest mb-3">Exercices du jour</p>
              <div className="bg-s0 border border-s3 rounded-2xl overflow-hidden">
                <ExerciseList exercises={exercises} onLevelUp={levelUp} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
