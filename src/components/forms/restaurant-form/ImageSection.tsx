import { useFormContext } from "react-hook-form";
import FormHeader from "../FormHeader";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ImageSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <FormHeader
        title="Image"
        desc="Add an image that will represent your restaurant!"
      />
      <div className="flex flex-col gap-8 md:w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
