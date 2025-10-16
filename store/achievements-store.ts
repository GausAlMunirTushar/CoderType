import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "speed" | "accuracy" | "consistency" | "milestone" | "special"
  requirement: number
  unlocked: boolean
  unlockedAt?: number
  color: string
}

interface AchievementsState {
  achievements: Achievement[]
  checkAchievements: (stats: {
    completedCount: number
    avgWPM: number
    avgAccuracy: number
    bestWPM: number
    totalErrors: number
  }) => void
  getUnlockedCount: () => number
  getRecentUnlocked: () => Achievement[]
}

const initialAchievements: Achievement[] = [
  // Milestone Achievements
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    category: "milestone",
    requirement: 1,
    unlocked: false,
    color: "orange",
  },
  {
    id: "10-lessons",
    title: "Getting Started",
    description: "Complete 10 lessons",
    icon: "🚀",
    category: "milestone",
    requirement: 10,
    unlocked: false,
    color: "cyan",
  },
  {
    id: "25-lessons",
    title: "Dedicated Learner",
    description: "Complete 25 lessons",
    icon: "📚",
    category: "milestone",
    requirement: 25,
    unlocked: false,
    color: "green",
  },
  {
    id: "all-lessons",
    title: "Master Coder",
    description: "Complete all 46 lessons",
    icon: "👑",
    category: "milestone",
    requirement: 46,
    unlocked: false,
    color: "purple",
  },

  // Speed Achievements
  {
    id: "speed-30",
    title: "Typing Novice",
    description: "Reach 30 WPM average",
    icon: "⚡",
    category: "speed",
    requirement: 30,
    unlocked: false,
    color: "yellow",
  },
  {
    id: "speed-50",
    title: "Speed Demon",
    description: "Reach 50 WPM average",
    icon: "🔥",
    category: "speed",
    requirement: 50,
    unlocked: false,
    color: "orange",
  },
  {
    id: "speed-70",
    title: "Lightning Fingers",
    description: "Reach 70 WPM average",
    icon: "⚡",
    category: "speed",
    requirement: 70,
    unlocked: false,
    color: "cyan",
  },
  {
    id: "speed-100",
    title: "Typing Master",
    description: "Reach 100 WPM in a single lesson",
    icon: "💫",
    category: "speed",
    requirement: 100,
    unlocked: false,
    color: "purple",
  },

  // Accuracy Achievements
  {
    id: "accuracy-90",
    title: "Precise Typer",
    description: "Maintain 90% accuracy average",
    icon: "🎯",
    category: "accuracy",
    requirement: 90,
    unlocked: false,
    color: "green",
  },
  {
    id: "accuracy-95",
    title: "Accuracy Expert",
    description: "Maintain 95% accuracy average",
    icon: "✨",
    category: "accuracy",
    requirement: 95,
    unlocked: false,
    color: "cyan",
  },
  {
    id: "accuracy-100",
    title: "Perfectionist",
    description: "Complete a lesson with 100% accuracy",
    icon: "💎",
    category: "accuracy",
    requirement: 100,
    unlocked: false,
    color: "purple",
  },

  // Special Achievements
  {
    id: "error-free",
    title: "Flawless",
    description: "Complete 5 lessons with zero errors",
    icon: "🌟",
    category: "special",
    requirement: 5,
    unlocked: false,
    color: "gold",
  },
  {
    id: "night-owl",
    title: "Night Owl",
    description: "Complete a lesson after midnight",
    icon: "🦉",
    category: "special",
    requirement: 1,
    unlocked: false,
    color: "indigo",
  },
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Complete a lesson before 6 AM",
    icon: "🌅",
    category: "special",
    requirement: 1,
    unlocked: false,
    color: "orange",
  },
]

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,

      checkAchievements: (stats) => {
        const achievements = get().achievements
        const now = Date.now()
        let updated = false

        const newAchievements = achievements.map((achievement) => {
          if (achievement.unlocked) return achievement

          let shouldUnlock = false

          switch (achievement.id) {
            case "first-lesson":
              shouldUnlock = stats.completedCount >= 1
              break
            case "10-lessons":
              shouldUnlock = stats.completedCount >= 10
              break
            case "25-lessons":
              shouldUnlock = stats.completedCount >= 25
              break
            case "all-lessons":
              shouldUnlock = stats.completedCount >= 46
              break
            case "speed-30":
              shouldUnlock = stats.avgWPM >= 30
              break
            case "speed-50":
              shouldUnlock = stats.avgWPM >= 50
              break
            case "speed-70":
              shouldUnlock = stats.avgWPM >= 70
              break
            case "speed-100":
              shouldUnlock = stats.bestWPM >= 100
              break
            case "accuracy-90":
              shouldUnlock = stats.avgAccuracy >= 90
              break
            case "accuracy-95":
              shouldUnlock = stats.avgAccuracy >= 95
              break
            case "accuracy-100":
              shouldUnlock = stats.avgAccuracy >= 100
              break
          }

          if (shouldUnlock) {
            updated = true
            return { ...achievement, unlocked: true, unlockedAt: now }
          }

          return achievement
        })

        if (updated) {
          set({ achievements: newAchievements })
        }
      },

      getUnlockedCount: () => {
        return get().achievements.filter((a) => a.unlocked).length
      },

      getRecentUnlocked: () => {
        return get()
          .achievements.filter((a) => a.unlocked)
          .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
          .slice(0, 5)
      },
    }),
    {
      name: "codertype-achievements",
    },
  ),
)
