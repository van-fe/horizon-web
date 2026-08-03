<script setup lang="ts">
import { ref } from 'vue';

const budget = ref(4200);
const points = ref(850);
</script>

<template>
  <section class="input-number-affix-demo" aria-label="Numeric affixes">
    <label>
      <span>Prefix and suffix slots</span>
      <h-input-number v-model="budget" :min="0" :step="100" aria-label="Campaign budget">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </h-input-number>
    </label>
    <label>
      <span>Icon props</span>
      <h-input-number
        v-model="points"
        :min="0"
        prefix-icon="remind"
        suffix-icon="points"
        aria-label="Reward points"
      />
    </label>
  </section>
</template>

<style scoped>
.input-number-affix-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.input-number-affix-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.input-number-affix-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .input-number-affix-demo {
    grid-template-columns: 1fr;
  }
}
</style>
