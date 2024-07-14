import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Ledger, Response } from "../models";
import { getLedgerKey } from "../api/queryKey";
import { getLedgerData } from "../api/ledger";

export const useGetLedger = (
  accountName: string,
  startDate: string,
  endDate: string
): UseQueryResult<Response<Ledger>> => {
  const queryData = useQuery(
    getLedgerKey.keys({
      key: "Ledger",
      accountName,
      startDate,
      endDate,
    }),
    getLedgerData,
    {
      onError: (e: Response<Ledger>) => {
        return e;
      },
    }
  );
  return queryData;
};
