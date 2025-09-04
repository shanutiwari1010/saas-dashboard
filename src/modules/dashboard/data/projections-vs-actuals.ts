export type ProjectionsVsActuals = {
  month: string;
  actual: number;
  projected: number;
};

export const projectionsVsActualsRaw: ProjectionsVsActuals[] = [
  { month: "Jan", actual: 17, projected: 20 },
  { month: "Feb", actual: 20, projected: 25 },
  { month: "Mar", actual: 17, projected: 21 },
  { month: "Apr", actual: 21, projected: 26 },
  { month: "May", actual: 14, projected: 17 },
  { month: "Jun", actual: 20, projected: 24 },
];

export default projectionsVsActualsRaw;
