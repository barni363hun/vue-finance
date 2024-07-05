<template>
  <CurrencyChanger />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CurrencyChanger from "@/components/CurrencyChanger.vue";

@Options({
  components: {
    CurrencyChanger,
  },
})
export default class ChangeCurrencyView extends Vue {}
</script>
