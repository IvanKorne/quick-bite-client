import { Order } from "@/types/order";
import { Separator } from "./ui/separator";

type OrderStatusDetailProps = {
  order: Order;
};

const OrderStatusDetail = ({ order }: OrderStatusDetailProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <span className="font-bold">Delivering To:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">
          <ul>
            {order.cartItems.map((item) => (
              <li key={item.menuItemId}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </span>
      </div>
      <Separator />
      <div className="flex flex-col gap-1">
        <span className="font-bold">Total</span>
        <span>${(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
