<script setup>
import { ref } from "vue";
const count = ref(0);
// const props = defineProps<{
//     subtitle: string
// }>()
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
