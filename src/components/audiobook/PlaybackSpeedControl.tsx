import { useState, useEffect } from "react";
import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PlaybackSpeedControlProps {
  currentRate: number;
  onRateChange: (rate: number) => void;
}

const PRESET_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const STORAGE_KEY = "rta_preferred_playback_speed";

const PlaybackSpeedControl = ({ currentRate, onRateChange }: PlaybackSpeedControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customSpeed, setCustomSpeed] = useState(currentRate.toString());

  // Load preferred speed on mount
  useEffect(() => {
    const savedSpeed = localStorage.getItem(STORAGE_KEY);
    if (savedSpeed) {
      const speed = parseFloat(savedSpeed);
      if (!isNaN(speed) && speed >= 0.25 && speed <= 3) {
        onRateChange(speed);
      }
    }
  }, []);

  const handlePresetClick = (speed: number) => {
    onRateChange(speed);
    setCustomSpeed(speed.toString());
    localStorage.setItem(STORAGE_KEY, speed.toString());
  };

  const handleSliderChange = (value: number[]) => {
    const speed = Math.round(value[0] * 100) / 100;
    onRateChange(speed);
    setCustomSpeed(speed.toString());
    localStorage.setItem(STORAGE_KEY, speed.toString());
  };

  const handleCustomSpeedChange = (value: string) => {
    setCustomSpeed(value);
  };

  const handleCustomSpeedSubmit = () => {
    const speed = parseFloat(customSpeed);
    if (!isNaN(speed) && speed >= 0.25 && speed <= 3) {
      onRateChange(speed);
      localStorage.setItem(STORAGE_KEY, speed.toString());
    } else {
      setCustomSpeed(currentRate.toString());
    }
  };

  const saveAsPreferred = () => {
    localStorage.setItem(STORAGE_KEY, currentRate.toString());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 min-w-[70px]">
          <Gauge className="w-4 h-4" />
          {currentRate}x
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="center">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Playback Speed</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={saveAsPreferred}
            >
              Save as Default
            </Button>
          </div>

          {/* Preset Speeds */}
          <div className="grid grid-cols-4 gap-2">
            {PRESET_SPEEDS.map((speed) => (
              <Button
                key={speed}
                variant={currentRate === speed ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-xs",
                  currentRate === speed && "bg-primary text-primary-foreground"
                )}
                onClick={() => handlePresetClick(speed)}
              >
                {speed}x
              </Button>
            ))}
          </div>

          {/* Custom Speed Slider */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Custom Speed</label>
            <Slider
              value={[currentRate]}
              min={0.25}
              max={3}
              step={0.05}
              onValueChange={handleSliderChange}
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={customSpeed}
                onChange={(e) => handleCustomSpeedChange(e.target.value)}
                onBlur={handleCustomSpeedSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSpeedSubmit()}
                className="h-8 text-center text-sm"
                min={0.25}
                max={3}
                step={0.05}
              />
              <span className="text-sm text-muted-foreground">x</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Range: 0.25x - 3x
            </p>
          </div>

          {/* Quick Reference */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Current: <span className="font-medium text-foreground">{currentRate}x</span>
              {localStorage.getItem(STORAGE_KEY) && (
                <> • Saved: <span className="font-medium text-primary">{localStorage.getItem(STORAGE_KEY)}x</span></>
              )}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlaybackSpeedControl;
