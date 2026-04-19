<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="400"
  >
    <v-form ref="form" @submit.prevent="handleSave" class="pa-5">
      <v-card max-width="400" rounded="xl">
        <v-card-title>Adicionar Usuário</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="employee.name"
            variant="outlined"
            label="Nome"
            :rules="nameRules"
            :disabled="props.loading"
            class="mb-4"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.email"
            variant="outlined"
            label="Email"
            :rules="emailRules"
            :disabled="props.loading"
            class="mb-4"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.position"
            variant="outlined"
            label="Cargo"
            :disabled="props.loading"
            class="mb-4"
          ></v-text-field>

          <v-btn
            type="submit"
            class="w-100 rounded-xl"
            size="large"
            color="success"
            :loading="props.loading"
            @click="handleSave"
          >
            Salvar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Employee } from "@/types/companies";
import { validateEmail } from "@/utils/validateEmail";

interface Props {
  modelValue: boolean;
  loading: boolean;
}

const props = defineProps<Props>();
const employee = reactive<Employee>({
  id: "",
  name: "",
  email: "",
  position: "",
});
const form = ref();
const clearForm = () => {
  employee.id = "";
  employee.name = "";
  employee.email = "";
  employee.position = "";

  form.value.resetValidation();
};
const nameRules = [(value: string) => !!value?.trim() || "Nome é obrigatório"];
const emailRules = [
  (value: string) => !!value?.trim() || "Email é obrigatório",
  (value: string) => validateEmail(value) || "Email inválido",
];

async function handleSave() {
  const { valid } = await form.value.validate();

  if (!valid) return;

  emit("confirm", employee);
  clearForm();
}

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  cancel: [];
  confirm: [employee: Employee];
}>();
</script>
