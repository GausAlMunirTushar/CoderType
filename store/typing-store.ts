import { create } from "zustand"

interface TypingMetrics {
  wpm: number
  cpm: number
  accuracy: number
  errors: number
  startTime: number | null
  isTyping: boolean
  currentIndex: number
  typedText: string
  incorrectIndices: Set<number>
}

interface TypingState extends TypingMetrics {
  practiceMode: boolean
  setPracticeMode: (mode: boolean) => void
  startTyping: () => void
  stopTyping: () => void
  resetTyping: () => void
  updateTyping: (char: string, correctChar: string, index: number) => void
  calculateMetrics: (totalChars: number, elapsedTime: number) => void
}

export const useTypingStore = create<TypingState>((set, get) => ({
  wpm: 0,
  cpm: 0,
  accuracy: 100,
  errors: 0,
  startTime: null,
  isTyping: false,
  currentIndex: 0,
  typedText: "",
  incorrectIndices: new Set(),
  practiceMode: false,

  setPracticeMode: (mode) => set({ practiceMode: mode }),

  startTyping: () =>
    set({
      startTime: Date.now(),
      isTyping: true,
    }),

  stopTyping: () => set({ isTyping: false }),

  resetTyping: () =>
    set({
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      errors: 0,
      startTime: null,
      isTyping: false,
      currentIndex: 0,
      typedText: "",
      incorrectIndices: new Set(),
    }),

  updateTyping: (char, correctChar, index) => {
    const state = get()
    const newTypedText = state.typedText + char
    const newIncorrectIndices = new Set(state.incorrectIndices)

    if (char !== correctChar) {
      newIncorrectIndices.add(index)
      set({
        errors: state.errors + 1,
        incorrectIndices: newIncorrectIndices,
        typedText: newTypedText,
        currentIndex: index + 1,
      })
    } else {
      set({
        typedText: newTypedText,
        currentIndex: index + 1,
      })
    }

    if (state.startTime) {
      const elapsed = Date.now() - state.startTime
      get().calculateMetrics(index + 1, elapsed)
    }
  },

  calculateMetrics: (totalChars, elapsedTime) => {
    const state = get()
    const minutes = elapsedTime / 60000

    // Prevent division by zero
    if (minutes === 0) {
      set({ wpm: 0, cpm: 0, accuracy: 100 })
      return
    }

    const words = totalChars / 5
    const wpm = Math.round(words / minutes) || 0

    const cpm = Math.round(totalChars / minutes) || 0

    const accuracy = totalChars > 0 ? Math.round(((totalChars - state.errors) / totalChars) * 100) : 100

    set({ wpm, cpm, accuracy: Math.max(0, accuracy) })
  },
}))
