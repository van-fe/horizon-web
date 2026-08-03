<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const inputable = ref(false);
const value = ref(dayjs().add(2, 'day'));
</script>

<template>
  <section class="date-picker-option">
    <h-switch v-model="inputable" label="Allow typing" />
    <h-date-picker v-model="value" :inputable="inputable" />
  </section>
</template>

<style scoped>
.date-picker-option {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-option :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-option {
    inline-size: 100%;
  }
}
</style>
