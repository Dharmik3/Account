import React from "react";
import { Box, Typography } from "@mui/material";
import { JournalEntryForm } from "./components/JournalEntryForm";

export const JournalEntry = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        mt={3}
      >
        <Typography fontWeight={700} fontSize={24} textAlign={"center"}>
          Create Journal
        </Typography>

        <JournalEntryForm />
      </Box>
    </Box>
  );
};
