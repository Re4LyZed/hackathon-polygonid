import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";

export default function Booking() {
  const [sessionId, setSessionId] = useState<string>("");

  return (
    <Box sx={{ height: "100vh", width: "100vh" }}>
      <Toolbar sx={{ width: "100%" }}>
        <Grid container width="100%">
          <Grid item>
            <Typography variant="h1" component="h1">
              LEAVING EARLY
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <QRCode value="scan me daddy"></QRCode>
        </Grid>
      </Grid>
    </Box>
  );
}
