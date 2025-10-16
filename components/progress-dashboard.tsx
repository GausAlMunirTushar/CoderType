"use client"

import { useProgressStore } from "@/store/progress-store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, AlertCircle, Trophy, TrendingUp, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProgressDashboard() {
  const {
    completedLessons,
    totalLessons,
    getAverageWPM,
    getAverageAccuracy,
    getTotalErrors,
    getCompletedCount,
    getLessonsByLanguage,
  } = useProgressStore()

  const avgWPM = getAverageWPM()
  const avgAccuracy = getAverageAccuracy()
  const totalErrors = getTotalErrors()
  const completedCount = getCompletedCount()
  const progressPercentage = Math.round((completedCount / totalLessons) * 100)

  const languageStats = [
    { id: "js", name: "JavaScript", count: getLessonsByLanguage("js").length },
    { id: "py", name: "Python", count: getLessonsByLanguage("py").length },
    { id: "cpp", name: "C++", count: getLessonsByLanguage("cpp").length },
    { id: "php", name: "PHP", count: getLessonsByLanguage("php").length },
    { id: "html", name: "HTML", count: getLessonsByLanguage("html").length },
    { id: "css", name: "CSS", count: getLessonsByLanguage("css").length },
  ]

  const recentLessons = [...completedLessons].reverse().slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-cyan-500/10 p-3">
              <Zap className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg WPM</p>
              <p className="text-2xl font-bold text-cyan-500">{avgWPM}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <Target className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
              <p className="text-2xl font-bold text-orange-500">{avgAccuracy}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-500/10 p-3">
              <Trophy className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-500">
                {completedCount}/{totalLessons}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-500/10 p-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Errors</p>
              <p className="text-2xl font-bold text-red-500">{totalErrors}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Overall Progress</h2>
          <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="mt-2 text-sm text-muted-foreground">
          {completedCount} of {totalLessons} lessons completed
        </p>
      </Card>

      {/* Language Breakdown */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Progress by Language</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {languageStats.map((lang) => (
            <div key={lang.id} className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{lang.name}</span>
                <Badge variant="secondary">{lang.count}/8</Badge>
              </div>
              <Progress value={(lang.count / 8) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        {recentLessons.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <TrendingUp className="mx-auto mb-2 h-12 w-12 opacity-50" />
            <p>No lessons completed yet. Start practicing to see your progress!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLessons.map((lesson, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-orange-500 text-white">
                    {lesson.language.toUpperCase()}
                  </Badge>
                  <div>
                    <p className="font-medium capitalize">{lesson.topic}</p>
                    <p className="text-sm text-muted-foreground">
                      <Calendar className="mr-1 inline h-3 w-3" />
                      {new Date(lesson.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-cyan-500">{lesson.wpm}</div>
                    <div className="text-xs text-muted-foreground">WPM</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-500">{lesson.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">ACC</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-red-500">{lesson.errors}</div>
                    <div className="text-xs text-muted-foreground">ERR</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Achievements</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div
            className={`rounded-lg border p-4 text-center ${
              completedCount >= 1 ? "border-orange-500 bg-orange-500/10" : "border-border opacity-50"
            }`}
          >
            <Trophy className={`mx-auto mb-2 h-8 w-8 ${completedCount >= 1 ? "text-orange-500" : "text-muted"}`} />
            <p className="font-semibold">First Steps</p>
            <p className="text-sm text-muted-foreground">Complete your first lesson</p>
          </div>

          <div
            className={`rounded-lg border p-4 text-center ${
              completedCount >= 10 ? "border-cyan-500 bg-cyan-500/10" : "border-border opacity-50"
            }`}
          >
            <Trophy className={`mx-auto mb-2 h-8 w-8 ${completedCount >= 10 ? "text-cyan-500" : "text-muted"}`} />
            <p className="font-semibold">Getting Started</p>
            <p className="text-sm text-muted-foreground">Complete 10 lessons</p>
          </div>

          <div
            className={`rounded-lg border p-4 text-center ${
              avgWPM >= 50 ? "border-green-500 bg-green-500/10" : "border-border opacity-50"
            }`}
          >
            <Trophy className={`mx-auto mb-2 h-8 w-8 ${avgWPM >= 50 ? "text-green-500" : "text-muted"}`} />
            <p className="font-semibold">Speed Demon</p>
            <p className="text-sm text-muted-foreground">Reach 50 WPM average</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
