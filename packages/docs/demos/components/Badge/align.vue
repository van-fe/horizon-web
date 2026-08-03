<template>
  <div class="badge-align-demo">
    <div v-for="mode in modes" :key="mode.label">
      <h-badge type="num" :content="8" :align="mode.align" :offset="mode.offset">
        <span class="badge-align-demo__target">Queue</span>
      </h-badge>
      <span>{{ mode.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const modes = [
  { label: 'center-point', align: 'center-point' as const },
  { label: 'inner', align: 'inner' as const },
  { label: 'outer', align: 'outer' as const },
  { label: 'fix-left', align: 'fix-left' as const },
  {
    label: 'custom offset',
    align: 'fix-left' as const,
    offset: { top: '-2px', right: '-2px' },
  },
];
</script>

<style scoped>
.badge-align-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--h-spacing-5);
}

.badge-align-demo > div {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-2);
}

.badge-align-demo__target {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--h-spacing-4);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.badge-align-demo > div > span:last-child {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
