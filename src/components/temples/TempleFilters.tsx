import { Button } from "@/components/ui/button";
import { temples } from "@/data/temples";

interface TempleFiltersProps {
  selectedState: string;
  selectedDeity: string;
  onStateChange: (state: string) => void;
  onDeityChange: (deity: string) => void;
}

const TempleFilters = ({
  selectedState,
  selectedDeity,
  onStateChange,
  onDeityChange,
}: TempleFiltersProps) => {
  // Extract unique states and deities from temples data
  const states = ["all", ...new Set(temples.map((t) => t.location.state))];
  const deities = ["all", "Shiva", "Vishnu", "Devi"];

  return (
    <div className="space-y-6">
      {/* State filters */}
      <div>
        <p className="font-display text-sm tracking-[0.15em] uppercase text-muted-foreground mb-3">
          By Region
        </p>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "sacred" : "outline"}
              size="sm"
              onClick={() => onStateChange(state)}
              className="text-xs"
            >
              {state === "all" ? "All States" : state}
            </Button>
          ))}
        </div>
      </div>

      {/* Deity filters */}
      <div>
        <p className="font-display text-sm tracking-[0.15em] uppercase text-muted-foreground mb-3">
          By Deity
        </p>
        <div className="flex flex-wrap gap-2">
          {deities.map((deity) => (
            <Button
              key={deity}
              variant={selectedDeity === deity ? "sacred" : "outline"}
              size="sm"
              onClick={() => onDeityChange(deity)}
              className="text-xs"
            >
              {deity === "all" ? "All Deities" : deity}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempleFilters;
