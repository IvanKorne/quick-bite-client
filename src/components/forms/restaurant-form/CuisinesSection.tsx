import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/data/cuisines";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";
import FormHeader from "../FormHeader";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <FormHeader title="Cuisines" desc="Select your restaurant's cuisines" />
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-1 md:grid-cols-5">
              {cuisineList.map((cuisine) => (
                <CuisineCheckbox
                  field={field}
                  cuisine={cuisine}
                  key={cuisine}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
