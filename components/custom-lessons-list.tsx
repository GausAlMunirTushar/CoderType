"use client"

import type React from "react"

import { useState } from "react"
import { useCustomLessonsStore } from "@/store/custom-lessons-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Play, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function CustomLessonsList() {
  const { customLessons, addCustomLesson, deleteCustomLesson } = useCustomLessonsStore()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "js",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    author: "You",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.code) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addCustomLesson(formData)
    toast({
      title: "Success",
      description: "Custom lesson created successfully!",
    })

    setFormData({
      title: "",
      description: "",
      code: "",
      language: "js",
      difficulty: "beginner",
      author: "You",
    })
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteCustomLesson(id)
    toast({
      title: "Deleted",
      description: "Custom lesson removed",
    })
  }

  return (
    <div className="space-y-6">
      {/* Create Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full md:w-auto">
            <Plus className="mr-2 h-5 w-5" />
            Create Custom Lesson
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Custom Lesson</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My Custom Lesson"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Practice typing this code snippet"
              />
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
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
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: "beginner" | "intermediate" | "advanced") =>
                  setFormData({ ...formData, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="code">Code *</Label>
              <Textarea
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Enter your code here..."
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Create Lesson
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lessons Grid */}
      {customLessons.length === 0 ? (
        <Card className="p-12 text-center">
          <Code className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
          <h3 className="mb-2 text-xl font-semibold">No Custom Lessons Yet</h3>
          <p className="text-muted-foreground">Create your first custom lesson to get started</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customLessons.map((lesson) => (
            <Card key={lesson.id} className="p-6 transition-all hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="default" className="bg-orange-500 text-white">
                      {lesson.language.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <h3 className="mb-1 font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </div>
              </div>

              <div className="mb-4 rounded bg-muted p-3">
                <pre className="overflow-x-auto text-xs">
                  <code>
                    {lesson.code.slice(0, 100)}
                    {lesson.code.length > 100 ? "..." : ""}
                  </code>
                </pre>
              </div>

              <div className="flex gap-2">
                <Link href={`/custom-lessons/${lesson.id}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Practice
                  </Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(lesson.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Created {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
