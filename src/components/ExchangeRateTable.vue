<template>
  <div>
    <h1>table</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { ref, onMounted } from "vue";
// import { makeSoapRequest } from "@/services/soapService";
import { makeGetRequest } from "@/services/apiService";
export default class ExchangeRateTable extends Vue {
  mounted() {
    // makeSoapRequest();
    makeGetRequest();
  }
}
</script>

<style scoped lang="scss"></style>
