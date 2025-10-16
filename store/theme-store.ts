import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"
export type AccentColor = "indigo" | "cyan" | "orange" | "green" | "purple"
export type FontFamily = "jetbrains" | "fira" | "inter"
export type CursorStyle = "block" | "underline" | "bar"

interface ThemeState {
  theme: Theme
  accentColor: AccentColor
  fontFamily: FontFamily
  fontSize: number
  keySoundEnabled: boolean
  cursorStyle: CursorStyle
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  setFontFamily: (font: FontFamily) => void
  setFontSize: (size: number) => void
  toggleKeySound: () => void
  setCursorStyle: (style: CursorStyle) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      accentColor: "indigo",
      fontFamily: "jetbrains",
      fontSize: 16,
      keySoundEnabled: false,
      cursorStyle: "block",
      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleKeySound: () => set((state) => ({ keySoundEnabled: !state.keySoundEnabled })),
      setCursorStyle: (cursorStyle) => set({ cursorStyle }),
    }),
    {
      name: "codertype-theme",
    },
  ),
)
