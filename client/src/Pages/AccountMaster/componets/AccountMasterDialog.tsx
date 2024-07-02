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
import { BalanceType, CreateMasterAccountPayload } from "../../../models";
import { useCreateAccountMaster } from "../../../hooks/useCreateAccountMaster";
import { useGetAccountMaster } from "../../../hooks/useGetAccountMaster";

interface AccountMasterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputType {
  accountName: string;
  accountType: string;
  openingBalance: number | null;
  balanceType: BalanceType;
}

export const AccountMasterDialog = (props: AccountMasterDialogProps) => {
  const { open, setOpen } = props;
  const { refetch: refetchAccountMasterList } = useGetAccountMaster();
  const onSuccess = () => {
    setOpen(false);
    refetchAccountMasterList();
  };
  const onError = () => {
    console.log("error");
  };
  const { mutate: createAccount, isSuccess } = useCreateAccountMaster(
    onSuccess,
    onError
  );
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

  const handleCreate = async () => {
    createAccount(input as CreateMasterAccountPayload);
    // createAccountMaster(input as CreateMasterAccountPayload);
  };
  <Snackbar
    open={isSuccess}
    autoHideDuration={2000}
    message="Account Created Successfully"
  />;

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
            onClick={handleCreate}
            variant="contained"
            sx={{ textTransform: "initial" }}
            disabled={!Boolean(validation)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
