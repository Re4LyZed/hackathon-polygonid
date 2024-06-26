import { useState } from "react";

import { Box, Grid, Toolbar, Typography } from "@mui/material";
import AuthenticateUser from "./components/AuthenticateUser";
import BookHotel from "./components/BookHotel";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>("");

  return (
    <Box width="100vw" minHeight="100vh" padding={0}>
      <Toolbar sx={{ width: "100%", height: "10%" }}>
        <Grid container width="100%">
          <Grid item>
            <Typography
              variant="h4"
              component="h4"
              onClick={() => navigate("/verify")}
              sx={{ cursor: "pointer" }}
            >
              LEAVING EARLY
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

      {!userId ? (
        <AuthenticateUser setUserId={setUserId} />
      ) : (
        <BookHotel userId={userId} setUserId={setUserId} />
      )}
    </Box>
  );
}
