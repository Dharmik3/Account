import * as React from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  Divider,
  Chip,
} from "@mui/material";
import { accountType } from "../../../constants/account";
import { BalanceType } from "../../../models";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface InputType {
  transactionDate: string;
  cashBankAccount: string;
  balanceType: BalanceType;
  receiptNumber?: number;
  voucherNumber?: number;
  transactionDetails: string;
  generalAccount: string;
  amount: number | undefined;
  details: string;
}

export const JournalEntryForm = () => {
  const onSuccess = () => {

  };
  const onError = () => {

  };

  const [input, setInput] = React.useState<InputType>({
    transactionDate: "",
    cashBankAccount: "",
    balanceType: "cr",
    receiptNumber: undefined,
    voucherNumber: undefined,
    transactionDetails: "",
    generalAccount: "",
    amount: undefined,
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const validation = React.useMemo(() => {
    return Boolean(
      input.transactionDate &&
        input.cashBankAccount &&
        input.balanceType &&
        (input.voucherNumber || input.receiptNumber) &&
        input.transactionDetails &&
        input.amount &&
        input.generalAccount &&
        input.details
    );
  }, [input]);

  const handleCreate = async () => {
    // createAccountMaster(input as CreateMasterAccountPayload);
  };
  <Snackbar
    autoHideDuration={2000}
    message="Account Created Successfully"
  />;
  console.log(input);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: 1,
        borderRadius: 4,
        borderColor: "gray",
        alignSelf: "center",
      }}
      my={2}
      p={4}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={14} component={"span"} color={"GrayText"}>
          Transaction Date
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
        >
          <DatePicker
            sx={{ maxWidth: 250, mb: 3 }}
            formatDensity="spacious"
            onChange={(value) => {
              const date = `${value?.year()}-${
                value!?.month() + 1
              }-${value?.date()}`;
              setInput((prev) => ({ ...prev, transactionDate: date }));
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box>
        <Typography fontSize={14} component={"span"} color={"GrayText"}>
          Cash Bank Account
        </Typography>
        <TextField
          name="cashBankAccount"
          select
          onChange={handleChange}
          value={input.cashBankAccount}
          size="small"
          variant="outlined"
          defaultValue="cash"
          required
          sx={{ display: "block", mb: 3 }}
          InputProps={{
            style: { width: 250, maxHeight: 300 },
          }}
        >
          {accountType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 6,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontSize={14} component={"span"} color={"GrayText"}>
            Balance Type
          </Typography>
          <TextField
            name="balanceType"
            onChange={handleChange}
            value={input.balanceType}
            select
            size="small"
            variant="outlined"
            defaultValue={"cr"}
            required
            InputProps={{
              style: { width: 250 },
            }}
          >
            <MenuItem value={"cr"}>Cr</MenuItem>
            <MenuItem value={"dr"}>Dr</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <>
            <Typography fontSize={14} component={"span"} color={"GrayText"}>
              {input.balanceType === "dr" ? "Voucher Number" : "Receipt Number"}
            </Typography>
            <TextField
              name={
                input.balanceType === "dr" ? "voucherNumber" : "receiptNumber"
              }
              size="small"
              onChange={handleChange}
              value={
                input.balanceType === "dr"
                  ? input.voucherNumber
                  : input.receiptNumber
              }
              type="number"
              variant="outlined"
              placeholder={
                input.balanceType === "dr"
                  ? "Enter Voucher Number"
                  : " Enter Receipt Number"
              }
              InputProps={{
                style: { width: 250 },
              }}
            />
          </>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={14} component={"span"} color={"GrayText"}>
          Transaction Details
        </Typography>
        <TextField
          name="transactionDetails"
          size="small"
          onChange={handleChange}
          value={input.transactionDetails}
          variant="outlined"
          placeholder={"Enter Transaction Details"}
          InputProps={{
            style: { width: 250 },
          }}
        />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontSize="18px" fontWeight={"600"}>
          Journal Entry Details
        </Typography>
        <Chip
          label={input.balanceType === "dr" ? "Cr" : "Dr"}
          color="success"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontSize={14} component={"span"} color={"GrayText"}>
            General Account
          </Typography>
          <TextField
            name="generalAccount"
            select
            onChange={handleChange}
            value={input.generalAccount}
            size="small"
            variant="outlined"
            defaultValue="cash"
            required
            sx={{ display: "block", mb: 3 }}
            InputProps={{
              style: { width: 250 },
            }}
          >
            {accountType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontSize={14} component={"span"} color={"GrayText"}>
            Amount
          </Typography>
          <TextField
            name="amount"
            size="small"
            onChange={handleChange}
            value={input.amount}
            type="number"
            variant="outlined"
            placeholder={"Enter Amount"}
            InputProps={{
              style: { width: 250 },
            }}
            sx={{ mb: 3 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={14} component={"span"} color={"GrayText"}>
          Details
        </Typography>
        <TextField
          name="details"
          size="small"
          onChange={handleChange}
          value={input.details}
          variant="outlined"
          placeholder={"Enter Details"}
          InputProps={{
            style: { width: 250 },
          }}
          sx={{ mb: 3 }}
        />
      </Box>

      <Button
        autoFocus
        onClick={handleCreate}
        variant="contained"
        sx={{ textTransform: "initial" }}
        disabled={!Boolean(validation)}
      >
        Create
      </Button>
    </Box>
  );
};
