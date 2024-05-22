import { DottedSeparator } from "@/components/dotted-separator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  return (
    <Card className=" w-full h-full md:w-[487px] border border-neutral-700 shadow-none">
      <CardHeader className=" flex justify-center items-center text-center p-7">
        <CardTitle className=" text-2xl">Welcome Back</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <div className=" px-7 mb-2">
        <Separator />
        <DottedSeparator color="black" />
      </div>
    </Card>
  );
};
