import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetDateFormatted } from "../../../utils/useGetDateFormatted";
import { useDailyBookRecord } from "../../../hooks/useGetDailyBookRecord";
import "./styles.scss";
interface DailyRecordType {
  currentDate: Date;
}

const DailyRecord = (props: DailyRecordType) => {
  const { currentDate } = props;
  const date = useGetDateFormatted(currentDate);
  const { data: getDailyBookRecord, isFetching } = useDailyBookRecord(date);
  const crData = getDailyBookRecord!?.data?.cr;
  const drData = getDailyBookRecord!?.data?.dr;
  console.log(crData);
  return isFetching ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
      }}
    >
      <CircularProgress thickness={5} variant="indeterminate" size={56} />
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <table>
        <tr>
          <th>Cr - Account Name</th>
          <th>Receipt Number</th>
          <th>Transfer Amount</th>
          <th>Cash Amount</th>
        </tr>
        {crData?.map((accountGroup) => {
          return (
            <>
              <tr>
                <td colSpan={4} className="accountNameCell">
                  {accountGroup.accountName}
                </td>
              </tr>
              {accountGroup.entries.map((entry) => (
                <tr>
                  <td>{entry.transactionDetails}</td>
                  <td>{entry.receiptNumber}</td>
                  <td>
                    {accountGroup.accountName !== "Cash A/C"
                      ? entry.amount
                      : "—"}
                  </td>
                  <td>
                    {accountGroup.accountName === "Cash A/C"
                      ? entry.amount
                      : "—"}
                  </td>
                </tr>
              ))}
              <tr className="totalCell">
                <td colSpan={4} style={{fontWeight:"bold"}}>
                  Total:{" "}
                  {accountGroup.entries.reduce((acc, entry) => {
                    return acc + entry.amount;
                  }, 0)}
                </td>
              </tr>
            </>
          );
        })}
      </table>
      <table>
        <tr>
          <th>Dr - Account Name</th>
          <th>Voucher Number</th>
          <th>Transfer Amount</th>
          <th>Cash Amount</th>
        </tr>
        {drData?.map((accountGroup) => {
          return (
            <>
              <tr>
                <td colSpan={4} className="accountNameCell">
                  {accountGroup.accountName}
                </td>
              </tr>
              {accountGroup.entries.map((entry) => (
                <tr>
                  <td>{entry.details}</td>
                  <td>{entry.voucherNumber}</td>
                  <td>
                    {accountGroup.accountName !== "Cash A/C"
                      ? entry.amount
                      : "—"}
                  </td>
                  <td>
                    {accountGroup.accountName === "Cash A/C"
                      ? entry.amount
                      : "—"}
                  </td>
                </tr>
              ))}
              <tr className="totalCell">
                <td colSpan={4} style={{ fontWeight: "bold" }}>
                  Total:{" "}
                  {accountGroup.entries.reduce((acc, entry) => {
                    return acc + entry.amount;
                  }, 0)}
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </Box>
  );
};

export default DailyRecord;
