// format number to millions with M suffix
export function formatNumberToMillions(value: number) {
  return `${value / 1000000}M`;
}

// format number to thousands with K suffix
export function formatNumberToThousands(value: number) {
  return `${value / 1000}K`;
}
