<script setup lang="ts">
import { computed, ref } from 'vue';

const visible = ref(false);
const size = ref('medium');
const sizes = [
  { label: '小型', value: 'small' },
  { label: '中型', value: 'medium' },
  { label: '大型', value: 'large' },
  { label: '500px', value: '500px' },
  { label: '75%', value: '75%' },
];
const sizeLabel = computed(
  () => sizes.find(item => item.value === size.value)?.label ?? size.value,
);
</script>

<template>
  <div class="drawer-size-demo">
    <div class="controls">
      <h-select v-model="size" aria-label="抽屉尺寸">
        <h-option v-for="item in sizes" :key="item.value" :label="item.label" :value="item.value" />
      </h-select>
      <h-button @click="visible = true">打开抽屉</h-button>
    </div>
    <p role="status">当前尺寸：{{ sizeLabel }}</p>

    <h-drawer v-model:visible="visible" title="配置数据源" :size="size">
      <p>预设尺寸与自定义尺寸使用同一套 API。</p>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-size-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .controls {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
