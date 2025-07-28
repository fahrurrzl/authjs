import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackButton = () => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Link href="/" className="text-sm text-gray-500 flex items-center gap-2">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to login
      </Link>
    </div>
  );
};

export default BackButton;
