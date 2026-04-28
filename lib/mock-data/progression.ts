import type { Book, BookProgress, Arc, DomainScores } from '@/types/learning'
import type { Exercise, SportWeek } from '@/types/sport'

export const MOCK_BOOKS: Book[] = [
  { id: 'atomic-habits',  title: 'Atomic Habits',          author: 'James Clear',        totalPages: 320, color: '#2A5A3A', why: 'Le livre méta — explique comment construire tout le reste.', order: 1, unlocked: true  },
  { id: 'meditations',    title: 'Méditations',            author: 'Marc Aurèle',        totalPages: 200, color: '#3A3A5A', why: 'Philosophie stoïcienne applicable chaque matin.',           order: 2, unlocked: true  },
  { id: 'influence',      title: 'Influence',              author: 'Robert Cialdini',    totalPages: 320, color: '#5A2A2A', why: 'Comprendre comment tu es manipulé.',                       order: 3, unlocked: false },
  { id: 'thinking-fast',  title: 'Thinking, Fast and Slow',author: 'Daniel Kahneman',    totalPages: 500, color: '#2A4A5A', why: '95% de tes décisions viennent du Système 1.',              order: 4, unlocked: false },
  { id: 'le-prince',      title: 'Le Prince',              author: 'Machiavel',          totalPages: 130, color: '#3A2A1A', why: 'Comprendre le pouvoir tel qu\'il est réellement.',         order: 5, unlocked: false },
  { id: 'pere-riche',     title: 'Père Riche Père Pauvre', author: 'Robert Kiyosaki',    totalPages: 290, color: '#1A3A1A', why: 'Faire travailler l\'argent pour soi.',                    order: 6, unlocked: false },
  { id: '48-laws',        title: '48 Laws of Power',       author: 'Robert Greene',      totalPages: 480, color: '#1A1A1A', why: 'Comprendre les règles du jeu social.',                    order: 7, unlocked: false },
]

export const MOCK_BOOK_PROGRESS: BookProgress = {
  bookId: 'atomic-habits',
  currentPage: 145,
  isComplete: false,
  qcmPassed: false,
}

export const MOCK_ARCS: Arc[] = [
  {
    id: 'arc-1', num: 1,
    title: 'Fondations & Discipline', color: '#C9A84C',
    description: 'Comprendre comment fonctionne ton cerveau face aux habitudes.',
    passScore: 70, durationDays: 14, status: 'active',
    lessons: [
      { number: '1.1', title: 'Le Tawhid : L\'Unicité d\'Allah', done: false },
      { number: '1.2', title: 'Les Six Piliers de la Foi',        done: false },
      { number: '1.3', title: 'Le Sens de la Création',          done: false },
      { number: '1.4', title: 'La Shahada — Son Vrai Sens',      done: false },
    ],
    finalAttempts: 0,
    unlockConditions: [],
  },
  {
    id: 'arc-2', num: 2,
    title: 'Corps & Performance',   color: '#6BA4D4',
    description: 'Optimiser le corps pour maximiser l\'énergie et la récupération.',
    passScore: 70, durationDays: 14, status: 'locked',
    lessons: [], finalAttempts: 0,
    unlockConditions: [
      { label: 'Arc 1 validé',         met: false },
      { label: 'Score Sport ≥ 40',     met: false },
      { label: '8 séances réussies',   met: false },
    ],
  },
  {
    id: 'arc-3', num: 3,
    title: 'Intelligence & Persuasion', color: '#E06C75',
    description: 'Comprendre comment les gens pensent et sont influencés.',
    passScore: 75, durationDays: 21, status: 'locked',
    lessons: [], finalAttempts: 0,
    unlockConditions: [
      { label: 'Arc 1 validé',              met: false },
      { label: 'Score Apprentissage ≥ 40', met: false },
    ],
  },
]

export const MOCK_EXERCISES: Exercise[] = [
  {
    id: 'pompes', name: 'Pompes',
    currentLevel: 0, maxLevel: 2,
    sessionsAtLevel: 0, sessionsRequired: 5, canLevelUp: false,
    levels: [
      { name: 'Pompes standards', sets: '3 × 10', tip: 'Corps aligné, descente 2 sec' },
      { name: 'Pompes archer',    sets: '3 × 8/côté', tip: 'Un bras s\'étire pendant que l\'autre pousse' },
      { name: 'Pompes à une main', sets: '3 × 5/côté', tip: 'Gainage absolu, descente ultra-lente' },
    ],
  },
  {
    id: 'diamant', name: 'Pompes diamant',
    currentLevel: 0, maxLevel: 2,
    sessionsAtLevel: 0, sessionsRequired: 5, canLevelUp: false,
    levels: [
      { name: 'Pompes diamant',          sets: '3 × 10', tip: 'Mains en triangle sous le sternum' },
      { name: 'Pompes déclinées diamant', sets: '3 × 8', tip: 'Pieds surélevés, tension maximale' },
      { name: 'Pompes pseudo planche',   sets: '3 × 6', tip: 'Mains vers l\'avant, épaules chargées' },
    ],
  },
  {
    id: 'pike', name: 'Pike push-up',
    currentLevel: 0, maxLevel: 2,
    sessionsAtLevel: 0, sessionsRequired: 5, canLevelUp: false,
    levels: [
      { name: 'Pike push-up',         sets: '3 × 8', tip: 'Hanches hautes en V, tête vers le sol' },
      { name: 'Pike push-up décliné', sets: '3 × 8', tip: 'Pieds sur chaise, angle plus vertical' },
      { name: 'Handstand push-up mur', sets: '3 × 5', tip: 'Shoulder press bodyweight pur' },
    ],
  },
  {
    id: 'dips', name: 'Dips',
    currentLevel: 0, maxLevel: 2,
    sessionsAtLevel: 0, sessionsRequired: 5, canLevelUp: false,
    levels: [
      { name: 'Dips sur chaise',   sets: '3 × 12', tip: 'Dos proche, coudes 90° en bas' },
      { name: 'Dips parallèles',   sets: '3 × 10', tip: 'Corps droit, amplitude complète' },
      { name: 'Dips lestés',       sets: '3 × 8',  tip: 'Sac à dos avec poids' },
    ],
  },
]

export const MOCK_SPORT_WEEK: SportWeek = {
  planned: 0, done: 0, fullCount: 0, avgDuration: 0,
}

export const MOCK_DOMAIN_SCORES: DomainScores = {
  sport: 0, learning: 0, discipline: 0, constancy: 0, global: 0,
}
