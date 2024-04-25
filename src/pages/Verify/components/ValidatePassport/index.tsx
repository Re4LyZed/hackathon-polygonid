import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSnackbar } from "notistack";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import { initPassportVerify } from "../../utils/utils";
import { VerifyCredential } from "../../utils/data";

export default function ValidatePassport() {
  const { enqueueSnackbar } = useSnackbar();

  const [qrCodeLink, setQrCodeLink] = useState<string>("");

  const fetchQrCodeUrl = async () => {
    try {
      const response = await VerifyCredential(initPassportVerify);

      setQrCodeLink(response.qrCode);
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchQrCodeUrl();
  }, []);

  return (
    <Grid
      container
      gap={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {qrCodeLink ? (
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
      )}
    </Grid>
  );
}
