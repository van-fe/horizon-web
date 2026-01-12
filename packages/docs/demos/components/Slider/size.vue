<template>
  <h-slider v-model="valueRef" size="small" />
  <h-slider v-model="valueRef" size="medium" />
  <h-slider v-model="valueRef" size="large" />
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
