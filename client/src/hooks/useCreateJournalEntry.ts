import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Response, CreateJournalEntry } from "../models";
import { createJournalEntry } from "../api/journal";

export const useCreateJournalEntry = (
  onSuccess?: (
    data: Response<string>,
    payload: CreateJournalEntry,
    context: unknown
  ) => void,
  onError?: (
    error: unknown,
    variables: CreateJournalEntry,
    context: unknown
  ) => void
): UseMutationResult<
  Response<string>,
  unknown,
  CreateJournalEntry,
  unknown
> => {
  const mutationResult = useMutation<
    Response<string>,
    unknown,
    CreateJournalEntry,
    unknown
  >(createJournalEntry, {
    mutationKey: ["CreateJournalEntry"],
    onSuccess,
    onError,
  });

  return mutationResult;
};
