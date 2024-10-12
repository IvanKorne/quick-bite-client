import { Order } from "@/types/order";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/data/orderStatus";

type OrderStatusHeaderProps = {
  order: Order;
};

const OrderStatusHeader = ({ order }: OrderStatusHeaderProps) => {
  const getOrderInfo = () => {
    return (
      ORDER_STATUS.find((ord) => ord.value === order.status) || ORDER_STATUS[0]
    );
  };

  const getExpectedDelivery = () => {
    const createdAt = new Date(order.createdAt);
    createdAt.setMinutes(
      createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes}`;
  };

  return (
    <div>
      <h1 className="flex flex-col gap-5 text-4xl font-bold tracking-tight md:flex-row md:justify-between">
        <span>Order Status: {getOrderInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="mt-2 animate-pulse [&>*]:bg-amber-500"
        value={getOrderInfo().progressValue}
      />
    </div>
  );
};

export default OrderStatusHeader;
