<template>
  <v-list>
    <v-list-item-title class="d-flex justify-space-between align-center">
      <span class="text-title-medium font-weight-bold">Usuários</span>

      <v-btn
        icon="mdi-account-plus"
        variant="text"
        color="primary"
        @click="emit('create')"
      />
    </v-list-item-title>

    <v-list-item
      v-for="employee in employees"
      :key="employee.id"
      :title="`${employee.name} | ${employee.position}`"
      :subtitle="employee.email"
    >
      <template #prepend>
        <v-avatar color="info">
          <v-icon icon="mdi-account-circle" />
        </v-avatar>
      </template>

      <template #append>
        <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="emit('delete', employee.id)"
        />
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { Employee } from "@/types/companies";

defineProps<{
  employees: Employee[];
}>();

const emit = defineEmits<{
  create: [];
  delete: [id: string];
}>();
</script>
