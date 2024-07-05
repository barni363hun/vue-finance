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
          @click="currencySelected"
        />
        <label :for="currency">{{ currency }}</label>
      </div>
    </div>

    <!-- display exchange rates -->
    <div v-if="tableExchangeRates.length != 0 && !loading">
      <LineChart :myData="chartData" />
      <table>
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
          <tr v-for="(rate, index) in tableExchangeRates" :key="index">
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
    </div>
    <p v-if="tableExchangeRates.length == 0 && !loading">Select a currency</p>

    <!-- Display loading indicator -->
    <div v-if="loading">Loading...</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { makeGetRequest } from "@/services/apiService";
import { getAYearAgoString, getTodayString } from "@/services/dateService";
import {
  ExchangeRate,
  ExchangeRatesData,
  ParamsType,
} from "@/types/ExchangeRate";
import LineChart from "@/components/LineChart.vue";
import { MyChartData } from "@/types/chart";

@Options({
  components: {
    LineChart,
  },
})
export default class ExchangeRateTable extends Vue {
  chartData: MyChartData = {
    labels: [],
    datasets: [],
  };
  exchangeRates: ExchangeRatesData | null = null;
  tableExchangeRates: ExchangeRate[] = [];
  loading = false;
  fromDateInput = getAYearAgoString();
  toDateInput = getTodayString();
  currencies: string[] = [];
  selectedCurrency = "";

  async currencySelected() {
    await this.fetchExchangeRates();
    // console.log(this.selectedCurrency);
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
    this.tableExchangeRates = this.exchangeRates.exchangeRates.filter(
      (item) => item.currency === this.selectedCurrency
    );
    this.chartData.labels = this.tableExchangeRates.map((item) => item.date);
    this.chartData.datasets = [
      // {
      //   label: "Buy Rate",
      //   data: this.tableExchangeRates.map((item) => item.buyRate),
      //   backgroundColor: "blue",
      // },
      {
        label: "Middle Rate",
        data: this.tableExchangeRates.map((item) => item.middleRate),
        backgroundColor: "green",
      },
      // {
      //   label: "Sales Rate",
      //   data: this.tableExchangeRates.map((item) => item.salesRate),
      //   backgroundColor: "red",
      // },
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
