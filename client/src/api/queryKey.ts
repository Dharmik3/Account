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
