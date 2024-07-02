import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getAccountMasterListKey } from "../api/queryKey";
import { GetAccountMasterResponse, Response } from "../models";
import { getAccountMaster } from "../api/account";

export const useGetAccountMaster = (): UseInfiniteQueryResult<
  Response<GetAccountMasterResponse[]>
> => {
  const queryData = useInfiniteQuery(
    getAccountMasterListKey.keys({
      key: "AccountMasterList",
    }),
    getAccountMaster,
    {
      //   getNextPageParam: (lastPage, pages) => {
      //     const fetchedRecords = pages.reduce(
      //       (sum: number, curr) => sum + curr?.data!.data?.length,
      //       0
      //     );
      //     const filteredRecords = lastPage?.data?.filteredRecords;
      //     if ((filteredRecords as number) > fetchedRecords) {
      //       return pages.length + 1;
      //     }
      //     return pages.length;
      //   },
      onError: (e: Response<GetAccountMasterResponse[]>) => {
        // enqueueSnackbar(
        //   e?.errorObjects
        //     ? (e.errorObjects[0]?.error as string)
        //     : "Something went wrong!",
        //   {
        //     variant: "error",
        //   }
        // );
        return e;
      },
    }
  );
  return queryData;
};
