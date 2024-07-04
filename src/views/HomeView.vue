<template>
  <div class="home">
    <LineChart :myData="chartData" />
    <!-- <ExchangeRateTable /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ExchangeRateTable from "@/components/ExchangeRateTable.vue";
import LineChart from "@/components/LineChart.vue";
@Options({
  components: {
    ExchangeRateTable,
    LineChart,
  },
})
export default class HomeView extends Vue {
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: [40, 39, 10, 40, 39, 80, 40],
      },
      {
        label: "Data asd",
        backgroundColor: "#f87079",
        data: [50, 39, 10, 40, 39, 80, 40],
      },
    ],
  };
}
</script>
