<template>
  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" />
  <h-slider v-model="valueRef" :tooltip-formatter="tooltipFormatter" :tooltip-enable="false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueRef = ref(50);

    return {
      valueRef,
      tooltipFormatter(val: number) {
        return `${val} 个`;
      },
    };
  },
});
</script>
