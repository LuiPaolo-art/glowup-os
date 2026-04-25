export type TaskPriority = 'non-negotiable' | 'important' | 'bonus'
export type TaskCategory = 'spirit' | 'body' | 'sport' | 'learning' | 'mental'

export interface Task {
  id: string
  label: string
  sublabel?: string
  category: TaskCategory
  priority: TaskPriority
  done: boolean
  doneAt?: string
  hasSublinkAction?: boolean  // shows "Voir →" action button
  hasTimer?: boolean          // shows timer trigger (used for sport historically)
}

export interface DailyStats {
  done: number
  total: number
  pct: number
  nnDone: number
  nnTotal: number
}

export function computeStats(tasks: Task[]): DailyStats {
  const done = tasks.filter(t => t.done).length
  const total = tasks.length
  const nn = tasks.filter(t => t.priority === 'non-negotiable')
  return {
    done,
    total,
    pct: total > 0 ? Math.round((done / total) * 100) : 0,
    nnDone: nn.filter(t => t.done).length,
    nnTotal: nn.length,
  }
}
