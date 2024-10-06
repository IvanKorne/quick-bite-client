import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormSchema,
} from "./forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/myUserApi";

type CheckoutButtonProps = {
  disabled: boolean;
  handleCheckout: (formData: UserFormSchema) => void;
  isLoading: boolean;
};

const CheckoutButton = ({
  disabled,
  handleCheckout,
  isLoading,
}: CheckoutButtonProps) => {
  const {
    isAuthenticated,
    isLoading: isAuthenticating,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  const { currentUser, isLoading: isGettingUser } = useGetUser();

  if (!isAuthenticated) {
    return (
      <Button className="flex-1 bg-amber-500" onClick={onLogin}>
        Login to checkout
      </Button>
    );
  }

  if (isAuthenticating || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="flex-1 bg-amber-500">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={handleCheckout}
          isLoading={isGettingUser}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
