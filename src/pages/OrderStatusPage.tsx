import { useGetOrders } from "@/api/orderApi";
import CustomLoader from "@/components/CustomLoader";
import NotFound from "@/components/NotFound";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const { isLoading, orders } = useGetOrders();

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!orders || orders.length === 0) {
    return <NotFound message="Sorry, we couldn't find any orders." />;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="p-10 space-y-10 rounded-lg bg-gray-50 ">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt="Restaurant Banner"
                className="object-cover rounded-md size-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
