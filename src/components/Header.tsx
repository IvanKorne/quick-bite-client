import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="py-6 border-b-2 border-b-amber-500 ">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          className="text-3xl font-bold tracking-tight text-amber-500"
          to="/"
        >
          QuickBites
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
