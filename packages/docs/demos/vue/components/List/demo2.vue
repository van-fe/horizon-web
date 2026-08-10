<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Size</span>
        <h-segmented v-model:active-key="size" size="small" block>
          <h-segmented-item value="small" label="Small" />
          <h-segmented-item value="medium" label="Medium" />
        </h-segmented>
      </label>
      <h-switch v-model="titleBold" label="Bold titles" />
    </div>

    <h-list :max-height="340" :size="size">
      <h-list-item
        v-for="event in events"
        :key="event.id"
        :title-bold="titleBold"
        :title="event.title"
        :subtitle="event.time"
        :describe="event.description"
      />
    </h-list>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const events = [
  {
    id: 1,
    title: 'Release candidate deployed',
    time: '14:42',
    description: 'Version 3.8.0-rc.2 is available in the staging environment.',
  },
  {
    id: 2,
    title: 'Visual regression suite passed',
    time: '14:18',
    description: 'All 286 light and dark theme snapshots matched their approved baselines.',
  },
  {
    id: 3,
    title: 'Accessibility review completed',
    time: '13:56',
    description: 'Keyboard navigation and accessible names passed the release checklist.',
  },
  {
    id: 4,
    title: 'Bundle report generated',
    time: '13:21',
    description: 'The component entry remained within its performance budget.',
  },
];
const size = ref('medium');
const titleBold = ref(true);
</script>
