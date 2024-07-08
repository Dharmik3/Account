export interface GetAccountMasterList {
  key: string;
  connectorTypeIds?: string;
  sortBy?: string;
  searchField?: string;
  pageSize?: number;
  createdByIds?: string;
  pageNumber?: number;
}

export const getAccountMasterListKey = {
  keys: (args: GetAccountMasterList) => [args],
};

export interface GetDeleteAccountMaster {
  key: string;
}

export const getDeleteAccountMasterKey = {
  keys: (args: GetDeleteAccountMaster) => [args],
};

export interface GetAccountsName {
  key: string;
}

export const getAccountsNameKey = {
  keys: (args: GetAccountsName) => [args],
};

export interface GetDailyBookRecord {
  key: string;
  date: string;
}

export const getDailyBookRecordKey = {
  keys: (args: GetDailyBookRecord) => [args],
};
