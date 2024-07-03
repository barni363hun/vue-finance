import axios from "axios";

const SOAP_ENDPOINT = "https://www.mnb.hu/arfolyamok.asmx?wsdl";
const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.mnb.hu/webservices/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:GetCurrencies/>
   </soapenv:Body>
</soapenv:Envelope>`;

export async function makeSoapRequest() {
  const xmls =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                            xmlns:web="http://www.webserviceX.NET/">\
            <soapenv:Header/>\
            <soapenv:Body>\
              <web:ConversionRate>\
                <web:FromCurrency>INR</web:FromCurrency>\
                <web:ToCurrency>USD</web:ToCurrency>\
              </web:ConversionRate>\
            </soapenv:Body>\
          </soapenv:Envelope>';

  const res = await axios.post(
    "http://www.webservicex.com/CurrencyConvertor.asmx?wsdl",
    xmls,
    {
      headers: { "Content-Type": "text/xml" },
    }
  );

  console.log(res);
}
