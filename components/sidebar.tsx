"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
	Code2,
	CheckCircle2,
	PlayCircle,
	Loader2,
	Braces,
	Boxes,
	Globe,
	Palette,
	Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useProgressStore } from "@/store/progress-store"
import { cn } from "@/lib/utils"

// 🧩 Language Tabs
const langs = [
	{ id: "js", name: "JS", icon: <Braces className="w-4 h-4 text-yellow-400" /> },
	{ id: "py", name: "PY", icon: <Terminal className="w-4 h-4 text-blue-400" /> },
	{ id: "cpp", name: "C++", icon: <Boxes className="w-4 h-4 text-indigo-400" /> },
	{ id: "html", name: "HTML", icon: <Globe className="w-4 h-4 text-orange-400" /> },
	{ id: "css", name: "CSS", icon: <Palette className="w-4 h-4 text-cyan-400" /> },
]

// 📚 Lessons per language
const lessonsMap: Record<string, string[]> = {
	js: ["Variables", "Loops", "Functions", "Arrays", "Objects", "Promises", "Classes"],
	py: ["Variables", "Loops", "Functions", "Lists", "Classes", "Modules"],
	cpp: ["Variables", "Loops", "Arrays", "Pointers", "STL", "Templates"],
	html: ["Tags", "Forms", "Tables", "Media", "Links", "Semantic"],
	css: ["Selectors", "Flexbox", "Grid", "Animations", "Colors", "Typography"],
}

export function Sidebar() {
	const pathname = usePathname()
	const [lang, setLang] = useState("js")
	const { getCompletedCount, totalLessons } = useProgressStore()

	// 🧠 Example lesson progress states (replace later with store data)
	const completedLessons = ["Variables", "Loops"]
	const inProgressLessons = ["Functions"]

	// 🧩 Status icon logic
	const getLessonIcon = (lesson: string) => {
		if (completedLessons.includes(lesson))
			return <CheckCircle2 className="w-4 h-4 text-green-500" />
		if (inProgressLessons.includes(lesson))
			return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
		return <PlayCircle className="w-4 h-4 text-muted-foreground" />
	}

	return (
		<div className="hidden md:flex h-screen w-64 flex-col border-r border-border bg-sidebar">
			{/* 🔹 Header */}
			<div className="flex h-14 items-center gap-2 border-b px-5">
				<Code2 className="h-5 w-5 text-cyan-500" />
				<span className="font-semibold text-lg">CoderType</span>
			</div>

			{/* 🔹 Main Scrollable Area */}
			<ScrollArea className="flex-1 px-3 py-3">
				{/* Language Tabs */}
				<p className="px-2 text-xs font-semibold text-muted-foreground uppercase mb-2">
					Languages
				</p>
				<div className="grid grid-cols-3 gap-1.5">
					{langs.map((l) => (
						<button
							key={l.id}
							onClick={() => setLang(l.id)}
							className={cn(
								"flex flex-col items-center gap-0.5 rounded-md py-2 text-[11px] transition-all",
								lang === l.id
									? "bg-cyan-500/10 text-cyan-500"
									: "text-muted-foreground hover:text-foreground hover:bg-accent"
							)}
						>
							{l.icon}
							<span>{l.name}</span>
						</button>
					))}
				</div>

				{/* 🔹 Lessons List (Scrollable if too many) */}
				<div className="mt-3">
					<p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
						{langs.find((x) => x.id === lang)?.name} Lessons
					</p>
					<div className="max-h-[60vh] overflow-y-auto pr-1 space-y-1">
						{lessonsMap[lang].map((lesson) => (
							<Link key={lesson} href={`/lessons/${lang}/${lesson.toLowerCase()}`}>
								<Button
									variant={
										pathname === `/lessons/${lang}/${lesson.toLowerCase()}`
											? "secondary"
											: "ghost"
									}
									className="w-full justify-start text-sm px-3 py-1.5 h-8 rounded-md transition-all"
								>
									{/* ✅ icon first */}
									<span className="flex items-center gap-2">
										{getLessonIcon(lesson)}
										{lesson}
									</span>
								</Button>
							</Link>
						))}
					</div>
				</div>
			</ScrollArea>

			{/* 🔹 Footer */}
			<div className="border-t border-sidebar-border p-3">
				<div className="flex justify-between text-xs text-muted-foreground">
					<div className="text-center">
						<p className="text-lg font-bold text-cyan-500">
							{getCompletedCount()}
						</p>
						<p>Done</p>
					</div>
					<div className="text-center">
						<p className="text-lg font-bold">{totalLessons}</p>
						<p>Total</p>
					</div>
				</div>
			</div>
		</div>
	)
}
