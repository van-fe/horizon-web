<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('mobility');
const products = [
  { key: 'mobility', label: 'Mobility', icon: 'car' },
  { key: 'energy', label: 'Energy', icon: 'change_power' },
  { key: 'benefits', label: 'Benefits', icon: 'card_voucher' },
];
const activeProduct = computed(() => products.find(product => product.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-icon-demo">
    <h-tabs v-model:active-key="activeKey">
      <h-tab
        v-for="product in products"
        :key="product.key"
        :label="product.label"
        :icon="product.icon"
      />
    </h-tabs>
    <p aria-live="polite">{{ activeProduct.label }} selected.</p>
  </div>
</template>

<style scoped>
.tabs-icon-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-icon-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
