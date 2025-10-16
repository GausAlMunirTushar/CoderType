"use client"

import { useEffect } from "react"
import { useChallengesStore } from "@/store/challenges-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Target, Zap, CheckCircle2, Calendar } from "lucide-react"
import Link from "next/link"

export function ChallengesList() {
  const { challenges, dailyChallenge, generateDailyChallenge } = useChallengesStore()

  useEffect(() => {
    generateDailyChallenge()
  }, [generateDailyChallenge])

  const completedCount = challenges.filter((c) => c.completed).length
  const totalCount = challenges.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <Trophy className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Challenge Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </Card>

      {/* Daily Challenge */}
      {dailyChallenge && (
        <Card className="border-orange-500 bg-gradient-to-br from-orange-500/10 to-cyan-500/10 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Daily Challenge</h2>
            <Badge variant="secondary" className="bg-orange-500 text-white">
              Today
            </Badge>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">{dailyChallenge.title}</h3>
            <p className="text-sm text-muted-foreground">{dailyChallenge.description}</p>
          </div>

          <div className="mb-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-500" />
              <span className="text-sm">Target: {dailyChallenge.targetWPM} WPM</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm">Accuracy: {dailyChallenge.targetAccuracy}%</span>
            </div>
            {dailyChallenge.timeLimit && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Time: {dailyChallenge.timeLimit}s</span>
              </div>
            )}
          </div>

          <Link href={`/challenges/${dailyChallenge.id}`}>
            <Button className="w-full">{dailyChallenge.completed ? "Try Again" : "Start Challenge"}</Button>
          </Link>
        </Card>
      )}

      {/* All Challenges */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">All Challenges</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`p-6 transition-all hover:shadow-lg ${
                challenge.completed ? "border-green-500 bg-green-500/5" : ""
              }`}
            >
              {challenge.completed && (
                <div className="mb-3 flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">Completed</span>
                </div>
              )}

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="default" className="bg-orange-500 text-white">
                  {challenge.language.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {challenge.difficulty}
                </Badge>
              </div>

              <h3 className="mb-2 font-semibold">{challenge.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{challenge.description}</p>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Target WPM</span>
                  <span className="font-bold text-cyan-500">{challenge.targetWPM}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Target Accuracy</span>
                  <span className="font-bold text-green-500">{challenge.targetAccuracy}%</span>
                </div>
                {challenge.timeLimit && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Time Limit</span>
                    <span className="font-bold text-orange-500">{challenge.timeLimit}s</span>
                  </div>
                )}
              </div>

              {challenge.bestScore && (
                <div className="mb-4 rounded-lg border border-green-500 bg-green-500/10 p-3">
                  <p className="mb-2 text-xs font-semibold text-green-500">Your Best Score</p>
                  <div className="flex justify-between text-sm">
                    <span>{challenge.bestScore.wpm} WPM</span>
                    <span>{challenge.bestScore.accuracy}% ACC</span>
                  </div>
                </div>
              )}

              <Link href={`/challenges/${challenge.id}`}>
                <Button className="w-full" variant={challenge.completed ? "outline" : "default"}>
                  {challenge.completed ? "Try Again" : "Start Challenge"}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
