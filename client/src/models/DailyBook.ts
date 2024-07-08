import { BalanceType } from "./Account";

export interface DailyBook {
  _id: string;
  transactionDate: string;
  cashBankAccount: string;
  voucherNumber?: number;
  receiptNumber?: number;
  balanceType: BalanceType;
  transactionDetails: string;
  generalAccount: string;
  amount: number;
  details: string;
}
