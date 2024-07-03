import { ExchangeRatesData, ParamsType } from "@/types/ExchangeRate";
import axios from "axios";

const endpoint = "/apps/backend/exchange-rate/exchange-rate-page";

export async function makeGetRequest(
  params: ParamsType
): Promise<ExchangeRatesData> {
  //console.log("Sending request to: ", endpoint);
  return axios
    .get(endpoint, { params })
    .then((response) => {
      return response.data as ExchangeRatesData;
    })
    .catch((error) => {
      throw new Error("Failed to fetch request:" + error);
    });
}
