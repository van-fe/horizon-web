<template>
  <div class="docs-demo">
    <h-radio-group v-model="currentPanel">
      <h-radio value="scope">Scope</h-radio>
      <h-radio value="quality">Quality</h-radio>
      <h-radio value="rollout">Rollout</h-radio>
    </h-radio-group>
    <h-panels v-model="currentPanel" animated>
      <h-panel v-for="panel in panels" :key="panel.name" :name="panel.name">
        <p class="panel-content">{{ panel.content }}</p>
      </h-panel>
    </h-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPanel = ref('scope');
const panels = [
  { name: 'scope', content: 'Define what belongs in this release.' },
  { name: 'quality', content: 'Run the required quality checks.' },
  { name: 'rollout', content: 'Release in observable stages.' },
];
</script>

<style scoped>
.panel-content {
  margin: 0;
  padding: var(--h-spacing-5);
  color: var(--h-text-secondary);
}
</style>
