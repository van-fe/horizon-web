<script setup lang="ts">
import { ref } from 'vue';

const policies = [
  { value: 'standard', label: '标准发布流程' },
  { value: 'reviewed', label: '需要服务负责人和质量负责人共同审批的生产发布流程' },
  {
    value: 'regulated',
    label: '适用于受监管业务的完整变更评审、风险确认、灰度验证与生产回滚预案流程',
  },
];
const selected = ref<string[]>(['standard', 'regulated']);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      collapse-tags
      collapse-tags-tooltip
      collapse-tags-fill-up
      :to-body="false"
      placeholder="选择发布策略"
    >
      <h-option
        v-for="policy in policies"
        :key="policy.value"
        :value="policy.value"
        :label="policy.label"
        :max-lines="2"
      />
    </h-select>
    <p class="docs-demo__status">已选择 {{ selected.length }} 项长文本策略</p>
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
