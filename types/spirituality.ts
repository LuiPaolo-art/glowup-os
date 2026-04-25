export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export interface PrayerLog {
  name: PrayerName
  label: string
  done: boolean
  doneAt: string | null
  inWindow: boolean
  window: string
}

export interface DailyPrayers {
  date: string
  prayers: PrayerLog[]
  azkarMorning: boolean
  azkarEvening: boolean
  quranPages: number
}

export interface SpiritualArc {
  id: string
  num: number
  title: string
  description: string
  color: string
  passScore: number
  status: 'locked' | 'active' | 'completed'
  lessonsTotal: number
  lessonsDone: number
}
