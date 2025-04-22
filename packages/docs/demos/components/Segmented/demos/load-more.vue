<template>
  <n-space direction="vertical" block>
    <n-segmented default-active-key="Default Option1">
      <n-segmented-item v-for="v in options" :key="v" :label="v" />
    </n-segmented>
    <n-button type="normal" :loading="loading" :disabled="loaded" @click="onLoad">Load</n-button>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref(['Default Option1', 'Default Option2']);
const week = ['Monday', 'Tuesday', 'Wednesday'];
const loading = ref(false);
const loaded = ref(false);

const onLoad = () => {
  loading.value = true;
  setTimeout(() => {
    options.value.push(...week);
    loading.value = false;
    loaded.value = true;
  }, 1500);
};
</script>

<style scoped></style>
