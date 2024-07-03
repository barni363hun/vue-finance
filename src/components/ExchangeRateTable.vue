<template>
  <div>
    <h1>table</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { ref, onMounted } from "vue";
import { fetchUsers } from "@/services/soapService";
export default class ExchangeRateTable extends Vue {
  mounted() {
    this.fetchUsersData();
  }

  private async fetchUsersData() {
    try {
      const data = await fetchUsers();
      console.log(data);
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
    }
  }
}
</script>

<style scoped lang="scss"></style>
