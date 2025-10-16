import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Challenge {
  id: string
  title: string
  description: string
  code: string
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  targetWPM: number
  targetAccuracy: number
  timeLimit?: number
  completed: boolean
  bestScore?: {
    wpm: number
    accuracy: number
    completedAt: number
  }
}

interface ChallengesState {
  challenges: Challenge[]
  dailyChallenge: Challenge | null
  completeChallenge: (id: string, wpm: number, accuracy: number) => void
  generateDailyChallenge: () => void
  getChallengeById: (id: string) => Challenge | undefined
}

const sampleChallenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Speed Challenge: Variables",
    description: "Type as fast as you can while maintaining accuracy",
    code: `const name = "John";
let age = 25;
var city = "New York";
const isStudent = true;`,
    language: "js",
    difficulty: "beginner",
    targetWPM: 40,
    targetAccuracy: 95,
    completed: false,
  },
  {
    id: "challenge-2",
    title: "Accuracy Challenge: Functions",
    description: "Focus on perfect accuracy",
    code: `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(10, 20);
console.log(result);`,
    language: "js",
    difficulty: "intermediate",
    targetWPM: 35,
    targetAccuracy: 98,
    completed: false,
  },
  {
    id: "challenge-3",
    title: "Time Trial: Loops",
    description: "Complete within 60 seconds",
    code: `for (let i = 0; i < 10; i++) {
  console.log(i);
}

while (count < 5) {
  count++;
}`,
    language: "js",
    difficulty: "intermediate",
    targetWPM: 45,
    targetAccuracy: 90,
    timeLimit: 60,
    completed: false,
  },
  {
    id: "challenge-4",
    title: "Python Master: Lists",
    description: "Advanced Python list operations",
    code: `numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
filtered = [x for x in numbers if x % 2 == 0]
print(squared, filtered)`,
    language: "py",
    difficulty: "advanced",
    targetWPM: 50,
    targetAccuracy: 95,
    completed: false,
  },
]

export const useChallengesStore = create<ChallengesState>()(
  persist(
    (set, get) => ({
      challenges: sampleChallenges,
      dailyChallenge: null,

      completeChallenge: (id, wpm, accuracy) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.id === id
              ? {
                  ...challenge,
                  completed: true,
                  bestScore: {
                    wpm,
                    accuracy,
                    completedAt: Date.now(),
                  },
                }
              : challenge,
          ),
        }))
      },

      generateDailyChallenge: () => {
        const today = new Date().toDateString()
        const storedDate = localStorage.getItem("daily-challenge-date")

        if (storedDate !== today) {
          const challenges = get().challenges
          const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
          set({ dailyChallenge: randomChallenge })
          localStorage.setItem("daily-challenge-date", today)
        }
      },

      getChallengeById: (id) => {
        return get().challenges.find((challenge) => challenge.id === id)
      },
    }),
    {
      name: "codertype-challenges",
    },
  ),
)
