<script setup lang="ts">
import { ref } from 'vue';

const mediumValue = ref('week');
const largeValue = ref('week');
const ranges = [
  { value: 'day', label: '今日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
];
</script>

<template>
  <div class="button-grid">
    <section>
      <span>medium</span>
      <h-radio-group v-model="mediumValue" size="medium">
        <h-radio-button v-for="item in ranges" :key="item.value" :value="item.value">
          {{ item.label }}
        </h-radio-button>
      </h-radio-group>
    </section>
    <section>
      <span>large</span>
      <h-radio-group v-model="largeValue" size="large">
        <h-radio-button v-for="item in ranges" :key="item.value" :value="item.value">
          {{ item.label }}
        </h-radio-button>
      </h-radio-group>
    </section>
  </div>
</template>

<style scoped>
.button-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.button-grid section {
  display: grid;
  justify-items: start;
  gap: 14px;
  overflow-x: auto;
  padding: 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-default);
}

.button-grid span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 640px) {
  .button-grid {
    grid-template-columns: 1fr;
  }
}
</style>
