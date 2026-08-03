<script setup lang="ts">
const placements = [
  ['top-start', '上左'],
  ['top', '上'],
  ['top-end', '上右'],
  ['left-start', '左上'],
  ['right-start', '右上'],
  ['left', '左'],
  ['auto', '自动'],
  ['right', '右'],
  ['left-end', '左下'],
  ['right-end', '右下'],
  ['bottom-start', '下左'],
  ['bottom', '下'],
  ['bottom-end', '下右'],
  ['auto-start', '自动起始'],
  ['auto-end', '自动尾部'],
] as const;
</script>

<template>
  <div class="position-grid">
    <h-popover
      v-for="placement in placements"
      :key="placement[0]"
      trigger="hover"
      :placement="placement[0]"
      :flip="placement[0].startsWith('auto')"
    >
      <template #reference>
        <h-button size="small" type="normal">{{ placement[1] }}</h-button>
      </template>
      <template #popper>
        <h-pop-content>{{ placement[0] }}</h-pop-content>
      </template>
    </h-popover>
  </div>
</template>

<style scoped>
.position-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  padding-block: 16px;
}

.position-grid :deep(.h-button) {
  width: 100%;
}

@media (max-width: 640px) {
  .position-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .position-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
