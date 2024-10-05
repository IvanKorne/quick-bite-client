import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchResultsInfo from "../components/SearchResultsInfo";
import CustomLoader from "@/components/CustomLoader";
import { useParams } from "react-router-dom";
import SearchResultsCard from "@/components/SearchResultsCard";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">cuisines</div>
      <div id="main" className="flex flex-col gap-5">
        <SearchResultsInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
