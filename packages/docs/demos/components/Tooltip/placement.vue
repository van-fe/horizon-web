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

const placements: Array<{ value: TooltipPlacement; label: string }> = [
  { value: 'top-start', label: '上左' },
  { value: 'top', label: '上' },
  { value: 'top-end', label: '上右' },
  { value: 'right-start', label: '右上' },
  { value: 'right', label: '右' },
  { value: 'right-end', label: '右下' },
  { value: 'bottom-start', label: '下左' },
  { value: 'bottom', label: '下' },
  { value: 'bottom-end', label: '下右' },
  { value: 'left-start', label: '左上' },
  { value: 'left', label: '左' },
  { value: 'left-end', label: '左下' },
];
const size = ref<TooltipSize>('medium');
const theme = ref<TooltipTheme>('dark');
const hideAfter = ref(200);
const activePlacement = ref<TooltipPlacement>('top');
</script>

<template>
  <div class="tooltip-placement-demo">
    <div class="tooltip-controls">
      <label>
        <span>尺寸</span>
        <h-segmented v-model:active-key="size" size="small">
          <h-segmented-item key="small" label="S" />
          <h-segmented-item key="medium" label="M" />
          <h-segmented-item key="large" label="L" />
        </h-segmented>
      </label>
      <label>
        <span>主题</span>
        <h-segmented v-model:active-key="theme" size="small">
          <h-segmented-item key="dark" label="Dark" />
          <h-segmented-item key="light" label="Light" />
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

    <div class="tooltip-placements">
      <h-tooltip
        v-for="item in placements"
        :key="item.value"
        :placement="item.value"
        :content="item.value"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
        @show="activePlacement = item.value"
      >
        <h-button size="small" type="normal">{{ item.label }}</h-button>
      </h-tooltip>
    </div>
    <span class="tooltip-placement-demo__status" aria-live="polite">
      最近查看：{{ activePlacement }}
    </span>
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

.tooltip-controls label > span,
.tooltip-placement-demo__status {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.tooltip-controls__delay {
  flex: 1 1 220px;
}

.tooltip-placements {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--h-spacing-3);
}

.tooltip-placements :deep(.h-popover__reference),
.tooltip-placements :deep(.h-button) {
  width: 100%;
}

@media (max-width: 520px) {
  .tooltip-placements {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
