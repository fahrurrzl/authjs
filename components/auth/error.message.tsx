import { Ban } from "lucide-react";
import React from "react";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="bg-red-500 text-white p-2 rounded-md flex items-center gap-2">
      <Ban className="w-4 h-4" />
      <p className="text-sm font-medium">{error}</p>
    </div>
  );
};

export default ErrorMessage;
