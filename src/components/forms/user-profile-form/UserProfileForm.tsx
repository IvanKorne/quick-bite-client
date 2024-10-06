import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormHeader from "../FormHeader";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

const formFields: {
  name: "addressLine1" | "city" | "country";
  label: string;
}[] = [
  { name: "addressLine1", label: "Address Line 1" },
  { name: "city", label: "City" },
  { name: "country", label: "Country" },
];

export type UserFormSchema = z.infer<typeof formSchema>;
type UserProfileFormProps = {
  currentUser: User;
  onSave: (userProfileData: UserFormSchema) => void;
  isLoading: boolean;
  title: string;
  buttonText: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title,
  buttonText,
}: UserProfileFormProps) => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 rounded-lg bg-gray-50 md:p-10"
      >
        <FormHeader
          title={title}
          desc=" View and update your user profile here!"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 md:flex-row">
          {formFields.map((field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={field.name}
              render={({ field: inputField }) => (
                <FormItem className="flex-1">
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input {...inputField} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-amber-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
