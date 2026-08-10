<template>
  <section class="divider-list">
    <div v-for="style in lineStyles" :key="style">
      <code>{{ style }}</code>
      <h-divider :line-style="style" />
    </div>
  </section>
</template>

<script setup lang="ts">
const lineStyles = ['solid', 'dashed', 'dotted'] as const;
</script>

<style scoped>
.divider-list {
  display: grid;
  gap: var(--h-spacing-5);
}

.divider-list > div {
  display: grid;
  gap: var(--h-spacing-1);
}

.divider-list code {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
