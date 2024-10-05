import { useCreateRestaurant, useGetRestaurant } from "@/api/myRestaurantApi";
import CustomLoader from "@/components/CustomLoader";
import ManageRestaurantForm from "@/components/forms/restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreatingRestaurant } =
    useCreateRestaurant();
  const { currentRestaurant, isLoading: isGettingRestaurant } =
    useGetRestaurant();

  if (isGettingRestaurant) {
    return <CustomLoader />;
  }
  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isCreatingRestaurant}
      restaurant={currentRestaurant!}
    />
  );
};

export default ManageRestaurantPage;
