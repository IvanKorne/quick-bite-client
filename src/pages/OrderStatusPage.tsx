import { useGetOrders } from "@/api/orderApi";
import CustomLoader from "@/components/CustomLoader";
import NotFound from "@/components/NotFound";
import OrderStatusHeader from "@/components/OrderStatusHeader";

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
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
