<template>
  <h-slider v-model="valueRef" />
  <h-slider v-model="valueRef" type="info" />
  <h-slider v-model="valueRef" type="success" />
  <h-slider v-model="valueRef" type="warning" />
  <h-slider v-model="valueRef" type="error" />
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
