"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useProfileStore } from "@/store/profile-store"
import { useProgressStore } from "@/store/progress-store"
import { useAchievementsStore } from "@/store/achievements-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Upload, Trash2, Save, Calendar, Trophy, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ProfileSettings() {
  const { profile, updateProfile, exportData, importData } = useProfileStore()
  const { clearProgress, getCompletedCount, getAverageWPM, getAverageAccuracy } = useProgressStore()
  const { getUnlockedCount } = useAchievementsStore()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState(profile)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    })
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `codertype-backup-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Exported",
      description: "Your data has been downloaded successfully",
    })
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const data = event.target?.result as string
      const success = importData(data)

      if (success) {
        toast({
          title: "Data Imported",
          description: "Your data has been restored successfully. Refresh the page to see changes.",
        })
        setTimeout(() => window.location.reload(), 2000)
      } else {
        toast({
          title: "Import Failed",
          description: "Failed to import data. Please check the file format.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = () => {
    clearProgress()
    localStorage.clear()
    toast({
      title: "Data Cleared",
      description: "All your data has been deleted. Refresh the page.",
    })
    setTimeout(() => window.location.reload(), 2000)
  }

  const memberSince = new Date(profile.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 text-4xl font-bold text-white">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-1 text-2xl font-bold">{profile.username}</h2>
            <p className="mb-2 text-sm text-muted-foreground">{profile.email || "No email set"}</p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge variant="secondary">
                <Calendar className="mr-1 h-3 w-3" />
                Member since {memberSince}
              </Badge>
              <Badge variant="secondary">
                <Trophy className="mr-1 h-3 w-3" />
                {getUnlockedCount()} Achievements
              </Badge>
              <Badge variant="secondary">
                <Target className="mr-1 h-3 w-3" />
                {getCompletedCount()} Lessons
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-500">{getAverageWPM()}</div>
              <div className="text-xs text-muted-foreground">Avg WPM</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{getAverageAccuracy()}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{getCompletedCount()}</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Your username"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="favoriteLanguage">Favorite Language</Label>
                <Select
                  value={formData.favoriteLanguage}
                  onValueChange={(value) => setFormData({ ...formData, favoriteLanguage: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="js">JavaScript</SelectItem>
                    <SelectItem value="py">Python</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Current Goal</Label>
                <Input
                  id="goal"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="e.g., Reach 60 WPM"
                />
              </div>

              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <div className="space-y-4">
            {/* Export Data */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <Download className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Download all your progress and settings</p>
                </div>
              </div>
              <Button onClick={handleExport} variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
            </Card>

            {/* Import Data */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <Upload className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Import Data</h3>
                  <p className="text-sm text-muted-foreground">Restore your progress from a backup file</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                aria-label="Import data file"
              />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </Card>

            {/* Clear Data */}
            <Card className="border-red-500 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-red-500/10 p-3">
                  <Trash2 className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-500">Clear All Data</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete all your progress and settings</p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your progress, achievements, custom
                      lessons, and settings. Make sure to export your data first if you want to keep a backup.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData} className="bg-red-500 hover:bg-red-600">
                      Yes, delete everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
