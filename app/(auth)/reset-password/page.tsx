"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <AuthCard>
      <AuthHeader title="Reset Password 🔒" subtitle="Enter your new password" />

      {done ? (
        <p className="text-center text-sm text-green-500">
          ✅ Password reset successfully. You can now{" "}
          <Link href="/login" className="text-cyan-500 hover:underline">
            log in
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
