export type SystemState = 'green' | 'yellow' | 'red'
export type CyclePhase = 'establishment' | 'development' | 'performance' | 'review'

export interface User {
  id: string
  name: string
  systemState: SystemState
  globalScore: number
  globalScoreDelta: number
  streak: { current: number; best: number; qualified: number }
  joi: { available: number; max: number }
  cycle: { week: number; phase: CyclePhase }
  level: { index: number; label: string }
}

export const SYSTEM_STATE_META: Record<SystemState, { label: string; dotColor: string }> = {
  green:  { label: 'Performance', dotColor: '#5ACA9A' },
  yellow: { label: 'Adaptatif',   dotColor: '#C9A84C' },
  red:    { label: 'Reprise',     dotColor: '#CA6060' },
}
