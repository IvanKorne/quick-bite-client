import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type SortOptionFilterProps = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionFilter = ({ onChange, sortOption }: SortOptionFilterProps) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button className="w-full" variant="outline">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionFilter;
