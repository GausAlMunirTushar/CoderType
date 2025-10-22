import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { jetbrainsMono, firaCode, inter } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
	title: "CoderType - Learn by Typing",
	description: "Improve your coding speed and accuracy with interactive typing lessons",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${jetbrainsMono.variable} ${firaCode.variable} ${inter.variable}`}
			>
				<Suspense fallback={null}>
					<ThemeProvider>
						<main className="flex h-screen overflow-hidden">
							{/* Fixed Sidebar */}
							<aside className="">
								<Sidebar />
							</aside>

							{/* Scrollable Page Content */}
							<section className="flex-1 overflow-y-auto">
								{children}
							</section>
						</main>
						<Toaster />
					</ThemeProvider>
				</Suspense>
				<Analytics />
			</body>
		</html>
	)
}
