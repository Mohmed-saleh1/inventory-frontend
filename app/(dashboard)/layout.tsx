import React, { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";

const DashLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default DashLayout;
