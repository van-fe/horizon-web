<script setup lang="ts">
import { ref } from 'vue';

type OptionInput = { value?: unknown; label?: unknown; region?: unknown };
type FormattedValue = { id: unknown; name: unknown; region: unknown };

const members = [
  { value: 'u-104', label: 'Mia Chen', region: 'Shanghai' },
  { value: 'u-208', label: 'Noah Li', region: 'Singapore' },
  { value: 'u-316', label: 'Ava Wang', region: 'Frankfurt' },
];
const reviewer = ref<FormattedValue>({ id: 'u-104', name: 'Mia Chen', region: 'Shanghai' });

function valueFormat(option: OptionInput): FormattedValue {
  return { id: option.value, name: option.label, region: option.region };
}
</script>

<template>
  <div class="select-demo">
    <h-select v-model="reviewer" :value-format="valueFormat" :to-body="false">
      <h-option v-for="member in members" :key="member.value" v-bind="member" />
    </h-select>
    <p class="docs-demo__status" role="status">
      {{ reviewer.name }} · {{ reviewer.id }} · {{ reviewer.region }}
    </p>
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
</style>
