<template>
  <div class="checkbox-basic-demo">
    <div class="checkbox-basic-demo__options">
      <h-checkbox
        v-for="preference in preferences"
        :key="preference.label"
        v-model="preference.checked"
        @change="value => recordChange(preference.label, value)"
      >
        {{ preference.label }}
      </h-checkbox>
    </div>
    <p aria-live="polite">{{ selectedCount }} selected · {{ lastChange }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const preferences = ref([
  { label: 'Mentions and replies', checked: true },
  { label: 'Weekly digest', checked: true },
  { label: 'Research updates', checked: false },
]);
const lastChange = ref('Ready');
const selectedCount = computed(
  () => preferences.value.filter(preference => preference.checked).length,
);

function recordChange(label: string, value: boolean) {
  lastChange.value = `${label} ${value ? 'enabled' : 'disabled'}`;
}
</script>

<style scoped>
.checkbox-basic-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.checkbox-basic-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-4) var(--h-spacing-6);
}

.checkbox-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
