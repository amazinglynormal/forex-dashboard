import { TimeSeries } from "./TimeSeries.interface";

export interface TimeSeriesResponse {
  error: boolean;
  data?: TimeSeries;
}
