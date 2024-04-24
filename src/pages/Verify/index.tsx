import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { QRCode } from "react-qrcode-logo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { VerifyCredential } from "./utils/data";
import { initBookingVerify } from "./utils/utils";

type BookingType = "booking" | "passport";

export default function Verify() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [verifyType, setVerifyType] = useState<BookingType>("booking");
  const [qrCodeLink, setQrCodeLink] = useState<string>("");

  const dataFormat = {
    booking: initBookingVerify,
    passport: initBookingVerify,
  };

  const fetchQrCodeUrl = async () => {
    try {
      const response = await VerifyCredential(dataFormat[verifyType]);

      setQrCodeLink(response.qrCode);
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchQrCodeUrl();
  });

  return (
    <Box width="100vw" height="100vh">
      <Toolbar sx={{ width: "100%", height: "10%" }}>
        <Grid container width="100%">
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
        </Grid>
      </Toolbar>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="90%"
        direction="column"
        gap={1}
      >
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
        <Grid item>
          <Box
            p={4}
            borderRadius={3}
            sx={{ backgroundColor: "#ffffff" }}
            height={300}
            width={300}
          >
            <Grid
              container
              gap={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Grid item>
                {qrCodeLink ? (
                  <>
                    <Grid item>
                      <QRCode
                        value={qrCodeLink}
                        eyeRadius={5}
                        qrStyle="dots"
                      ></QRCode>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <CircularProgress color="secondary" size={150} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
