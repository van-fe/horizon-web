<script setup lang="ts">
import { computed, ref } from 'vue';

const countries = [
  { value: 'cn', label: '中国', english: 'China' },
  { value: 'sg', label: '新加坡', english: 'Singapore' },
  { value: 'de', label: '德国', english: 'Germany' },
];
const country = ref('cn');
const selectedCountry = computed(() => countries.find(item => item.value === country.value));
</script>

<template>
  <div class="select-demo">
    <h-select v-model="country" :to-body="false">
      <h-option
        v-for="item in countries"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :english="item.english"
      />
      <template #tagRender="props">
        <span class="bilingual-value">
          <strong>{{ props?.label ?? selectedCountry?.label }}</strong>
          <span>{{ props?.english ?? selectedCountry?.english }}</span>
        </span>
      </template>
    </h-select>
    <p class="docs-demo__status">{{ selectedCountry?.english }}</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

.bilingual-value {
  display: inline-flex;
  min-width: 0;
  align-items: baseline;
  gap: 6px;
}

.bilingual-value > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
