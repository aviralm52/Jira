import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<
  (typeof client.api.tasks)["bulk-update"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.tasks)["bulk-update"]["$post"],
  200
>;

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to update Tasks");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Tasks updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to update tasks");
    },
  });
  return mutation;
};