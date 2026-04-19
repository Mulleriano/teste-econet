<template>
  <Alert :status="companyStore.status" />
  <div class="d-flex flex-column ga-4 align-center">
    <div class="d-flex align-center ga-4">
      <v-btn @click="$router.push('../')" icon="mdi-arrow-left-bold"></v-btn>
      <h1 class="text-center">Editar {{ companyStore.companySelected?.name }}</h1>
    </div>
    <CompanyForm
      :company="companyStore.companySelected"
      :loading="companyStore.loading"
      :status="companyStore.status"
      :mode="'edit'"
      @save="updateCompany"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/companyStore";
import CompanyForm from "@/components/CompanyForm.vue";
import Alert from "@/components/Alert.vue";
import type { Company } from "@/types/companies";

const route = useRoute();
const companyStore = useCompanyStore();
const companyName = computed(() => companyStore.companySelected?.name || "Empresa");

function updateCompany(company: Company) {  
  companyStore.updateCompany(company);
}

onMounted(() => {
  companyStore.selectedCompany(route.params.id);
});
</script>
