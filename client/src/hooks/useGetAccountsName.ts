import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getAccountsNameKey } from "../api/queryKey";
import { Response } from "../models";
import { getAccountsName } from "../api/account";

export const useGetAccountsName = (): UseInfiniteQueryResult<
  Response<{ _id: string; accountName: string }[]>
> => {
  const queryData = useInfiniteQuery(
    getAccountsNameKey.keys({
      key: "AccountsName",
    }),
    getAccountsName,
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
      onError: (e: Response<string[]>) => {
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
      cacheTime: 0,
      staleTime: 0,
    }
  );
  return queryData;
};
