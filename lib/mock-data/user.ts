import type { User } from '@/types/user'

export const MOCK_USER: User = {
  id: 'user-local',
  name: 'Hosni',
  systemState: 'green',
  globalScore: 0,
  globalScoreDelta: 0,
  streak: { current: 0, best: 0, qualified: 0 },
  joi: { available: 4, max: 4 },
  cycle: { week: 1, phase: 'establishment' },
  level: { index: 1, label: 'Débutant' },
}
