"use client"

import { useProgressStore } from "@/store/progress-store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, TrendingUp, Target, Zap } from "lucide-react"
import { useMemo } from "react"

export function LeaderboardTable() {
  const { completedLessons, getAverageWPM, getAverageAccuracy, getCompletedCount } = useProgressStore()

  // Generate mock leaderboard data (in a real app, this would come from a backend)
  const leaderboardData = useMemo(() => {
    const currentUser = {
      rank: 0,
      name: "You",
      wpm: getAverageWPM(),
      accuracy: getAverageAccuracy(),
      lessonsCompleted: getCompletedCount(),
      isCurrentUser: true,
    }

    // Generate mock users
    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      rank: i + 1,
      name: `User${i + 1}`,
      wpm: Math.floor(Math.random() * 50) + 30,
      accuracy: Math.floor(Math.random() * 20) + 80,
      lessonsCompleted: Math.floor(Math.random() * 46) + 1,
      isCurrentUser: false,
    }))

    // Add current user and sort by WPM
    const allUsers = [...mockUsers, currentUser].sort((a, b) => b.wpm - a.wpm)

    // Update ranks
    allUsers.forEach((user, index) => {
      user.rank = index + 1
    })

    return allUsers
  }, [getAverageWPM, getAverageAccuracy, getCompletedCount])

  const currentUserRank = leaderboardData.find((u) => u.isCurrentUser)?.rank || 0

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-400" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  const topUsers = leaderboardData.slice(0, 10)
  const byAccuracy = [...leaderboardData].sort((a, b) => b.accuracy - a.accuracy).slice(0, 10)
  const byLessons = [...leaderboardData].sort((a, b) => b.lessonsCompleted - a.lessonsCompleted).slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Current User Stats */}
      <Card className="border-orange-500 bg-orange-500/10 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
              #{currentUserRank}
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Ranking</h3>
              <p className="text-sm text-muted-foreground">Keep practicing to climb the leaderboard!</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-500">{getAverageWPM()}</div>
              <div className="text-xs text-muted-foreground">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{getAverageAccuracy()}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{getCompletedCount()}</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="wpm" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wpm">
            <Zap className="mr-2 h-4 w-4" />
            By Speed
          </TabsTrigger>
          <TabsTrigger value="accuracy">
            <Target className="mr-2 h-4 w-4" />
            By Accuracy
          </TabsTrigger>
          <TabsTrigger value="lessons">
            <TrendingUp className="mr-2 h-4 w-4" />
            By Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wpm" className="mt-6">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Rank</th>
                    <th className="p-4 text-left text-sm font-semibold">User</th>
                    <th className="p-4 text-right text-sm font-semibold">WPM</th>
                    <th className="p-4 text-right text-sm font-semibold">Accuracy</th>
                    <th className="p-4 text-right text-sm font-semibold">Lessons</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user) => (
                    <tr
                      key={user.rank}
                      className={`border-b border-border transition-colors hover:bg-muted/50 ${
                        user.isCurrentUser ? "bg-orange-500/10" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">{getRankIcon(user.rank)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="bg-orange-500 text-white">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-cyan-500">{user.wpm}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-green-500">{user.accuracy}%</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-muted-foreground">{user.lessonsCompleted}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy" className="mt-6">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Rank</th>
                    <th className="p-4 text-left text-sm font-semibold">User</th>
                    <th className="p-4 text-right text-sm font-semibold">Accuracy</th>
                    <th className="p-4 text-right text-sm font-semibold">WPM</th>
                    <th className="p-4 text-right text-sm font-semibold">Lessons</th>
                  </tr>
                </thead>
                <tbody>
                  {byAccuracy.map((user, index) => (
                    <tr
                      key={user.rank}
                      className={`border-b border-border transition-colors hover:bg-muted/50 ${
                        user.isCurrentUser ? "bg-orange-500/10" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">{getRankIcon(index + 1)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="bg-orange-500 text-white">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-green-500">{user.accuracy}%</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-cyan-500">{user.wpm}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-muted-foreground">{user.lessonsCompleted}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="mt-6">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Rank</th>
                    <th className="p-4 text-left text-sm font-semibold">User</th>
                    <th className="p-4 text-right text-sm font-semibold">Lessons</th>
                    <th className="p-4 text-right text-sm font-semibold">WPM</th>
                    <th className="p-4 text-right text-sm font-semibold">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {byLessons.map((user, index) => (
                    <tr
                      key={user.rank}
                      className={`border-b border-border transition-colors hover:bg-muted/50 ${
                        user.isCurrentUser ? "bg-orange-500/10" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">{getRankIcon(index + 1)}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="bg-orange-500 text-white">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-orange-500">{user.lessonsCompleted}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-cyan-500">{user.wpm}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-bold text-green-500">{user.accuracy}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
