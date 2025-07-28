import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
