import * as React from "react";
import { Box, Typography } from "@mui/material";
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

export const DailyBook = () => {
     let [value, setValue] = React.useState({
       start: '',
       end:''
     });
  return (
    <Box sx={{ display: "flex", width: "100%" }} mt={3}>
      <Typography fontWeight={700} fontSize={24}>
        Daily Book
      </Typography>
          <DateRangePicker
              
        // label="Date range (controlled)"
        value={value}
        onChange={setValue}
      />
      <DateRangePicker>
        <Label>Trip dates</Label>
        <Group>
          <DateInput slot="start">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <span aria-hidden="true">–</span>
          <DateInput slot="end">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <Button>▼</Button>
        </Group>
        <Popover>
          <Dialog>
            <RangeCalendar>
              <header>
                <Button slot="previous">◀</Button>
                <Heading />
                <Button slot="next">▶</Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date} />}
              </CalendarGrid>
            </RangeCalendar>
          </Dialog>
        </Popover>
      </DateRangePicker>
    </Box>
  );
};
