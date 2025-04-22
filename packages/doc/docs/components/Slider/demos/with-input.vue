<template>
  <n-row>
    <n-col :span="24">
      <n-slider v-model="valueRef" :input-enable="true" :step="5" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="24">
      <n-slider v-model="valueRef" :input-enable="true" disabled />
    </n-col>
  </n-row>
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
