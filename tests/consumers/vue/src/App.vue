<script setup lang="ts">
import { ref } from 'vue';
import { HButton } from '@aurora/horizon-web-vue/es/components/Button';
import { HSelect } from '@aurora/horizon-web-vue/es/components/Select';

const value = ref<string>();
const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
];
</script>

<template>
  <HButton>Vue consumer</HButton>
  <HSelect v-model="value" :options="options" />
</template>
