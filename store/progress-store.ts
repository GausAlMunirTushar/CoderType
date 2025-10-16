import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface LessonProgress {
  lessonId: string
  language: string
  topic: string
  completedAt: number
  wpm: number
  accuracy: number
  errors: number
  timeSpent: number
}

interface ProgressState {
  completedLessons: LessonProgress[]
  totalLessons: number
  addCompletedLesson: (lesson: LessonProgress) => void
  getAverageWPM: () => number
  getAverageAccuracy: () => number
  getTotalErrors: () => number
  getCompletedCount: () => number
  getLessonsByLanguage: (language: string) => LessonProgress[]
  clearProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      totalLessons: 46,

      addCompletedLesson: (lesson) =>
        set((state) => ({
          completedLessons: [...state.completedLessons, lesson],
        })),

      getAverageWPM: () => {
        const lessons = get().completedLessons
        if (lessons.length === 0) return 0
        const total = lessons.reduce((sum, lesson) => sum + lesson.wpm, 0)
        return Math.round(total / lessons.length)
      },

      getAverageAccuracy: () => {
        const lessons = get().completedLessons
        if (lessons.length === 0) return 0
        const total = lessons.reduce((sum, lesson) => sum + lesson.accuracy, 0)
        return Math.round(total / lessons.length)
      },

      getTotalErrors: () => {
        const lessons = get().completedLessons
        return lessons.reduce((sum, lesson) => sum + lesson.errors, 0)
      },

      getCompletedCount: () => get().completedLessons.length,

      getLessonsByLanguage: (language) => {
        return get().completedLessons.filter((lesson) => lesson.language === language)
      },

      clearProgress: () => set({ completedLessons: [] }),
    }),
    {
      name: "codertype-progress",
    },
  ),
)
