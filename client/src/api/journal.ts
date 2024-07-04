import { AxiosError, AxiosResponse } from "axios";
import { CreateJournalEntry, Response } from "../models";
import { getInstance } from "./instance";

export const createJournalEntry = async (
  journalEntryDetails: CreateJournalEntry
): Promise<Response<string>> => {
  try {
    const response: AxiosResponse<Response<string>> = await getInstance().post(
      "/v1/journal",
      journalEntryDetails
    );
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};
