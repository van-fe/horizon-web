<template>
  <section class="backtop-target-demo">
    <div class="backtop-target-demo__scroll" tabindex="0" aria-label="Scrollable project activity">
      <article v-for="item in activities" :key="item.title">
        <span>{{ item.time }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </article>
    </div>

    <p class="backtop-target-demo__status" aria-live="polite">{{ status }}</p>

    <h-backtop
      target=".backtop-target-demo__scroll"
      :bottom="220"
      :visibility-height="80"
      @click="status = 'Activity list returned to the latest update'"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref('Scroll inside the activity panel to reveal the action');
const activities = [
  {
    time: '09:10',
    title: 'Design review completed',
    description: 'Navigation states are ready for implementation.',
  },
  {
    time: '10:25',
    title: 'Build promoted',
    description: 'Version 2.8.0 is now available in staging.',
  },
  {
    time: '11:40',
    title: 'Accessibility checks passed',
    description: 'Keyboard and screen-reader paths were verified.',
  },
  {
    time: '13:15',
    title: 'Copy approved',
    description: 'Localized release notes are ready to publish.',
  },
  {
    time: '14:30',
    title: 'QA session started',
    description: 'The team is validating narrow and dark themes.',
  },
  {
    time: '16:05',
    title: 'Release candidate signed',
    description: 'All blocking issues have been resolved.',
  },
];
</script>

<style scoped>
.backtop-target-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.backtop-target-demo p {
  margin: 0;
}

.backtop-target-demo__status,
.backtop-target-demo article span,
.backtop-target-demo article p {
  color: var(--h-text-secondary);
}

.backtop-target-demo__scroll {
  box-sizing: border-box;
  overflow: auto;
  width: 100%;
  height: 280px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
  scroll-behavior: smooth;
}

.backtop-target-demo article {
  display: grid;
  gap: var(--h-spacing-1);
  min-height: 88px;
  padding: var(--h-spacing-5);
  border-bottom: 1px solid var(--h-border-default);
  background: var(--h-bg-default);
}

.backtop-target-demo article:last-child {
  border-bottom: 0;
}

@media (max-width: 520px) {
}
</style>
