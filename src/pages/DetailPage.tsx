import { useCreateCheckoutSession } from "@/api/orderApi";
import { useGetRestaurantDetails } from "@/api/restaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import CustomLoader from "@/components/CustomLoader";
import CustomMenuItem from "@/components/CustomMenuItem";
import { UserFormSchema } from "@/components/forms/user-profile-form/UserProfileForm";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { CartItem, MenuItem } from "@/types/restaurant";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantDetails(restaurantId!);
  const { createCheckoutSession, isLoading: isCreatingCheckoutSession } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (cartItem: MenuItem) => {
    const existingCartItem = cartItems.find(
      (item) => item._id === cartItem._id
    );

    let updatedCartItems;
    if (!existingCartItem) {
      // Item not in the cart, add it as a new item
      updatedCartItems = [
        ...cartItems,
        {
          _id: cartItem._id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: 1,
        },
      ];
    } else {
      // Item exists in the cart, update its quantity
      updatedCartItems = cartItems.map((item) =>
        item._id === cartItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedCartItems)
    );

    setCartItems(updatedCartItems);
  };

  const removeFromCart = (cartItem: CartItem) => {
    const existingCartItem = cartItems.find(
      (item) => item._id === cartItem._id
    );

    if (!existingCartItem) {
      return;
    }

    let updatedCartItems;
    if (existingCartItem.quantity === 1) {
      // Remove item from the cart
      updatedCartItems = cartItems.filter(
        (item) => item._id !== existingCartItem._id
      );
    } else {
      // Decrease the quantity of the item
      updatedCartItems = cartItems.map((item) =>
        item._id === cartItem._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedCartItems)
    );

    setCartItems(updatedCartItems);
  };

  const handleCheckout = async (formData: UserFormSchema) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: formData.name,
        addressLine1: formData.addressLine1,
        city: formData.city,
        country: formData.country,
        email: formData.email!,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

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
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant!} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant?.menuItems.map((item, id) => (
            <CustomMenuItem
              menuItem={item}
              key={`${item}_${id}`}
              addToCart={() => addToCart(item)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant!}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                isLoading={isCreatingCheckoutSession}
                disabled={cartItems.length === 0}
                handleCheckout={handleCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
