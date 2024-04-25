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

interface TravelPeriod {
  year: number;
  month: number;
  day: number;
}

interface ProductTravelPeriod {
  startDate: TravelPeriod;
  endDate: TravelPeriod;
  flexible: boolean;
  losFromNights: number;
  losToNights: number;
  dow: {
    dow: number;
  };
}

export interface Product {
  resultId: number;
  queryId: number;
  unitsList: {
    type: number;
    supplierRoomCode: string;
    supplierRoomName: string;
    originalRoomName: string;
    travelPeriod: ProductTravelPeriod;
    travellerIdsList: [];
    bedsList: [];
    servicesList: [];
    cancelPoliciesList: [];
    remainingUnits: number;
    remarks: string;
  }[];

  rateRulesList: [];
  remarks: "";
}

export const initproduct: Product[] = [
  {
    resultId: 0,
    queryId: 0,
    unitsList: [
      {
        type: 1,
        supplierRoomCode: "342138",
        supplierRoomName: "Twin / Double Room",
        originalRoomName: "",
        travelPeriod: {
          startDate: {
            year: 124,
            month: 10,
            day: 1,
          },
          endDate: {
            year: 124,
            month: 10,
            day: 1,
          },
          flexible: false,
          losFromNights: 7,
          losToNights: 7,
          dow: {
            dow: 1,
          },
        },
        travellerIdsList: [],
        bedsList: [],
        servicesList: [],
        cancelPoliciesList: [],
        remainingUnits: 0,
        remarks: "",
      },
    ],
    rateRulesList: [],
    remarks: "",
  },
  {
    resultId: 0,
    queryId: 0,
    unitsList: [
      {
        type: 1,
        supplierRoomCode: "342138",
        supplierRoomName: "King",
        originalRoomName: "",
        travelPeriod: {
          startDate: {
            year: 124,
            month: 10,
            day: 1,
          },
          endDate: {
            year: 124,
            month: 10,
            day: 1,
          },
          flexible: false,
          losFromNights: 7,
          losToNights: 7,
          dow: {
            dow: 1,
          },
        },
        travellerIdsList: [],
        bedsList: [],
        servicesList: [],
        cancelPoliciesList: [],
        remainingUnits: 0,
        remarks: "",
      },
    ],
    rateRulesList: [],
    remarks: "",
  },
];
