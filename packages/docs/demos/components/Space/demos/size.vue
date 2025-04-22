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
  <n-space direction="vertical" size="large">
    <n-space block size="medium">
      <n-space align="start" size="small">
        Size
        <n-radio v-model="size" :disabled="customized" label="small">small</n-radio>
        <n-radio v-model="size" :disabled="customized" label="medium">medium</n-radio>
        <n-radio v-model="size" :disabled="customized" label="large">large</n-radio>
      </n-space>
      <n-space>
        Other Setting:
        <n-checkbox v-model="customized" @change="onChecked">Customize</n-checkbox>
        {{ customized ? `size: ${size}px` : '' }}
      </n-space>
    </n-space>

    <n-slider v-if="customized" v-model="size" :min="8" :max="100" :step="1" />

    <n-space :size="size">
      <n-button>Created</n-button>
      <n-button type="normal">Refresh</n-button>
      <n-button type="normal" icon="full_screen" />
    </n-space>
  </n-space>
</template>

<style scoped></style>
