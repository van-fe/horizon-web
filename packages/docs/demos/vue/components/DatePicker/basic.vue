<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const releaseDate = ref(dayjs().add(7, 'day'));
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="releaseDate" type="date" />
    <p aria-live="polite">Planned release: {{ releaseDate.format('YYYY-MM-DD') }}</p>
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
