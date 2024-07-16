import { Button } from "../ui/button";
import PlusIcon from "@/assets/svg/PlusIcon";
import { Link } from "react-router-dom";
import { ROUTE } from "@/routes/routing";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 ">
      <div className="w-full relative flex justify-center">
        <Button
          asChild
          className="transition rounded-full ease-in-out delay-150 bg-slate-950 hover:-translate-y-1 hover:scale-110 hover:bg-slate-900 duration-300"
        >
          <Link reloadDocument to={ROUTE.CREATE}>
            <PlusIcon className="w-[1rem]" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
