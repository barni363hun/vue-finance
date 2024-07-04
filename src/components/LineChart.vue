<template>
  <div>
    <Line :data="chartData" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { Line } from "vue-chartjs";
import {
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Chart } from "chart.js/auto";
// https://github.com/apertureless/vue-chartjs/issues/695#issuecomment-1001135480

Chart.register(LineElement, Title, Tooltip, Legend, LinearScale, CategoryScale);

@Options({
  components: {
    Line,
  },
})
export default class LineChart extends Vue {
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: [40, 39, 10, 40, 39, 80, 40],
      },
    ],
  };

  // Optionally define your chart options
  // options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  // };
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
