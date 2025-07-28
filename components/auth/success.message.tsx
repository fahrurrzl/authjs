import { CheckCheck } from "lucide-react";
import React from "react";

const SuccessMessage = ({ success }: { success: string }) => {
  return (
    <div className="bg-green-500 text-white p-2 rounded-md flex items-center gap-2">
      <CheckCheck className="w-4 h-4" />
      <p className="text-sm font-medium">{success}</p>
    </div>
  );
};

export default SuccessMessage;
