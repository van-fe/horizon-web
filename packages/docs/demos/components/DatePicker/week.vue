<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const sprintWeek = ref(dayjs().add(1, 'week'));
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="sprintWeek" type="week" format="[Week] ww" />
    <p aria-live="polite">Sprint week: {{ sprintWeek.format('YYYY-[W]ww') }}</p>
  </section>
</template>

<style scoped>
.date-picker-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
