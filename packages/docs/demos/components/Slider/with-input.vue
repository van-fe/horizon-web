<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-slider v-model="valueRef" :input-enable="true" :step="5" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-slider v-model="valueRef" :input-enable="true" disabled />
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueRef = ref(50);
    return { valueRef };
  },
});
</script>
