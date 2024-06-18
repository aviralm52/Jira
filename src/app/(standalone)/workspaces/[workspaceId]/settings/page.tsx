import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className=" w-full lg:max-w-xl">
      <WorkspaceIdSettingsPage />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
