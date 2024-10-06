import { Link } from "react-router-dom";

const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-semibold">No Results Found</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
