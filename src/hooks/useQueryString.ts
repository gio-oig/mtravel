import qs from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";

const useQueryString = () => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const getStringFromQuery = (data: any) =>
    qs.stringify(data, {
      arrayFormat: "bracket",
      skipNull: true,
      skipEmptyString: true,
    });

  const parseQuery = () => qs.parse(search, { arrayFormat: "bracket" });

  const updateSearchParams = (data: any) => {
    setSearchParams(getStringFromQuery(data));
  };

  return {
    getStringFromQuery,
    parseQuery,
    parsedQuery: parseQuery(),
    search,
    updateSearchParams,
  };
};

export default useQueryString;
