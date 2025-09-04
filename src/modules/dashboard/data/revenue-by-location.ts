export type RevenueLocation = {
  name: string;
  revenue: string; // e.g., "72K"
  value: number; // numeric value used for progress calculation
  lat: number;
  lng: number;
};

export const revenueByLocationData: RevenueLocation[] = [
  { name: "New York", revenue: "72K", value: 72, lat: 40.7128, lng: -74.006 },
  {
    name: "San Francisco",
    revenue: "39K",
    value: 39,
    lat: 37.7749,
    lng: -122.4194,
  },
  { name: "Sydney", revenue: "25K", value: 25, lat: -33.8688, lng: 151.2093 },
  { name: "Singapore", revenue: "61K", value: 61, lat: 1.3521, lng: 103.8198 },
];

export default revenueByLocationData;
