<template>
  <div>
    <h1>Change Currencies</h1>

    <!-- Inputs for fromDate and toDate -->
    <div>
      <h3>The conversion rate will be the last value from the range</h3>
      <label for="fromDate">From Date:</label>
      <input type="date" id="fromDate" v-model="fromDateInput" /> - Today
      <br />

      <button @click="fetchExchangeRates">Fetch Exchange Rates</button>
    </div>
    <div v-if="!loading">
      <h3>Currencies</h3>
      <p>Select what to convert from:</p>
      <div
        class="from-currency-container"
        v-for="(currency, index) in currencies"
        :key="index"
      >
        <input
          type="radio"
          :id="'from' + currency"
          :value="currency"
          v-model="fromSelectedCurrency"
        />
        <label :for="'from' + currency">{{ currency }}</label>
      </div>
      <p>Select what to convert to:</p>
      <div
        class="to-currency-container"
        v-for="(currency, index) in currencies"
        :key="index"
      >
        <input
          type="checkbox"
          :id="'to' + currency"
          :value="currency"
          v-model="toSelectedCurrencies"
        />
        <label :for="'to' + currency">{{ currency }}</label>
      </div>
      <table v-if="fromSelectedCurrency">
        <tbody>
          <tr>
            <!-- First column for the 'from' currency -->
            <td :rowspan="toSelectedCurrencies.length + 1">
              <input
                type="number"
                v-model="fromSelectedCurrencyInput"
                placeholder="Enter amount"
              />
              {{
                // Displaying the name of the 'from' currency
                exchangeRates?.exchangeRates.find(
                  (rate) => rate.currency === fromSelectedCurrency
                )?.name
              }}
              =
            </td>
            <!-- Empty columns for spacing, based on the number of 'to' currencies -->
            <td v-for="index in getLastIndex()" :key="index"></td>
          </tr>
          <!-- Second row for the 'to' currencies -->
          <tr v-for="currency in toSelectedCurrencies" :key="currency">
            <!-- Looping through each 'to' currency to display -->
            <td>
              {{
                getRate(fromSelectedCurrency, currency) *
                fromSelectedCurrencyInput
              }}
              {{ currency }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Display loading indicator -->
    <div v-if="loading">Loading...</div>
  </div>
</template>
<script lang="ts">
import { Watch } from "vue-property-decorator";
import { Vue } from "vue-class-component";
import { makeGetRequest } from "@/services/apiService";
import { ExchangeRatesData, ParamsType } from "@/types/ExchangeRate";
import { getAYearAgoString, getTodayString } from "@/services/dateService";

export default class ChangeCurrency extends Vue {
  exchangeRates: ExchangeRatesData | null = null;
  loading = false;
  fromDateInput = getAYearAgoString();
  toDateInput = getTodayString();
  currencies: string[] = [];
  fromSelectedCurrency = "";
  toSelectedCurrencies = [];
  fromSelectedCurrencyInput = 0;

  getLastIndex() {
    if (this.toSelectedCurrencies.length === 0) {
      return 0;
    } else {
      return this.toSelectedCurrencies.length - 1;
    }
  }

  private getMiddleRate(currency: string) {
    const currencyData = this.exchangeRates?.exchangeRates.find(
      (rate) => rate.currency === currency
    );
    if (!currencyData) {
      throw new Error("Currency not found");
    }
    return currencyData.middleRate;
  }

  @Watch("fromSelectedCurrency")
  private fromSelectedCurrencyChanged(newVal: string) {
    console.log(this.getMiddleRate(newVal));
  }

  getRate(from: string, to: string) {
    return this.getMiddleRate(from) / this.getMiddleRate(to);
  }

  // Method to fetch exchange rates
  async fetchExchangeRates() {
    this.loading = true;

    const params: ParamsType = {
      rateType: "mkbk",
      fromDate: this.fromDateInput.replaceAll("-", ""), // Adjust as per your API's date format requirement
      toDate: this.toDateInput.replaceAll("-", ""), // Adjust as per your API's date format requirement
      from: 0,
      size: 100,
    };

    this.exchangeRates = await makeGetRequest(params);
    this.currencies = [
      ...new Set(this.exchangeRates.exchangeRates.map((item) => item.currency)),
    ];
    this.loading = false;
  }

  // Lifecycle hook
  mounted() {
    // Example initial fetch
    this.fetchExchangeRates();
  }
}
</script>

<style scoped lang="scss">
.from-currency-container,
.to-currency-container {
  display: inline-block; /* Display each div in a line */
  margin-right: 10px; /* Adjust spacing between elements as needed */
}
</style>
