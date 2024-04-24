import { useState } from "react";

import { Box, Grid, Toolbar, Typography } from "@mui/material";
import AuthenticateUser from "./components/AuthenticateUser";
import BookHotel from "./components/BookHotel";

export default function Booking() {
  const [userId, setUserId] = useState<string>("");

  return (
    <Box width="100vw" height="100vh">
      <Toolbar sx={{ width: "100%", height: "10%" }}>
        <Grid container width="100%">
          <Grid item>
            <Typography variant="h4" component="h4">
              LEAVING EARLY
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid container justifyContent="center" alignItems="center" height="90%">
        <Grid item>
          {!userId ? (
            <AuthenticateUser setUserId={setUserId} />
          ) : (
            <BookHotel userId={userId} setUserId={setUserId} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
