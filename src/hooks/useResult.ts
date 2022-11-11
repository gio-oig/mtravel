import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { calculateDistance, CitiesDistance } from "../api";
import { FormInitState } from "../pages/home/home";
import { createArrayFromCitiesinUrl, sleep } from "../_helpers/functions";
import useQueryString from "./useQueryString";

const useResult = () => {
  const { parsedQuery } = useQueryString();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [distances, setDistances] = useState<CitiesDistance[]>();
  const [total, setTotal] = useState<number>();

  const getDataFromUrl = async () => {
    setIsLoading(true);
    await sleep(3000);

    const citiesArr = createArrayFromCitiesinUrl(
      parsedQuery as Partial<FormInitState>
    );

    const data = await calculateDistance(citiesArr);
    setDistances(data.distances);
    setTotal(data.total);
  };

  useEffect(() => {
    getDataFromUrl()
      .catch(() => {
        const errorText = "Something went wrong!";
        toast.error(errorText);
        setError(errorText);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    distances,
    total,
    date: new Date(parsedQuery.date as string).toLocaleDateString(),
    numberOfPeople: parsedQuery?.numberOfPeople as string,
    isLoading,
    error,
  };
};

export default useResult;
