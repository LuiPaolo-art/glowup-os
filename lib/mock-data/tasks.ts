import type { Task } from '@/types/daily'

export const MOCK_TASKS: Task[] = [
  // NON-NEGOTIABLE
  { id: 'fajr',    label: 'Fajr — prière du matin',    sublabel: 'Avant le lever du soleil', category: 'spirit',   priority: 'non-negotiable', done: false },
  { id: 'water',   label: 'Eau — 5 verres minimum',                                          category: 'body',     priority: 'non-negotiable', done: false },
  { id: 'douche',  label: 'Douche',                                                          category: 'body',     priority: 'non-negotiable', done: false },

  // IMPORTANT
  { id: 'sport',    label: 'Sport — Push (Haut du corps)', sublabel: 'Lun & Jeu · 4 exercices',  category: 'sport',    priority: 'important', done: false, hasSublinkAction: true },
  { id: 'prayers',  label: 'Dhuhr + Asr',                                                        category: 'spirit',   priority: 'important', done: false },
  { id: 'lecture',  label: 'Lecture — 15 pages',           sublabel: 'Atomic Habits',             category: 'learning', priority: 'important', done: false, hasSublinkAction: true },
  { id: 'journal',  label: 'Journaling — 10 min',          sublabel: '3 intentions + 1 ressenti', category: 'mental',   priority: 'important', done: false },

  // IMPORTANT (suite)
  { id: 'prayers2', label: 'Maghrib + Isha + Azkar',                                             category: 'spirit',   priority: 'important', done: false },
  { id: 'documentaire', label: 'Documentaire du jour',     sublabel: '~15 min · apprentissage',  category: 'learning', priority: 'important', done: false, hasSublinkAction: true },

  // BONUS
  { id: 'veille',  label: 'Veille — Intelligence artificielle', sublabel: 'TLDR AI · article du jour', category: 'learning', priority: 'bonus', done: false },
  { id: 'silence', label: '5 min de silence complet',                                            category: 'mental',   priority: 'bonus', done: false },
  { id: 'eod',     label: 'EOD — Objectif pour demain',   sublabel: '1 objectif précis',         category: 'mental',   priority: 'bonus', done: false },
]

// Heatmap vide — sera rempli depuis l'historique réel des sessions
export const MOCK_HEATMAP: number[] = new Array(28).fill(0)
