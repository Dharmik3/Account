import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Response } from "../models";
import { updateAccountMaster } from "../api/account";

export const useUpdateAccountMaster = (
  onSuccess: UseMutationOptions<Response<string>>["onSuccess"]
) => {
  const mutationResult = useMutation(updateAccountMaster, {
    mutationKey: ["UpdateAccountMaster"],
    onSuccess: (data, payload, context) => {
      if (data.success) {
        //@ts-ignore
        onSuccess?.(data, payload, context);
      }
    },
    onError: (e: any) => {
      console.log(e);
    },
  });

  return mutationResult;
};
