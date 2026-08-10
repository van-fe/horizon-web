<template>
  <section class="docs-demo">
    <div class="confirmation-row">
      <span>{{ status }}</span>
      <h-popconfirm
        v-model:visible="visible"
        title="Archive this release documentation?"
        @confirm="confirmArchive"
        @cancel="status = 'Archive cancelled'"
      >
        <template #reference>
          <h-button type="danger" plain>Archive</h-button>
        </template>
      </h-popconfirm>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const status = ref('Release is active');

function confirmArchive() {
  status.value = 'Release archived';
}
</script>

<style scoped>
.confirmation-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
}

.confirmation-row span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 480px) {
  .confirmation-row {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
