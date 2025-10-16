"use client"

import { useProgressStore } from "@/store/progress-store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Clock, Zap, Target, Calendar, Activity, Award } from "lucide-react"
import { useMemo } from "react"

export function AnalyticsDashboard() {
  const { completedLessons, getAverageWPM, getAverageAccuracy } = useProgressStore()

  const analytics = useMemo(() => {
    if (completedLessons.length === 0) {
      return {
        totalTime: 0,
        avgWPM: 0,
        avgAccuracy: 0,
        bestWPM: 0,
        bestAccuracy: 0,
        totalErrors: 0,
        avgErrors: 0,
        improvementRate: 0,
        consistencyScore: 0,
        languageBreakdown: [],
        weeklyProgress: [],
        performanceTrend: [],
      }
    }

    const totalTime = completedLessons.reduce((sum, l) => sum + l.timeSpent, 0)
    const avgWPM = getAverageWPM()
    const avgAccuracy = getAverageAccuracy()
    const bestWPM = Math.max(...completedLessons.map((l) => l.wpm))
    const bestAccuracy = Math.max(...completedLessons.map((l) => l.accuracy))
    const totalErrors = completedLessons.reduce((sum, l) => sum + l.errors, 0)
    const avgErrors = Math.round(totalErrors / completedLessons.length)

    // Calculate improvement rate (comparing first 5 vs last 5 lessons)
    const firstFive = completedLessons.slice(0, 5)
    const lastFive = completedLessons.slice(-5)
    const firstAvgWPM = firstFive.reduce((sum, l) => sum + l.wpm, 0) / firstFive.length
    const lastAvgWPM = lastFive.reduce((sum, l) => sum + l.wpm, 0) / lastFive.length
    const improvementRate = Math.round(((lastAvgWPM - firstAvgWPM) / firstAvgWPM) * 100) || 0

    // Calculate consistency score (lower standard deviation = higher consistency)
    const wpmValues = completedLessons.map((l) => l.wpm)
    const mean = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length
    const variance = wpmValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wpmValues.length
    const stdDev = Math.sqrt(variance)
    const consistencyScore = Math.max(0, Math.round(100 - stdDev))

    // Language breakdown
    const languageMap = new Map<string, { count: number; avgWPM: number; avgAccuracy: number }>()
    completedLessons.forEach((lesson) => {
      const existing = languageMap.get(lesson.language) || { count: 0, avgWPM: 0, avgAccuracy: 0 }
      existing.count++
      existing.avgWPM += lesson.wpm
      existing.avgAccuracy += lesson.accuracy
      languageMap.set(lesson.language, existing)
    })

    const languageBreakdown = Array.from(languageMap.entries()).map(([lang, data]) => ({
      language: lang,
      count: data.count,
      avgWPM: Math.round(data.avgWPM / data.count),
      avgAccuracy: Math.round(data.avgAccuracy / data.count),
    }))

    // Weekly progress (last 7 days)
    const now = Date.now()
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000
    const weeklyLessons = completedLessons.filter((l) => l.completedAt >= weekAgo)
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const dayStart = weekAgo + i * 24 * 60 * 60 * 1000
      const dayEnd = dayStart + 24 * 60 * 60 * 1000
      const dayLessons = weeklyLessons.filter((l) => l.completedAt >= dayStart && l.completedAt < dayEnd)
      return {
        day: new Date(dayStart).toLocaleDateString("en-US", { weekday: "short" }),
        count: dayLessons.length,
        avgWPM:
          dayLessons.length > 0 ? Math.round(dayLessons.reduce((sum, l) => sum + l.wpm, 0) / dayLessons.length) : 0,
      }
    })

    // Performance trend (last 10 lessons)
    const performanceTrend = completedLessons.slice(-10).map((lesson, index) => ({
      index: index + 1,
      wpm: lesson.wpm,
      accuracy: lesson.accuracy,
      topic: lesson.topic,
    }))

    return {
      totalTime,
      avgWPM,
      avgAccuracy,
      bestWPM,
      bestAccuracy,
      totalErrors,
      avgErrors,
      improvementRate,
      consistencyScore,
      languageBreakdown,
      weeklyProgress,
      performanceTrend,
    }
  }, [completedLessons, getAverageWPM, getAverageAccuracy])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    return `${minutes}m`
  }

  if (completedLessons.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Activity className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
        <h3 className="mb-2 text-xl font-semibold">No Data Yet</h3>
        <p className="text-muted-foreground">Complete some lessons to see your detailed analytics</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="rounded-lg bg-cyan-500/10 p-2 md:p-3">
              <Zap className="h-5 w-5 text-cyan-500 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground md:text-sm">Best WPM</p>
              <p className="text-xl font-bold text-cyan-500 md:text-2xl">{analytics.bestWPM}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="rounded-lg bg-green-500/10 p-2 md:p-3">
              <Target className="h-5 w-5 text-green-500 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground md:text-sm">Best Accuracy</p>
              <p className="text-xl font-bold text-green-500 md:text-2xl">{analytics.bestAccuracy}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="rounded-lg bg-orange-500/10 p-2 md:p-3">
              <Clock className="h-5 w-5 text-orange-500 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground md:text-sm">Total Time</p>
              <p className="text-xl font-bold text-orange-500 md:text-2xl">{formatTime(analytics.totalTime)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="rounded-lg bg-purple-500/10 p-2 md:p-3">
              <Award className="h-5 w-5 text-purple-500 md:h-6 md:w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground md:text-sm">Consistency</p>
              <p className="text-xl font-bold text-purple-500 md:text-2xl">{analytics.consistencyScore}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Improvement Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Improvement Rate</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500">
              {analytics.improvementRate > 0 ? "+" : ""}
              {analytics.improvementRate}%
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Comparing first 5 vs last 5 lessons</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold">Error Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Errors</span>
              <span className="font-bold text-red-500">{analytics.totalErrors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg per Lesson</span>
              <span className="font-bold text-orange-500">{analytics.avgErrors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Error Rate</span>
              <span className="font-bold text-yellow-500">
                {Math.round((analytics.totalErrors / completedLessons.length) * 100) / 100}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Recent Performance Trend</h3>
            <div className="space-y-3">
              {analytics.performanceTrend.map((item) => (
                <div key={item.index} className="flex items-center gap-4 rounded-lg border border-border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-500">
                    {item.index}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize">{item.topic}</p>
                    <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                      <span className="text-cyan-500">{item.wpm} WPM</span>
                      <span className="text-green-500">{item.accuracy}% ACC</span>
                    </div>
                  </div>
                  <div className="h-12 w-24 rounded bg-muted">
                    <div
                      className="h-full rounded bg-gradient-to-t from-cyan-500 to-orange-500"
                      style={{ width: `${(item.wpm / analytics.bestWPM) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="mt-6">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Performance by Language</h3>
            <div className="space-y-4">
              {analytics.languageBreakdown.map((lang) => (
                <div key={lang.language} className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-orange-500 text-white">
                        {lang.language.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{lang.count} lessons</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Avg WPM</p>
                      <p className="text-xl font-bold text-cyan-500">{lang.avgWPM}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                      <p className="text-xl font-bold text-green-500">{lang.avgAccuracy}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Last 7 Days Activity</h3>
            <div className="space-y-3">
              {analytics.weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex w-12 items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{day.day}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-8 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 transition-all"
                          style={{ width: `${Math.min((day.count / 5) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="w-16 text-sm font-bold text-orange-500">{day.count} lessons</span>
                    </div>
                  </div>
                  {day.avgWPM > 0 && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-cyan-500">{day.avgWPM} WPM</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
