import { useEffect, useState } from "react";
import GetStartedSVG from "@/assets/getstarted.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "@/routes/routing";
import CaretRightIcon from "@/assets/svg/CaretRightIcon";

const GetStarted = () => {
  const [name, setName] = useState("");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.setItem("user", name);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="p-4 w-full h-full flex flex-col justify-between gap-2 ">
      <div className="w-full flex justify-center items-center">
        <img
          className="tablet:w-[300px]"
          src={GetStartedSVG}
          alt="Get Started"
        />
      </div>
      <div className="text-center flex flex-col gap-4">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">My To-do List</h2>
          <p className="text-gray-500">
            Productive tool to help you manage your task in everyday life
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Please enter your name"
          />
          <Button disabled={!name} onClick={onClick}>
            <Link reloadDocument to={ROUTE.CREATE}>
              <p>Let's get started</p>
              <CaretRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
