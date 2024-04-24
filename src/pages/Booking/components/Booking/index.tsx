import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import {
  fetchQrCodeLink,
  pollSessions,
} from "../../../../api/polyon/polygonService";
import CircularProgress from "@mui/material/CircularProgress";

interface MyQrCodeProps {
  // setSessionId: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyQrCode({ setUserId }: MyQrCodeProps) {
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
    }, 10000);
  }, []);

  useEffect(() => {
    if (sessionId) {
      const fetchUser = async () => {
        try {
          const userResponse = await pollSessions(sessionId);

          setUserId(userResponse.connection.userID);
          clearInterval(pollUser);
        } catch (error) {
          console.log(error);
        }
      };

      const pollUser = setInterval(async () => {
        fetchUser();
      }, 5000);
    }
  }, [sessionId, setUserId]);

  return (
    <>
      {qrCodeLink ? (
        <QRCode value={qrCodeLink}></QRCode>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
}
