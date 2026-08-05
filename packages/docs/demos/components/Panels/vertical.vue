<template>
  <div class="docs-demo">
    <h-radio-group v-model="currentPanel">
      <h-radio value="draft">Draft</h-radio>
      <h-radio value="review">Review</h-radio>
      <h-radio value="approved">Approved</h-radio>
    </h-radio-group>
    <h-panels v-model="currentPanel" vertical animated>
      <h-panel v-for="panel in panels" :key="panel.name" :name="panel.name">
        <p class="panel-content">{{ panel.content }}</p>
      </h-panel>
    </h-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPanel = ref('draft');
const panels = [
  { name: 'draft', content: 'Shape the proposal.' },
  { name: 'review', content: 'Collect team feedback.' },
  { name: 'approved', content: 'Prepare the rollout.' },
];
</script>

<style scoped>
.panel-content {
  margin: 0;
  padding: var(--h-spacing-5);
  color: var(--h-text-secondary);
}
</style>
