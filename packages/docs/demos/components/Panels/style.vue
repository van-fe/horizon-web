<template>
  <div class="docs-demo">
    <h-tabs v-model="currentPanel">
      <h-tab key="focus" label="Focus" />
      <h-tab key="collaborate" label="Collaborate" />
      <h-tab key="ship" label="Ship" />
    </h-tabs>
    <h-panels v-model="currentPanel" animated>
      <h-panel v-for="panel in panels" :key="panel.name" :name="panel.name">
        <p class="styled-panel">{{ panel.content }}</p>
      </h-panel>
    </h-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPanel = ref('focus');
const panels = [
  { name: 'focus', content: 'Clarify the outcome and remove noise.' },
  { name: 'collaborate', content: 'Bring the right people into the decision.' },
  { name: 'ship', content: 'Deliver in small, observable stages.' },
];
</script>

<style scoped>
.styled-panel {
  margin: 0;
  border-inline-start: 3px solid var(--h-border-brand-default);
  padding: var(--h-spacing-5);
  color: var(--h-text-secondary);
}
</style>
