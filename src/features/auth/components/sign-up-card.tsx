"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGit, FaGithub, FaGoodreads } from "react-icons/fa";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().trim().min(1, "Required").email(),
  password: z.string().min(8, "Minimum 8 characters required"),
});

export const SignUpCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {};

  return (
    <Card className=" w-full h-full md:w-[487px] border border-neutral-700 shadow-none">
      <CardHeader className=" flex justify-center items-center text-center p-7">
        <CardTitle className=" text-2xl">Sign Up</CardTitle>
        <CardDescription className=" text-center">
          By Signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className=" text-blue-700">Privacy Policy</span>
          </Link>
          and{" "}
          <Link href="/terms">
            <span className=" text-blue-700">Term and Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className=" px-7 mb-2">
        <Separator />
        <DottedSeparator />
      </div>
      <CardContent className=" mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
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
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter the email address"
                    />
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
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter the password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size={"lg"} className=" w-full">
              Sign Up{" "}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className=" px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-3 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className=" w-full"
        >
          <FcGoogle className=" mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className=" w-full"
        >
          <FaGithub className=" mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className=" px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-5 flex items-center justify-center">
        <p>
          Already have an account ?{" "}
          <Link href="/sign-in">
            <span className=" text-blue-700">Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
