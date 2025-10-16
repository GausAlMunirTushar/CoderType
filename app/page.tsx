"use client"

import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Code2, Zap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useProgressStore } from "@/store/progress-store"

export default function HomePage() {
  const { getAverageWPM, getAverageAccuracy, getCompletedCount, getTotalErrors } = useProgressStore()

  const avgWPM = getAverageWPM()
  const avgAccuracy = getAverageAccuracy()
  const completedCount = getCompletedCount()
  const totalErrors = getTotalErrors()

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background p-4 md:hidden">
          <MobileNav />
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold">CoderType</span>
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="mb-2 text-2xl font-bold text-balance md:text-4xl">Welcome to CoderType</h1>
            <p className="text-sm text-muted-foreground text-pretty md:text-lg">
              Improve your coding speed and accuracy with interactive typing lessons
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2 md:mb-8 md:gap-4 lg:grid-cols-4">
            <Card className="p-4 transition-all hover:shadow-lg md:p-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="rounded-lg bg-cyan-500/10 p-2 md:p-3">
                  <Zap className="h-5 w-5 text-cyan-500 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Avg WPM</p>
                  <p className="text-xl font-bold md:text-2xl">{avgWPM}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-all hover:shadow-lg md:p-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-500/10 p-2 md:p-3">
                  <Target className="h-5 w-5 text-blue-500 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Accuracy</p>
                  <p className="text-xl font-bold md:text-2xl">{avgAccuracy}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-all hover:shadow-lg md:p-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="rounded-lg bg-green-500/10 p-2 md:p-3">
                  <TrendingUp className="h-5 w-5 text-green-500 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Lessons Done</p>
                  <p className="text-xl font-bold md:text-2xl">{completedCount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-all hover:shadow-lg md:p-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="rounded-lg bg-indigo-500/10 p-2 md:p-3">
                  <Code2 className="h-5 w-5 text-indigo-500 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">Total Errors</p>
                  <p className="text-xl font-bold md:text-2xl">{totalErrors}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Start */}
          <Card className="p-6 md:p-8">
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">Quick Start</h2>
            <p className="mb-4 text-sm text-muted-foreground md:mb-6 md:text-base">
              Choose a language from the sidebar to begin your typing practice journey
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/lessons/js/variables">
                <Card className="cursor-pointer p-4 transition-all hover:scale-105 hover:bg-accent hover:shadow-lg md:p-6">
                  <div className="mb-2 inline-block rounded bg-cyan-500 px-2 py-1 text-sm font-bold text-white">JS</div>
                  <h3 className="mb-2 text-sm font-semibold md:text-base">JavaScript Basics</h3>
                  <p className="text-xs text-muted-foreground md:text-sm">Start with variables and basic syntax</p>
                </Card>
              </Link>

              <Link href="/lessons/py/variables">
                <Card className="cursor-pointer p-4 transition-all hover:scale-105 hover:bg-accent hover:shadow-lg md:p-6">
                  <div className="mb-2 inline-block rounded bg-cyan-500 px-2 py-1 text-sm font-bold text-white">PY</div>
                  <h3 className="mb-2 text-sm font-semibold md:text-base">Python Fundamentals</h3>
                  <p className="text-xs text-muted-foreground md:text-sm">Learn Python syntax through typing</p>
                </Card>
              </Link>

              <Link href="/lessons/html/tags">
                <Card className="cursor-pointer p-4 transition-all hover:scale-105 hover:bg-accent hover:shadow-lg md:p-6">
                  <div className="mb-2 inline-block rounded bg-cyan-500 px-2 py-1 text-sm font-bold text-white">
                    HTML
                  </div>
                  <h3 className="mb-2 text-sm font-semibold md:text-base">HTML Structure</h3>
                  <p className="text-xs text-muted-foreground md:text-sm">Master HTML tags and attributes</p>
                </Card>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
