<template>
  <div class="collapse-size-demo">
    <div class="collapse-size-demo__controls">
      <div>
        <span>Size</span>
        <h-segmented v-model:active-key="size" size="small">
          <h-segmented-item key="small" label="Small" />
          <h-segmented-item key="medium" label="Medium" />
          <h-segmented-item key="large" label="Large" />
        </h-segmented>
      </div>
      <div>
        <span>Icon</span>
        <h-segmented v-model:active-key="iconPosition" size="small">
          <h-segmented-item key="left" label="Left" />
          <h-segmented-item key="right" label="Right" />
        </h-segmented>
      </div>
    </div>

    <h-collapse
      v-model:active-key="activeKeys"
      filled
      :size="size"
      :expand-icon-position="iconPosition"
    >
      <h-collapse-item
        v-for="section in sections"
        :key="section.id"
        :name="section.id"
        :title="section.title"
      >
        <p>{{ section.content }}</p>
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
const iconPosition = ref<'left' | 'right'>('left');
const activeKeys = ref(['scope']);
const sections = [
  {
    id: 'scope',
    title: 'Project scope',
    content: 'A lightweight reporting page for three cross-functional teams.',
  },
  {
    id: 'owners',
    title: 'Owners',
    content: 'Design owns the flow, Engineering owns data quality, and Operations owns rollout.',
  },
];
</script>

<style scoped>
.collapse-size-demo {
  display: grid;
  gap: var(--h-spacing-5);
}

.collapse-size-demo__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-4) var(--h-spacing-6);
}

.collapse-size-demo__controls > div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}

.collapse-size-demo__controls span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.collapse-size-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}
</style>
