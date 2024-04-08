"use client";

import { useState, useCallback, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { domains } from "@/constants/domain";


const domainRegex = domains.map(domain => domain.replace(/\./g, '\\.')).join('|');

const pattern = new RegExp(`^[a-zA-Z0-9._%+-]+@(${domainRegex})$`);

const formSchemaRegister = z.object({
  name: z.string({ message: "This field is required" }).min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string({ message: "This field is required" }).regex(pattern, {
    message: "Your institute is not supported.",
  }).email({
    message: "email must be a valid email.",
  }),
  password: z.string({ message: "This field is required" }).min(2, {
    message: "password must be at least 2 characters.",
  }),
})

const formSchemaLogin = z.object({
  email: z.string({ message: "This field is required" }).regex(pattern, {
    message: "Your institute is not supported.",
  }).email({
    message: "email must be a valid email.",
  }),
  password: z.string({ message: "This field is required" }).min(2, {
    message: "password must be at least 2 characters.",
  }),
})

const AuthForm = () => {
  const session = useSession();
  const router = useRouter()

  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to check if authenticated or not

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  // change variant from LOGIN to REGISTER and vice versa
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  // react-hook-form
  const form = useForm({
    resolver: zodResolver(variant === "REGISTER" ? formSchemaRegister : formSchemaLogin),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // if variant is REGISTER, then register the user
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast("Verifications Email has been sent!")
        })
        .catch(() => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // if variant is LOGIN, then login the user
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
            console.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Signed In Successfully");
            router.refresh();
            router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-6">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your student email address.
                  </FormDescription>
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Uniconnect?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
