<script setup lang="ts">
import { IconArrowRight, IconCheck } from '@aurora/icon';
import { ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[]>(['product', 'growth', 'activation']);
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Release team"
    :options="workspaceOptions"
    :expand-icon="IconArrowRight"
    :selected-icon="IconCheck"
    :to-body="false"
  />
</template>
