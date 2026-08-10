<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, formatSelectionCount, workspaceOptions } from './options';

const inputStyle = ref<'normal' | 'emphasize' | 'no-border'>('normal');
const checkStrictly = ref(false);
const disabled = ref(false);
const singleValue = ref<string[]>(['product', 'design-system', 'accessibility']);
const multipleValue = ref<string[][]>([['engineering', 'web-platform', 'frontend']]);
const status = ref('Ready');
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="inputStyle" size="small">
        <h-segmented-item value="normal" label="Normal" />
        <h-segmented-item value="emphasize" label="Emphasis" />
        <h-segmented-item value="no-border" label="Plain" />
      </h-segmented>
      <h-switch v-model="checkStrictly" label="Independent nodes" />
      <h-switch v-model="disabled" label="Disabled" />
    </div>
    <div class="docs-demo__grid">
      <div class="docs-demo__stack">
        <h-cascader
          v-model="singleValue"
          aria-label="Single selection"
          size="medium"
          :input-style="inputStyle"
          :disabled="disabled"
          :check-strictly="checkStrictly"
          :options="workspaceOptions"
          :to-body="false"
          @focus="status = 'Single picker focused'"
          @change="status = 'Single selection changed'"
        />
        <span>{{ formatPath(singleValue) }}</span>
      </div>
      <div class="docs-demo__stack">
        <h-cascader
          v-model="multipleValue"
          aria-label="Multiple selection"
          size="medium"
          :input-style="inputStyle"
          :disabled="disabled"
          :check-strictly="checkStrictly"
          :options="workspaceOptions"
          multiple
          collapse-tags
          :to-body="false"
          @focus="status = 'Multiple picker focused'"
          @change="status = 'Multiple selection changed'"
        />
        <span>{{ formatSelectionCount(multipleValue) }}</span>
      </div>
    </div>
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
