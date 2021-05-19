export interface LatestRate {
  amount: number;
  base: string;
  date: string;
  rates: {
    [symbol: string]: number;
  };
}
