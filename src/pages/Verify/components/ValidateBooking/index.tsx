import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSnackbar } from "notistack";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { initBookingVerify } from "../../utils/utils";
import { pollStatus, VerifyCredential } from "../../utils/data";

export default function ValidateBooking() {
  const { enqueueSnackbar } = useSnackbar();

  const [qrCodeLink, setQrCodeLink] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  const fetchQrCodeUrl = async () => {
    try {
      const response = await VerifyCredential(initBookingVerify);

      setQrCodeLink(response.qrCode);
      setSessionId(response.sessionID);
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchQrCodeUrl();
    }, 1000);
  }, []);

  const [sessionResponse, setSessionResponse] = useState<
    | {
        name: string;
        lastname: string;
        supplierProductNumber: number;
      }
    | undefined
  >();

  useEffect(() => {
    let pollUser: ReturnType<typeof setInterval>;

    if (sessionId) {
      pollUser = setInterval(async () => {
        try {
          const response = await pollStatus(sessionId);

          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }, 5000);
    }

    return () => {
      clearInterval(pollUser); // Clean up the interval on component unmount
    };
  }, [sessionId]);

  return (
    <Grid
      container
      gap={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {!sessionResponse ? (
        qrCodeLink ? (
          <>
            <Grid item>
              <QRCode value={qrCodeLink} eyeRadius={5} qrStyle="dots"></QRCode>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <CircularProgress color="secondary" size={150} />
            </Grid>
          </>
        )
      ) : (
        <>
          <Grid item>
            <Typography>{sessionResponse.name}</Typography>
          </Grid>

          <Grid item>
            <Typography>{sessionResponse.lastname}</Typography>
          </Grid>

          <Grid item>
            <Typography>{sessionResponse.supplierProductNumber}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
