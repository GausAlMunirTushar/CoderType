import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { TypingArea } from "@/components/typing-area"
import { MetricsDisplay } from "@/components/metrics-display"
import { getLessonByTopic } from "@/lib/data/lessons"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"

interface PageProps {
  params: Promise<{
    language: string
    topic: string
  }>
}

export default async function LessonPage({ params }: PageProps) {
  const { language, topic } = await params
  const lesson = getLessonByTopic(language, topic)

  if (!lesson) {
    notFound()
  }

  const languageNames: Record<string, string> = {
    js: "JavaScript",
    py: "Python",
    cpp: "C++",
    php: "PHP",
    html: "HTML",
    css: "CSS",
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background p-4 md:hidden">
          <MobileNav />
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">CoderType</span>
          </div>
        </div>

        <div className="border-b border-border bg-card p-3 shadow-sm md:p-4">
          <div className="container mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="default" className="bg-orange-500 text-white hover:bg-orange-600">
                  {language.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {lesson.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground md:text-sm">• {languageNames[language]}</span>
              </div>
              <h1 className="mb-1 text-lg font-bold md:text-2xl">{lesson.title}</h1>
              <p className="text-xs text-muted-foreground md:text-sm">{lesson.description}</p>
            </div>

            <div className="hidden md:block">
              <MetricsDisplay />
            </div>
          </div>
        </div>

        {/* Typing Area */}
        <div className="flex-1 overflow-auto bg-background">
          <TypingArea lesson={lesson} />
        </div>
      </main>
    </div>
  )
}
