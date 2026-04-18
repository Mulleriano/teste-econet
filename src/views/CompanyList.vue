<template>
  <v-alert
    class="position-absolute bottom-0 mb-4"
    style="z-index: 100"
    v-show="companyStore.status.message"
    :type="companyStore.status.type"
    variant="tonal"
  >
    {{ companyStore.status.message }}
  </v-alert>
  <div
    v-if="companyStore.loading && !deleting"
    class="d-flex flex-wrap justify-center ga-4"
  >
    <v-card
      v-for="n in 6"
      :key="n"
      class="pa-4 pb-3 rounded-xl"
      style="width: 390px"
    >
      <div class="d-flex justify-space-between align-center gap-2 mb-3">
        <v-skeleton-loader type="chip" width="70"></v-skeleton-loader>
        <v-skeleton-loader type="chip" width="80"></v-skeleton-loader>
      </div>
      <v-skeleton-loader type="heading"></v-skeleton-loader>
      <v-skeleton-loader type="subtitle" width="200"></v-skeleton-loader>
      <div class="d-flex justify-end gap-2">
        <v-skeleton-loader
          type="button"
          width="96"
          height="48"
        ></v-skeleton-loader>
        <v-skeleton-loader
          type="button"
          width="96"
          height="48"
        ></v-skeleton-loader>
        <v-skeleton-loader
          type="button"
          width="96"
          height="48"
        ></v-skeleton-loader>
      </div>
    </v-card>
  </div>

  <v-data-iterator
    v-else
    :items="companyStore.companies"
    :page="page"
    :items-per-page="6"
    class="d-flex flex-column ga-4"
  >
    <template v-slot:default="{ items }">
      <div class="d-flex flex-wrap justify-center ga-4">
        <CompanyCard
          v-for="company in items"
          :key="company.id"
          :company="company.raw"
          @delete="
            () => {
              companyStore.companySelected = company.raw;
              deleteModal = true;
            }
          "
        />
      </div>
    </template>
    <template
      v-slot:footer="{ pageCount }"
      v-if="companyStore.companies.length > 0"
    >
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </template>
  </v-data-iterator>

  <DeleteCompanyModal
    v-model="deleteModal"
    :company="companyStore.companySelected"
    :loading="deleting"
    @confirm="handleDelete"
    @cancel="deleteModal = false"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCompanyStore } from "../stores/companyStore";
import DeleteCompanyModal from "@/components/DeleteCompanyModal.vue";
import CompanyCard from "@/components/CompanyCard.vue";
import handleActiveColor from "@/utils/handleActiveColor.ts";

const companyStore = useCompanyStore();
const page = ref(1);
const deleteModal = ref(false);
const deleting = ref(false);

const handleDelete = async () => {
  if (!companyStore.companySelected) return;

  deleting.value = true;
  try {
    await companyStore.deleteCompany(companyStore.companySelected.id);
    deleteModal.value = false;
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  companyStore.searchCompanies();
});
</script>
