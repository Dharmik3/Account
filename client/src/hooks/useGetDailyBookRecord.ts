import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { DailyBook, Response } from "../models";
import { getDailyBookRecordKey } from "../api/queryKey";
import { getDailyBookRecord } from "../api/dailyBook";

export const useDailyBookRecord = (
  date: string
): UseQueryResult<Response<DailyBook>> => {
  const queryData = useQuery(
    getDailyBookRecordKey.keys({
      key: "DailyBookRecord",
      date,
    }),
    getDailyBookRecord,
    {
      onError: (e: Response<DailyBook[]>) => {
        return e;
      },
    }
  );
  return queryData;
};
