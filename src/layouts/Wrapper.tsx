import React from "react";

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    <div className="w-full font-sans bg-[#E9E5F6] h-full flex justify-center items-center tablet:p-5 p-2">
      <div className="tablet:w-[400px] w-full h-full shadow-md rounded-md  bg-gradient-to-r from-slate-100 via-white to-gray-100 p-4">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
