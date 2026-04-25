'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { getTodayDocu } from '@/lib/mock-data/docu'

export function DocuModal() {
  const { docuModalOpen, closeDocuModal, tasks, setTaskDone } = useStore()

  const docu    = getTodayDocu()
  const task    = tasks.find(t => t.id === 'documentaire')
  const isDone  = task?.done ?? false

  // ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDocuModal()
    }
    if (docuModalOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [docuModalOpen, closeDocuModal])

  // Body scroll lock
  useEffect(() => {
    if (docuModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [docuModalOpen])

  if (!docuModalOpen) return null

  function markWatched() {
    if (isDone) return
    setTaskDone('documentaire', true)
    // Brief delay so user sees the green state before modal closes
    setTimeout(() => closeDocuModal(), 800)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={closeDocuModal}
    >
      <div
        className="w-full sm:max-w-lg bg-s1 border border-s3 rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-s3 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-s2 flex items-start justify-between">
          <div>
            <p className="text-[9px] text-t4 uppercase tracking-widest mb-1">
              Documentaire du jour
            </p>
            <p className="text-[10px] text-gold">{docu.channel} · {docu.source}</p>
          </div>
          <button
            onClick={closeDocuModal}
            className="text-t4 hover:text-t2 text-xl transition-colors ml-4 flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {/* Title + description */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-t1 leading-snug mb-2">
              {docu.title}
            </h3>
            <p className="text-xs text-t3 leading-relaxed">{docu.description}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-t4">⏱</span>
              <span className="text-xs text-t3">{docu.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-t4">▶</span>
              <span className="text-xs text-t3">{docu.source}</span>
            </div>
            {isDone && (
              <span className="ml-auto text-[10px] text-state-green border border-state-green-border rounded px-2 py-0.5">
                ✓ Validé aujourd'hui
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <a
              href={docu.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-s2 border border-s3 text-t2 text-sm font-medium rounded-xl py-3 hover:border-s4 hover:text-t1 transition-colors"
            >
              <span>▶</span>
              <span>Regarder</span>
            </a>

            {isDone ? (
              <div className="flex-1 flex items-center justify-center gap-2 bg-state-green-bg border border-state-green-border rounded-xl py-3">
                <span className="text-state-green text-sm font-semibold">✓ Validé</span>
              </div>
            ) : (
              <button
                onClick={markWatched}
                className="flex-1 bg-gold text-black text-sm font-semibold rounded-xl py-3 hover:opacity-85 transition-opacity"
              >
                J'ai regardé ✓
              </button>
            )}
          </div>

          <p className="text-[10px] text-t4 text-center pb-1">
            {isDone
              ? 'Tâche validée · Nouveau documentaire demain'
              : '"J\'ai regardé" valide la tâche · Le lien s\'ouvre dans un nouvel onglet'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
