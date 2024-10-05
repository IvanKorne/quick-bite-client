import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchResultsInfo from "../components/SearchResultsInfo";
import CustomLoader from "@/components/CustomLoader";
import { useParams } from "react-router-dom";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/Searchbar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearchQuery = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

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
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearchQuery}
          placeholder={"Search by cuisine or restaurant name!"}
        />
        <SearchResultsInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
