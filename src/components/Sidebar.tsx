import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./Navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
    return (
        <aside className=" h-full bg-neutral-100 p-4 w-full">
            <Link href={"/"}>
                <Image src={"/logo2.webp"} alt="logo" width={164} height={48} />
            </Link>
            <DottedSeparator className=" my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className=" my-4" />
            <Navigation />
        </aside>
    );
};