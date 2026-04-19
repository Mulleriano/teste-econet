<template>
  <CardLoader v-if="companyStore.loading && !deleteModal" :qtd="6" />

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
          :key="company.raw.id"
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

  <ConfirmDeleteModal
    v-model="deleteModal"
    :name="companyStore.companySelected?.name || ''"
    :loading="deleting"
    @confirm="handleDelete"
    @cancel="deleteModal = false"
  />

  <v-btn
    @click="$router.push('/new')"
    color="primary"
    rounded="xl"
    icon="mdi-plus"
    class="position-fixed bottom-0 mb-10"
    style="z-index: 1000"
  ></v-btn>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCompanyStore } from "@/stores/companyStore";
import CardLoader from "@/components/CardLoader.vue";
import CompanyCard from "@/components/CompanyCard.vue";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue";
import Alert from "@/components/Alert.vue";
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
