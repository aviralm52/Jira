import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Button>Click here</Button>
      <Button variant={"secondary"}>Click here</Button>
      <Button variant={"destructive"}>Click here</Button>
      <Button variant={"ghost"}>Click here</Button>
      <Button variant={"muted"}>Click here</Button>
      <Button variant={"outline"}>Click here</Button>
      <Button variant={"teritary"}>Click here</Button>
      <Input/>
    </div>
  );
}
