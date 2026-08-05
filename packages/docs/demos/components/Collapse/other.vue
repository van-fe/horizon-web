<template>
  <div class="collapse-slots-demo">
    <h-collapse v-model:active-key="activeKeys">
      <h-collapse-item name="research">
        <template #title>
          <span class="panel-title">
            <AIcon name="task_complete" size="20" />
            Research synthesis
            <h-tag size="small" type="success">Complete</h-tag>
          </span>
        </template>
        <p>Seven interviews were grouped into three recurring workflow themes.</p>
      </h-collapse-item>

      <h-collapse-item name="prototype">
        <template #title>
          <span class="panel-title panel-title--action">
            <span>
              <AIcon name="alarm" size="20" />
              Prototype review
            </span>
            <h-button size="small" plain @click.stop="requestReview">Request review</h-button>
          </span>
        </template>
        <p>The prototype is ready for accessibility and narrow-screen review.</p>
      </h-collapse-item>
    </h-collapse>
    <p class="collapse-slots-demo__status" aria-live="polite">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKeys = ref(['research', 'prototype']);
const status = ref('No review requested');

function requestReview() {
  status.value = 'Prototype review requested';
}
</script>

<style scoped>
.collapse-slots-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.panel-title,
.panel-title > span {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-2);
}

.panel-title--action {
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding-right: var(--h-spacing-3);
}

.collapse-slots-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}

.collapse-slots-demo__status {
  font-size: var(--h-text-sm);
}

@media (max-width: 480px) {
  .panel-title--action {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
