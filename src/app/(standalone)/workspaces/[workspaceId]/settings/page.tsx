import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { WorkspaceIdSettingsClient } from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className=" w-full lg:max-w-xl">
      <WorkspaceIdSettingsClient />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
