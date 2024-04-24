// import { useReducer } from "react";

// interface BookHotelProps {
//   userId: string;
// }

// /* Reducers */
// const ACTIONS_SET_CREDENTIALSUBJECT_ID = 'set-credentialsubject-id' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_NAME = 'set-credential-subject-hotel-name' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ID = 'set-credential-subject-hotel-id' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKIN = 'set-credential-subject-hotel-checkin' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKOUT = 'set-credential-subject-hotel-checkout' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ROOMCODE = 'set-credential-subject-hotel-roomcode' as const;
// const ACTIONS_SET_CREDENTIALSUBJECT_RESET = 'set-reset' as const;

// export type SearchActions =
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_ID;
//       payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_NAME;
//         payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ID;
//         payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKIN;
//        payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKOUT;
//         payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ROOMCODE;
//        payload: string;
//     }
//   | {
//       type: typeof ACTIONS_SET_CREDENTIALSUBJECT_RESET;
//     };

// function reducers(state: , action: SearchActions): AvailabilityRequest {
//   switch (action.type) {
//     case ACTIONS_SET_CREDENTIALSUBJECT_ID:
//       return {...state,  };

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_NAME:
//       return updateTripProperty(state, action, 'destination');

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ID:
//       return updateTripProperty(state, action, 'departure');

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKIN:
//       return updateFilterProperty(state, action, 'maxDuration');

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_CHECKOUT:
//       return updateFilterProperty(state, action, 'departureTime');

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ROOMCODE:
//       return updateFilterProperty(state, action, 'arrivalTime');

//     case ACTIONS_SET_CREDENTIALSUBJECT_HOTEL_ROOMCODE:
//       return updateFilterProperty(state, action, 'origin');

//     case ACTIONS_SET_CREDENTIALSUBJECT_RESET:
//       return updateFilterProperty(state, action, 'destination');

//   }
// }

// export default function BookHotel({ userId }: BookHotelProps) {
//   const [searchState, searchDispatch] = useReducer(reducers, { ...availabilityInit, currency: currencyCode });

//   return ()
// }
