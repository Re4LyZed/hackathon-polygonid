import { BookHotelRequest, PolygonIdMetadata } from "./interfaces";

import { AccommodationSearchServicePromiseClient } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_grpc_web_pb";
import { AccommodationSearchRequest } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_pb";
import { AccommodationSearchQuery } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_query_types_pb";
import { TravelPeriod } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/travel_period_pb";
import { AccommodationSearchParameters } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_parameters_types_pb";
import { Date as ProtoBufDate } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/date_pb";
import { ProductCode } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/product_code_pb";
import {
  BasicTraveller,
  TravellerType,
} from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/traveller_pb";

const apiUrl = import.meta.env.POLYGON_API_URL + `/credentials`;
const apiUser = import.meta.env.POLYGON_API_USER;
const apiPassword = import.meta.env.POLYGON_API_PASSWORD;

export async function createCredential(did: string) {
  const basicAuth = "Basic " + btoa(apiUser + ":" + apiPassword);

  const payload = {
    credentialSchema:
      "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
    type: "KYCAgeCredential",
    credentialSubject: {
      id: did,
      birthday: 19960424,
      documentType: 2,
    },
    expiration: "2025-04-24T08:20:18.164Z",
    signatureProof: true,
    mtProof: false,
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuth,
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Request failed:", error);
  }
}

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
