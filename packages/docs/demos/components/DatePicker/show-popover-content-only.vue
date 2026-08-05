<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref(dayjs().add(1, 'day'));
</script>

<template>
  <section class="date-picker-inline-panel">
    <h-date-picker v-model="value" type="date" show-popover-content-only />
  </section>
</template>

<style scoped>
.date-picker-inline-panel {
  max-inline-size: 360px;
}

@media (max-width: 390px) {
  .date-picker-inline-panel {
    inline-size: 100%;
  }
}
</style>
