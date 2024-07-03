import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Function to fetch all users using Axios
export function fetchUsers() {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
}

// const SOAP_ENDPOINT = "http://www.mnb.hu/arfolyamok.asmx";
// const xmls =
//   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
//                             xmlns:web="http://www.webserviceX.NET/">\
//             <soapenv:Header/>\
//             <soapenv:Body>\
//               <web:ConversionRate>\
//                 <web:FromCurrency>INR</web:FromCurrency>\
//                 <web:ToCurrency>USD</web:ToCurrency>\
//               </web:ConversionRate>\
//             </soapenv:Body>\
//           </soapenv:Envelope>';

// export async function makeSoapRequest() {
//   axios
//     .post("http://www.webservicex.com/CurrencyConvertor.asmx?wsdl", xmls, {
//       headers: { "Content-Type": "text/xml" },
//     })
//     .then((res: any) => {
//       console.log(res);
//     })
//     .catch((err: any) => {
//       console.log(err);
//     });
// }
