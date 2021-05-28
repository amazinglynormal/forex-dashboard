import { TimeSeries } from "../interfaces/TimeSeries.interface";

export interface ReturnData {
  date: Date;
  value: number;
}

const convertDataToArray = (data: TimeSeries, currency: string) => {
  const dates = Object.keys(data.rates);

  const dataArray: ReturnData[] = [];
  dates.forEach((date) => {
    const object = {
      date: new Date(date),
      value: data.rates[date][currency],
    };

    dataArray.push(object);
  });

  return dataArray;
};

export default convertDataToArray;
