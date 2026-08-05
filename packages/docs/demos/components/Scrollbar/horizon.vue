<script setup lang="ts">
const stages = [
  'Requirements',
  'Interaction',
  'Visual review',
  'Development',
  'Integration',
  'Release',
  'Complete',
];
</script>

<template>
  <h-scrollbar class="scrollbar-horizontal-demo" size="small" height="140px">
    <div class="scrollbar-horizontal-demo__row">
      <div v-for="(stage, index) in stages" :key="stage">
        <small>{{ String(index + 1).padStart(2, '0') }}</small>
        <strong>{{ stage }}</strong>
      </div>
    </div>
  </h-scrollbar>
</template>

<style scoped>
.scrollbar-horizontal-demo {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
}

.scrollbar-horizontal-demo__row {
  display: grid;
  grid-template-columns: repeat(7, 160px);
  min-inline-size: 1120px;
}

.scrollbar-horizontal-demo__row > div {
  display: grid;
  align-content: center;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
  min-block-size: 112px;
  padding-inline: var(--h-spacing-3);
  border-right: 1px solid var(--h-divider-default);
}

.scrollbar-horizontal-demo__row small {
  color: var(--h-text-secondary);
}
</style>
