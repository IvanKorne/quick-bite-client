import { Link } from "react-router-dom";

type SearchResultsInfoProps = {
  total: number;
  city: string;
};

const SearchResultsInfo = ({ total, city }: SearchResultsInfoProps) => {
  return (
    <div className="flex flex-col justify-between gap-3 text-xl font-bold lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-2 text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultsInfo;
