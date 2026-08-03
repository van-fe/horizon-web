<template>
  <div class="controls-resize-demo">
    <h-segmented v-model:active-key="widthKey" size="small">
      <h-segmented-item key="120" label="120 px" />
      <h-segmented-item key="200" label="200 px" />
      <h-segmented-item key="320" label="320 px" />
    </h-segmented>

    <h-hover v-slot="{ hover }">
      <div class="controls-target" :style="{ width: `${width}px` }">
        <strong>{{ width }} px</strong>
        <span>Hover for actions</span>
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" @command="onCommand">
            <h-control :icon="IconEye" text="View" label="view" />
            <h-control :icon="IconEdit" text="Edit" label="edit" />
            <h-control :icon="IconMessage" text="Comment" label="comment" />
            <h-control :icon="IconRubbish" text="Delete" label="delete" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>

    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconEdit, IconEye, IconMessage, IconRubbish } from '@aurora/icon';
import { computed, ref } from 'vue';

const widthKey = ref('200');
const status = ref('No action selected');
const width = computed(() => Number(widthKey.value));

function onCommand(type: 'view' | 'edit' | 'comment' | 'delete') {
  status.value = `${type} selected at ${width.value} px`;
}
</script>

<style scoped>
.controls-resize-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.controls-target {
  position: relative;
  display: grid;
  align-content: center;
  gap: var(--h-spacing-1);
  max-width: 100%;
  min-height: 120px;
  padding: var(--h-spacing-4);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}

.controls-target span,
.controls-resize-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
