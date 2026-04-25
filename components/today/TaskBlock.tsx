'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Task, TaskPriority } from '@/types/daily'

const CAT_DOT: Record<Task['category'], string> = {
  spirit:   'bg-gold',
  body:     'bg-d-sport',
  sport:    'bg-d-const',
  learning: 'bg-d-learn',
  mental:   'bg-orange-400',
}

const BLOCK_META: Record<TaskPriority, { label: string; desc: string }> = {
  'non-negotiable': { label: 'Non-négociable', desc: 'Si tu ne fais que ça, la journée compte.' },
  'important':      { label: 'Important',      desc: 'Ces tâches font la différence.' },
  'bonus':          { label: 'Bonus',          desc: 'Maximise si tu peux.' },
}

interface TaskRowProps {
  task: Task
  onToggle: (id: string) => void
  onAction?: (id: string) => void
}

function TaskRow({ task, onToggle, onAction }: TaskRowProps) {
  return (
    <div
      onClick={() => onToggle(task.id)}
      className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-s2 transition-colors border-b border-s2 last:border-0 group"
    >
      {/* Checkbox */}
      <button
        onClick={e => { e.stopPropagation(); onToggle(task.id) }}
        className={cn(
          'w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200',
          task.done ? 'bg-gold border-gold animate-check' : 'border-s4 hover:border-gold-dim'
        )}
      >
        {task.done && (
          <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2">
            <path d="M1 4l3 3 5-6" stroke="#000" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Category dot */}
      <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', CAT_DOT[task.category])} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-[13.5px] leading-snug transition-colors', task.done ? 'line-through text-t4' : 'text-t1')}>
          {task.label}
        </p>
        {task.sublabel && (
          <p className={cn('text-[11px] mt-0.5', task.done ? 'text-t4' : 'text-t3')}>{task.sublabel}</p>
        )}
        {task.doneAt && task.done && (
          <p className="text-[10px] text-t4 mt-0.5">✓ {task.doneAt}</p>
        )}
      </div>

      {/* Action button — visible on hover, fires onAction not onToggle */}
      {task.hasSublinkAction && !task.done && onAction && (
        <button
          onClick={e => { e.stopPropagation(); onAction(task.id) }}
          className="flex-shrink-0 text-[10px] text-gold border border-gold-border rounded-md px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Voir →
        </button>
      )}
    </div>
  )
}

interface TaskBlockProps {
  priority: TaskPriority
  tasks: Task[]
  onToggle: (id: string) => void
  onAction?: (id: string) => void
  defaultOpen?: boolean
}

export function TaskBlock({ priority, tasks, onToggle, onAction, defaultOpen = true }: TaskBlockProps) {
  const [open, setOpen] = useState(defaultOpen)
  const meta = BLOCK_META[priority]
  const done = tasks.filter(t => t.done).length
  const allDone = done === tasks.length && tasks.length > 0

  return (
    <div className="mx-5 mb-3 bg-s1 border border-s3 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-s2 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-t1">{meta.label}</span>
            <span className={cn(
              'text-[10px] font-medium px-1.5 py-0.5 rounded',
              allDone ? 'text-state-green bg-state-green-bg' : 'text-t3 bg-s2'
            )}>
              {allDone ? '✓ Complet' : `${done}/${tasks.length}`}
            </span>
          </div>
          {!open && <p className="text-[10px] text-t4 mt-0.5">{meta.desc}</p>}
        </div>
        <svg viewBox="0 0 16 16" fill="none" className={cn('w-3.5 h-3.5 text-t4 transition-transform', open && 'rotate-180')} stroke="currentColor" strokeWidth={2}>
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-s2 animate-slide-up">
          {tasks.map(t => <TaskRow key={t.id} task={t} onToggle={onToggle} onAction={onAction} />)}
          {tasks.length === 0 && <p className="px-4 py-3 text-[11px] text-t4">Aucune tâche.</p>}
        </div>
      )}
    </div>
  )
}
