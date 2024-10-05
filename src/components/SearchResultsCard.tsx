import { Restaurant } from "@/types/restaurant";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type SearchResultsCardProps = {
  restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: SearchResultsCardProps) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={8 / 3}>
        <img
          src={restaurant.imageUrl}
          alt="Restaurant logo"
          className="object-cover rounded-md size-full"
        />
      </AspectRatio>
      <div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, id) => (
              <span className="flex">
                <span>{cuisine}</span>
                {id < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 ">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="text-red-600" />
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
