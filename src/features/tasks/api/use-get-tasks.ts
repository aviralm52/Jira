import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface useGetTasksProps {
  workspaceId: string;
}

export const useGetTasks = ({ workspaceId }: useGetTasksProps) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Tasks");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
