import { cuisineList } from "@/data/cuisines";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type CuisineFilterProps = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  setIsExpanded: () => void;
};

const CuisineFilter = ({
  onChange,
  setIsExpanded,
  selectedCuisines,
  isExpanded,
}: CuisineFilterProps) => {
  const handleReset = () => {
    onChange([]);
  };

  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, value]
      : selectedCuisines.filter((cuisines) => cuisines !== value);

    onChange(newCuisinesList);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 text-md">
        <div className="mb-3 font-semibold ">Filter by Cuisines</div>
        <button
          className="pb-3 font-semibold text-blue-500 underline cursor-pointer hover:text-blue-400"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => (
            <div className="flex">
              <input
                type="checkbox"
                value={cuisine}
                checked={selectedCuisines.includes(cuisine)}
                className="hidden"
                id={cuisine}
                onChange={handleCuisineChange}
              />
              <Label
                htmlFor={cuisine}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                  selectedCuisines.includes(cuisine)
                    ? "border border-green-600 text-green-600"
                    : "border border-slate-300"
                }`}
              >
                {selectedCuisines.includes(cuisine) && (
                  <Check size={20} strokeWidth={3} />
                )}
                {cuisine}
              </Label>
            </div>
          ))}
        <Button
          variant={"link"}
          className="flex-1 mt-4 "
          onClick={setIsExpanded}
        >
          {isExpanded ? (
            <span className="flex items-center gap-1">
              View Less <ChevronUp className="pt-1" />
            </span>
          ) : (
            <span className="flex items-center gap-1 ">
              View More <ChevronDown className="pt-1" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CuisineFilter;
