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

/* ---------- CHARACTER COMPONENT ---------- */
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

		// Proper rendering for white spaces
		const displayChar =
			char === " " ? "\u00A0" : // normal space
				char === "\n" ? "\n" :
					char === "\t" ? "    " : // tab = 4 spaces
						char

		return (
			<span
				className={`relative ${isTyped
						? isIncorrect
							? "text-red-500 line-through"
							: "text-green-500"
						: "text-muted-foreground"
					}`}
			>
				{isCurrent && isFocused && (
					<span
						className={`absolute left-0 top-0 h-full ${cursorClass}`}
						style={{ animation: "blink 1s step-end infinite" }}
					/>
				)}
				{displayChar}
			</span>
		)
	},
)
TypedCharacter.displayName = "TypedCharacter"

/* ---------- MAIN TYPING AREA COMPONENT ---------- */
export function TypingArea({ lesson }: { lesson: Lesson }) {
	const [isFocused, setIsFocused] = useState(false)
	const [lessonCompleted, setLessonCompleted] = useState(false)
	const inputRef = useRef<HTMLDivElement>(null)
	const { toast } = useToast()
	const { fontFamily, fontSize, cursorStyle, keySoundEnabled } = useThemeStore()
	const {
		currentIndex,
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

	// Reset when lesson changes
	useEffect(() => {
		resetTyping()
		setLessonCompleted(false)
	}, [lesson.id, resetTyping])

	// Metrics calculation loop
	useEffect(() => {
		if (isTyping && startTime) {
			const interval = setInterval(() => {
				const elapsed = Date.now() - startTime
				calculateMetrics(currentIndex, elapsed)
			}, 100)
			return () => clearInterval(interval)
		}
	}, [isTyping, startTime, currentIndex, calculateMetrics])

	// Completion handling
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
				`Lesson complete! Speed: ${wpm} WPM | Accuracy: ${accuracy}% | Errors: ${errors}`
			)

			toast({
				title: "Lesson Complete! 🎉",
				description: `Speed: ${wpm} WPM | Accuracy: ${accuracy}%`,
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

	// Play sound
	const playKeySound = useCallback(() => {
		if (keySoundEnabled) {
			const audio = new Audio("/sounds/key-press.mp3")
			audio.volume = 0.3
			audio.play().catch(() => { })
		}
	}, [keySoundEnabled])

	// Key Handling
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setIsFocused(false)
			stopTyping()
			setAnnouncement("Typing paused")
			return
		}

		if (currentIndex >= codeText.length) return

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

	// Reset
	const handleReset = useCallback(() => {
		resetTyping()
		setIsFocused(false)
		setLessonCompleted(false)
		setAnnouncement("Lesson reset")
	}, [resetTyping])

	// Start
	const handleStart = useCallback(() => {
		setIsFocused(true)
		inputRef.current?.focus()
		setAnnouncement("Ready to type. Press any key to start.")
	}, [])

	// Pause
	const handlePause = useCallback(() => {
		stopTyping()
		setIsFocused(false)
		setAnnouncement("Typing paused")
	}, [stopTyping])

	// Font & Cursor style helpers
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

	/* ---------- UI ---------- */
	return (
		<div className="container mx-auto p-4 md:p-8">
			{/* Accessibility */}
			<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
				{announcement}
			</div>

			{/* Controls */}
			<div className="mb-4 flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex gap-2">
						<Button onClick={handleStart} size="sm" variant="default" disabled={isTyping}>
							<Play className="mr-2 h-4 w-4" /> Start
						</Button>
						<Button onClick={handlePause} size="sm" variant="outline" disabled={!isTyping}>
							<Pause className="mr-2 h-4 w-4" /> Pause
						</Button>
						<Button onClick={handleReset} size="sm" variant="outline">
							<RotateCcw className="mr-2 h-4 w-4" /> Reset
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Switch id="practice-mode" checked={practiceMode} onCheckedChange={setPracticeMode} />
						<Label htmlFor="practice-mode" className="text-sm font-medium cursor-pointer">
							Practice Mode
						</Label>
					</div>
				</div>

				<div className="flex w-full items-center gap-4 sm:w-auto">
					<div className="text-sm text-muted-foreground">Progress: {progress}%</div>
					<div
						className="h-2 flex-1 overflow-hidden rounded-full bg-muted sm:w-32 sm:flex-none"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin={0}
						aria-valuemax={100}
					>
						<div
							className="h-full bg-cyan-500 transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			</div>

			<p className="mb-4 text-center text-xs text-muted-foreground sm:text-sm">
				{isFocused
					? "Type the code below. Press ESC to pause."
					: "Click Start or focus the code area to begin."}
			</p>

			{/* Typing Area */}
			<div
				ref={inputRef}
				tabIndex={0}
				onKeyDown={handleKeyDown}
				onFocus={() => setIsFocused(true)}
				role="textbox"
				aria-multiline="true"
				className={`relative min-h-[300px] sm:min-h-[400px] rounded-lg border-2 bg-card p-4 sm:p-6 outline-none transition-all duration-200 ${isFocused ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : "border-border hover:border-cyan-500/50"
					} ${getFontClass()}`}
				style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
			>
				<pre className="whitespace-pre-wrap break-words text-left">
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
			</div>

			{/* Lesson Complete Section */}
			{currentIndex >= codeText.length && (
				<div className="mt-4 animate-in fade-in slide-in-from-bottom-4 rounded-lg border border-green-500 bg-green-500/10 p-4 text-center sm:p-6">
					<h3 className="mb-2 text-xl font-bold text-green-500 sm:text-2xl">Lesson Complete!</h3>
					<p className="mb-4 text-sm text-muted-foreground sm:text-base">
						Great job! Final stats:
					</p>
					<div className="flex flex-wrap justify-center gap-8">
						<div>
							<div className="text-2xl font-bold text-cyan-500">{wpm}</div>
							<div className="text-xs text-muted-foreground">WPM</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-blue-500">{accuracy}%</div>
							<div className="text-xs text-muted-foreground">Accuracy</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-red-500">{errors}</div>
							<div className="text-xs text-muted-foreground">Errors</div>
						</div>
					</div>
					<Button onClick={handleReset} className="mt-4" variant="outline">
						Try Again
					</Button>
				</div>
			)}
		</div>
	)
}

/* ---------- BLINKING CURSOR ANIMATION ---------- */
if (typeof document !== "undefined") {
	const style = document.createElement("style")
	style.innerHTML = `
    @keyframes blink { 50% { opacity: 0; } }
  `
	document.head.appendChild(style)
}
