import { AxiosError, AxiosResponse } from "axios";
import { DailyBook, Response } from "../models/";
import { getInstance } from "./instance";
import { QueryFunctionContext } from "@tanstack/react-query";
import { getDailyBookRecordKey } from "./queryKey";

export const getDailyBookRecord = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<(typeof getDailyBookRecordKey)["keys"]>
>): Promise<Response<DailyBook[]>> => {
  try {
    const { date } = queryKey[0] || {};
    const response: AxiosResponse<Response<DailyBook[]>> =
      await getInstance().get("/v1/dailyBook", {
        params: {
          date,
        },
      });
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};
