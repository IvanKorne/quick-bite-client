import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/myRestaurantApi";
import CustomLoader from "@/components/CustomLoader";
import ManageRestaurantForm from "@/components/forms/restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreatingRestaurant } =
    useCreateRestaurant();
  const { currentRestaurant, isLoading: isGettingRestaurant } =
    useGetRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  if (isGettingRestaurant) {
    return <CustomLoader />;
  }
  return (
    <ManageRestaurantForm
      onSave={currentRestaurant ? updateRestaurant : createRestaurant}
      isLoading={isCreatingRestaurant || isUpdateLoading}
      restaurant={currentRestaurant!}
    />
  );
};

export default ManageRestaurantPage;
