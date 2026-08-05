<script setup lang="ts">
import { ref } from 'vue';

const collaborators = [
  { value: 'mia', label: 'Mia Chen · 产品' },
  { value: 'noah', label: 'Noah Li · 前端' },
  { value: 'ava', label: 'Ava Wang · 设计' },
  { value: 'leo', label: 'Leo Zhang · 测试' },
  { value: 'zoe', label: 'Zoe Wu · 数据' },
];
const selected = ref<string[]>(['mia', 'noah', 'ava', 'leo']);
const collapseTags = ref(true);
const status = ref('失焦时折叠标签');

function handleFocus() {
  collapseTags.value = false;
  status.value = '已展开全部标签';
}

function handleBlur() {
  collapseTags.value = true;
  status.value = '标签已自动折叠';
}
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      :collapse-tags="collapseTags"
      collapse-tags-tooltip
      :to-body="false"
      placeholder="添加评审人"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <h-option v-for="person in collaborators" :key="person.value" v-bind="person" />
    </h-select>
    <p class="docs-demo__status" role="status">{{ status }} · {{ selected.length }} 位成员</p>
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
