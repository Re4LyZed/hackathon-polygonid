// import { Dayjs } from "dayjs";

export interface BookHotelRequest {
  id: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  supplierNumber: number;
  supplierProductNumber: number;
  supplierProductType: string;
}

export interface PolygonIdMetadata<TData extends object> {
  credentialSchema: string;
  type: "hotelCredential";
  credentialSubject: TData;
  expiration: string;
  signatureProof: true;
  mtProof: false;
}

export const initBookHotel: PolygonIdMetadata<BookHotelRequest> = {
  credentialSchema: "ipfs://QmeVbbyKXgFtFgfrWuocuEXzYLzacdKDeb2J3xs4XYjDhX",
  type: "hotelCredential",

  credentialSubject: {
    id: "",
    hotelName: "",
    checkIn: "",
    checkOut: "",
    supplierNumber: 0,
    supplierProductNumber: 0,
    supplierProductType: "",
  },

  expiration: "",
  signatureProof: true,
  mtProof: false,
};
