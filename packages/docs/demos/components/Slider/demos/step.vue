<template>
  <n-slider v-model="valueRef1" :step="10" />
  <n-slider v-model="valueRef1" :step="10" show-separator />
  <n-slider v-model="valueRef2" :max="40.8" :min="36.1" :step="0.2" />
  <n-slider v-model="valueRef2" :max="40.8" :min="36.1" :step="0.2" show-separator />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const valueRef1 = ref(40);
    const valueRef2 = ref(40);

    return { valueRef1, valueRef2 };
  },
});
</script>
