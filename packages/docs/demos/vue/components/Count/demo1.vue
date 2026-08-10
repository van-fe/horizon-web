<script setup lang="ts">
import { ref } from 'vue';

const currentValue = ref(88);
</script>

<template>
  <section class="docs-demo">
    <h-count
      :start-value="88"
      :end-value="100"
      suffix="%"
      :delay="48"
      @change="currentValue = $event"
    />
    <p class="docs-demo__status">
      {{ currentValue >= 100 ? 'Complete' : `${currentValue}%` }}
    </p>
  </section>
</template>

<style scoped>
.docs-demo :deep(.h-count) {
  font-size: var(--h-text-3xl);
  font-weight: var(--h-weight-strong);
}
</style>
