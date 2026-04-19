<template>
  <v-alert
    v-show="visible"
    transition="scale-transition"
    class="position-absolute top-0 right-0 mt-16 mr-6"
    style="z-index: 10000; width: 350px"
    :type="status.type"
    variant="tonal"
  >
    {{ status.message }}
  </v-alert>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import type { Status } from "@/types/status";

const props = defineProps<{
  status: Status;
}>();

const emit = defineEmits(["clear"]);

const visible = computed(() => !!props.status.message);

watch(
  () => props.status.message,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        emit("clear");
      }, 3000);
    }
  },
);
</script>
