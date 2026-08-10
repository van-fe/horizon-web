<template>
  <div class="controls-disabled-demo">
    <h-switch v-model="disabled" label="Disable actions" />

    <h-hover v-slot="{ hover }">
      <div class="controls-target">
        <strong>Customer research export</strong>
        <span>{{ disabled ? 'Preparing files' : 'Ready to download' }}</span>
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" :disabled="disabled" @command="onCommand">
            <h-control label="view" :icon="IconEye" text="Preview" />
            <h-control label="delete" :icon="IconRubbish" text="Delete" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>

    <p aria-live="polite">{{ disabled ? 'Actions unavailable' : status }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconEye, IconRubbish } from '@aurora/icon';
import { ref } from 'vue';

const disabled = ref(true);
const status = ref('Actions ready');

function onCommand(type: 'view' | 'delete') {
  status.value = `${type} selected`;
}
</script>

<style scoped>
.controls-disabled-demo {
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
.controls-disabled-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
