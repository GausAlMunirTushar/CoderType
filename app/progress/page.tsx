import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { Code2 } from "lucide-react"

export default function ProgressPage() {
  return (
    <div className="flex h-screen">

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background p-4 md:hidden">
          <MobileNav />
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">CoderType</span>
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="mb-2 text-2xl font-bold md:text-4xl">Your Progress</h1>
            <p className="text-sm text-muted-foreground md:text-lg">Track your typing improvement over time</p>
          </div>

          <ProgressDashboard />
        </div>
      </main>
    </div>
  )
}
