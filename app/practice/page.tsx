import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { PracticeArea } from "@/components/practice-area"
import { Code2 } from "lucide-react"

export default function PracticePage() {
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
          <div className="container mx-auto">
            <h1 className="mb-1 text-lg font-bold md:text-2xl">Practice Mode</h1>
            <p className="text-xs text-muted-foreground md:text-sm">
              Continuous typing practice with random code snippets from all languages
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-background">
          <PracticeArea />
        </div>
      </main>
    </div>
  )
}
