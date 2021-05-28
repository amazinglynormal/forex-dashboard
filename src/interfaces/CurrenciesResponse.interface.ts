import { Currencies } from "./Currencies.interface";

export interface CurrenciesResponse {
  error: boolean;
  data?: Currencies;
}
