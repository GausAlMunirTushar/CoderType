"use client"

import { useThemeStore } from "@/store/theme-store"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"

export function SettingsForm() {
  const {
    theme,
    accentColor,
    fontFamily,
    fontSize,
    keySoundEnabled,
    cursorStyle,
    setTheme,
    setAccentColor,
    setFontFamily,
    setFontSize,
    toggleKeySound,
    setCursorStyle,
  } = useThemeStore()

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Appearance</h2>

        <div className="space-y-6">
          <div>
            <Label className="mb-3 block text-base">Theme</Label>
            <div className="flex gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-3 block text-base">Accent Color</Label>
            <div className="flex gap-3">
              <button
                onClick={() => setAccentColor("indigo")}
                className={`h-10 w-10 rounded-lg bg-indigo-500 transition-all ${
                  accentColor === "indigo" ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-background" : ""
                }`}
                aria-label="Indigo"
              />
              <button
                onClick={() => setAccentColor("cyan")}
                className={`h-10 w-10 rounded-lg bg-cyan-500 transition-all ${
                  accentColor === "cyan" ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-background" : ""
                }`}
                aria-label="Cyan"
              />
              <button
                onClick={() => setAccentColor("orange")}
                className={`h-10 w-10 rounded-lg bg-orange-500 transition-all ${
                  accentColor === "orange" ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-background" : ""
                }`}
                aria-label="Orange"
              />
              <button
                onClick={() => setAccentColor("green")}
                className={`h-10 w-10 rounded-lg bg-green-500 transition-all ${
                  accentColor === "green" ? "ring-2 ring-green-500 ring-offset-2 ring-offset-background" : ""
                }`}
                aria-label="Green"
              />
              <button
                onClick={() => setAccentColor("purple")}
                className={`h-10 w-10 rounded-lg bg-purple-500 transition-all ${
                  accentColor === "purple" ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-background" : ""
                }`}
                aria-label="Purple"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Editor Settings */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Editor</h2>

        <div className="space-y-6">
          <div>
            <Label className="mb-3 block text-base">Font Family</Label>
            <RadioGroup value={fontFamily} onValueChange={(value) => setFontFamily(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jetbrains" id="jetbrains" />
                <Label htmlFor="jetbrains" className="cursor-pointer font-jetbrains">
                  JetBrains Mono
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fira" id="fira" />
                <Label htmlFor="fira" className="cursor-pointer font-fira">
                  Fira Code
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inter" id="inter" />
                <Label htmlFor="inter" className="cursor-pointer font-inter">
                  Inter
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label className="text-base">Font Size</Label>
              <span className="text-sm text-muted-foreground">{fontSize}px</span>
            </div>
            <Slider value={[fontSize]} onValueChange={(value) => setFontSize(value[0])} min={12} max={24} step={1} />
          </div>

          <div>
            <Label className="mb-3 block text-base">Cursor Style</Label>
            <RadioGroup value={cursorStyle} onValueChange={(value) => setCursorStyle(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="block" id="block" />
                <Label htmlFor="block" className="cursor-pointer">
                  Block
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="underline" id="underline" />
                <Label htmlFor="underline" className="cursor-pointer">
                  Underline
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bar" id="bar" />
                <Label htmlFor="bar" className="cursor-pointer">
                  Bar
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      {/* Sound Settings */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Sound</h2>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="key-sound" className="text-base">
              Key Press Sound
            </Label>
            <p className="text-sm text-muted-foreground">Play sound feedback when typing</p>
          </div>
          <Switch id="key-sound" checked={keySoundEnabled} onCheckedChange={toggleKeySound} />
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Preview</h2>
        <div
          className={`rounded-lg border-2 border-border bg-card p-4 ${
            fontFamily === "jetbrains" ? "font-jetbrains" : fontFamily === "fira" ? "font-fira" : "font-inter"
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <pre className="text-foreground">
            {`const greeting = "Hello, World!";
console.log(greeting);

function add(a, b) {
  return a + b;
}`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
