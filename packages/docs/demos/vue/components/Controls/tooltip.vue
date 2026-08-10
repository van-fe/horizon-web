<template>
  <div class="controls-tooltip-demo">
    <h-switch v-model="useTooltip" label="Show tooltips" />

    <h-hover v-slot="{ hover }">
      <div class="controls-target">
        <strong>Quarterly research report</strong>
        <span>PDF · 8.4 MB</span>
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" :use-tooltip="useTooltip" @command="onCommand">
            <h-control :icon="IconEye" text="Preview report" label="view" />
            <h-control :icon="IconEdit" text="Edit details" label="edit" />
            <h-control :icon="IconRubbish" text="Delete report" label="delete" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>

    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconEdit, IconEye, IconRubbish } from '@aurora/icon';
import { ref } from 'vue';

const useTooltip = ref(true);
const status = ref('No action selected');

function onCommand(type: 'view' | 'edit' | 'delete') {
  status.value = `${type} selected`;
}
</script>

<style scoped>
.controls-tooltip-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
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
.controls-tooltip-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
