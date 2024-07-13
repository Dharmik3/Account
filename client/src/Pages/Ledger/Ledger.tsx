import {
  ArrowBackIosNewOutlined,
  ArrowForwardIos,
  DateRange,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  OutlinedInput,
  Theme,
  useTheme,
} from "@mui/material";
import React from "react";
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
import { useGetAccountsName } from "../../hooks/useGetAccountsName";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, accountName: string[], theme: Theme) {
  return {
    fontWeight:
      accountName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Ledger = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState<Date>();
  const { data: getAccountsName } = useGetAccountsName();

  const accountsName = React.useMemo(() => {
    return getAccountsName?.pages[0]?.data?.map((elm) => elm?.accountName);
  }, [getAccountsName]);
  const [account, setAccount] = React.useState<string[]>([]);

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

  const handleChange = (e: SelectChangeEvent<typeof account>) => {
    const {
      target: { value },
    } = e;
    setAccount(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
    if (accountsName?.length) setAccount(accountsName as string[]);
  }, [accountsName]);

  return (
    <>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
        mt={3}
      >
        <Typography fontWeight={700} fontSize={24}>
          Ledger
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box minWidth={200}>
            <FormControl sx={{ width: 250 }} size="small">
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account}
                onChange={handleChange}
                input={<OutlinedInput label="Account" />}
                MenuProps={MenuProps}
              >
                {accountsName?.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option}
                    style={getStyles(option, account, theme)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
        </>
      )}
    </>
  );
};
