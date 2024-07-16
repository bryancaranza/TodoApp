import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full relative">
      <div className="h-full pb-14 flex flex-col gap-4 overflow-x-auto scroll-hidden">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
