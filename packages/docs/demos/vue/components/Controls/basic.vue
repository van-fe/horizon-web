<template>
  <div class="controls-basic-demo">
    <h-hover v-slot="{ hover }">
      <div class="controls-target">
        <strong>Foundation audit</strong>
        <span>Updated 12 minutes ago</span>
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" @command="onCommand">
            <h-control label="edit" :icon="IconEdit" text="Edit" />
            <h-control label="delete" :icon="IconRubbish" text="Delete" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>
    <p aria-live="polite">{{ lastAction }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { ref } from 'vue';

const lastAction = ref('No action selected');

function onCommand(type: 'edit' | 'delete') {
  lastAction.value = type === 'edit' ? 'Edit selected' : 'Delete selected';
}
</script>

<style scoped>
.controls-basic-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.controls-target {
  position: relative;
  display: grid;
  align-content: center;
  gap: var(--h-spacing-1);
  width: min(100%, 420px);
  min-height: 120px;
  padding: var(--h-spacing-5);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}

.controls-target span,
.controls-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
