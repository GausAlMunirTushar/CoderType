"use client"

import type React from "react"

import { memo } from "react"
import { useTypingStore } from "@/store/typing-store"
import { Card } from "@/components/ui/card"
import { Zap, Target, TrendingUp, AlertCircle } from "lucide-react"

const MetricCard = memo(
  ({
    icon: Icon,
    label,
    value,
    color,
    unit = "",
  }: {
    icon: React.ElementType
    label: string
    value: number
    color: string
    unit?: string
  }) => {
    return (
      <Card className="px-4 py-2 transition-all hover:shadow-md" role="status" aria-label={`${label}: ${value}${unit}`}>
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
          <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className={`text-xl font-bold ${color}`}>
              {value}
              {unit}
            </div>
          </div>
        </div>
      </Card>
    )
  },
)

MetricCard.displayName = "MetricCard"

export const MetricsDisplay = memo(() => {
  const { wpm, cpm, accuracy, errors } = useTypingStore()

  return (
    <div className="flex flex-wrap gap-3" role="region" aria-label="Typing metrics">
      <MetricCard icon={Zap} label="WPM" value={wpm} color="text-cyan-500" />
      <MetricCard icon={TrendingUp} label="CPM" value={cpm} color="text-green-500" />
      <MetricCard icon={Target} label="ACC" value={accuracy} color="text-blue-500" unit="%" />
      <MetricCard icon={AlertCircle} label="Errors" value={errors} color="text-red-500" />
    </div>
  )
})

MetricsDisplay.displayName = "MetricsDisplay"
