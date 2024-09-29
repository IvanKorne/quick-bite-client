import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const links = [
  { name: "Order Status", link: "/order-status" },
  { name: "Manage Restaurant", link: "/manage-restaurant" },
  { name: "User Profile", link: "/user-profile" },
];

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      {links.map((link) => (
        <Link
          to={link.link}
          key={link.name}
          className="flex items-center font-bold bg-white hover:text-orange-500"
        >
          {link.name}
        </Link>
      ))}

      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
