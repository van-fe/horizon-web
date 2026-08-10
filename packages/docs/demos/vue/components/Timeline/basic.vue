<script setup lang="ts">
const milestones = [
  { name: '需求冻结', timestamp: '08-12 09:30' },
  { name: '代码合并', timestamp: '08-13 16:20' },
  { name: '灰度验证', timestamp: '08-14 11:00' },
  { name: '全量发布', timestamp: '08-14 18:30', tail: false },
];
const sizes = ['small', 'medium', 'large'] as const;
</script>

<template>
  <div class="timeline-basic-demo">
    <section v-for="size in sizes" :key="size">
      <code>{{ size }}</code>
      <h-timeline>
        <h-timeline-item
          v-for="milestone in milestones"
          :key="milestone.name"
          :name="milestone.name"
          :timestamp="milestone.timestamp"
          :tail="milestone.tail"
          :size="size"
        />
      </h-timeline>
    </section>
  </div>
</template>

<style scoped>
.timeline-basic-demo {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.timeline-basic-demo section {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
  padding: var(--h-spacing-4);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
}

.timeline-basic-demo code {
  justify-self: start;
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 860px) {
  .timeline-basic-demo {
    grid-template-columns: 1fr;
  }
}
</style>
