import { CitiesDistance } from "../../api";
import { formatDistance } from "../../_helpers/functions";

type ResultCardProps = {
  date: string;
  numberOfPeople: string;
  distances?: CitiesDistance[];
  total?: number;
};

const ResultCard = ({
  date,
  numberOfPeople,
  distances,
  total,
}: ResultCardProps) => {
  return (
    <div className="result-container">
      <p>
        date: <span className="result highlight">{date}</span>
      </p>
      <p>
        number of people:
        <span className="result highlight">{numberOfPeople}</span>{" "}
      </p>
      {distances?.map(({ cityOne, cityTwo, distance }, i) => (
        <p className="distance-txt" key={i}>
          from<span className="city highlight">{cityOne}</span>to
          <span className="city highlight">{cityTwo}</span>is
          <span className="result highlight">{formatDistance(distance)}</span>
          KM
        </p>
      ))}
      {distances?.length !== 1 && (
        <p>
          total distance is
          <span className="result highlight">{formatDistance(total)}</span>
          KM
        </p>
      )}
    </div>
  );
};

export default ResultCard;
