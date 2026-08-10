<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const start = dayjs().add(2, 'day');
const value = ref([start, start.add(4, 'day')]);
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="value" type="date-range" hover-to-display-value />
  </section>
</template>

<style scoped>
.date-picker-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
