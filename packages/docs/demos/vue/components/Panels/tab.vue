<template>
  <div class="docs-demo">
    <h-tabs v-model="currentPanel">
      <h-tab v-for="panel in panels" :key="panel.name" :label="panel.label" />
    </h-tabs>
    <h-panels v-model="currentPanel" animated>
      <h-panel v-for="panel in panels" :key="panel.name" :name="panel.name">
        <p class="panel-content">{{ panel.content }}</p>
      </h-panel>
    </h-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPanel = ref('adoption');
const panels = [
  { name: 'adoption', label: 'Adoption', content: '18 active projects' },
  { name: 'quality', label: 'Quality', content: '96% checks passing' },
  { name: 'support', label: 'Support', content: '2h first response' },
];
</script>

<style scoped>
.panel-content {
  margin: 0;
  padding: var(--h-spacing-5);
  color: var(--h-text-secondary);
}
</style>
