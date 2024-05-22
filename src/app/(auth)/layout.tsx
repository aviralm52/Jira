import { Button } from "@/components/ui/button";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className=" bg-neutral-100 min-h-screen">
      <div className=" mx-auto max-w-screen-2xl p-4 border border-black">
        <nav className=" flex justify-between items-center">
          <img src="/logovs.webp" alt="logo" className=" w-16 h-16" />
          <Button variant={"secondary"}>Sign Up</Button>
        </nav>
        <div className=" flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
