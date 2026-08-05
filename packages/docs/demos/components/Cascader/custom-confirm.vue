<script setup lang="ts">
import { ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[][]>([['engineering', 'web-platform', 'frontend']]);
const status = ref('No pending changes');
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Notification teams"
      :options="workspaceOptions"
      multiple
      need-confirm
      confirm-button-text="Apply teams"
      cancel-button-text="Keep current"
      :to-body="false"
      @confirm="status = 'Teams applied'"
      @cancel="status = 'Current teams kept'"
    >
      <template #confirmRender="{ cancelHandle, confirmHandle }">
        <h-space wrap>
          <h-button size="small" plain @click="cancelHandle">Keep current</h-button>
          <h-button size="small" @click="confirmHandle">Apply teams</h-button>
        </h-space>
      </template>
    </h-cascader>
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
