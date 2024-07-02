import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteAccountMaster } from "../../../hooks/udeDeleteAccountMaster";
import { useGetAccountMaster } from "../../../hooks/useGetAccountMaster";

interface AccountMasterDeleteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

export const AccountMasterDeleteDialog = (
  props: AccountMasterDeleteDialogProps
) => {
  const { open, setOpen, data } = props;
  const { refetch } = useGetAccountMaster();
  const onSuccess = () => {
    refetch();
    setOpen(false);
  };
  const { mutate: deleteAccountMaster } = useDeleteAccountMaster(onSuccess);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteAccountMaster({ id: data?._id });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {data.accountName} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the account {data.accountName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
