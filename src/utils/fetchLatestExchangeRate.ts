import axios from "axios";
import { BASE_URL } from "../app/constants";
import { LatestRate } from "../interfaces/LatestRate.interface";
import { LatestRateResponse } from "../interfaces/LatestRateResponse.interface";

const fetchLatestExchangeRate = async (): Promise<LatestRateResponse> => {
  const response = await axios.get<LatestRate>(`${BASE_URL}/latest`);
  if (response.status === 200) {
    return { data: response.data, error: false };
  }

  return { error: true };
};

export default fetchLatestExchangeRate;
