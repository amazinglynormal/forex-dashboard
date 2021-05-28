export interface TimeSeries {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: {
      [symbol: string]: number;
    };
  };
}
