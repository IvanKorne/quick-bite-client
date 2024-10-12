import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/myRestaurantApi";
import { useGetOrders } from "@/api/orderApi";
import CustomLoader from "@/components/CustomLoader";
import ManageRestaurantForm from "@/components/forms/restaurant-form/ManageRestaurantForm";
import OrderCard from "@/components/OrderCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreatingRestaurant } =
    useCreateRestaurant();
  const { currentRestaurant, isLoading: isGettingRestaurant } =
    useGetRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const { orders, isLoading: isGettingOrders } = useGetOrders();

  if (isGettingRestaurant || isGettingOrders) {
    return <CustomLoader />;
  }
  return (
    <Tabs defaultValue="manage-restaurant">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="p-10 space-y-5 rounded-lg bg-gray-50"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={currentRestaurant ? updateRestaurant : createRestaurant}
          isLoading={isCreatingRestaurant || isUpdateLoading}
          restaurant={currentRestaurant!}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
