import { Order } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/data/orderStatus";

type OrderCardProps = {
  order: Order;
};
const OrderCard = ({ order }: OrderCardProps) => {
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid justify-between gap-4 mb-3 md:grid-cols-4">
          <div>
            Customer Name:
            <span className="ml-2"> {order.deliveryDetails.name}</span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.label} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
