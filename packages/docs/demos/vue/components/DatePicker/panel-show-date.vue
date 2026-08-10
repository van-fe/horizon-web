<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="value"
      type="date"
      panel-show-date="2024-01-01"
      placeholder="Open the January 2024 panel"
    />
  </section>
</template>

<style scoped>
.date-picker-demo {
  max-inline-size: 680px;
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
