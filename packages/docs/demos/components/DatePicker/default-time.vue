<script setup lang="ts">
import { ref } from 'vue';

const dayRange = ref();
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="dayRange"
      type="date-minutes-range"
      :default-time="['00:00:00', '23:59:59']"
      format="YYYY-MM-DD HH:mm"
    />
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
