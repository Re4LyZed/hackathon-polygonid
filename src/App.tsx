import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";

import Booking from "./pages/Booking";
import Verify from "./pages/Verify";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Booking />} />
              <Route path="/verify" element={<Verify />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
