<template>
  <div>
    <p>当前范围: {{ valueRef }}</p>
    <h-slider v-model="valueRef" :range="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef = ref([30, 60]);
    return {
      valueRef,
    };
  },
});
</script>
