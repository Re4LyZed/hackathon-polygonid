export interface BookHotelRequest {
  id: string;
  hotel: {
    name: string;
    hotelId: string;
    checkIn: string;
    checkOut: string;
    roomCode: string;
  };
}

export interface PolygonIdMetadata<TData extends object> {
  credentialSchema: "ipfs://QmNfMjBi7sci5QUbntS6i4fu2FLam7wT72vQCcgas5eqeh";
  type: "hotelCredential";
  credentialSubject: TData;
  expiration: "";
  signatureProof: true;
  mtProof: false;
}

export const initBookHotel: PolygonIdMetadata<BookHotelRequest> = {
  credentialSchema: "ipfs://QmNfMjBi7sci5QUbntS6i4fu2FLam7wT72vQCcgas5eqeh",
  type: "hotelCredential",
  credentialSubject: {
    id: "",
    hotel: {
      name: "",
      hotelId: "",
      checkIn: "",
      checkOut: "",
      roomCode: "",
    },
  },
  expiration: "",
  signatureProof: true,
  mtProof: false,
};
