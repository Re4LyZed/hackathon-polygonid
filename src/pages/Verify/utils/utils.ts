export interface BookingVerifyScope {
  circuitID: string;
  id: number;
  query: {
    context: string;
    allowedIssuers: ["*"];
    type: string;
    credentialSubject?: { name: object } | { lastName: object };
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
        context: "ipfs://QmdgQkLPYY3MBTq7fYs5hRpc7ccMQpf1W4mwbS86LdUy9z",
        allowedIssuers: ["*"],
        type: "",
      },
    },

    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 2,
      query: {
        context: "ipfs://QmaBJzpoYT2CViDx5ShJiuYLKXizrPEfXo8JqzrXCvG6oc",
        allowedIssuers: ["*"],
        type: "TestInteger01",
        credentialSubject: {
          name: {},
        },
      },
    },

    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 1,
      query: {
        context: "ipfs://QmdgQkLPYY3MBTq7fYs5hRpc7ccMQpf1W4mwbS86LdUy9z",
        allowedIssuers: ["*"],
        type: "",
      },
    },

    {
      circuitID: "credentialAtomicQueryV3-beta.1",
      id: 2,
      query: {
        context: "ipfs://QmaBJzpoYT2CViDx5ShJiuYLKXizrPEfXo8JqzrXCvG6oc",
        allowedIssuers: ["*"],
        type: "TestInteger01",
        credentialSubject: {
          lastName: {},
        },
      },
    },
  ],
};
