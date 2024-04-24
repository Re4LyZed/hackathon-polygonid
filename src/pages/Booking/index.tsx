import { useState } from "react";

import { Box, Grid, Toolbar, Typography } from "@mui/material";
import MyQrCode from "./components/Booking";

export default function Booking() {
  const [sessionId, setSessionId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <Box sx={{ height: "100vh", width: "100vh" }}>
      <Toolbar sx={{ width: "100%" }}>
        <Grid container width="100%">
          <Grid item>
            <Typography variant="h2" component="h2">
              LEAVING EARLY
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid container justifyContent="center" alignItems="center" height="100%">
        <Grid item>
          {!userId ? <MyQrCode setUserId={setUserId} /> : <>helo</>}
        </Grid>
      </Grid>
    </Box>
  );
}
