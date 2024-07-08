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
    <Box>
      <table>
        <tr>
          <th>Cr - Account Name</th>
          <th>Receipt Number</th>
          <th>Transfer Amount</th>
          <th>Cash Amount</th>
          <th>Dr - Account Name</th>
          <th>Voucher Number</th>
          <th>Cash Amount</th>
          <th>Transfer Amount</th>
        </tr>
        <tr>
          <td colSpan={4}>Account Name njknkjnkjn</td>
        </tr>
        <tr>
          <td>desriptio</td>
          <td>321</td>
          <td>-</td>
          <td>563</td>
          <td>descrip</td>
          <td>321</td>
          <td>-</td>
          <td>563</td>
        </tr>
      </table>
    </Box>
  );
};

export default DailyRecord;
