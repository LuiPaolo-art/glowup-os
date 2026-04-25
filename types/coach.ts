export type CoachMode = 'demanding' | 'support' | 'reconquest'
export type InsightType = 'positive' | 'neutral' | 'warning' | 'critical'

export interface CoachReport {
  id: string
  date: string
  constat: string
  analyse: string
  actions: string[]
  defi: string
  alert?: string
  metrics: {
    completionRate: number
    sportDone: boolean
    pagesRead: number
    water: number
    prayers: number
    score: number
    scoreDelta: number
  }
}

export interface CoachInsight {
  id: string
  icon: string
  text: string
  type: InsightType
  metricLabel?: string
  metricValue?: string
}

export interface CoachMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
