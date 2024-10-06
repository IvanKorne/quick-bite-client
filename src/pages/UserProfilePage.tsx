import { useUpdateUser, useGetUser } from "@/api/myUserApi";
import CustomLoader from "@/components/CustomLoader";
import UserProfileForm from "@/components/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGettingUser } = useGetUser();
  const { isLoading: isUpdatingUser, updateUser } = useUpdateUser();

  if (isGettingUser) {
    return <CustomLoader />;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }
  return (
    <UserProfileForm
      title="Change User Profile"
      buttonText="Submit"
      onSave={updateUser}
      isLoading={isUpdatingUser}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;
