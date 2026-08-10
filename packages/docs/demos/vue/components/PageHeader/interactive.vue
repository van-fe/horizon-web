<template>
  <div class="page-header-interactive-demo">
    <h-page-header>
      <template #title>Checkout readiness review</template>
      <template #tags>
        <h-tag size="small" type="warning" :clickable="false">High priority</h-tag>
      </template>
      <template #content>
        <span class="page-header-meta">INC-2048</span>
        <copy-btn text="INC-2048" />
      </template>
      <template #extra>
        <h-button @click="status = 'Review opened'">Open review</h-button>
      </template>
    </h-page-header>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref('Ready');
</script>

<style scoped>
.page-header-interactive-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.page-header-meta {
  margin-right: var(--h-spacing-2);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.page-header-interactive-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
