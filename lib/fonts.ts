import { JetBrains_Mono, Fira_Code, Inter } from "next/font/google"

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
