import type { Map } from "leaflet";
import { useEffect, useRef, useMemo } from "react";

import { formatNumberToThousands } from "@/modules/dashboard/utils/format";
import { REVENUE_BY_LOCATION_DATA } from "@/modules/dashboard/data/revenue";

export function RevenueByLocation() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  const locationsWithProgress = useMemo(() => {
    const maxRevenue = Math.max(
      ...REVENUE_BY_LOCATION_DATA.map((loc) => loc.revenue)
    );

    return REVENUE_BY_LOCATION_DATA.map((location) => ({
      ...location,
      progressPercentage: (location.revenue / maxRevenue) * 100,
      formattedRevenue: formatNumberToThousands(location.revenue),
    }));
  }, []);

  useEffect(() => {
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
          background-color: var(--color-dashboard-light) !important;
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
          zoom: -5,
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
          html: '<div class="flex items-center p-0.5 w-3 h-3 rounded-full shadow-2xl bg-white justify-center"><div class="w-full h-full rounded-full bg-black dark:bg-dashboard-purple"></div></div>',
          iconSize: [10, 10],
          iconAnchor: [10, 10],
        });

        // Add markers for each location
        REVENUE_BY_LOCATION_DATA.forEach((location) => {
          if (location.coordinates) {
            L.marker(
              [location.coordinates.latitude, location.coordinates.longitude],
              { icon: customIcon }
            )
              .addTo(map)
              .bindPopup(
                `<strong>${location.name}</strong><br/>Revenue: ${formatNumberToThousands(location.revenue)}`
              );
          }
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

  return (
    <div className="bg-dashboard-light flex h-[318px] w-full flex-col gap-4 rounded-2xl p-6">
      <h1 className="heading">Revenue by Location</h1>

      <div
        ref={mapRef}
        className="bg-dashboard-light min-h-[82px] w-full overflow-hidden rounded-lg hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700"
      />

      <div className="flex flex-col gap-4">
        {locationsWithProgress.map((location) => (
          <div key={location.name} className="space-y-0.5">
            <div className="flex items-center justify-between text-xs leading-[1.125rem] font-normal text-black dark:text-white">
              <h3>{location.name}</h3>
              <p>{location.formattedRevenue}</p>
            </div>
            <div className="relative h-0.5 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
              <div
                className="bg-dashboard-cyan h-full rounded-lg transition-all duration-500 ease-out"
                style={{ width: `${location.progressPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
