"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

export function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll review it soon.",
    })

    setName("")
    setEmail("")
    setMessage("")
    setIsSubmitting(false)
  }

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Share your thoughts, suggestions, or report issues..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </Button>
      </form>
    </Card>
  )
}
