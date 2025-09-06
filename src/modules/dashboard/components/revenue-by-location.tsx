import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import type { Map } from "leaflet";
import revenueByLocationData from "../data/revenue-by-location";

// Revenue data for different locations
const revenueData = revenueByLocationData;

export default function RevenueByLocation() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Import Leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const style = document.createElement("style");
      style.textContent = `
        .leaflet-container {
          background-color: #f9fafb !important;
        }
        .leaflet-tile-pane {
          filter: contrast(1.1) brightness(1.05);
        }
        .leaflet-tile {
          filter: opacity(0.8);
        }
      `;
      document.head.appendChild(style);

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          zoomControl: false,
          scrollWheelZoom: true,
          attributionControl: false,
        });

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            subdomains: "abcd",
            maxZoom: 19,
          }
        ).addTo(map);

        const customIcon = L.divIcon({
          className: "custom-marker",
          html: '<div style="background-color: #000; width: 14px; height: 14px; border-radius: 50%;"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        // Add markers for each location
        revenueData.forEach((location) => {
          L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${location.name}</strong><br/>Revenue: ${location.revenue}`
            );
        });

        mapInstanceRef.current = map;
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const maxRevenue = 100; // Fixed maximum instead of using actual max value

  return (
    <div className="w-96 bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1
          className="ml-6 heading text-balance"
        >
          Revenue by Location
        </h1>

        <Card className="rounded-none border-none bg-gray-50 py-6 shadow-none">
          <div
            ref={mapRef}
            className="h-96 w-full overflow-hidden"
            style={{ minHeight: "400px", backgroundColor: "#f9fafb" }}
          />
        </Card>

        <div className="space-y-6">
          {revenueData.map((location) => (
            <div key={location.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  {location.name}
                </h3>
                <div className="text-xl font-semibold text-gray-900">
                  {location.revenue}
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-gray-200">
                <div
                  className="h-1 rounded-full bg-[#9BB9D4] transition-all duration-300"
                  style={{ width: `${(location.value / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
