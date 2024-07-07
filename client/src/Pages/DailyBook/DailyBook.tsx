import * as React from "react";
import { Box, Typography, Button as MaterialUIButton } from "@mui/material";
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
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import "./styles.scss";
import { parseDate } from "@internationalized/date";

export const DailyBook = () => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
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
              <Button className="Button" style={{ marginLeft: 10 }}>
                ▼
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
          <MaterialUIButton variant="contained">Get</MaterialUIButton>
        </Box>
      </Box>
    </>
  );
};
