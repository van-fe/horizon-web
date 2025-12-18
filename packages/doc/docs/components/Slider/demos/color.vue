<template>
  <n-slider v-model="valueRef" />
  <n-slider v-model="valueRef" color="red" />
  <n-slider v-model="valueRef" color="purple" />
  <n-slider v-model="valueRef" color="orange" />
  <n-slider v-model="valueRef" color="skyblue" />
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
