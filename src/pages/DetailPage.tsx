import { useGetRestaurantDetails } from "@/api/restaurantApi";
import CustomLoader from "@/components/CustomLoader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";
const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantDetails(restaurantId!);

  if (isLoading || !restaurantId) {
    return <CustomLoader />;
  }

  return (
    <div className="flex flex-col gap-10 ">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt="Restaurant Banner"
          className="object-cover rounded-md size-full"
        />
      </AspectRatio>
    </div>
  );
};

export default DetailPage;
