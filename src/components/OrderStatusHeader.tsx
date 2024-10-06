import { Order } from "@/types/order";

type OrderStatusHeaderProps = {
  order: Order;
};

const OrderStatusHeader = ({ order }: OrderStatusHeaderProps) => {
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
        <span>Order Status: {order.status}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
    </div>
  );
};

export default OrderStatusHeader;
