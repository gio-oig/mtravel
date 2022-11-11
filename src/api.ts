const BASE_URL = "https://mtrael-backend.herokuapp.com/";

export type CitiesDistance = {
  cityOne: string;
  cityTwo: string;
  distance: number;
};

type CalculateDistanceResponce = {
  distances: CitiesDistance[];
  total: number;
};

export const fetchCities = async (keyword: string) => {
  const resp = await fetch(`${BASE_URL}cities/${keyword}`);
  const data = await resp.json();
  return data;
};

export const calculateDistance = async (
  citiesArr: string[]
): Promise<CalculateDistanceResponce> => {
  const resp = await fetch(`${BASE_URL}citiesDistance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ cities: citiesArr }),
  });
  const data = await resp.json();
  return data;
};
