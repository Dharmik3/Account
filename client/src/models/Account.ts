export interface CreateMasterAccountPayload {
  accountName: string;
  accountType: string;
  openingBalance: number | null;
  balanceType: BalanceType;
}

export interface CreateAccountMasterResponse {
  message: string;
}

export type BalanceType = "cr" | "dr";

export interface GetAccountMasterResponse {
  _id: string;
  accountName: string;
  accountType: string;
  openingBalance?: number | null;
  balanceType: BalanceType;
}

export interface DeleteAccoutPayload {
  id: string;
}

export interface UpdateAccountPayload {
  id: string;
  accountName?: string;
  accountType?: string;
  openingBalance?: number | null;
  balanceType?: BalanceType;
}
