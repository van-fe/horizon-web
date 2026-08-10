<script setup lang="ts">
import { ref } from 'vue';

const environments = [
  { value: 'production', label: '生产环境', description: 'Production · 3 个集群' },
  { value: 'staging', label: '预发布环境', description: 'Staging · 2 个集群' },
  { value: 'testing', label: '测试环境', description: 'Testing · 6 个集群' },
];
const rightValue = ref('production');
const bottomValue = ref('staging');
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>右侧说明</span>
      <h-select v-model="rightValue" :to-body="false">
        <h-option v-for="item in environments" :key="item.value" v-bind="item" />
      </h-select>
    </label>
    <label>
      <span>下方说明</span>
      <h-select v-model="bottomValue" description-position="bottom" :to-body="false">
        <h-option v-for="item in environments" :key="item.value" v-bind="item" />
      </h-select>
    </label>
  </div>
</template>

<style scoped>
.comparison-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.comparison-row label {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.comparison-row span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.comparison-row :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

@media (max-width: 560px) {
  .comparison-row {
    grid-template-columns: 1fr;
  }
}
</style>
