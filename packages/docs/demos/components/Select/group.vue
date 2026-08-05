<script setup lang="ts">
import { ref } from 'vue';

const regionGroups = [
  {
    label: '亚太地区',
    children: [
      { value: 'shanghai', label: '上海' },
      { value: 'singapore', label: '新加坡' },
      { value: 'tokyo', label: '东京' },
    ],
  },
  {
    label: '欧洲地区',
    children: [
      { value: 'frankfurt', label: '法兰克福' },
      { value: 'london', label: '伦敦' },
    ],
  },
];
const selected = ref<string[]>(['singapore', 'frankfurt']);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      clearable
      collapse-tags
      :to-body="false"
      placeholder="选择备份区域"
    >
      <h-option-group v-for="group in regionGroups" :key="group.label" :label="group.label">
        <h-option v-for="region in group.children" :key="region.value" v-bind="region" />
      </h-option-group>
    </h-select>
    <p class="docs-demo__status">已选择 {{ selected.length }} 个区域</p>
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
