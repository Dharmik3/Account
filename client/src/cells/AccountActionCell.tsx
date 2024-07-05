import * as React from "react";
import { Box, IconButton } from "@mui/material";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { AccountMasterUpdateDialog } from "../Pages/AccountMaster/componets/AccountMasterUpdateDialog";
import { AccountMasterDeleteDialog } from "../Pages/AccountMaster/componets";

export interface AccoutnActionCellType {
  data: any;
}

export const AccountActionCell = (props: AccoutnActionCellType) => {
  const { data } = props;

  const [open, setOpen] = React.useState(false);
  const [openDeletDialog, setOpenDeleteDialog] = React.useState(false);
  if (data.accountName === "Cash A/C") return "—";
  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}>
        <EditRounded color="primary" />
      </IconButton>
      <IconButton onClick={() => setOpenDeleteDialog(true)}>
        <DeleteRounded color="error" />
      </IconButton>
      <AccountMasterUpdateDialog open={open} setOpen={setOpen} data={data} />
      <AccountMasterDeleteDialog
        open={openDeletDialog}
        setOpen={setOpenDeleteDialog}
        data={data}
      />
    </Box>
  );
};
