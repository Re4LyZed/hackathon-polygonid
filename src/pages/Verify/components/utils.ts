export const initBookingVerify = {
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
        credentialSubject: {
          birthday: {
            $lt: 20201010,
          },
        },
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
        credentialSubject: {
          birthday: {
            $lt: 20201010,
          },
        },
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
          lastname: {},
        },
      },
    },
  ],
};
