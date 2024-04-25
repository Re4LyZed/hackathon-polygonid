import { AccommodationProductInfoRequest } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/info_pb";
import { AccommodationSearchServiceClient } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_grpc_web_pb";
import { AccommodationProductInfoServiceClient } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/info_grpc_web_pb";
import { SupplierProductCode } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/product_code_pb";
import { AccommodationSearchRequest } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/services/accommodation/v1alpha/search_pb";
import { SearchParameters } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/search_pb";
import { Language } from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/language_pb";
import {
  Filter,
  FilterType,
} from "@buf/chain4travel_camino-messenger-protocol.grpc_web/cmp/types/v1alpha/filter_pb";

export class CaminoMessengerService {
  private readonly HOSTNAME = "https://cm-distributor.camino.network/";
  private readonly METADATA = {
    recipient:
      "@t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2:matrix.camino.network",
  };

  //   public getProductInfo({ recipient }) {
  //     return new Promise((resolve, reject) => {
  //       const productInfoService = new AccommodationProductInfoServiceClient(
  //         this.HOSTNAME
  //       );
  //       const productInfoRequest = new AccommodationProductInfoRequest();

  //       const supplierCode = new SupplierProductCode();
  //       supplierCode.setSupplierCode("495");

  //       productInfoRequest.setSupplierCodesList([supplierCode]);
  //       productInfoService.accommodationProductInfo(
  //         productInfoRequest,
  //         this.METADATA,
  //         (err, response) => {
  //           console.log("ProductInfo-Response: ", response);
  //           console.log("ProductInfo-Error: ", err);

  //           if (err) return reject(err);

  //           // convert respomnse to JSON
  //           const responseJSON = response.toObject();
  //           console.log("ProductInfo-Response-JSON: ", responseJSON);
  //           return resolve(responseJSON);
  //         }
  //       );
  //     });
  //   }

  public accommodationSearch({
    startDate,
    endDate,
    supplier,
  }: {
    startDate: string;
    endDate: string;
    supplier: string;
  }) {
    return new Promise((resolve, reject) => {
      const accommodationService = new AccommodationSearchServiceClient(
        this.HOSTNAME
      );
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

          // convert respomnse to JSON
          const responseJSON = response.toObject();
          console.log("Accommodation-Response-JSON: ", responseJSON);
          return resolve(responseJSON);
        }
      );
    });
  }
}
