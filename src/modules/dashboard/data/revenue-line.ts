export type RevenueLineBasePoint = {
  month: string;
  previous: number;
  current: number;
};

export const revenueLineBase: RevenueLineBasePoint[] = [
  { month: "Jan", previous: 7, current: 12 },
  { month: "Feb", previous: 16, current: 9 },
  { month: "Mar", previous: 15, current: 8 },
  { month: "Apr", previous: 11, current: 12 },
  { month: "May", previous: 12, current: 18 },
  { month: "Jun", previous: 24, current: 19 },
];

export default revenueLineBase;
