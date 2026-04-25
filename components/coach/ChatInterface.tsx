'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { MOCK_DOMAIN_SCORES } from '@/lib/mock-data'
import type { CoachMessage } from '@/types/coach'
import type { CoachContext } from '@/app/api/coach/chat/route'

const QUICK_PROMPTS = [
  'Analyse mes stats de cette semaine',
  'Comment améliorer ma séance push ?',
  'À quel rythme je lis mon livre ?',
  'Génère mon plan pour demain',
  'Pourquoi mon score Learning est faible ?',
]

function buildContext(s: ReturnType<typeof useStore.getState>): CoachContext {
  const book = { title: 'Atomic Habits', page: s.bookPage, total: 320 }
  return {
    globalScore:      s.user.globalScore,
    systemState:      s.user.systemState,
    completionToday:  Math.round(s.tasks.filter(t => t.done).length / s.tasks.length * 100),
    streak:           s.user.streak.current,
    sportDone:        s.tasks.find(t => t.id === 'sport')?.done ?? false,
    pagesRead:        Math.max(0, s.bookPage - 145),
    water:            s.water,
    prayersCount:     s.tasks.filter(t => ['fajr','prayers','prayers2'].includes(t.id) && t.done).length,
    bookTitle:        book.title,
    bookPage:         book.page,
    bookTotal:        book.total,
    arcTitle:         'Fondations & Discipline',
    arcStatus:        'active',
    sportScore:       s.domainScores.sport,
    learningScore:    s.domainScores.learning,
    disciplineScore:  s.domainScores.discipline,
    constancyScore:   s.domainScores.constancy,
  }
}

export function ChatInterface() {
  const store = useStore()
  const { messages, chatLoading, addMessage, setChatLoading, user } = store
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatLoading])

  async function send(text: string) {
    const msg = text.trim()
    if (!msg || chatLoading) return

    const userMsg: CoachMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      content: msg,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }
    addMessage(userMsg)
    if (inputRef.current) inputRef.current.value = ''
    setChatLoading(true)

    try {
      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, context: buildContext(useStore.getState()) }),
      })
      const data = await res.json()
      addMessage({
        id: `a${Date.now()}`,
        role: 'assistant',
        content: data.reply ?? 'Erreur de réponse.',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      })
    } catch {
      addMessage({
        id: `e${Date.now()}`,
        role: 'assistant',
        content: 'Impossible de contacter le coach. Vérifie ta connexion.',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      })
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="mx-5 mb-4">
      {/* Messages */}
      <div className="bg-s1 border border-s3 rounded-2xl overflow-hidden mb-3">
        <div className="h-72 overflow-y-auto divide-y divide-s2">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <span className="text-4xl mb-3">⬡</span>
              <p className="text-xs text-t3 max-w-xs leading-relaxed">
                Pose une question sur ton sport, ta lecture, ta progression ou tes stats. Le coach répond avec tes données réelles.
              </p>
            </div>
          ) : (
            messages.map(m => (
              <div key={m.id} className={cn('px-4 py-3', m.role === 'user' && 'bg-gold-bg/30')}>
                <p className={cn('text-[9px] uppercase tracking-widest font-medium mb-1.5', m.role === 'user' ? 'text-gold-dim' : 'text-t4')}>
                  {m.role === 'user' ? user.name : 'Coach IA'} · {m.timestamp}
                </p>
                <p className={cn('text-[13px] leading-relaxed whitespace-pre-wrap', m.role === 'user' ? 'text-t2' : 'text-t3')}>
                  {m.content}
                </p>
              </div>
            ))
          )}
          {chatLoading && (
            <div className="px-4 py-3">
              <p className="text-[9px] text-t4 uppercase tracking-widest mb-1.5">Coach IA</p>
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-soft" style={{ animationDelay: `${i*150}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 mb-2.5 overflow-x-auto pb-1 no-scrollbar">
        {QUICK_PROMPTS.map(p => (
          <button
            key={p}
            disabled={chatLoading}
            onClick={() => send(p)}
            className="flex-shrink-0 text-[10px] text-t4 border border-s3 rounded-full px-3 py-1.5 hover:border-s4 hover:text-t3 transition-colors disabled:opacity-30"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          onKeyDown={e => e.key === 'Enter' && send(inputRef.current?.value ?? '')}
          disabled={chatLoading}
          placeholder="Pose une question…"
          className="flex-1 bg-s1 border border-s3 text-t1 text-sm rounded-xl px-4 py-2.5 placeholder:text-t4 outline-none focus:border-s4 transition-colors disabled:opacity-40"
        />
        <button
          disabled={chatLoading}
          onClick={() => send(inputRef.current?.value ?? '')}
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0',
            chatLoading ? 'bg-s2 text-t4 cursor-not-allowed' : 'bg-gold text-black hover:opacity-85'
          )}
        >
          {chatLoading
            ? <div className="w-3.5 h-3.5 rounded-full border-2 border-t4 border-t-transparent animate-spin" />
            : <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          }
        </button>
      </div>
    </div>
  )
}
