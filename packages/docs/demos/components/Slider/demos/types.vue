<template>
  <n-slider v-model="valueRef" />
  <n-slider v-model="valueRef" type="info" />
  <n-slider v-model="valueRef" type="success" />
  <n-slider v-model="valueRef" type="warning" />
  <n-slider v-model="valueRef" type="error" />
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
