<script setup lang="ts">
import { ref, shallowRef } from 'vue';

const searchRef = shallowRef<HTMLElement | null>(null);
const saveRef = shallowRef<HTMLElement | null>(null);
const visible = ref(false);
const status = ref('Ready to start');
</script>

<template>
  <section class="guide-demo">
    <div class="guide-actions">
      <h-button ref="searchRef" type="normal">Search</h-button>
      <h-button class="guide-organize" type="normal">Organize</h-button>
      <h-button ref="saveRef" type="normal">Save view</h-button>
      <h-button @click="visible = true">Start maskless tour</h-button>
    </div>
    <output aria-live="polite">{{ status }}</output>

    <h-guide
      v-model:visible="visible"
      :mask="false"
      type="primary"
      @close="status = 'Tour skipped'"
      @finish="status = 'Tour completed'"
    >
      <h-guide-item
        :target="searchRef"
        title="Find records"
        content="Start with a focused search."
      />
      <h-guide-item
        target=".guide-organize"
        title="Organize results"
        content="Apply filters while the interface stays visible."
        placement="top-start"
      />
      <h-guide-item
        :target="saveRef"
        title="Save the view"
        content="Keep the current setup for the next visit."
        placement="right-start"
      />
    </h-guide>
  </section>
</template>

<style scoped>
.guide-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.guide-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

output {
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .guide-actions {
    gap: 8px;
  }
}
</style>
