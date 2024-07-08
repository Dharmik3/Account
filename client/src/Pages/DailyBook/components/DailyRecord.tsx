import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetDateFormatted } from "../../../utils/useGetDateFormatted";
import { useDailyBookRecord } from "../../../hooks/useGetDailyBookRecord";

interface DailyRecordType {
  currentDate: Date;
}

const DailyRecord = (props: DailyRecordType) => {
  const { currentDate } = props;
  const date = useGetDateFormatted(currentDate);
  const { data: getDailyBookRecord, isFetching } = useDailyBookRecord(date);
  return isFetching ? (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" ,height:100}}
    >
      <CircularProgress thickness={5} variant="indeterminate" size={56} />
    </Box>
  ) : (
    <Box>Data is ready...</Box>
  );
};

export default DailyRecord;
