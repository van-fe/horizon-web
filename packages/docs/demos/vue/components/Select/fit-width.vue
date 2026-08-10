<script setup lang="ts">
import { computed, ref } from 'vue';

type WidthMode = true | false | 'fit-content';

const widthMode = ref<'same' | 'natural' | 'content'>('natural');
const value = ref('analytics');
const fitInputWidth = computed<WidthMode>(() => {
  if (widthMode.value === 'same') return true;
  if (widthMode.value === 'content') return 'fit-content';
  return false;
});
const services = [
  { value: 'gateway', label: 'API Gateway' },
  { value: 'analytics', label: 'Customer analytics and behavioral insights service' },
  { value: 'workflow', label: 'Automated release workflow orchestration' },
];
</script>

<template>
  <div class="select-demo">
    <h-segmented v-model:active-key="widthMode" size="small" block>
      <h-segmented-item value="same" label="Same width" />
      <h-segmented-item value="natural" label="Natural" />
      <h-segmented-item value="content" label="Fit content" />
    </h-segmented>
    <h-select
      v-model="value"
      clearable
      :fit-input-width="fitInputWidth"
      :to-body="false"
      placeholder="选择依赖服务"
    >
      <h-option
        v-for="service in services"
        :key="service.value"
        :value="service.value"
        :label="service.label"
        :max-lines="2"
      />
    </h-select>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 12px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
