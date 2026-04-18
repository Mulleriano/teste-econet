<template>
  <v-dialog
    :model-value="modelValue"
    width="auto"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card max-width="400">
      <v-card-title class="font-weight-bold">
        {{ company?.name }}
      </v-card-title>
      <v-card-text>
        Tem certeza de que deseja deletar esta empresa?
      </v-card-text>
      <v-card-actions>
        <v-btn text="Cancelar" @click="$emit('cancel')"></v-btn>
        <v-btn
          text="Deletar"
          color="error"
          @click="$emit('confirm')"
          :loading="loading"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Company } from "@/types/companies";

interface Props {
  modelValue: boolean;
  company: Company | null;
  loading: boolean;
}

const props = defineProps<Props>();

defineEmits<{
  "update:modelValue": [value: boolean];
  cancel: [];
  confirm: [];
}>();
</script>
