<script setup lang="ts">
import { ref } from 'vue';

const size = ref<string | number>('medium');
const customized = ref(false);

const onChecked = (checked: boolean) => {
  if (checked) size.value = 50;
  else size.value = 'medium';
};
</script>

<template>
  <h-space direction="vertical" size="large">
    <h-space block size="medium">
      <h-space align="start" size="small">
        Size
        <h-radio v-model="size" :disabled="customized" label="small">small</h-radio>
        <h-radio v-model="size" :disabled="customized" label="medium">medium</h-radio>
        <h-radio v-model="size" :disabled="customized" label="large">large</h-radio>
      </h-space>
      <h-space>
        Other Setting:
        <h-checkbox v-model="customized" @change="onChecked">Customize</h-checkbox>
        {{ customized ? `size: ${size}px` : '' }}
      </h-space>
    </h-space>

    <h-slider v-if="customized" v-model="size" :min="8" :max="100" :step="1" />

    <h-space :size="size">
      <h-button>Created</h-button>
      <h-button type="normal">Refresh</h-button>
      <h-button type="normal" icon="full_screen" />
    </h-space>
  </h-space>
</template>

<style scoped></style>
