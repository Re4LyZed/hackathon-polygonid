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
      authorization: "Basic dXNlci1hcGk6cGFzc3dvcmQtYXBp",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `http://localhost:3002/v1/credentials`,
    fetchOptions
  );

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<VerifyCredentialResponse>;
}
