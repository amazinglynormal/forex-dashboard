import axios from "axios";
import { BASE_URL } from "../app/constants";
import { PreviousRate } from "../interfaces/PreviousRate.interface";
import { PreviousRateResponse } from "../interfaces/PreviousRateResponse.interface";

const fetchPreviousExchangeRate = async (): Promise<PreviousRateResponse> => {
  const yesterday = new Date();

  if (yesterday.getHours() < 16) {
    yesterday.setDate(yesterday.getDate() - 2);
  } else {
    yesterday.setDate(yesterday.getDate() - 1);
  }
  const ydayYear = yesterday.getFullYear();
  const ydayMonth = yesterday.getMonth() + 1;
  const ydayDate = yesterday.getDate();
  const yesterdayString = `${ydayYear}-${
    ydayMonth < 10 ? "0" : ""
  }${ydayMonth}-${ydayDate}`;

  const response = await axios.get<PreviousRate>(
    `${BASE_URL}/${yesterdayString}`
  );
  if (response.status === 200) {
    return { data: response.data, error: false };
  }

  return { error: true };
};

export default fetchPreviousExchangeRate;
