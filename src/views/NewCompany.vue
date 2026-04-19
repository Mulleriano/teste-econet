<template>
  <Alert :status="companyStore.status" />

  <div>
    <div class="d-flex align-center ga-4">
      <v-btn @click="$router.push('../')" icon="mdi-arrow-left-bold"></v-btn>
      <h1 class="text-center">Cadastrar Empresa</h1>
    </div>
    <CompanyForm
      @save="createCompany"
      :loading="companyStore.loading"
      :status="companyStore.status"
      :mode="'create'"
    />
  </div>
</template>

<script setup lang="ts">
import type { Company } from "@/types/companies";
import { useCompanyStore } from "@/stores/companyStore";
import CompanyForm from "@/components/CompanyForm.vue";
import Alert from "@/components/Alert.vue";

const companyStore = useCompanyStore();

async function createCompany(company: Company) {
  if (!company.name) {
    return;
  }
  await companyStore.createCompany(company);
}
</script>
