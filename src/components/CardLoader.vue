<template>
  <div class="d-flex flex-wrap justify-center ga-4">
    <v-card
      v-for="n in props.qtd"
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
</template>

<script setup lang="ts">
const props = defineProps<{
  qtd: number;
}>();
</script>
