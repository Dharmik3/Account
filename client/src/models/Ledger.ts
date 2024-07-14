import { BalanceType } from "./Account";

export interface LedgerRecord {
  transactionDate: string;
  amount: number;
  balanceType: BalanceType;
  description: string;
}

export interface Ledger {
  openingBalance: number;
  openingBnalanceType: BalanceType;
  ledgerRecords: LedgerRecord[];
}
