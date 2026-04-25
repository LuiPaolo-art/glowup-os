/**
 * GlowUp OS — Global store (Zustand + localStorage)
 * Daily key rotation = automatic reset at midnight.
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MOCK_USER, MOCK_TASKS, MOCK_EXERCISES, MOCK_BOOKS } from '@/lib/mock-data'
import { computeStats } from '@/types/daily'
import { computeAllScores } from '@/lib/scoring'
import { todayStr } from '@/lib/utils'
import type { Task, TaskPriority } from '@/types/daily'
import type { User, SystemState } from '@/types/user'
import type { CoachMessage } from '@/types/coach'
import type { Exercise } from '@/types/sport'
import type { DomainScores } from '@/types/learning'

// ── Sport ──────────────────────────────────────────────────────────
export interface TimerState {
  running: boolean
  startedAt: number | null
  elapsed: number
  locked: boolean
}

export type PhysicalState = 'fresh' | 'ok' | 'tired' | 'exhausted'
export type Completion     = 'full' | 'partial' | 'none'
export type Difficulty     = 'easy' | 'medium' | 'hard'

export interface EvalState {
  physicalPre: PhysicalState | null
  completion:  Completion | null
  difficulty:  Difficulty | null
  notes: string
  submitted: boolean
}

// ── QCM ───────────────────────────────────────────────────────────
export interface QcmQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  minTimeSec: number
}

export interface QcmSession {
  active: boolean
  contextType: 'book' | 'arc-pre' | 'arc-final' | null
  contextId: string | null
  questions: QcmQuestion[]
  index: number
  answers: (number | null)[]
  timePerQ: number[]
  questionStartedAt: number | null
  startedAt: number | null
  done: boolean
  score: number | null
}

// ── Defaults ───────────────────────────────────────────────────────
const DEFAULT_TIMER: TimerState = { running: false, startedAt: null, elapsed: 0, locked: false }
const DEFAULT_EVAL:  EvalState  = { physicalPre: null, completion: null, difficulty: null, notes: '', submitted: false }
const DEFAULT_QCM:   QcmSession = {
  active: false, contextType: null, contextId: null,
  questions: [], index: 0, answers: [], timePerQ: [],
  questionStartedAt: null, startedAt: null, done: false, score: null,
}

// ── Store ──────────────────────────────────────────────────────────
export interface AppStore {
  // State
  user: User
  tasks: Task[]
  water: number
  joiUsedToday: boolean
  timer: TimerState
  eval: EvalState
  bookPage: number
  messages: CoachMessage[]
  apiKeySet: boolean
  qcm: QcmSession
  sportSheetOpen: boolean
  chatLoading: boolean
  bookQcmScore: number | null
  bookQcmPassed: boolean
  arcQcmScores: Record<string, number>
  currentBookIndex: number
  unlockedBookIds: string[]
  docuModalOpen: boolean
  completedSpiritLessons: string[]

  exercises: Exercise[]
  domainScores: DomainScores
  sessionBaseScores: DomainScores   // snapshot at app open — for delta display, never persisted

  // Daily
  toggleTask:   (id: string) => void
  setTaskDone:  (id: string, done: boolean) => void
  setWater:     (n: number) => void
  useJOI:       () => void

  // Sport sheet
  openSportSheet:  () => void
  closeSportSheet: () => void
  levelUp: (exerciseId: string) => void

  // Timer
  startTimer:    () => void
  stopTimer:     () => void
  resetTimer:    () => void
  setPhysical:   (s: PhysicalState) => void
  setEvalField:  (k: 'completion' | 'difficulty' | 'notes', v: string) => void
  submitEval:    () => void

  // Reading
  addPages: (n: number) => void
  setPage:  (n: number) => void

  // Coach
  addMessage:     (m: CoachMessage) => void
  setApiKey:      () => void
  setChatLoading: (v: boolean) => void

  // Documentaire
  openDocuModal:  () => void
  closeDocuModal: () => void

  // Spiritualité — leçons
  markSpiritLessonDone: (lessonId: string) => void

  // QCM
  openQcm:  (ctx: QcmSession['contextType'], id: string, qs: QcmQuestion[]) => void
  answerQcm:(idx: number) => void
  nextQcmQ: () => void
  closeQcm: () => void

  // Internal
  _recompute:     () => void
  _advanceBook:   () => void
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: MOCK_USER,
      tasks: MOCK_TASKS,
      exercises: MOCK_EXERCISES,
      domainScores: computeAllScores(MOCK_TASKS, MOCK_EXERCISES, 0, 320, MOCK_USER.streak.current),
      sessionBaseScores: computeAllScores(MOCK_TASKS, MOCK_EXERCISES, 0, 320, MOCK_USER.streak.current),
      water: 0,
      joiUsedToday: false,
      timer: DEFAULT_TIMER,
      eval: DEFAULT_EVAL,
      bookPage: 0,
      messages: [],  // no pre-filled mock conversation
      apiKeySet: false,
      qcm: DEFAULT_QCM,
      sportSheetOpen: false,
      chatLoading: false,
      bookQcmScore: null,
      bookQcmPassed: false,
      arcQcmScores: {},
      currentBookIndex: 0,
      unlockedBookIds: [MOCK_BOOKS[0].id],
      docuModalOpen: false,
      completedSpiritLessons: [],

      // ── Daily ────────────────────────────────────────────────
      toggleTask(id) {
        set(s => ({
          tasks: s.tasks.map(t => t.id === id
            ? { ...t, done: !t.done, doneAt: !t.done
                ? new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })
                : undefined }
            : t
          )
        }))
        get()._recompute()
      },


      setTaskDone(id, done) {
        set(s => ({
          tasks: s.tasks.map(t =>
            t.id === id
              ? { ...t, done, doneAt: done ? new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : undefined }
              : t
          )
        }))
        get()._recompute()
      },
      setWater(n) {
        set({ water: n })
        if (n >= 5) {
          set(s => ({ tasks: s.tasks.map(t => t.id === 'water' ? { ...t, done: true } : t) }))
          get()._recompute()
        }
      },

      useJOI() {
        set(s => ({
          joiUsedToday: true,
          user: {
            ...s.user,
            joi: {
              ...s.user.joi,
              available: Math.max(0, s.user.joi.available - 1),
            },
          },
        }))
      },

      // ── Sport sheet ──────────────────────────────────────────
      openSportSheet()  { set({ sportSheetOpen: true }) },
      closeSportSheet() { set({ sportSheetOpen: false }) },

      levelUp(exerciseId) {
        set(s => ({
          exercises: s.exercises.map(ex => {
            if (ex.id !== exerciseId || !ex.canLevelUp || ex.currentLevel >= ex.maxLevel) return ex
            const newLevel = ex.currentLevel + 1
            return {
              ...ex,
              currentLevel: newLevel,
              sessionsAtLevel: 0,
              sessionsRequired: newLevel >= 1 ? 7 : 5,
              canLevelUp: false,
            }
          })
        }))
        get()._recompute()
      },

      // ── Timer ────────────────────────────────────────────────
      startTimer() {
        const { timer } = get()
        if (timer.locked) return
        set({ timer: { ...timer, running: true, startedAt: Date.now() - timer.elapsed * 1000 } })
      },

      stopTimer() {
        const { timer } = get()
        if (!timer.running || !timer.startedAt) return
        set({ timer: { running: false, startedAt: null, elapsed: Math.floor((Date.now() - timer.startedAt) / 1000), locked: true } })
      },

      resetTimer() { set({ timer: DEFAULT_TIMER, eval: DEFAULT_EVAL }) },

      setPhysical(s)      { set(st => ({ eval: { ...st.eval, physicalPre: s } })) },
      setEvalField(k, v)  { set(s  => ({ eval: { ...s.eval, [k]: v } })) },

      submitEval() {
        const { eval: ev } = get()
        if (!ev.completion) return
        const countsAsSession = ev.completion !== 'none'
        set(s => ({
          eval: { ...s.eval, submitted: true },
          tasks: s.tasks.map(t => t.id === 'sport' ? { ...t, done: true } : t),
          exercises: countsAsSession
            ? s.exercises.map(ex => {
                const req         = ex.sessionsRequired
                const newSessions = Math.min(ex.sessionsAtLevel + 1, req)
                return {
                  ...ex,
                  sessionsAtLevel: newSessions,
                  canLevelUp: newSessions >= req && ex.currentLevel < ex.maxLevel,
                }
              })
            : s.exercises,
        }))
        get()._recompute()
      },

      // ── Reading ──────────────────────────────────────────────
      addPages(n) {
        const { currentBookIndex, bookQcmPassed } = get()
        const bookTotal = MOCK_BOOKS[currentBookIndex]?.totalPages ?? 320
        set(s => ({ bookPage: Math.max(0, Math.min(bookTotal, s.bookPage + n)) }))
        if (n > 0) {
          set(s => ({ tasks: s.tasks.map(t => t.id === 'lecture' ? { ...t, done: true } : t) }))
          get()._recompute()
        }
        // If reading now complete AND QCM already passed → advance book
        if (bookQcmPassed && get().bookPage >= bookTotal) {
          get()._advanceBook()
        }
      },

      setPage(n) {
        const bookTotal = MOCK_BOOKS[get().currentBookIndex]?.totalPages ?? 320
        set({ bookPage: Math.max(0, Math.min(bookTotal, n)) })
      },

      // ── Documentaire ─────────────────────────────────────────
      openDocuModal()  { set({ docuModalOpen: true }) },
      closeDocuModal() { set({ docuModalOpen: false }) },

      // ── Spiritualité — leçons ─────────────────────────────────
      markSpiritLessonDone(lessonId) {
        set(s => ({
          completedSpiritLessons: s.completedSpiritLessons.includes(lessonId)
            ? s.completedSpiritLessons
            : [...s.completedSpiritLessons, lessonId],
        }))
      },

      // ── Coach ────────────────────────────────────────────────
      addMessage(m)      { set(s => ({ messages: [...s.messages, m] })) },
      setApiKey()        { set({ apiKeySet: true }) },
      setChatLoading(v)  { set({ chatLoading: v }) },

      // ── QCM ─────────────────────────────────────────────────
      openQcm(ctx, id, qs) {
        set({ qcm: {
          active: true, contextType: ctx, contextId: id,
          questions: qs, index: 0,
          answers: new Array(qs.length).fill(null),
          timePerQ: [], questionStartedAt: Date.now(),
          startedAt: Date.now(), done: false, score: null,
        }})
      },

      answerQcm(idx) {
        const { qcm } = get()
        if (qcm.done || qcm.answers[qcm.index] !== null) return
        const elapsed = qcm.questionStartedAt
          ? Math.floor((Date.now() - qcm.questionStartedAt) / 1000)
          : 0
        // Record answer — no minimum time, no auto-advance
        set(s => ({
          qcm: {
            ...s.qcm,
            answers: s.qcm.answers.map((a, i) => i === s.qcm.index ? idx : a),
            timePerQ: [...s.qcm.timePerQ, elapsed],
          }
        }))
        // nextQcmQ is now triggered manually from QuestionCard
      },

      nextQcmQ() {
        const { qcm } = get()
        const next = qcm.index + 1
        if (next >= qcm.questions.length) {
          const correct = qcm.answers.filter((a, i) => a === qcm.questions[i]?.correctIndex).length
          set(s => ({ qcm: { ...s.qcm, done: true, score: Math.round(correct / qcm.questions.length * 100) } }))
        } else {
          set(s => ({ qcm: { ...s.qcm, index: next, questionStartedAt: Date.now() } }))
        }
      },

      closeQcm() {
        const { qcm } = get()
        if (qcm.done && qcm.score !== null) {
          if (qcm.contextType === 'book') {
            const passed = qcm.score >= 70
            set({ bookQcmScore: qcm.score, bookQcmPassed: passed })
            get()._recompute()
            // If reading also complete → advance to next book
            if (passed) {
              const { bookPage, currentBookIndex } = get()
              const bookTotal = MOCK_BOOKS[currentBookIndex]?.totalPages ?? 320
              if (bookPage >= bookTotal) get()._advanceBook()
            }
          } else if (qcm.contextType === 'arc-final' && qcm.contextId) {
            set(s => ({ arcQcmScores: { ...s.arcQcmScores, [qcm.contextId!]: qcm.score! } }))
          }
        }
        set({ qcm: DEFAULT_QCM })
      },

      // ── Internal ─────────────────────────────────────────────
      _advanceBook() {
        const { currentBookIndex } = get()
        const nextIndex = currentBookIndex + 1
        if (nextIndex >= MOCK_BOOKS.length) return
        const nextBook = MOCK_BOOKS[nextIndex]
        set(s => ({
          currentBookIndex: nextIndex,
          bookPage: 0,
          bookQcmScore: null,
          bookQcmPassed: false,
          unlockedBookIds: s.unlockedBookIds.includes(nextBook.id)
            ? s.unlockedBookIds
            : [...s.unlockedBookIds, nextBook.id],
        }))
        get()._recompute()
      },

      _recompute() {
        const { tasks, exercises, bookPage, user, sessionBaseScores, bookQcmPassed, currentBookIndex } = get()
        const bookTotal = MOCK_BOOKS[currentBookIndex]?.totalPages ?? 320
        const scores = computeAllScores(tasks, exercises, bookPage, bookTotal, user.streak.current, bookQcmPassed)
        const state: SystemState = scores.discipline >= 65 ? 'green' : scores.discipline >= 45 ? 'yellow' : 'red'
        set(s => ({
          domainScores: scores,
          user: {
            ...s.user,
            systemState: state,
            globalScore: scores.global,
            globalScoreDelta: scores.global - sessionBaseScores.global,
          },
        }))
      },
    }),
    {
      name: `glowup-${todayStr()}`,
      storage: createJSONStorage(() => localStorage),
      partialize: s => ({
        tasks: s.tasks, water: s.water, bookPage: s.bookPage,
        joiUsedToday: s.joiUsedToday, apiKeySet: s.apiKeySet,
        eval: s.eval, user: s.user, messages: s.messages,
        exercises: s.exercises, domainScores: s.domainScores,
        bookQcmScore: s.bookQcmScore, bookQcmPassed: s.bookQcmPassed,
        arcQcmScores: s.arcQcmScores,
        currentBookIndex: s.currentBookIndex, unlockedBookIds: s.unlockedBookIds,
        completedSpiritLessons: s.completedSpiritLessons,
      }),
    }
  )
)

// ── Clean selectors (no cast needed) ─────────────────────────────
export const selStats    = () => computeStats(useStore.getState().tasks)
export const selByPrio   = (p: TaskPriority) => useStore.getState().tasks.filter(t => t.priority === p)
export const selElapsed  = (): number => {
  const { timer } = useStore.getState()
  if (!timer.running || !timer.startedAt) return timer.elapsed
  return Math.floor((Date.now() - timer.startedAt) / 1000)
}

// Reactive hook versions
export const useStats   = () => useStore(s => computeStats(s.tasks))
export const useElapsed = () => {
  // polled by component via useEffect
  const { timer } = useStore()
  if (!timer.running || !timer.startedAt) return timer.elapsed
  return timer.elapsed // stale — component must poll with setInterval
}
