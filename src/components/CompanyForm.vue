<template>
  <v-sheet elevation="3" rounded="xl" width="390">
    <v-form ref="form" @submit.prevent="handleSave" class="pa-5">
      <v-container>
        <v-text-field
          v-model="company.name"
          variant="outlined"
          label="Nome"
          :rules="[nameRules]"
          :disabled="props.loading"
          class="mb-4"
          required
        ></v-text-field>
        <v-text-field
          v-model="cnpjInput"
          variant="outlined"
          label="CNPJ"
          maxlength="18"
          :rules="cnpjRules"
          :disabled="props.loading"
          class="mb-4"
          required
        ></v-text-field>
        <div class="d-flex ga-3 mb-4">
          <v-chip
            @click="company.active = true"
            class="w-50 text-center"
            color="success"
            :variant="company?.active ? 'flat' : 'outlined'"
          >
            Ativo
          </v-chip>
          <v-chip
            @click="company.active = false"
            class="w-50 text-center"
            color="red"
            :variant="!company?.active ? 'flat' : 'outlined'"
          >
            Inativo
          </v-chip>
        </div>

        <v-btn
          type="submit"
          class="w-100 rounded-xl"
          size="large"
          color="success"
          :loading="props.loading"
        >
          Salvar
        </v-btn>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import type { Company } from "@/types/companies";
import { validateCNPJ } from "@/utils/validateCNPJ";
import { maskCNPJ } from "@/utils/maskCNPJ";
import generateId from "@/utils/generateId";

interface Props {
  company: Company | null;
  mode: "create" | "edit";
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});
const emit = defineEmits<{
  (e: "save", company: Company): void;
}>();

const company = reactive<Company>({
  id: props.company?.id || generateId(),
  name: props.company?.name || "",
  cnpj: props.company?.cnpj || "",
  active: props.company?.active ?? true,
  employees: props.company?.employees || [],
});

const form = ref();
const clearForm = () => {
  if (props.mode == "create") {
    form.value.reset();
    form.value.resetValidation();
  }
};
const cnpjInput = computed({
  get: () => company.cnpj,
  set: (value: string) => {
    company.cnpj = maskCNPJ(value);
  },
});
const cnpjRules = [
  (v: string) => !!v || "CNPJ é obrigatório",
  (v: string) => validateCNPJ(v) || "CNPJ inválido",
];
const nameRules = (value: string) => !!value?.trim() || "Nome é obrigatório";

async function handleSave() {
  const { valid } = await form.value.validate();

  if (!valid) return;

  emit("save", company);
  clearForm();
}

watch(
  () => props.company,
  (newCompany) => {
    if (newCompany) {
      Object.assign(company, newCompany);
    }
  },
  { immediate: true },
);
</script>
