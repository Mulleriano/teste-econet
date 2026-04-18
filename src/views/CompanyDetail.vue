<template>
  Detalhes da {{ companyStore.companySelected?.name }}
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import {useCompanyStore} from "@/stores/companyStore";

const route = useRoute();
const companyStore = useCompanyStore();

onMounted(() => {
  companyStore.selectedCompany(route.params.id);
});
</script>
