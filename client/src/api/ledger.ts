import { AxiosError, AxiosResponse } from "axios";
import { Ledger, Response } from "../models/";
import { getInstance } from "./instance";
import { QueryFunctionContext } from "@tanstack/react-query";
import { getLedgerKey } from "./queryKey";

export const getLedgerData = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof getLedgerKey)["keys"]>>): Promise<
  Response<Ledger>
> => {
  try {
    const { startDate, endDate, accountName } = queryKey[0] || {};
    const response: AxiosResponse<Response<Ledger>> = await getInstance().get(
      "/v1/ledger",
      {
        params: {
          accountName,
          startDate,
          endDate,
        },
      }
    );
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};
