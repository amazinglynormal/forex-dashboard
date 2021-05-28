import axios from "axios";
import { BASE_URL } from "../app/constants";
import { TimeSeries } from "../interfaces/TimeSeries.interface";
import { TimeSeriesResponse } from "../interfaces/TimeSeriesResponse.interface";

const fetchTimeSeriesData = async (
  currency: string,
  timeFrame: string
): Promise<TimeSeriesResponse> => {
  const response = await axios.get<TimeSeries>(
    `${BASE_URL}/${timeFrame}?to=${currency}`
  );
  if (response.status === 200) {
    return { data: response.data, error: false };
  }

  return { error: true };
};

export default fetchTimeSeriesData;
