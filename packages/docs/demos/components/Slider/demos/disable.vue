<template>
  <n-slider v-model="valueRef" disabled />
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
