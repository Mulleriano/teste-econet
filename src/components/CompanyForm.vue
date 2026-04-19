<template>
  <v-sheet elevation="3" rounded="xl" width="390">
    <v-form @submit.prevent class="pa-5">
      <v-container>
        <v-text-field
          v-model="company.name"
          variant="outlined"
          label="Nome"
          :rules="[nameRule]"
          :disabled="props.loading"
          class="mb-4"
          required
        ></v-text-field>
        <v-text-field
          v-model="cnpjInput"
          variant="outlined"
          label="CNPJ"
          maxlength="18"
          :rules="[cnpjRule]"
          :disabled="props.loading"
          class="mb-4"
          required
        ></v-text-field>
        <v-select
          v-model="activeStatus"
          variant="outlined"
          label="Status"
          :items="['Ativo', 'Inativo']"
          :disabled="props.loading"
        >
        </v-select>

        <v-btn
          class="w-100 rounded-xl"
          type="submit"
          size="large"
          color="success"
          :loading="props.loading"
          @click="emit('save', company)"
          >Salvar</v-btn
        >
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { validateCNPJ } from "@/utils/validateCNPJ";
import { maskCNPJ } from "@/utils/maskCNPJ";
import generateId from "@/utils/generateId";

interface Props {
  modelValue: boolean;
  company: Company | null;
  loading: boolean;
  mode: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});
const company = reactive({
  id: props.company?.id || generateId(),
  name: props.company?.name || "",
  cnpj: props.company?.cnpj || "",
  active: props.company?.active || true,
  status: props.status,
});

const cnpjInput = computed({
  get: () => company.cnpj,
  set: (value: string) => {
    company.cnpj = maskCNPJ(value);
  },
});
const cnpjRule = (value: string) => validateCNPJ(value) || "CNPJ inválido";
const nameRule = (value: string) => !!value?.trim() || "Nome é obrigatório";

const activeStatus = computed({
  get: () => (company.active ? "Ativo" : "Inativo"),
  set: (value: string) => {
    company.active = value === "Ativo";
  },
});

watch(
  () => props.company,
  (newCompany) => {
    if (newCompany) {
      company.id = newCompany.id;
      company.name = newCompany.name || "";
      company.cnpj = newCompany.cnpj || "";
      company.active = newCompany.active;
      company.status = newCompany.status;
    } else {
      company.id = generateId();
      company.name = "";
      company.cnpj = "";
      company.active = true;
      company.status = props.status;
    }
  },
  { immediate: true },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  cancel: [];
  save: [];
}>();
</script>
