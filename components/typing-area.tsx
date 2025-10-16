"use client"

import type React from "react"

import { useEffect, useRef, useState, useMemo, useCallback, memo } from "react"
import { useTypingStore } from "@/store/typing-store"
import { useProgressStore } from "@/store/progress-store"
import { useThemeStore } from "@/store/theme-store"
import type { Lesson } from "@/lib/data/lessons"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Pause } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface TypingAreaProps {
  lesson: Lesson
}

const TypedCharacter = memo(
  ({
    char,
    index,
    currentIndex,
    isFocused,
    isIncorrect,
    cursorClass,
  }: {
    char: string
    index: number
    currentIndex: number
    isFocused: boolean
    isIncorrect: boolean
    cursorClass: string
  }) => {
    const isTyped = index < currentIndex
    const isCurrent = index === currentIndex

    const getCharDisplay = () => {
      if (char === "\n") {
        return (
          <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">
            <span className="text-cyan-500">↵</span>
            <span className="text-muted-foreground">Enter</span>
          </span>
        )
      }
      if (char === "\t") {
        return (
          <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">
            <span className="text-cyan-500">→</span>
            <span className="text-muted-foreground">Tab</span>
          </span>
        )
      }
      if (char === " ") {
        return (
          <span className="inline-flex items-center rounded bg-muted px-2 py-0.5">
            <span className="text-xs text-muted-foreground">·</span>
          </span>
        )
      }
      return char
    }

    return (
      <span className="relative inline-block" data-index={index}>
        {isCurrent && isFocused && (
          <span className={`absolute left-0 top-0 z-10 animate-pulse ${cursorClass}`} aria-hidden="true" />
        )}
        <span
          className={`transition-colors duration-150 ${
            isTyped
              ? isIncorrect
                ? "bg-red-500/20 text-red-500 line-through"
                : "text-green-500"
              : "text-muted-foreground"
          }`}
        >
          {getCharDisplay()}
        </span>
      </span>
    )
  },
)

TypedCharacter.displayName = "TypedCharacter"

export function TypingArea({ lesson }: TypingAreaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { fontFamily, fontSize, cursorStyle, keySoundEnabled } = useThemeStore()
  const {
    currentIndex,
    typedText,
    incorrectIndices,
    isTyping,
    startTime,
    practiceMode,
    wpm,
    accuracy,
    errors,
    setPracticeMode,
    startTyping,
    stopTyping,
    resetTyping,
    updateTyping,
    calculateMetrics,
  } = useTypingStore()

  const { addCompletedLesson } = useProgressStore()

  const codeText = lesson.code

  const codeChars = useMemo(() => codeText.split(""), [codeText])

  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    resetTyping()
    setLessonCompleted(false)
  }, [lesson.id, resetTyping])

  useEffect(() => {
    if (isTyping && startTime) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        calculateMetrics(currentIndex, elapsed)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isTyping, startTime, currentIndex, calculateMetrics])

  useEffect(() => {
    const progress = Math.round((currentIndex / codeText.length) * 100)
    if (progress > 0 && progress % 25 === 0 && isTyping) {
      setAnnouncement(`${progress}% complete`)
    }
  }, [currentIndex, codeText.length, isTyping])

  useEffect(() => {
    if (currentIndex >= codeText.length && !lessonCompleted && startTime) {
      const timeSpent = Date.now() - startTime
      setLessonCompleted(true)

      addCompletedLesson({
        lessonId: lesson.id,
        language: lesson.language,
        topic: lesson.topic,
        completedAt: Date.now(),
        wpm,
        accuracy,
        errors,
        timeSpent,
      })

      setAnnouncement(
        `Lesson complete! Your speed is ${wpm} words per minute with ${accuracy}% accuracy and ${errors} errors.`,
      )

      toast({
        title: "Lesson Complete!",
        description: `Great job! ${wpm} WPM with ${accuracy}% accuracy.`,
      })
    }
  }, [
    currentIndex,
    codeText.length,
    lessonCompleted,
    startTime,
    lesson,
    wpm,
    accuracy,
    errors,
    addCompletedLesson,
    toast,
  ])

  const playKeySound = useCallback(() => {
    if (keySoundEnabled) {
      const audio = new Audio("/sounds/key-press.mp3")
      audio.volume = 0.3
      audio.play().catch(() => {
        // Ignore errors if sound can't play
      })
    }
  }, [keySoundEnabled])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFocused(false)
      stopTyping()
      setAnnouncement("Typing paused")
      return
    }

    if (currentIndex >= codeText.length) {
      return
    }

    if (!isTyping && e.key.length === 1) {
      startTyping()
      setAnnouncement("Typing started")
    }

    if (e.key.length === 1 || e.key === "Enter" || e.key === "Tab") {
      e.preventDefault()

      let char = e.key
      if (e.key === "Enter") char = "\n"
      if (e.key === "Tab") char = "\t"

      const correctChar = codeText[currentIndex]
      updateTyping(char, correctChar, currentIndex)
      playKeySound()
    }

    if (e.key === "Backspace" && currentIndex > 0) {
      e.preventDefault()
    }
  }

  const handleReset = useCallback(() => {
    resetTyping()
    setIsFocused(false)
    setLessonCompleted(false)
    setAnnouncement("Lesson reset")
  }, [resetTyping])

  const handleStart = useCallback(() => {
    setIsFocused(true)
    inputRef.current?.focus()
    setAnnouncement("Ready to type. Press any key to start.")
  }, [])

  const handlePause = useCallback(() => {
    stopTyping()
    setIsFocused(false)
    setAnnouncement("Typing paused")
  }, [stopTyping])

  const getFontClass = () => {
    switch (fontFamily) {
      case "jetbrains":
        return "font-jetbrains"
      case "fira":
        return "font-fira"
      case "inter":
        return "font-inter"
      default:
        return "font-mono"
    }
  }

  const getCursorClass = () => {
    switch (cursorStyle) {
      case "block":
        return "w-2 h-full bg-cyan-500"
      case "underline":
        return "w-2 h-0.5 bg-cyan-500 self-end"
      case "bar":
        return "w-0.5 h-full bg-cyan-500"
      default:
        return "w-2 h-full bg-cyan-500"
    }
  }

  const progress = Math.round((currentIndex / codeText.length) * 100)

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2" role="group" aria-label="Typing controls">
            <Button
              onClick={handleStart}
              size="sm"
              variant="default"
              disabled={isTyping}
              aria-label="Start typing lesson"
            >
              <Play className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Start</span>
            </Button>
            <Button
              onClick={handlePause}
              size="sm"
              variant="outline"
              disabled={!isTyping}
              aria-label="Pause typing lesson"
            >
              <Pause className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Pause</span>
            </Button>
            <Button onClick={handleReset} size="sm" variant="outline" aria-label="Reset typing lesson">
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="practice-mode"
              checked={practiceMode}
              onCheckedChange={setPracticeMode}
              aria-describedby="practice-mode-description"
            />
            <Label htmlFor="practice-mode" className="cursor-pointer text-sm font-medium">
              <span className="hidden sm:inline">Practice Mode</span>
              <span className="sm:hidden">Practice</span>
            </Label>
            <span id="practice-mode-description" className="sr-only">
              Practice mode allows you to continue typing without stopping on errors
            </span>
          </div>
        </div>

        <div className="flex w-full items-center gap-4 sm:w-auto" role="status" aria-label="Typing progress">
          <div className="text-sm text-muted-foreground" aria-live="polite">
            Progress: {progress}%
          </div>
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-muted sm:w-32 sm:flex-none"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Lesson completion progress"
          >
            <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <p className="mb-4 text-center text-xs text-muted-foreground sm:text-sm" id="typing-instructions">
        {isFocused
          ? "Type the code below. Press ESC to pause."
          : "Click the code area or press Start • pressing enter after writing all code will show you progress graph"}
      </p>

      <div
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        role="textbox"
        aria-label="Code typing area"
        aria-describedby="typing-instructions"
        aria-multiline="true"
        className={`relative min-h-[300px] rounded-lg border-2 bg-card p-4 outline-none transition-all duration-200 sm:min-h-[400px] sm:p-6 ${
          isFocused ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : "border-border hover:border-cyan-500/50"
        } ${getFontClass()}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
      >
        <pre className="whitespace-pre-wrap break-words" aria-hidden="true">
          {codeChars.map((char, index) => (
            <TypedCharacter
              key={index}
              char={char}
              index={index}
              currentIndex={currentIndex}
              isFocused={isFocused}
              isIncorrect={incorrectIndices.has(index)}
              cursorClass={getCursorClass()}
            />
          ))}
        </pre>

        <div className="sr-only">
          <p>Code to type:</p>
          <pre>{codeText}</pre>
          <p>
            Current position: character {currentIndex} of {codeText.length}
          </p>
        </div>
      </div>

      {currentIndex >= codeText.length && (
        <div
          className="mt-4 animate-in fade-in slide-in-from-bottom-4 rounded-lg border border-green-500 bg-green-500/10 p-4 text-center sm:p-6"
          role="alert"
          aria-live="assertive"
        >
          <h3 className="mb-2 text-xl font-bold text-green-500 sm:text-2xl">Lesson Complete!</h3>
          <p className="mb-4 text-sm text-muted-foreground sm:text-base">Great job! Here are your final stats:</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8" role="list" aria-label="Final statistics">
            <div role="listitem">
              <div className="text-2xl font-bold text-cyan-500 sm:text-3xl" aria-label={`${wpm} words per minute`}>
                {wpm}
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">WPM</div>
            </div>
            <div role="listitem">
              <div className="text-2xl font-bold text-blue-500 sm:text-3xl" aria-label={`${accuracy}% accuracy`}>
                {accuracy}%
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">Accuracy</div>
            </div>
            <div role="listitem">
              <div className="text-2xl font-bold text-red-500 sm:text-3xl" aria-label={`${errors} errors`}>
                {errors}
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">Errors</div>
            </div>
          </div>
          <Button onClick={handleReset} className="mt-4 bg-transparent" variant="outline">
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
