import { auth } from "@/auth";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();
  console.log("session => ", session);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-blue-500">
        Hllo, {session?.user?.name}
      </h1>
    </div>
  );
};

export default DashboardPage;
