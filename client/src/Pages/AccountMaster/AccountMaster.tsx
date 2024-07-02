import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { AccountMasterDialog } from "./componets/AccountMasterDialog";
import AccountMasterGrid from "./componets/AccountMasterGrid";

export const AccountMaster = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex" }} mt={3}>
        <Typography fontWeight={700} fontSize={24} textAlign={"center"}>
          Account Master
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: "auto", textTransform: "initial" }}
          onClick={() => setOpen(true)}
        >
          Create Account
        </Button>
      </Box>
      <AccountMasterGrid />
      {open && <AccountMasterDialog open={open} setOpen={setOpen} />}
    </Box>
  );
};
