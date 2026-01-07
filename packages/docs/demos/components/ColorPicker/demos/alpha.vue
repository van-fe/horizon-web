<template>
  <h-switch v-model="alpha" label="透明度调节" label-position="right" />

  <p>
    <h-color-picker v-model="value1" trigger-type="square" :alpha="alpha" :need-confirm="false" :clearable="false" />
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#0BA1D6');
const alpha = ref(false);
</script>

<style scoped>
p {
  margin-top: 10px;
}
</style>
