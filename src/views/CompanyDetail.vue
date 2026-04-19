<template>
  <CardLoader v-if="companyStore.loading" :qtd="1" />
  <div v-else class="d-flex flex-wrap">
    <v-btn
      @click="$router.go(-1)"
      icon="mdi-arrow-left-bold"
      class="mt-5"
    ></v-btn>
    <v-container>
      <v-card class="pa-5 pb-3 rounded-xl">
        <v-card-title class="font-weight-bold">
          <div
            class="d-flex flex-wrap-reverse justify-space-between align-center ga-2"
          >
            {{ companyStore.companySelected?.name }}
            <div class="d-flex align-center ga-4">
              <v-chip
                :color="handleActiveColor(companyStore.companySelected?.active ?? false)"
              >
                {{ companyStore.companySelected?.active ? "Ativa" : "Inativa" }}
              </v-chip>
              <router-link
                v-if="companyStore.companySelected"
                :to="`/edit/${companyStore.companySelected.id}`"
              >
                <v-btn color="primary" icon="mdi-pencil" size="small"></v-btn>
              </router-link>
              <v-btn
                color="primary"
                @click="handleDeleteCompany"
                icon="mdi-delete"
                size="small"
              ></v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          {{ companyStore.companySelected?.cnpj }}
        </v-card-subtitle>
        <v-card-text>
          <EmployeeList
            :employees="employees"
            @create="createEmployeeModal = true"
            @delete="deleteEmployee"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </div>

  <ConfirmDeleteModal
    v-model="deleteModal"
    :name="deleteName"
    :loading="companyStore.loading"
    @confirm="handleDelete"
    @cancel="deleteModal = false"
  />

  <CreateEmployeeModal
    v-model="createEmployeeModal"
    :loading="companyStore.loading"
    @confirm="handleCreateEmployee"
    @cancel="createEmployeeModal = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Employee } from "@/types/companies";
import { useCompanyStore } from "@/stores/companyStore";
import EmployeeList from "@/components/EmployeeList.vue";
import CardLoader from "@/components/CardLoader.vue";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue";
import CreateEmployeeModal from "@/components/CreateEmployeeModal.vue";
import handleActiveColor from "@/utils/handleActiveColor";

const route = useRoute();
const router = useRouter();
const companyStore = useCompanyStore();
const employees = computed(() => companyStore.companySelected?.employees ?? []);
const deleteName = ref("");
const deleteType = ref<"company" | "employee" | null>(null);
const deleteId = ref<string | null>(null);
const deleteModal = ref(false);
const createEmployeeModal = ref(false);

async function handleDelete() {
  if (!deleteId.value) return;

  if (deleteType.value === "company") {
    await companyStore.deleteCompany(deleteId.value);
    router.push("/");
  }

  if (deleteType.value === "employee") {
    await companyStore.deleteEmployee(deleteId.value);
  }

  deleteModal.value = false;
}

function handleDeleteCompany() {
  deleteType.value = "company";
  deleteId.value = route.params.id as string;

  deleteName.value = companyStore.companySelected?.name || "";
  deleteModal.value = true;
}

function deleteEmployee(employeeId: string) {
  const employee = companyStore.companySelected?.employees.find(
    (e) => e.id === employeeId,
  );

  deleteType.value = "employee";
  deleteId.value = employeeId;

  deleteName.value = employee?.name || "";
  deleteModal.value = true;
}

async function handleCreateEmployee(employee: Employee) {
  try {
    await companyStore.createEmployee(route.params.id as string, employee);
    createEmployeeModal.value = false;
  } catch (err) {}
}

onMounted(() => {
  companyStore.selectedCompany(route.params.id as string);
});
</script>
