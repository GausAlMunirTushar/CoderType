"use client"

import { useState, useEffect } from "react"
import { lessons } from "@/lib/data/lessons"
import { TypingArea } from "@/components/typing-area"
import { MetricsDisplay } from "@/components/metrics-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shuffle } from "lucide-react"
import type { Lesson } from "@/lib/data/lessons"

export function PracticeArea() {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [sessionStats, setSessionStats] = useState({
    lessonsCompleted: 0,
    totalWPM: 0,
    totalAccuracy: 0,
  })

  const getRandomLesson = () => {
    const randomIndex = Math.floor(Math.random() * lessons.length)
    return lessons[randomIndex]
  }

  const handleNextLesson = () => {
    setCurrentLesson(getRandomLesson())
  }

  useEffect(() => {
    setCurrentLesson(getRandomLesson())
  }, [])

  if (!currentLesson) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading practice session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Session Stats */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-4">
          <Card className="px-4 py-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Lessons</div>
              <div className="text-xl font-bold text-orange-500">{sessionStats.lessonsCompleted}</div>
            </div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Avg WPM</div>
              <div className="text-xl font-bold text-cyan-500">
                {sessionStats.lessonsCompleted > 0
                  ? Math.round(sessionStats.totalWPM / sessionStats.lessonsCompleted)
                  : 0}
              </div>
            </div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
              <div className="text-xl font-bold text-green-500">
                {sessionStats.lessonsCompleted > 0
                  ? Math.round(sessionStats.totalAccuracy / sessionStats.lessonsCompleted)
                  : 0}
                %
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <MetricsDisplay />
          <Button onClick={handleNextLesson} variant="outline">
            <Shuffle className="mr-2 h-4 w-4" />
            Next Lesson
          </Button>
        </div>
      </div>

      {/* Current Lesson Info */}
      <Card className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <span className="rounded bg-orange-500 px-2 py-1 text-xs font-bold uppercase text-white">
            {currentLesson.language}
          </span>
          <h2 className="text-lg font-semibold">{currentLesson.title}</h2>
          <span className="text-sm text-muted-foreground">• {currentLesson.description}</span>
        </div>
      </Card>

      {/* Typing Area */}
      <TypingArea key={currentLesson.id} lesson={currentLesson} />
    </div>
  )
}
