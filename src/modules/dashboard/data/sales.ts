export type TotalSalesItem = {
  name: string;
  value: number;
  color: {
    light: string;
    dark: string;
  };
};

export const TOTAL_SALES_DATA = [
  {
    label: "Direct",
    value: 300.56,
    color: {
      light: "#1f2937",
      dark: "#1f2937",
    },
  },
  {
    label: "Affiliate",
    value: 135.18,
    color: {
      light: "#BAEDBD",
      dark: "#BAEDBD",
    },
  },
  {
    label: "Sponsored",
    value: 154.02,
    color: {
      light: "#95A4FC",
      dark: "#95A4FC",
    },
  },
  {
    label: "E-mail",
    value: 48.96,
    color: {
      light: "#B1E3FF",
      dark: "#B1E3FF",
    },
  },
];
