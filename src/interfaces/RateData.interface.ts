export interface RateData {
  symbol: string;
  fullName: string;
  latestRate: number;
  trend: "up" | "down" | "equal";
}
