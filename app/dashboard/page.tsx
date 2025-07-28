import { auth } from "@/auth";
import Image from "next/image";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Image
          src={session?.user?.image as string}
          width={20}
          height={20}
          alt={session?.user?.name as string}
        />
        <h1 className="text-2xl font-bold text-blue-500">
          Hllo, {session?.user?.name}
        </h1>
      </div>
    </div>
  );
};

export default DashboardPage;
