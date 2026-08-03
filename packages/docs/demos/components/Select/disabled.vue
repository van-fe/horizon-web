<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
const selected = ref<string[]>(['product']);
const departments = [
  {
    label: '受管部门',
    disabled: true,
    children: [
      { value: 'security', label: '安全与合规' },
      { value: 'finance', label: '财务系统' },
    ],
  },
  {
    label: '开放部门',
    disabled: false,
    children: [
      { value: 'product', label: '产品设计' },
      { value: 'operations', label: '客户运营', disabled: true },
      { value: 'growth', label: '增长产品' },
    ],
  },
];
</script>

<template>
  <div class="select-demo">
    <label class="toggle-row">
      <span>禁用选择器</span>
      <h-switch v-model="disabled" status />
    </label>
    <h-select
      v-model="selected"
      multiple
      clearable
      collapse-tags
      :disabled="disabled"
      :to-body="false"
    >
      <h-option-group
        v-for="group in departments"
        :key="group.label"
        :label="group.label"
        :disabled="group.disabled"
      >
        <h-option v-for="item in group.children" :key="item.value" v-bind="item" />
      </h-option-group>
    </h-select>
    <p class="docs-demo__status">受管部门与“客户运营”不可选</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
