import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  CreateAccountMasterResponse,
  Response,
  CreateMasterAccountPayload,
} from "../models";
import { createAccountMaster } from "../api/account";

export const useCreateAccountMaster = (
  onSuccess?: (
    data: Response<CreateAccountMasterResponse>,
    payload: CreateMasterAccountPayload,
    context: unknown
  ) => void,
  onError?: (
    error: unknown,
    variables: CreateMasterAccountPayload,
    context: unknown
  ) => void
): UseMutationResult<
  Response<CreateAccountMasterResponse>,
  unknown,
  CreateMasterAccountPayload,
  unknown
> => {
  const mutationResult = useMutation<
    Response<CreateAccountMasterResponse>,
    unknown,
    CreateMasterAccountPayload,
    unknown
  >(createAccountMaster, {
    mutationKey: ["CreateMasterAccount"],
    onSuccess,
    onError,
  });

  return mutationResult;
};
