import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CustomLesson {
  id: string
  title: string
  description: string
  code: string
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  createdAt: number
  author: string
}

interface CustomLessonsState {
  customLessons: CustomLesson[]
  addCustomLesson: (lesson: Omit<CustomLesson, "id" | "createdAt">) => void
  deleteCustomLesson: (id: string) => void
  getCustomLessonById: (id: string) => CustomLesson | undefined
}

export const useCustomLessonsStore = create<CustomLessonsState>()(
  persist(
    (set, get) => ({
      customLessons: [],

      addCustomLesson: (lesson) => {
        const newLesson: CustomLesson = {
          ...lesson,
          id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: Date.now(),
        }
        set((state) => ({
          customLessons: [...state.customLessons, newLesson],
        }))
      },

      deleteCustomLesson: (id) => {
        set((state) => ({
          customLessons: state.customLessons.filter((lesson) => lesson.id !== id),
        }))
      },

      getCustomLessonById: (id) => {
        return get().customLessons.find((lesson) => lesson.id === id)
      },
    }),
    {
      name: "codertype-custom-lessons",
    },
  ),
)
