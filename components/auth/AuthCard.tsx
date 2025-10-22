import { Card } from "@/components/ui/card"

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-6 sm:p-8 shadow-lg border border-border/60 bg-card/90 backdrop-blur-md rounded-xl">
      {children}
    </Card>
  )
}
