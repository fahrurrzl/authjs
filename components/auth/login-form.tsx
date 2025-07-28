"use client";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import ErrorMessage from "./error.message";
import SuccessMessage from "./success.message";
import { Button } from "../ui/button";
import { loginSchema, TLogin } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import GoogleButton from "./google-button";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLogin) => {
    setIsLoading(true);
    login(data).then((res) => {
      if (res.error) {
        setError(res.error);
        setSuccess("");
      }
      if (res.success) {
        setSuccess(res.success);
        setError("");
      }
      setIsLoading(false);
    });
  };

  return (
    <CardWrapper
      title="Login"
      description="Enter your credentials to login"
      buttonBackLabel="Back to register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ErrorMessage error={error} />}
          {success && <SuccessMessage success={success} />}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <GoogleButton />
    </CardWrapper>
  );
};

export default LoginForm;
