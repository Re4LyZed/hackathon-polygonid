import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { fetchQrCodeLink, pollSessions } from "../utils/data";
import Grid from "@mui/material/Grid";

interface AuthenticateUserProps {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export default function AuthenticateUser({ setUserId }: AuthenticateUserProps) {
  const [qrCodeLink, setQrCodeLink] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  const fetchSession = async () => {
    try {
      const { sessionID, qrCodeLink } = await fetchQrCodeLink();

      setSessionId(sessionID);
      setQrCodeLink(qrCodeLink);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSession();
    }, 1000);
  }, []);

  useEffect(() => {
    let pollUser: ReturnType<typeof setInterval>;

    if (sessionId) {
      pollUser = setInterval(async () => {
        try {
          const userResponse = await pollSessions(sessionId);

          if (userResponse.connection.userID) {
            setUserId(userResponse.connection.userID);
            clearInterval(pollUser); // Clear the interval
          }
        } catch (error) {
          console.log(error);
        }
      }, 5000);
    }

    return () => {
      clearInterval(pollUser); // Clean up the interval on component unmount
    };
  }, [sessionId, setUserId]);

  return (
    <Grid
      direction="column"
      container
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
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
        </Box>
      </Grid>
    </Grid>
  );
}
