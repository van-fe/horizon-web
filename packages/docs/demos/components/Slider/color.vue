<template>
  <h-slider v-model="valueRef" />
  <h-slider v-model="valueRef" color="red" />
  <h-slider v-model="valueRef" color="purple" />
  <h-slider v-model="valueRef" color="orange" />
  <h-slider v-model="valueRef" color="skyblue" />
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
