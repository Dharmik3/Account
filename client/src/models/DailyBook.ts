export interface CrAccountEntry {
  receiptNumber: number;
  transactionDetails: string;
  amount: number;
}

export interface DrAccountEntry {
  voucherNumber: number;
  details: string;
  amount: number;
}

export interface CrEntry {
  accountName: string;
  entries: CrAccountEntry[];
}
export interface DrEntry {
  accountName: string;
  entries: DrAccountEntry[];
}

export interface DailyBook {
  openingBalance: number;
  closingBalance: number;
  cr: CrEntry[] | [];
  dr: DrEntry[] | [];
}

