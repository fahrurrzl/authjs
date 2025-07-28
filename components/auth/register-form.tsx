"use client";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import { Form, FormField, FormMessage } from "../ui/form";
import { FormItem } from "../ui/form";
import { FormLabel } from "../ui/form";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { registerSchema, TRegister } from "@/schemas";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./error.message";
import SuccessMessage from "./success.message";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegister) => {
    setIsLoading(true);
    register(data).then((res) => {
      if (res.error) {
        setError(res.error);
        setSuccess("");
        setIsLoading(false);
      } else if (res.success) {
        setError("");
        setSuccess(res.success);
        setIsLoading(false);
        form.reset();
      }
    });
    setIsLoading(false);
  };

  return (
    <CardWrapper
      title="Create an account"
      description="Enter your details to create an account"
      buttonBackLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
