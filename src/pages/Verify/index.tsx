import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import ValidatePassport from "./components/ValidatePassport";
import ValidateBooking from "./components/ValidateBooking";

type BookingType = "booking" | "passport";

export default function Verify() {
  const navigate = useNavigate();

  const [verifyType, setVerifyType] = useState<BookingType>("booking");

  return (
    <Box width="100vw" height="100vh">
      <Toolbar sx={{ width: "100%", height: "10%" }}>
        <Grid
          container
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              variant="h4"
              component="h4"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              ALREADY LEFT
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              sx={{ width: 300 }}
              select
              value={verifyType}
              onChange={(e) => setVerifyType(e.target.value as BookingType)}
            >
              <MenuItem value="booking">Booking</MenuItem>

              <MenuItem value="passport">Passport</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="90%"
        direction="column"
      >
        <Grid item>
          <Box p={4} borderRadius={3} height={300}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Grid item>
                {verifyType === "passport" ? (
                  <ValidatePassport />
                ) : (
                  <ValidateBooking />
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
