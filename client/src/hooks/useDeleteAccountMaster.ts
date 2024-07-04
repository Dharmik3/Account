import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Response } from "../models";
import { getDeleteAccountMasterKey } from "../api/queryKey";
import { deleteAccountMaster } from "../api/account";

export const useDeleteAccountMaster = (
  onSuccess: UseMutationOptions<Response<{ message: string }>>["onSuccess"]
) => {
  const mutationResult = useMutation(
    getDeleteAccountMasterKey.keys({
      key: "DeleteAccountMaster",
    }),
    deleteAccountMaster,
    {
      onSuccess: (data, payload, context) => {
        if (data.success) {
          //@ts-ignore
          onSuccess?.(data, payload, context);
        } else {
        }
      },
      onError: (e: any) => {
        console.log("error", e);
      },
    }
  );

  return mutationResult;
};
