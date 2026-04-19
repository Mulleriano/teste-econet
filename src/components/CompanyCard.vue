<template>
  <v-card class="pa-5 pb-3 rounded-xl" style="width: 390px">
    <div class="d-flex justify-space-between align-center gap-2">
      <v-chip color="primary" class="mdi mdi-domain"></v-chip>
      <v-chip :color="handleActiveColor(company.active)">
        {{ company.active ? "Ativa" : "Inativa" }}
      </v-chip>
    </div>
    <v-card-title class="font-weight-bold">
      {{ company.name }}
    </v-card-title>
    <v-card-text>
      {{ company.cnpj }}
    </v-card-text>
    <v-card-actions class="d-flex justify-end gap-2 border-t-thin">
      <div>
        <router-link :to="`/detail/${company.id}`">
          <v-btn color="primary" icon="mdi-eye"></v-btn>
        </router-link>
        <router-link :to="`/edit/${company.id}`">
          <v-btn color="primary" icon="mdi-pencil"></v-btn>
        </router-link>
        <v-btn
          color="primary"
          @click="$emit('delete', company.id)"
          icon="mdi-delete"
        ></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Company } from "@/types/companies";
import handleActiveColor from "@/utils/handleActiveColor";

interface Props {
  company: Company;
}

const props = defineProps<Props>();

defineEmits<{
  delete: [companyId: string];
}>();
</script>
