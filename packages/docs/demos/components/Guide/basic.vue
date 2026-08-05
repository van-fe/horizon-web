<script setup lang="ts">
import { ref, shallowRef } from 'vue';

const createRef = shallowRef<HTMLElement | null>(null);
const publishRef = shallowRef<HTMLElement | null>(null);
const current = ref(0);
const visible = ref(false);
const status = ref('Tour not started');

function start() {
  current.value = 0;
  visible.value = true;
  status.value = 'Tour in progress';
}
</script>

<template>
  <section class="guide-demo">
    <div class="guide-actions">
      <h-button ref="createRef" type="normal">Create draft</h-button>
      <h-button class="guide-invite" type="normal">Invite reviewers</h-button>
      <h-button ref="publishRef" type="normal">Publish</h-button>
      <h-button @click="start">Start tour</h-button>
    </div>
    <output aria-live="polite">{{ status }}</output>

    <h-guide
      v-model="current"
      v-model:visible="visible"
      type="primary"
      @close="status = 'Tour skipped'"
      @finish="status = 'Tour completed'"
    >
      <h-guide-item
        :target="createRef"
        title="Create a draft"
        content="Start with a private draft that is safe to iterate on."
      />
      <h-guide-item
        target=".guide-invite"
        title="Invite reviewers"
        content="Bring collaborators in before publishing."
        placement="top-start"
      />
      <h-guide-item
        :target="publishRef"
        title="Publish when ready"
        content="Make the approved draft visible."
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
