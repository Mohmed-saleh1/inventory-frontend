import React, { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-grow flex flex-col mt-11 max-h-screen mb-6 mr-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashLayout;
