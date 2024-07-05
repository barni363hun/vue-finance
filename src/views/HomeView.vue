<template>
  <div class="home">
    <ExchangeRateTable />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ExchangeRateTable from "@/components/ExchangeRateTable.vue";
@Options({
  components: {
    ExchangeRateTable,
  },
})
export default class HomeView extends Vue {}
</script>
