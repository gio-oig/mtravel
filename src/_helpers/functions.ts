import { SelectCity } from "../components/customSelect/customSelect";
import { FormInitState } from "../pages/home/home";

export const transformDataForReactSelect = (data: string[]) => {
  return data.map(asSelectData);
};

export const excludeFormArray = <T extends SelectCity>(
  dataArr: T[],
  excludeArr: string[]
) => {
  return dataArr.filter(({ value }) => !excludeArr.includes(value));
};

export const formatDistance = (distance: number | undefined) => {
  return distance ? distance.toFixed(2) : 0;
};

export const createArrayFromCitiesinUrl = (
  parsedData: Partial<FormInitState>
) => {
  const citiesArr = [];

  if (parsedData.originCity) {
    citiesArr.push(parsedData.originCity);
  }

  if (parsedData.intermediateCities) {
    Array.isArray(parsedData.intermediateCities)
      ? citiesArr.push(...parsedData.intermediateCities)
      : citiesArr.push(parsedData.intermediateCities);
  }

  if (parsedData.destinationCity) {
    citiesArr.push(parsedData.destinationCity);
  }

  return citiesArr;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const asSelectData = (val: string) => ({ label: val, value: val });
