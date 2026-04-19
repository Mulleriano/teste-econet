<template>
  <div>
    <div class="d-flex align-center ga-4">
      <v-btn
        @click="$router.go(-1)"
        size="large"
        icon="mdi-arrow-left-thick"
        variant="text"
      ></v-btn>
      <h1 class="text-center">Cadastrar Empresa</h1>
    </div>
    <CompanyForm
      @save="createCompany"
      :company="null"
      :mode="'create'"
      :loading="companyStore.loading"
      :status="companyStore.status"
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
  await companyStore.createCompany(company);
}
</script>
