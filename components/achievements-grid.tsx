"use client"

import { useAchievementsStore } from "@/store/achievements-store"
import { useProgressStore } from "@/store/progress-store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Lock, Sparkles } from "lucide-react"
import { useEffect } from "react"
import { Progress } from "@/components/ui/progress"

export function AchievementsGrid() {
  const { achievements, checkAchievements, getUnlockedCount } = useAchievementsStore()
  const { getAverageWPM, getAverageAccuracy, getCompletedCount, completedLessons } = useProgressStore()

  const bestWPM = completedLessons.length > 0 ? Math.max(...completedLessons.map((l) => l.wpm)) : 0
  const totalErrors = completedLessons.reduce((sum, l) => sum + l.errors, 0)

  useEffect(() => {
    checkAchievements({
      completedCount: getCompletedCount(),
      avgWPM: getAverageWPM(),
      avgAccuracy: getAverageAccuracy(),
      bestWPM,
      totalErrors,
    })
  }, [completedLessons, checkAchievements, getCompletedCount, getAverageWPM, getAverageAccuracy, bestWPM, totalErrors])

  const unlockedCount = getUnlockedCount()
  const totalCount = achievements.length
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100)

  const categories = {
    all: achievements,
    milestone: achievements.filter((a) => a.category === "milestone"),
    speed: achievements.filter((a) => a.category === "speed"),
    accuracy: achievements.filter((a) => a.category === "accuracy"),
    special: achievements.filter((a) => a.category === "special"),
  }

  const getColorClass = (color: string, unlocked: boolean) => {
    if (!unlocked) return "border-border bg-muted/50"

    const colorMap: Record<string, string> = {
      orange: "border-orange-500 bg-orange-500/10",
      cyan: "border-cyan-500 bg-cyan-500/10",
      green: "border-green-500 bg-green-500/10",
      purple: "border-purple-500 bg-purple-500/10",
      yellow: "border-yellow-500 bg-yellow-500/10",
      gold: "border-yellow-400 bg-yellow-400/10",
      indigo: "border-indigo-500 bg-indigo-500/10",
    }

    return colorMap[color] || "border-orange-500 bg-orange-500/10"
  }

  const getIconColorClass = (color: string, unlocked: boolean) => {
    if (!unlocked) return "text-muted-foreground"

    const colorMap: Record<string, string> = {
      orange: "text-orange-500",
      cyan: "text-cyan-500",
      green: "text-green-500",
      purple: "text-purple-500",
      yellow: "text-yellow-500",
      gold: "text-yellow-400",
      indigo: "text-indigo-500",
    }

    return colorMap[color] || "text-orange-500"
  }

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
              <h2 className="text-xl font-semibold">Achievement Progress</h2>
              <p className="text-sm text-muted-foreground">
                {unlockedCount} of {totalCount} unlocked
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

      {/* Achievements Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="milestone">Milestone</TabsTrigger>
          <TabsTrigger value="speed">Speed</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
        </TabsList>

        {Object.entries(categories).map(([key, categoryAchievements]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`relative overflow-hidden p-6 transition-all ${getColorClass(achievement.color, achievement.unlocked)} ${
                    achievement.unlocked ? "hover:scale-105" : "opacity-60"
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute right-2 top-2">
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </div>
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
                        achievement.unlocked ? "bg-background/50" : "bg-muted"
                      }`}
                    >
                      {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`capitalize ${getIconColorClass(achievement.color, achievement.unlocked)}`}
                    >
                      {achievement.category}
                    </Badge>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>

                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
