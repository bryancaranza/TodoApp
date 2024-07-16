import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-transparent">
      <CircleLoader color="#0f172a" />
    </div>
  );
};

export default Loader;
