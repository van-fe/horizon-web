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
  <h-select v-model="size" size="small" class="mr-2">
    <h-option value="small" label="small" />
    <h-option value="medium" label="medium" />
    <h-option value="large" label="large" />
  </h-select>
</template>
