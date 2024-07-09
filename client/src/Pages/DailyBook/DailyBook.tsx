import * as React from "react";
import {
  Box,
  Typography,
  Button as MaterialUIButton,
  IconButton,
} from "@mui/material";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIos,
  DateRange,
} from "@mui/icons-material";
import "./styles.scss";
import { useDailyBookRecord } from "../../hooks/useGetDailyBookRecord";
import DailyRecord from "./components/DailyRecord";

export const DailyBook = () => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState<Date>();

  const decreaseDateByOneDay = () => {
    if (currentDate) {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      const start = new Date(startDate);
      if (newDate >= start) {
        setCurrentDate(newDate);
      }
    }
  };
  const increaseDateByOneDay = () => {
    if (currentDate) {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      const end = new Date(endDate);
      if (newDate <= end) {
        setCurrentDate(newDate);
      }
    }
  };
  return (
    <>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
        mt={3}
      >
        <Typography fontWeight={700} fontSize={24}>
          Daily Book
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <DateRangePicker
            className="DateRangePicker"
            onChange={(e) => {
              const { start, end } = e;
              const startDate = `${start.year}-${start.month}-${start.day}`;
              const endDate = `${end.year}-${end.month}-${end.day}`;
              setStartDate(startDate);
              setCurrentDate(new Date(startDate));
              setEndDate(endDate);
            }}
          >
            <Group className="Group">
              <DateInput slot="start" className="DateInput">
                {(segment) => (
                  <DateSegment segment={segment} className="DateSegment" />
                )}
              </DateInput>
              <span aria-hidden="true">–</span>
              <DateInput slot="end" className="DateInput">
                {(segment) => (
                  <DateSegment segment={segment} className="DateSegment" />
                )}
              </DateInput>
              <Button
                style={{
                  marginLeft: 10,
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <DateRange />
              </Button>
            </Group>
            <Popover className="Popover">
              <Dialog className="Dialog">
                <RangeCalendar className="RangeCalendar">
                  <header className="header">
                    <Button slot="previous" className="Button">
                      ◀
                    </Button>
                    <Heading />
                    <Button slot="next" className="Button">
                      ▶
                    </Button>
                  </header>
                  <CalendarGrid className="CalendarGrid">
                    {(date) => (
                      <CalendarCell date={date} className="CalendarCell" />
                    )}
                  </CalendarGrid>
                </RangeCalendar>
              </Dialog>
            </Popover>
          </DateRangePicker>
        </Box>
      </Box>
      {startDate === "" ? (
        <Typography textAlign={"center"} fontSize={28} fontWeight={600} mt={5}>
          Please select the date
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            my={3}
          >
            <IconButton onClick={decreaseDateByOneDay}>
              <ArrowBackIosNewOutlined />
            </IconButton>
            <Typography fontSize={24} fontWeight={600}>
              {currentDate?.toDateString()}
            </Typography>
            <IconButton onClick={increaseDateByOneDay}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
          <DailyRecord currentDate={currentDate as Date} />
        </>
      )}
    </>
  );
};
