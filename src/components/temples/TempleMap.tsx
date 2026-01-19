import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { temples, Temple } from "@/data/temples";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom temple marker icon
const templeIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface TempleMapProps {
  selectedState?: string;
  selectedDeity?: string;
  className?: string;
}

// Component to adjust map bounds when filters change
const MapBoundsUpdater = ({ temples: filteredTemples }: { temples: Temple[] }) => {
  const map = useMap();

  useEffect(() => {
    if (filteredTemples.length > 0) {
      const bounds = L.latLngBounds(
        filteredTemples.map((t) => [t.location.coordinates.lat, t.location.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 });
    }
  }, [filteredTemples, map]);

  return null;
};

const TempleMap = ({ selectedState = "all", selectedDeity = "all", className = "" }: TempleMapProps) => {
  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      const stateMatch = selectedState === "all" || temple.location.state === selectedState;
      const deityMatch =
        selectedDeity === "all" || temple.deity.toLowerCase().includes(selectedDeity.toLowerCase());
      return stateMatch && deityMatch;
    });
  }, [selectedState, selectedDeity]);

  // Center of India
  const center: [number, number] = [20.5937, 78.9629];

  return (
    <div className={`w-full h-[500px] rounded-lg overflow-hidden border border-border/50 ${className}`}>
      <MapContainer
        center={center}
        zoom={5}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBoundsUpdater temples={filteredTemples} />
        {filteredTemples.map((temple) => (
          <Marker
            key={temple.id}
            position={[temple.location.coordinates.lat, temple.location.coordinates.lng]}
            icon={templeIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <p className="font-sanskrit text-xs text-primary/70 mb-1">
                  {temple.sanskritName}
                </p>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                  {temple.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {temple.location.city}, {temple.location.state}
                </p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {temple.deity}
                </p>
                <Link
                  to={`/temples/${temple.id}`}
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TempleMap;
