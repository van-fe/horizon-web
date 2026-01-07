<template>
  <h-switch v-model="currentRef" size="small" status label="Small" />
  <h-switch v-model="currentRef" status label="Medium" class="ml-4" />
  <h-switch v-model="currentRef" size="large" status label="Large" class="ml-4" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
</script>
