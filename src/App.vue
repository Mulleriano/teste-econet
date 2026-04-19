<template>
  <v-app>
    <v-main>
      <Alert
        :status="companyStore.status"
        @clear="companyStore.status = { message: '', type: undefined }"
      />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useCompanyStore } from "@/stores/companyStore";
import Alert from "@/components/Alert.vue";

const companyStore = useCompanyStore();
</script>
