export type SportDay = 'push' | 'legs' | 'rest'
export type Completion = 'full' | 'partial' | 'none'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ExerciseLevel { name: string; sets: string; tip: string }

export interface Exercise {
  id: string
  name: string
  currentLevel: number
  maxLevel: 2
  sessionsAtLevel: number
  sessionsRequired: number
  canLevelUp: boolean
  levels: [ExerciseLevel, ExerciseLevel, ExerciseLevel]
}

export interface SportWeek {
  planned: number
  done: number
  fullCount: number
  avgDuration: number
}

export const SPORT_PLAN: Record<number, SportDay> = {
  0: 'rest', 1: 'push', 2: 'legs', 3: 'rest',
  4: 'push', 5: 'rest', 6: 'legs',
}
