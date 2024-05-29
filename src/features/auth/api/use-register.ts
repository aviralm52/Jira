import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;
type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to Register");
      }

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Registered");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to Register");
    },
  });

  return mutation;
};
