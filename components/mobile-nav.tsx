"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Code2,
  Home,
  Settings,
  TrendingUp,
  MessageSquare,
  Zap,
  BarChart3,
  Trophy,
  Award,
  Target,
  FileCode,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useProgressStore } from "@/store/progress-store"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { getCompletedCount, totalLessons } = useProgressStore()

  const completedCount = getCompletedCount()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <Code2 className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold text-sidebar-foreground">CoderType</span>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">
              <Link href="/" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <Link href="/practice" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/practice" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  Practice Mode
                </Button>
              </Link>

              <Link href="/custom-lessons" onClick={() => setOpen(false)}>
                <Button
                  variant={pathname === "/custom-lessons" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  Custom Lessons
                </Button>
              </Link>

              <Link href="/challenges" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/challenges" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Challenges
                </Button>
              </Link>

              <Link href="/analytics" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/analytics" ? "secondary" : "ghost"} className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>

              <Link href="/achievements" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/achievements" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Trophy className="mr-2 h-4 w-4" />
                  Achievements
                </Button>
              </Link>

              <Link href="/leaderboard" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/leaderboard" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>

              <Link href="/progress" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/progress" ? "secondary" : "ghost"} className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Progress
                </Button>
              </Link>

              <Link href="/profile" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/profile" ? "secondary" : "ghost"} className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>

              <Link href="/settings" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/settings" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>

              <Link href="/feedback" onClick={() => setOpen(false)}>
                <Button variant={pathname === "/feedback" ? "secondary" : "ghost"} className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Feedback
                </Button>
              </Link>
            </div>
          </ScrollArea>

          {/* Footer Stats */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-500">{completedCount}</div>
                <div className="text-xs text-muted-foreground">DONE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sidebar-foreground">{totalLessons}</div>
                <div className="text-xs text-muted-foreground">TOTAL</div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
