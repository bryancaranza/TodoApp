import { ROUTE } from "@/routes/routing";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 h-full">
      <h1 className="text-2xl">Page Not Found</h1>
      <Link
        className="text-blue-700 hover:text-blue-600 underline"
        to={ROUTE.BASE}
        reloadDocument
      >
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
