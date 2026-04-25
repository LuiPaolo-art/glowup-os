import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** @deprecated use formatTime */
export const formatTimeSecs = formatTime

export function readingETA(pagesLeft: number, pagesPerDay = 15) {
  return Math.ceil(pagesLeft / pagesPerDay)
}

export function scoreDeltaDisplay(delta: number) {
  if (delta > 0) return { text: `+${delta}`, color: 'text-state-green' }
  if (delta < 0) return { text: `${delta}`, color: 'text-state-red' }
  return { text: 'stable', color: 'text-t3' }
}

export const DAYS_FR = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
export const MONTHS_FR = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']

export function todayLabel() {
  const d = new Date()
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`
}
