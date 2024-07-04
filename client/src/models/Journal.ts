import { BalanceType } from "./Account";

export interface CreateJournalEntry {
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
