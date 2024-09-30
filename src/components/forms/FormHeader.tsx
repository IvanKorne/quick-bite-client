import { FormDescription } from "../ui/form";

type FormHeaderProps = {
  title: string;
  desc: string;
};
const FormHeader = ({ title, desc }: FormHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <FormDescription>{desc}</FormDescription>
    </div>
  );
};

export default FormHeader;
