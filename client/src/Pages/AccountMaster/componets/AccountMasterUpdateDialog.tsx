import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { accountType } from "../../../constants/account";
import {
  BalanceType,
  CreateMasterAccountPayload,
  GetAccountMasterResponse,
  UpdateAccountPayload,
} from "../../../models";
import { useCreateAccountMaster } from "../../../hooks/useCreateAccountMaster";
import { useUpdateAccountMaster } from "../../../hooks/useUpdateAccountMaster";
import { useGetAccountMaster } from "../../../hooks/useGetAccountMaster";

interface AccountMasterUpdateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: GetAccountMasterResponse;
}

interface InputType {
  accountName: string;
  accountType: string;
  openingBalance: number | null;
  balanceType: BalanceType;
}

export const AccountMasterUpdateDialog = (
  props: AccountMasterUpdateDialogProps
) => {
  const { open, setOpen, data } = props;
  const { refetch } = useGetAccountMaster();
  const onSuccess = () => {
    refetch();
    setOpen(false);
  };

  const { mutate: updateAccount, isSuccess } =
    useUpdateAccountMaster(onSuccess);
  const [initialData, setInitialData] = React.useState<InputType>({
    accountName: "",
    accountType: "cash",
    openingBalance: null,
    balanceType: "cr",
  });
  const [input, setInput] = React.useState<InputType>({
    accountName: "",
    accountType: "cash",
    openingBalance: null,
    balanceType: "cr",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validation = React.useMemo(() => {
    return Boolean(input.accountName && input.accountType && input.balanceType);
  }, [input]);

  const handleUpdate = async () => {
    const updatedFields: Partial<InputType> = {};
    Object.keys(input).forEach((key) => {
      if (
        input[key as keyof InputType] !== initialData[key as keyof InputType]
      ) {
        updatedFields[key as keyof InputType] = input[key as keyof InputType];
      }
    });

    // Include the ID in the payload if needed by the API
    const payload = { id: data._id, ...updatedFields };
    updateAccount(payload as UpdateAccountPayload);
  };
  <Snackbar
    open={isSuccess}
    autoHideDuration={2000}
    message="Account Created Successfully"
  />;
  React.useEffect(() => {
    const initialData = {
      accountName: data.accountName,
      accountType: data.accountType,
      openingBalance: data.openingBalance || null,
      balanceType: data.balanceType,
    };
    setInitialData(initialData);
    setInput({
      accountName: data.accountName,
      accountType: data.accountType,
      openingBalance: data.openingBalance || null,
      balanceType: data.balanceType,
    });
  }, []);
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Account Master
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <Typography fontSize={14} component={"span"} color={"GrayText"}>
              Account Name
            </Typography>
            <TextField
              name="accountName"
              size="small"
              variant="outlined"
              placeholder="Enter Account Name"
              onChange={handleChange}
              value={input.accountName}
              required
              sx={{ display: "block", mb: 3, textOverflow: "ellipsis" }}
              InputProps={{
                style: { width: 250 },
              }}
            />
          </Box>

          <Box>
            <Typography fontSize={14} component={"span"} color={"GrayText"}>
              Account Type
            </Typography>
            <TextField
              name="accountType"
              select
              onChange={handleChange}
              value={input.accountType}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 6,
              mb: 3,
            }}
          >
            <Box>
              <Typography fontSize={14} component={"span"} color={"GrayText"}>
                Opening Balance (optional)
              </Typography>
              <TextField
                name="openingBalance"
                size="small"
                onChange={handleChange}
                value={input.openingBalance}
                type="number"
                variant="outlined"
                placeholder="Enter Opening Balance"
                InputProps={{
                  style: { width: 250 },
                }}
              />
            </Box>
            <Box>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            color="inherit"
            sx={{ textTransform: "initial" }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleUpdate}
            variant="contained"
            sx={{ textTransform: "initial" }}
            disabled={!Boolean(validation)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
