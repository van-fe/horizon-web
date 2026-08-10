<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOption } from '@aurora/horizon-web';

const value = ref('');
const options: HAutoCompleteOption[] = [
  { label: 'Avery Stone', value: 'avery.stone@example.com', description: 'Product Design' },
  { label: 'Jordan Lee', value: 'jordan.lee@example.com', description: 'Engineering' },
  { label: 'Sam Rivera', value: 'sam.rivera@example.com', description: 'Customer Success' },
];
</script>

<template>
  <section class="docs-demo">
    <h-auto-complete v-model="value" :options="options" placeholder="搜索联系人" clearable />
    <p class="docs-demo__status">modelValue: {{ value || '—' }}</p>
  </section>
</template>
