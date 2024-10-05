import { Loader2 } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 className="text-amber-500 animate-spin size-10" />
    </div>
  );
};

export default CustomLoader;
