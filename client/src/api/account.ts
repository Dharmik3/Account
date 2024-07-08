import { AxiosError, AxiosResponse } from "axios";
import {
  CreateAccountMasterResponse,
  CreateMasterAccountPayload,
  DeleteAccoutPayload,
  GetAccountMasterResponse,
  Response,
  UpdateAccountPayload,
} from "../models";
import { getInstance } from "./instance";

export const createAccountMaster = async (
  accountDetails: CreateMasterAccountPayload
): Promise<Response<CreateAccountMasterResponse>> => {
  try {
    const response: AxiosResponse<Response<CreateAccountMasterResponse>> =
      await getInstance().post("/v1/account", accountDetails);
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};

export const getAccountMaster = async (): Promise<
  Response<GetAccountMasterResponse[]>
> => {
  try {
    const response: AxiosResponse<Response<GetAccountMasterResponse[]>> =
      await getInstance().get("/v1/account");
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};

export const deleteAccountMaster = async (
  deleteAccountPayload: DeleteAccoutPayload
): Promise<Response<{ message: string }>> => {
  try {
    const { id } = deleteAccountPayload;
    const response: AxiosResponse<Response<{ message: string }>> =
      await getInstance().delete(`/v1/account/${id}`);
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};

export const updateAccountMaster = async (
  updateAccountPayload: UpdateAccountPayload
): Promise<Response<{ message: string }>> => {
  try {
    const { id } = updateAccountPayload;
    const response: AxiosResponse<Response<{ message: string }>> =
      await getInstance().patch(`/v1/account/${id}`, updateAccountPayload);
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};


export const getAccountsName = async (): Promise<
  Response<{ _id: string; accountName: string }[]>
> => {
  try {
    const response: AxiosResponse<
      Response<{ _id: string; accountName: string }[]>
    > = await getInstance().get("/v1/getAccounts");
    return response.data;
  } catch (err) {
    return Promise.reject((err as AxiosError).response);
  }
};