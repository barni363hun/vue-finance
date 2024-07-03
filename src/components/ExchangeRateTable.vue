<template>
  <div>
    <h1>Exchange Rates Table</h1>

    <!-- Inputs for fromDate and toDate -->
    <div>
      <label for="fromDate">From Date:</label>
      <input type="date" id="fromDate" v-model="fromDateInput" />
      <br />

      <label for="toDate">To Date:</label>
      <input type="date" id="toDate" v-model="toDateInput" />
      <br />

      <button @click="fetchExchangeRates">Fetch Exchange Rates</button>
    </div>
    <div>
      <h3>Currencies</h3>
      <div
        class="currency-container"
        v-for="(currency, index) in currencies"
        :key="index"
      >
        <input
          type="radio"
          :id="currency"
          :value="currency"
          v-model="selectedCurrency"
        />
        <label :for="currency">{{ currency }}</label>
      </div>
    </div>

    <!-- Table to display exchange rates -->
    <table v-if="exchangeRates">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Date</th>
          <th>Time</th>
          <th>Unit</th>
          <th>Buy Rate</th>
          <th>Middle Rate</th>
          <th>Sales Rate</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in exchangeRates.exchangeRates" :key="index">
          <td>{{ rate.currency }}</td>
          <td>{{ rate.date }}</td>
          <td>{{ rate.time }}</td>
          <td>{{ rate.unit }}</td>
          <td>{{ rate.buyRate }}</td>
          <td>{{ rate.middleRate }}</td>
          <td>{{ rate.salesRate }}</td>
          <td>{{ rate.name }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Display loading indicator -->
    <div v-if="loading">Loading...</div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { ref } from "vue";
import { makeGetRequest } from "@/services/apiService";
import { ExchangeRatesData, ParamsType } from "@/types/ExchangeRate";

export default class ExchangeRateTable extends Vue {
  // Data properties
  exchangeRates: ExchangeRatesData | null = null;
  loading = false;
  fromDateInput = "2024-05-29";
  toDateInput = "2024-05-29";
  currencies: string[] = [];
  selectedCurrency = "";

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
.currency-container {
  display: inline-block; /* Display each div in a line */
  margin-right: 10px; /* Adjust spacing between elements as needed */
}
</style>
