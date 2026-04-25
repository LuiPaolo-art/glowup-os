export type ArcStatus = 'locked' | 'active' | 'completed'

export interface Book {
  id: string
  title: string
  author: string
  totalPages: number
  color: string
  why: string
  order: number
  unlocked: boolean
}

export interface BookProgress {
  bookId: string
  currentPage: number
  isComplete: boolean
  qcmScore?: number
  qcmPassed: boolean
}

export interface ArcLesson {
  number: string
  title: string
  done: boolean
  qcmScore?: number
}

export interface Arc {
  id: string
  num: number
  title: string
  description: string
  color: string
  passScore: number
  durationDays: number
  status: ArcStatus
  lessons: ArcLesson[]
  preQcmScore?: number
  finalQcmScore?: number
  finalAttempts: number
  unlockConditions: Array<{ label: string; met: boolean; value?: string }>
}

export interface DomainScores {
  sport: number
  learning: number
  discipline: number
  constancy: number
  global: number
}
