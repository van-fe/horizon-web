<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { sizeChangeInjectedKey } from '../../utils/injectedKeys';

const size = ref('medium');
const sizeChange = inject(sizeChangeInjectedKey, () => void 0);

watch(size, val => {
  sizeChange(val);
});
</script>

<template>
  <n-select v-model="size" size="small" class="mr-2">
    <n-option value="small" label="small" />
    <n-option value="medium" label="medium" />
    <n-option value="large" label="large" />
  </n-select>
</template>
