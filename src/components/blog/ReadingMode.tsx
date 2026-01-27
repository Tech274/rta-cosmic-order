import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Settings, X, Type, AlignJustify, Palette, Sun, Moon, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ReadingModeSettings {
  enabled: boolean;
  fontSize: number; // 14-24
  lineHeight: number; // 1.4-2.2
  theme: "light" | "sepia" | "dark" | "night";
}

const defaultSettings: ReadingModeSettings = {
  enabled: false,
  fontSize: 18,
  lineHeight: 1.8,
  theme: "light"
};

interface ReadingModeContextType {
  settings: ReadingModeSettings;
  toggleReadingMode: () => void;
  updateSettings: (updates: Partial<ReadingModeSettings>) => void;
}

const ReadingModeContext = createContext<ReadingModeContextType | null>(null);

export const useReadingMode = () => {
  const context = useContext(ReadingModeContext);
  if (!context) {
    throw new Error("useReadingMode must be used within a ReadingModeProvider");
  }
  return context;
};

export const ReadingModeProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<ReadingModeSettings>(() => {
    const saved = localStorage.getItem("readingModeSettings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("readingModeSettings", JSON.stringify(settings));
  }, [settings]);

  const toggleReadingMode = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const updateSettings = (updates: Partial<ReadingModeSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <ReadingModeContext.Provider value={{ settings, toggleReadingMode, updateSettings }}>
      {children}
    </ReadingModeContext.Provider>
  );
};

const themeStyles = {
  light: {
    bg: "bg-white",
    text: "text-gray-900",
    accent: "text-amber-700"
  },
  sepia: {
    bg: "bg-[#f8f4e8]",
    text: "text-[#5c4b37]",
    accent: "text-amber-800"
  },
  dark: {
    bg: "bg-zinc-900",
    text: "text-zinc-200",
    accent: "text-amber-400"
  },
  night: {
    bg: "bg-black",
    text: "text-zinc-400",
    accent: "text-amber-500"
  }
};

export const ReadingModeToggle = () => {
  const { settings, toggleReadingMode, updateSettings } = useReadingMode();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant={settings.enabled ? "default" : "outline"} 
          size="sm"
          className="gap-2"
        >
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">Reading Mode</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Reading Settings
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Reading Mode</span>
            <Button
              variant={settings.enabled ? "default" : "outline"}
              size="sm"
              onClick={toggleReadingMode}
            >
              {settings.enabled ? "On" : "Off"}
            </Button>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <Type className="w-4 h-4" />
                Font Size
              </span>
              <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateSettings({ fontSize: Math.max(14, settings.fontSize - 1) })}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Slider
                value={[settings.fontSize]}
                min={14}
                max={24}
                step={1}
                onValueChange={(v) => updateSettings({ fontSize: v[0] })}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateSettings({ fontSize: Math.min(24, settings.fontSize + 1) })}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Line Spacing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <AlignJustify className="w-4 h-4" />
                Line Spacing
              </span>
              <span className="text-sm text-muted-foreground">{settings.lineHeight.toFixed(1)}</span>
            </div>
            <Slider
              value={[settings.lineHeight]}
              min={1.4}
              max={2.2}
              step={0.1}
              onValueChange={(v) => updateSettings({ lineHeight: v[0] })}
            />
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <span className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Theme
            </span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => updateSettings({ theme: "light" })}
                className={cn(
                  "h-12 rounded-lg border-2 flex items-center justify-center transition-all",
                  "bg-white",
                  settings.theme === "light" ? "border-primary" : "border-gray-200"
                )}
              >
                <Sun className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => updateSettings({ theme: "sepia" })}
                className={cn(
                  "h-12 rounded-lg border-2 flex items-center justify-center transition-all",
                  "bg-[#f8f4e8]",
                  settings.theme === "sepia" ? "border-primary" : "border-amber-200"
                )}
              >
                <span className="text-[#5c4b37] text-xs font-medium">Aa</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: "dark" })}
                className={cn(
                  "h-12 rounded-lg border-2 flex items-center justify-center transition-all",
                  "bg-zinc-900",
                  settings.theme === "dark" ? "border-primary" : "border-zinc-700"
                )}
              >
                <Moon className="w-4 h-4 text-zinc-300" />
              </button>
              <button
                onClick={() => updateSettings({ theme: "night" })}
                className={cn(
                  "h-12 rounded-lg border-2 flex items-center justify-center transition-all",
                  "bg-black",
                  settings.theme === "night" ? "border-primary" : "border-zinc-800"
                )}
              >
                <span className="text-zinc-500 text-xs font-medium">Aa</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
              <span>Light</span>
              <span>Sepia</span>
              <span>Dark</span>
              <span>Night</span>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Preview</span>
            <div 
              className={cn(
                "p-4 rounded-lg transition-all",
                themeStyles[settings.theme].bg
              )}
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight
              }}
            >
              <p className={cn("font-serif", themeStyles[settings.theme].text)}>
                धर्मो रक्षति रक्षितः। One who protects Dharma is protected by Dharma.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface ReadingModeWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ReadingModeWrapper = ({ children, className }: ReadingModeWrapperProps) => {
  const { settings } = useReadingMode();

  if (!settings.enabled) {
    return <>{children}</>;
  }

  return (
    <div 
      className={cn(
        "min-h-screen transition-all duration-300",
        themeStyles[settings.theme].bg,
        className
      )}
    >
      <div 
        className={cn(
          "max-w-3xl mx-auto px-6 py-8 font-serif",
          themeStyles[settings.theme].text
        )}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ReadingModeToggle;
