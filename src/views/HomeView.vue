<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <LineChart />
    <!-- <ExchangeRateTable /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ExchangeRateTable from "@/components/ExchangeRateTable.vue";
import LineChart from "@/components/LineChart.vue";
@Options({
  components: {
    HelloWorld,
    ExchangeRateTable,
    LineChart,
  },
})
export default class HomeView extends Vue {}
</script>
