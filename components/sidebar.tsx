"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  ChevronDown,
  ChevronRight,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useProgressStore } from "@/store/progress-store"

interface Language {
  id: string
  name: string
  icon: string
  lessons: string[]
}

const languages: Language[] = [
  {
    id: "js",
    name: "JavaScript",
    icon: "JS",
    lessons: ["Variables", "Loops", "Functions", "Arrays", "Objects", "Conditionals", "Promises", "Classes"],
  },
  {
    id: "py",
    name: "Python",
    icon: "PY",
    lessons: ["Variables", "Lists", "Loops", "Functions", "Dictionaries", "Conditionals", "Classes", "Modules"],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "C++",
    lessons: ["Variables", "Loops", "Functions", "Arrays", "Pointers", "Classes", "STL", "Templates"],
  },
  {
    id: "php",
    name: "PHP",
    icon: "PHP",
    lessons: ["Variables", "Arrays", "Functions", "Loops", "Classes", "Forms", "Sessions", "Database"],
  },
  {
    id: "html",
    name: "HTML",
    icon: "HTML",
    lessons: ["Tags", "Attributes", "Forms", "Tables", "Semantic", "Media", "Links", "Lists"],
  },
  {
    id: "css",
    name: "CSS",
    icon: "CSS",
    lessons: ["Selectors", "Box Model", "Flexbox", "Grid", "Animations", "Responsive", "Colors", "Typography"],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>(["js"])
  const { getCompletedCount, totalLessons } = useProgressStore()

  const completedCount = getCompletedCount()

  const toggleLanguage = (langId: string) => {
    setExpandedLanguages((prev) => (prev.includes(langId) ? prev.filter((id) => id !== langId) : [...prev, langId]))
  }

  return (
    <div className="hidden h-screen w-64 flex-col border-r border-border bg-sidebar md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Code2 className="h-6 w-6 text-cyan-500" />
        <span className="text-xl font-bold text-sidebar-foreground">CoderType</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <Link href="/">
            <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link href="/practice">
            <Button variant={pathname === "/practice" ? "secondary" : "ghost"} className="w-full justify-start">
              <Zap className="mr-2 h-4 w-4" />
              Practice Mode
            </Button>
          </Link>

          <div className="my-4 border-t border-sidebar-border" />

          {/* Language Sections */}
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Languages</p>
            {languages.map((language) => (
              <div key={language.id}>
                <Button variant="ghost" className="w-full justify-start" onClick={() => toggleLanguage(language.id)}>
                  {expandedLanguages.includes(language.id) ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  <span className="mr-2 rounded bg-cyan-500 px-1.5 py-0.5 text-xs font-bold text-white">
                    {language.icon}
                  </span>
                  {language.name}
                </Button>

                {expandedLanguages.includes(language.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {language.lessons.map((lesson) => (
                      <Link key={lesson} href={`/lessons/${language.id}/${lesson.toLowerCase()}`}>
                        <Button
                          variant={
                            pathname === `/lessons/${language.id}/${lesson.toLowerCase()}` ? "secondary" : "ghost"
                          }
                          className="w-full justify-start text-sm"
                          size="sm"
                        >
                          {lesson}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-sidebar-border" />

          <Link href="/custom-lessons">
            <Button variant={pathname === "/custom-lessons" ? "secondary" : "ghost"} className="w-full justify-start">
              <FileCode className="mr-2 h-4 w-4" />
              Custom Lessons
            </Button>
          </Link>

          <Link href="/challenges">
            <Button variant={pathname === "/challenges" ? "secondary" : "ghost"} className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Challenges
            </Button>
          </Link>

          <div className="my-4 border-t border-sidebar-border" />

          <Link href="/analytics">
            <Button variant={pathname === "/analytics" ? "secondary" : "ghost"} className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>

          <Link href="/achievements">
            <Button variant={pathname === "/achievements" ? "secondary" : "ghost"} className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </Button>
          </Link>

          <Link href="/leaderboard">
            <Button variant={pathname === "/leaderboard" ? "secondary" : "ghost"} className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </Link>

          <Link href="/progress">
            <Button variant={pathname === "/progress" ? "secondary" : "ghost"} className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Progress
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant={pathname === "/profile" ? "secondary" : "ghost"} className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Link href="/settings">
            <Button variant={pathname === "/settings" ? "secondary" : "ghost"} className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>

          <Link href="/feedback">
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
  )
}
