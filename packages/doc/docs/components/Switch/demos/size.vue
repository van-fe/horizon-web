<template>
  <n-switch v-model="currentRef" size="small" status label="Small" />
  <n-switch v-model="currentRef" status label="Medium" class="ml-4" />
  <n-switch v-model="currentRef" size="large" status label="Large" class="ml-4" />
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
