"use client";

import { GoogleLogin } from "@/actions/google-login";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="flex items-center gap-2 w-full"
      variant="outline"
      disabled={pending}
    >
      <FcGoogle />
      {pending ? "Loading..." : "Login with google"}
    </Button>
  );
};

const GoogleButton = () => {
  const [errorMsgGoogleLogin, dispatchGoogleLogin] = useActionState(
    GoogleLogin,
    undefined
  );
  return (
    <form action={dispatchGoogleLogin} className="mt-3">
      <SubmitButton />
      {errorMsgGoogleLogin && (
        <p className="text-red-500 text-sm">{errorMsgGoogleLogin.error}</p>
      )}
    </form>
  );
};

export default GoogleButton;
