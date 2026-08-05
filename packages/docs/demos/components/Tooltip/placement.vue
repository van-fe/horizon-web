<script setup lang="ts">
import { ref } from 'vue';

type TooltipPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';
type TooltipSize = 'small' | 'medium' | 'large';
type TooltipTheme = 'dark' | 'light';

const placements: Array<{
  value: TooltipPlacement;
  label: string;
  row: number;
  column: number;
}> = [
  { value: 'top-start', label: '上左', row: 1, column: 2 },
  { value: 'top', label: '上', row: 1, column: 3 },
  { value: 'top-end', label: '上右', row: 1, column: 4 },
  { value: 'left-start', label: '左上', row: 2, column: 1 },
  { value: 'right-start', label: '右上', row: 2, column: 5 },
  { value: 'left', label: '左', row: 3, column: 1 },
  { value: 'right', label: '右', row: 3, column: 5 },
  { value: 'left-end', label: '左下', row: 4, column: 1 },
  { value: 'right-end', label: '右下', row: 4, column: 5 },
  { value: 'bottom-start', label: '下左', row: 5, column: 2 },
  { value: 'bottom', label: '下', row: 5, column: 3 },
  { value: 'bottom-end', label: '下右', row: 5, column: 4 },
];

const size = ref<TooltipSize>('medium');
const theme = ref<TooltipTheme>('dark');
const hideAfter = ref(200);
</script>

<template>
  <div class="tooltip-placement-demo">
    <div class="tooltip-controls">
      <label>
        <span>尺寸</span>
        <h-segmented v-model:active-key="size" size="small">
          <h-segmented-item value="small" label="S" />
          <h-segmented-item value="medium" label="M" />
          <h-segmented-item value="large" label="L" />
        </h-segmented>
      </label>
      <label>
        <span>主题</span>
        <h-segmented v-model:active-key="theme" size="small">
          <h-segmented-item value="dark" label="Dark" />
          <h-segmented-item value="light" label="Light" />
        </h-segmented>
      </label>
      <label class="tooltip-controls__delay">
        <span>
          关闭延迟
          <code>{{ hideAfter }}ms</code>
        </span>
        <h-slider v-model="hideAfter" :min="0" :max="800" :step="100" />
      </label>
    </div>

    <div class="tooltip-position-preview">
      <div class="tooltip-placements">
        <h-tooltip
          v-for="item in placements"
          :key="item.value"
          :placement="item.value"
          :content="item.value"
          :size="size"
          :theme="theme"
          :hide-after="hideAfter"
          :flip="false"
          :style="{ gridArea: `${item.row} / ${item.column}` }"
        >
          <h-button size="small" type="normal">{{ item.label }}</h-button>
        </h-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-placement-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.tooltip-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: var(--h-spacing-4);
}

.tooltip-controls label {
  display: grid;
  gap: var(--h-spacing-2);
}

.tooltip-controls label > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.tooltip-controls__delay {
  flex: 1 1 220px;
}

.tooltip-position-preview {
  overflow-x: auto;
  padding-block: var(--h-spacing-2);
}

.tooltip-placements {
  display: grid;
  grid-template-columns: repeat(5, 88px);
  grid-template-rows: repeat(5, auto);
  gap: var(--h-spacing-3);
  width: max-content;
  min-width: 100%;
}

.tooltip-placements :deep(.h-popover__reference),
.tooltip-placements :deep(.h-button) {
  width: 100%;
}
</style>
