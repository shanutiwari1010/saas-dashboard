export type TotalSalesItem = {
  name: string;
  value: number;
  color: string;
};

export const totalSalesData: TotalSalesItem[] = [
  { name: "Direct", value: 300.56, color: "#1f2937" },
  { name: "Sponsored", value: 154.02, color: "#8b5cf6" },
  { name: "Affiliate", value: 135.18, color: "#86efac" },
  { name: "E-mail", value: 48.96, color: "#7dd3fc" },
];

export default totalSalesData;
