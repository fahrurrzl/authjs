"use client";

import { GoogleLogin } from "@/actions/google-login";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const [errorMsgGoogleLogin, dispatchGoogleLogin] = useActionState(
    GoogleLogin,
    undefined
  );
  return (
    <form action={dispatchGoogleLogin} className="mt-3">
      <Button className="flex items-center gap-2 w-full" variant="outline">
        <FcGoogle />
        Login with google
      </Button>
      {errorMsgGoogleLogin && (
        <p className="text-red-500 text-sm">{errorMsgGoogleLogin.error}</p>
      )}
    </form>
  );
};

export default GoogleButton;
