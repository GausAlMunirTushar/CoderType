"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthCard>
      <AuthHeader title="Forgot Password?" subtitle="We’ll send you a reset link" />

      {sent ? (
        <p className="text-center text-sm text-green-500">
          ✅ Reset link sent! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link href="/login" className="text-cyan-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
