<template>
  <div>
    <Line :data="myData" />
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
import { MyChartData } from "@/types/chart";
// https://github.com/apertureless/vue-chartjs/issues/695#issuecomment-1001135480

Chart.register(LineElement, Title, Tooltip, Legend, LinearScale, CategoryScale);

@Options({
  components: {
    Line,
  },
  props: {
    myData: Object as () => MyChartData,
  },
})
export default class LineChart extends Vue {
  myData!: MyChartData;
}
</script>
