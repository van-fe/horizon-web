<script setup lang="ts">
import { ref } from 'vue';

const audiences = [
  { value: 'owners', label: '项目负责人' },
  { value: 'reviewers', label: '评审成员' },
  { value: 'contributors', label: '所有贡献者' },
  { value: 'guests', label: '外部访客' },
];
const selected = ref<string[]>(['owners', 'reviewers']);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      :selected-visible="false"
      clearable
      collapse-tags
      :to-body="false"
      placeholder="添加通知对象"
    >
      <h-option v-for="audience in audiences" :key="audience.value" v-bind="audience" />
    </h-select>
    <p class="docs-demo__status">已选项会从候选列表隐藏 · {{ selected.length }} 项</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
