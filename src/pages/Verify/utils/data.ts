import { BookingVerify } from "./utils";

interface VerifyCredentialResponse {
  qrCode: string;
  sessionID: string;
}

export async function VerifyCredential(
  data: BookingVerify
): Promise<VerifyCredentialResponse> {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://verifier-backend.polygonid.me/sign-in`,
    fetchOptions
  );

  console.log("me", response.status);

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<VerifyCredentialResponse>;
}

export async function pollStatus<TData>(sessionId: string) {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `https://verifier-backend.polygonid.me/status?sessionID=${sessionId}`,
    fetchOptions
  );

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<TData>;
}
