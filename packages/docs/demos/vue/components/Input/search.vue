<script setup lang="ts">
import { computed, ref } from 'vue';
import { AIcon } from '@aurora/icon';

const resources = [
  'Release readiness',
  'Regional rollout',
  'Research repository',
  'Renewal playbook',
  'Incident review',
];
const query = ref('re');
const submitted = ref('');
const resultCount = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return resources.filter(item => item.toLowerCase().includes(needle)).length;
});
</script>

<template>
  <section class="input-search-demo">
    <h-input
      v-model="query"
      clearable
      placeholder="Search workspace resources"
      aria-label="Search workspace resources"
      @keyup.enter="submitted = query.trim()"
    >
      <template #prefix><a-icon name="search" aria-hidden="true" /></template>
    </h-input>
    <small aria-live="polite">
      {{ resultCount }} result(s) ·
      {{ submitted ? `Last submitted: ${submitted}` : 'Press Enter to submit' }}
    </small>
  </section>
</template>

<style scoped>
.input-search-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 640px;
}

.input-search-demo > small {
  color: var(--h-text-secondary);
}
</style>
