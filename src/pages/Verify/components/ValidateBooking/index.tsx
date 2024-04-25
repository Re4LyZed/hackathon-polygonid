import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSnackbar } from "notistack";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { initBookingVerify, ValidationResponse } from "../../utils/utils";
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
    ValidationResponse | undefined
  >();

  useEffect(() => {
    let pollUser: ReturnType<typeof setInterval>;

    if (sessionId) {
      pollUser = setInterval(async () => {
        try {
          const response = await pollStatus<ValidationResponse>(sessionId);

          if (response.status != "pending") {
            setSessionResponse(response);
            clearInterval(pollUser);
          }
        } catch (error) {
          console.log(error);
        }
      }, 5000);
    }

    return () => {
      clearInterval(pollUser);
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
      width="100%"
    >
      {!sessionResponse ? (
        <Grid
          item
          container
          p={4}
          sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
        >
          {qrCodeLink ? (
            <Grid item>
              <QRCode value={qrCodeLink} eyeRadius={5} qrStyle="dots"></QRCode>
            </Grid>
          ) : (
            <>
              <Grid item>
                <CircularProgress color="secondary" size={150} />
              </Grid>
            </>
          )}
        </Grid>
      ) : (
        <Grid
          item
          container
          direction="column"
          p={4}
          sx={{
            border: `solid 1px ${
              sessionResponse.status === "success" ? "green" : "red"
            }`,
            borderRadius: 3,

            width: 600,
          }}
        >
          <Grid item>
            <Alert color="success">Credential Verified</Alert>
          </Grid>
          <Grid item>
            <Typography variant="h6" paddingLeft={2}>
              Welcome
            </Typography>
          </Grid>{" "}
          <Grid item>
            <Typography variant="h4" paddingLeft={2}>
              {`
                ${sessionResponse.jwzMetadata.verifiablePresentations[0].credentialSubject.GivenNames} ${sessionResponse.jwzMetadata.verifiablePresentations[1].credentialSubject.Surname}
              `}
            </Typography>
          </Grid>
          <Grid item>{<Typography variant="h4">{}</Typography>}</Grid>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  setQrCodeLink("");
                  setSessionId("");
                  setSessionResponse(undefined);
                  fetchQrCodeUrl();
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
