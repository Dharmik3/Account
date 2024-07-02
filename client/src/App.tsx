import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, JournalEntry, AccountMaster } from "./Pages";
import { Navbar } from "./components";
import { queryClient } from "./cache";
import { Container } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

export const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account-master" element={<AccountMaster />} />
              <Route path="/journal-entry" element={<JournalEntry />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
