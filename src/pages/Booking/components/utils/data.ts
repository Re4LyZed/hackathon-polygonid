import { BookHotelRequest, PolygonIdMetadata } from "./interfaces";

interface QrCodeResponse {
  qrCodeLink: string;
  sessionID: string;
}

export async function fetchQrCodeLink(): Promise<QrCodeResponse> {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `http://localhost:3002/v1/authentication/qrcode`,
    fetchOptions
  );

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<QrCodeResponse>;
}

interface PollSessions {
  connection: {
    id: string;
    userID: string;
    issuerID: string;
    createdAt: string;
    modifiedAt: string;
  };
}

export async function pollSessions(sessionId: string): Promise<PollSessions> {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Basic dXNlci1hcGk6cGFzc3dvcmQtYXBp",
    },
  };

  const response = await fetch(
    `http://localhost:3002/v1/authentication/sessions/${sessionId}`,
    fetchOptions
  );

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<PollSessions>;
}

interface BookHotelProps {
  data: PolygonIdMetadata<BookHotelRequest>;
}

interface BookHotelResponse {}

export async function bookHotel({
  data,
}: BookHotelProps): Promise<BookHotelResponse> {
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

  return response.json() as Promise<BookHotelResponse>;
}

export async function searchHotel({
  data,
}: BookHotelProps): Promise<BookHotelResponse> {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Basic dXNlci1hcGk6cGFzc3dvcmQtYXBp",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`http://localhost:9191/`, fetchOptions);

  if (response.status >= 400) {
    console.log(response.json());
    throw new Error(`[RESPONSE CODE] ${response.status}`);
  }

  return response.json() as Promise<BookHotelResponse>;
}
