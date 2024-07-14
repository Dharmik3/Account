import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useGetLedger } from "../../../hooks/useGetLedger";
import "./styles.scss";

export interface AccountLedgerType {
  accountName: string;
  startDate: string;
  endDate: string;
}

export const AccountLedger = (props: AccountLedgerType) => {
  const { accountName, startDate, endDate } = props;
  const { data: ledgerData, isFetching: isLedgerLoading } = useGetLedger(
    accountName,
    startDate,
    endDate
  );

  if (isLedgerLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress thickness={3} size={72} />
      </Box>
    );
  }
  let balance = ledgerData?.data?.openingBalance as number;
  return (
    <>
      <table>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Dr Amount</th>
          <th>Cr Amount</th>
          <th>Balance</th>
          <th>Balance Type</th>
        </tr>
        <tr className="highlightRow">
          <td>{dayjs(startDate).format("DD-MM-YYYY")}</td>
          <td colSpan={3}>Opening Balance</td>
         
          <td>{ledgerData?.data?.openingBalance}</td>
          <td>{ledgerData?.data?.openingBnalanceType}</td>
        </tr>

        {ledgerData?.data?.ledgerRecords?.map((record) => {
          return (
            <tr>
              <td>{dayjs(record.transactionDate).format("DD-MM-YYYY")}</td>
              <td>{record.description}</td>
              <td>{record.balanceType === "dr" ? record.amount : "—"}</td>
              <td>{record.balanceType === "cr" ? record.amount : "—"}</td>
              <td>
                {record.balanceType === "cr"
                  ? (balance += record.amount)
                  : (balance -= record.amount)}
              </td>
              <td>{record.balanceType}</td>
            </tr>
          );
        })}
        <tr className="highlightRow">
          <td colSpan={4}>Closing Balance</td>
          <td>{balance}</td>
          <td>
            {
              ledgerData?.data?.ledgerRecords[
                ledgerData?.data?.ledgerRecords?.length - 1
              ]?.balanceType
            }
          </td>
        </tr>
      </table>
    </>
  );
};
