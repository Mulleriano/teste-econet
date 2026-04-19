<template>
  <v-alert
    class="position-absolute bottom-0 mb-4"
    style="z-index: 100"
    v-show="props.status.message"
    :type="props.status.type"
    variant="tonal"
  >
    {{ props.status.message }}
  </v-alert>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { Status } from "@/types/status";

const props = defineProps<{
  status: Status;
}>();

</script>
