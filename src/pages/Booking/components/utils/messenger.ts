import { AccommodationSearchServiceClient } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_grpc_web_pb";
import { AccommodationSearchRequest } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_pb";
import { SearchParameters } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/search_pb";
import { Language } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/language_pb";
import {
  Filter,
  FilterType,
} from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/filter_pb";

import { AccommodationSearchServicePromiseClient } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_grpc_web_pb";
import { AccommodationSearchQuery } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_query_types_pb";
import { TravelPeriod } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/travel_period_pb";
import { AccommodationSearchParameters } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_parameters_types_pb";
import { Date as ProtoBufDate } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/date_pb";
import { ProductCode } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/product_code_pb";
import {
  BasicTraveller,
  TravellerType,
} from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/traveller_pb";

export enum Supplier {
  AVRA = "t-kopernikus14e2psc7uxz83fhrmfh52aynfh96vaacq2s92u0",
  MTS = "t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2",
}

export class CaminoMessengerService {

  public accomodationSearch({
    startDate,
    endDate,
    supplier,
  }: {
    startDate: string;
    endDate: string;
    supplier: string;
  }) {

    // check the supplier code
    if (supplier === Supplier.AVRA)
      return requestAvra({ startDate, endDate });
    else
      return requestMts({ startDate, endDate });

  }
}

export function requestAvra({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return new Promise((resolve, reject) => {
    const supplier = Supplier.AVRA;

    const accommodationService = new AccommodationSearchServiceClient("https://cm-distributor.camino.network/");
    const acommodationSearch = new AccommodationSearchRequest();

    const searchParams = new SearchParameters();
    const filters = new Filter();
    filters.setFilterCode("GT03-AVAILABILITY");
    filters.setFilterType(FilterType.FILTER_TYPE_GLOBAL_TYPE);
    filters.setFilterValue(
      `ST01-START-DATE=${startDate};ST02-END-DATE=${endDate}`
    );
    filters.setFilterDescription("ea");

    searchParams.setFiltersList([filters]);
    searchParams.setIncludeCombinations(true);
    searchParams.setIncludeOnRequest(false);
    searchParams.setLanguage(Language.LANGUAGE_EN);
    searchParams.setMaxOptions(3);

    acommodationSearch.setSearchParametersGeneric(searchParams);

    accommodationService.accommodationSearch(
      acommodationSearch,
      {
        recipient: `@${supplier}:matrix.camino.network`,
      },
      (err, response) => {
        console.log("Accommodation-Response: ", response);
        console.log("Accommodation-Error: ", err);

        if (err) return reject(err);

        const responseJSON = response.toObject();
        console.log("Accommodation-Response-JSON: ", responseJSON);
        return resolve(responseJSON);
      }
    );
  });
}

function date(givenDate: string | Date): ProtoBufDate {
  const protoBufDate = new ProtoBufDate();
  const date = new Date(givenDate);

  protoBufDate.setDay(date.getUTCDate());
  protoBufDate.setMonth(date.getUTCMonth() + 1);
  protoBufDate.setYear(date.getUTCFullYear());

  return protoBufDate;
}

export function requestMts({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return new Promise((resolve, reject) => {
    const accService = new AccommodationSearchServiceClient("https://cm-distributor.camino.network/");
    const accRequest = new AccommodationSearchRequest();

    const accommodationSearchQuery = new AccommodationSearchQuery();
    const accommodationSearchParameters = new AccommodationSearchParameters();

    const productCode = new ProductCode();
    productCode.setCode("AMTSES0SHW");
    productCode.setType(0);

    accommodationSearchParameters.setProductCodesList([productCode]);

    const travelPeriod = new TravelPeriod();
    travelPeriod.setStartDate(date(startDate));
    travelPeriod.setEndDate(date(endDate));

    const traveller = new BasicTraveller();

    traveller.setType(TravellerType.TRAVELLER_TYPE_ADULT);
    traveller.setBirthdate(date("1980-10-10"));

    accommodationSearchQuery.addTravellers(traveller);
    accommodationSearchQuery.addTravellers(traveller);

    accommodationSearchQuery.setTravelPeriod(travelPeriod);
    accommodationSearchQuery.setSearchParametersAccommodation(
      accommodationSearchParameters
    );

    const metadata = {
      recipient: `@t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2:matrix.camino.network`,
    };

    accRequest.addQueries(accommodationSearchQuery);

    return accService.accommodationSearch(accRequest, metadata, (err, response) => {
      console.log("Accommodation-Response: ", response);
      console.log("Accommodation-Error: ", err);

      if (err) return reject(err);

      const responseJSON = response.toObject();
      console.log("Accommodation-Response-JSON: ", responseJSON);
      return resolve(responseJSON);
    });
  });
}
