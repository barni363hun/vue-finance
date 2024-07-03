import axios from "axios";

const endpoint = "/apps/backend/exchange-rate/exchange-rate-page";
const params = {
  rateType: "mkbk",
  fromDate: "20240529",
  toDate: "20240529",
  from: 0,
  size: 30,
};

export async function makeGetRequest() {
  console.log("Sending request to: ", endpoint);
  // Make the GET request
  axios
    .get(endpoint, { params })
    .then((response) => {
      // Handle the response
      console.log("Response data:", response.data);
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error making the request:", error);
    });
}
