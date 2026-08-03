<script setup lang="ts">
import { ref } from 'vue';

const reference = ref('AP-1042');
const amount = ref('1,240.00');
</script>

<template>
  <section class="input-icon-demo" aria-label="Input affixes">
    <label>
      <span>Icon props</span>
      <h-input v-model="reference" prefix-icon="search" suffix-icon="check" />
    </label>
    <label>
      <span>Prefix and suffix slots</span>
      <h-input v-model="amount" inputmode="decimal">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </h-input>
    </label>
  </section>
</template>

<style scoped>
.input-icon-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.input-icon-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.input-icon-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .input-icon-demo {
    grid-template-columns: 1fr;
  }
}
</style>
