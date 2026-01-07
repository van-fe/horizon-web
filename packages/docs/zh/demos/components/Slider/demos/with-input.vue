<template>
  <h-row>
    <h-col :span="24">
      <h-slider v-model="valueRef" :input-enable="true" :step="5" />
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-slider v-model="valueRef" :input-enable="true" disabled />
    </h-col>
  </h-row>
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
