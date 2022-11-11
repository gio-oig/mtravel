import ResultCard from "../../components/resultCard/resultCard";
import useResult from "../../hooks/useResult";

const SearchResult = () => {
  const { distances, isLoading, total, date, numberOfPeople, error } =
    useResult();

  if (isLoading) {
    return <div className="mt-1">loading...</div>;
  }

  if (!isLoading && error) {
    return <div className="mt-1">{error}</div>;
  }

  return (
    <div className="search-result-page">
      <ResultCard
        date={date}
        numberOfPeople={numberOfPeople}
        distances={distances}
        total={total}
      />
    </div>
  );
};

export default SearchResult;
