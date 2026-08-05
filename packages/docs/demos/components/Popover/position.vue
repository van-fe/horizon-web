<script setup lang="ts">
const placements = [
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
  { value: 'auto-start', label: '自动起始', row: 6, column: 2 },
  { value: 'auto', label: '自动', row: 6, column: 3 },
  { value: 'auto-end', label: '自动尾部', row: 6, column: 4 },
] as const;
</script>

<template>
  <div class="position-demo">
    <div class="position-grid">
      <h-popover
        v-for="placement in placements"
        :key="placement.value"
        trigger="hover"
        :placement="placement.value"
        :flip="placement.value.startsWith('auto')"
        :style="{ gridArea: `${placement.row} / ${placement.column}` }"
      >
        <template #reference>
          <h-button size="small" type="normal">{{ placement.label }}</h-button>
        </template>
        <template #popper>
          <h-pop-content>{{ placement.value }}</h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.position-demo {
  overflow-x: auto;
  padding-block: var(--h-spacing-4);
}

.position-grid {
  display: grid;
  grid-template-columns: repeat(5, 88px);
  grid-template-rows: repeat(6, auto);
  gap: var(--h-spacing-3);
  width: max-content;
  min-width: 100%;
}

.position-grid :deep(.h-popover__reference),
.position-grid :deep(.h-button) {
  width: 100%;
}
</style>
