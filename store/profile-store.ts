import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserProfile {
  username: string
  email: string
  avatar: string
  bio: string
  joinedAt: number
  favoriteLanguage: string
  goal: string
}

interface ProfileState {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  exportData: () => string
  importData: (data: string) => boolean
}

const defaultProfile: UserProfile = {
  username: "Anonymous User",
  email: "",
  avatar: "",
  bio: "Learning to type code faster!",
  joinedAt: Date.now(),
  favoriteLanguage: "js",
  goal: "Reach 60 WPM",
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,

      updateProfile: (updates) => {
        set((state) => ({
          profile: { ...state.profile, ...updates },
        }))
      },

      exportData: () => {
        const profile = get().profile
        const progress = localStorage.getItem("codertype-progress")
        const achievements = localStorage.getItem("codertype-achievements")
        const customLessons = localStorage.getItem("codertype-custom-lessons")
        const challenges = localStorage.getItem("codertype-challenges")
        const theme = localStorage.getItem("codertype-theme")

        const exportData = {
          profile,
          progress: progress ? JSON.parse(progress) : null,
          achievements: achievements ? JSON.parse(achievements) : null,
          customLessons: customLessons ? JSON.parse(customLessons) : null,
          challenges: challenges ? JSON.parse(challenges) : null,
          theme: theme ? JSON.parse(theme) : null,
          exportedAt: Date.now(),
          version: "1.0",
        }

        return JSON.stringify(exportData, null, 2)
      },

      importData: (data) => {
        try {
          const importedData = JSON.parse(data)

          if (importedData.profile) {
            set({ profile: importedData.profile })
          }

          if (importedData.progress) {
            localStorage.setItem("codertype-progress", JSON.stringify(importedData.progress))
          }

          if (importedData.achievements) {
            localStorage.setItem("codertype-achievements", JSON.stringify(importedData.achievements))
          }

          if (importedData.customLessons) {
            localStorage.setItem("codertype-custom-lessons", JSON.stringify(importedData.customLessons))
          }

          if (importedData.challenges) {
            localStorage.setItem("codertype-challenges", JSON.stringify(importedData.challenges))
          }

          if (importedData.theme) {
            localStorage.setItem("codertype-theme", JSON.stringify(importedData.theme))
          }

          return true
        } catch (error) {
          console.error("Failed to import data:", error)
          return false
        }
      },
    }),
    {
      name: "codertype-profile",
    },
  ),
)
