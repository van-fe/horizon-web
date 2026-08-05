<template>
  <section class="docs-demo">
    <div class="plate-state-list">
      <label class="plate-state-list__item">
        <span>New energy</span>
        <h-license-plate-input v-model="newEnergyPlate" new-energy aria-label="New-energy plate" />
      </label>
      <label class="plate-state-list__item">
        <span>Invalid value</span>
        <h-license-plate-input v-model="invalidPlate" aria-label="Invalid plate example" />
      </label>
      <label class="plate-state-list__item">
        <span>Disabled</span>
        <h-license-plate-input model-value="沪A12345" disabled aria-label="Disabled plate" />
      </label>
      <label class="plate-state-list__item">
        <span>Read-only</span>
        <h-license-plate-input model-value="粤B12345D" readonly aria-label="Read-only plate" />
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newEnergyPlate = ref('粤BD12345');
const invalidPlate = ref('京I12345');
</script>

<style scoped>
.plate-state-list {
  display: grid;
  gap: var(--h-spacing-4);
}

.plate-state-list__item {
  display: grid;
  gap: var(--h-spacing-2);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .plate-state-list {
    overflow-x: auto;
  }
}
</style>
