import Searchbar, { SearchForm } from "@/components/Searchbar";
import landingPage from "../assets/landing.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearch = (searchForm: SearchForm) => {
    navigate({
      pathname: `/search/${searchForm.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md md:px-32">
        <h1 className="text-5xl font-bold tracking-tight text-amber-600 ">
          Treat yourself with a meal today
        </h1>
        <span className="text-xl font-semibold">
          Food is just one click away!
        </span>
        <Searchbar
          placeholder={"Search by city or town!"}
          onSubmit={handleSearch}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <img src={landingPage} alt="Landing Page" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter">
            Order whenever you wish!
          </span>
          <span>
            QuickBite sepcializes in personalized recommendations and faster
            ordering
          </span>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
