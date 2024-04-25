export interface BookingVerifyScope {
  circuitID: string;
  id: number;
  query: {
    context: string;
    allowedIssuers: ["*"];
    type: string;
    credentialSubject?: object;
  };
}

export interface BookingVerify {
  chainID: "501";
  skipClaimRevocationCheck: false;
  scope: BookingVerifyScope[];
}

export const initBookingVerify: BookingVerify = {
  chainID: "501",
  skipClaimRevocationCheck: false,
  scope: [
    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 1,
      query: {
        context: "ipfs://QmaJ6bNRJUX2KU2W2QNXVqBSPUtGFn7tFayVvBTEHUsiHD",
        allowedIssuers: ["*"],
        type: "ZKKYC",
        credentialSubject: {
          GivenNames: {},
        },
      },
    },
    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 2,
      query: {
        context: "ipfs://QmaJ6bNRJUX2KU2W2QNXVqBSPUtGFn7tFayVvBTEHUsiHD",
        allowedIssuers: ["*"],
        type: "ZKKYC",
        credentialSubject: {
          Surname: {},
        },
      },
    },
    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 3,
      query: {
        context: "ipfs://QmVvhgzGw6ZNz6RXmzPVnU2Zpee2T7mT6jzLWH8Fqa8npp",
        allowedIssuers: ["*"],
        type: "hotelCredential",
        credentialSubject: {
          supplierNumber: {
            $ne: 0,
          },
        },
      },
    },
  ],
};

export const initPassportVerify: BookingVerify = {
  chainID: "501",
  skipClaimRevocationCheck: false,
  scope: [
    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 1,
      query: {
        context: "ipfs://QmaJ6bNRJUX2KU2W2QNXVqBSPUtGFn7tFayVvBTEHUsiHD",
        allowedIssuers: ["*"],
        type: "ZKKYC",
        credentialSubject: {
          GivenNames: {
            $ne: "empty",
          },
        },
      },
    },
  ],
};

interface validationResponseverifiablePresentations {
  credentialSubject: {
    "@type": string;
    GivenNames: string;
    Surname: string;
  };
  proofType: string;
  schemaContext: [string, string];
  schemaType: string[];
}

export interface ValidationResponse {
  jwz: string;
  jwzMetadata: {
    userDID: "did:polygonid:camino:columbus:3DrCnqwfiacV2DKk7EmAV4X4FQcp3twcUykQh1UrSB";
    verifiablePresentations: validationResponseverifiablePresentations[];
  };

  status: "success" | "error" | "pending";
}
