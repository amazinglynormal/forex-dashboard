import axios from "axios";
import { BASE_URL } from "../app/constants";
import { Currencies } from "../interfaces/Currencies.interface";
import { CurrenciesResponse } from "../interfaces/CurrenciesResponse.interface";

const fetchCurrencies = async (): Promise<CurrenciesResponse> => {
  const response = await axios.get<Currencies>(`${BASE_URL}/currencies`);
  if (response.status === 200) {
    return { data: response.data, error: false };
  }

  return { error: true };
};

export default fetchCurrencies;
