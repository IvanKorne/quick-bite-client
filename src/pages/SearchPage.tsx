import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchResultsInfo from "../components/SearchResultsInfo";
import CustomLoader from "@/components/CustomLoader";
import { Link, useParams } from "react-router-dom";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/Searchbar";
import Paginator from "@/components/Paginator";
import CuisineFilter from "@/components/CuisineFilter";
import SortOptionFilter from "@/components/SortOptionFilter";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const handlePageChange = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1, // Reset since sometimes some queries won't fill up to the page you are on
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
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
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-semibold">No Results Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find any restaurants matching your search.
        </p>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to the homepage
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          setIsExpanded={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearchQuery}
          placeholder={"Search by cuisine or restaurant name!"}
        />
        <div className="flex flex-col items-center justify-between gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city} />
          <SortOptionFilter
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <Paginator
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
