<template>
  <section class="form-inline-demo">
    <h-form :model="filters" inline @submit="applyFilters">
      <h-form-item label="Environment">
        <h-select v-model="filters.environment" aria-label="Environment filter">
          <h-option label="All" value="all" />
          <h-option label="Production" value="production" />
          <h-option label="Staging" value="staging" />
        </h-select>
      </h-form-item>
      <h-form-item label="Owner">
        <h-input v-model="filters.owner" placeholder="Search owner" />
      </h-form-item>
      <h-form-item>
        <h-button native-type="submit">Apply filters</h-button>
      </h-form-item>
    </h-form>
    <p class="form-inline-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const filters = reactive({ environment: 'production', owner: 'Maya' });
const status = ref('Showing all production releases');

function applyFilters() {
  status.value = `Filtering ${filters.environment} releases${filters.owner ? ` owned by ${filters.owner}` : ''}`;
}
</script>

<style scoped>
.form-inline-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-inline-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-inline-demo__status {
  font-size: var(--h-text-sm);
}

@media (max-width: 520px) {
  .form-inline-demo :deep(.h-form-item) {
    width: 100%;
    margin-right: 0;
  }
}
</style>
