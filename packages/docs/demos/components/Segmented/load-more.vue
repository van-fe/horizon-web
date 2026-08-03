<template>
  <h-space direction="vertical" block>
    <h-segmented default-active-key="Default Option1">
      <h-segmented-item v-for="v in options" :key="v" :label="v" />
    </h-segmented>
    <h-button type="normal" :loading="loading" :disabled="loaded" @click="onLoad">Load</h-button>
  </h-space>
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
