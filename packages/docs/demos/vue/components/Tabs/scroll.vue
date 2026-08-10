<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('Aug 2026');
const periods = [
  'Jan 2026',
  'Feb 2026',
  'Mar 2026',
  'Apr 2026',
  'May 2026',
  'Jun 2026',
  'Jul 2026',
  'Aug 2026',
  'Sep 2026',
  'Oct 2026',
  'Nov 2026',
  'Dec 2026',
];
</script>

<template>
  <div class="tabs-scroll-demo">
    <h-tabs v-model:active-key="activeKey" scrollable arrow focusable>
      <h-tab v-for="period in periods" :key="period" :label="period" />
    </h-tabs>
    <p aria-live="polite">{{ activeKey }} report selected.</p>
  </div>
</template>

<style scoped>
.tabs-scroll-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-scroll-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
