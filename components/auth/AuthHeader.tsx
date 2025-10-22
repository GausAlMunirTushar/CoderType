import { Code2 } from "lucide-react"

export function AuthHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-2">
        <Code2 className="w-8 h-8 text-cyan-500" />
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  )
}
