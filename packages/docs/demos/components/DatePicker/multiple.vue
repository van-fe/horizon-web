<script setup lang="ts">
import { computed, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const milestones = ref([
  { key: 'design', label: 'Design freeze', value: dayjs().add(3, 'day') },
  { key: 'qa', label: 'QA sign-off', value: dayjs().add(8, 'day') },
  { key: 'release', label: 'Production release', value: dayjs().add(12, 'day') },
]);
const summary = computed(() => {
  const first = milestones.value[0].value;
  const last = milestones.value.at(-1)?.value;
  return `${last?.diff(first, 'day') ?? 0}-day release plan`;
});
</script>

<template>
  <section class="date-picker-multiple">
    <div>
      <label v-for="milestone in milestones" :key="milestone.key">
        <span>{{ milestone.label }}</span>
        <h-date-picker v-model="milestone.value" type="date" :clearable="false" />
      </label>
    </div>
    <p aria-live="polite">{{ summary }}</p>
  </section>
</template>

<style scoped>
.date-picker-multiple {
  display: grid;
  gap: var(--h-spacing-3);
}

.date-picker-multiple > div {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--h-spacing-3);
}

.date-picker-multiple label {
  display: grid;
  gap: var(--h-spacing-2);
}

.date-picker-multiple label > span,
.date-picker-multiple p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-multiple > div {
    grid-template-columns: 1fr;
  }
}
</style>
