export interface Location {
  id: string;
  name: string;
  country: string;
  region?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface RevenueByLocation extends Location {
  revenue: number;
  percentage: number;
  growthRate: number;
  color: string;
  orderCount: number;
  averageOrderValue: number;
}
