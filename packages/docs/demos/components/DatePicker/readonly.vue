<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const launchDate = ref(dayjs('2026-08-18'));
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="launchDate" type="date" readonly />
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
