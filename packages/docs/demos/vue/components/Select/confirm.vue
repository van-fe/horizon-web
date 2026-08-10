<script setup lang="ts">
import { ref } from 'vue';

const regions = [
  { value: 'cn-east', label: '华东 · 上海' },
  { value: 'cn-north', label: '华北 · 北京' },
  { value: 'ap-southeast', label: '亚太 · 新加坡' },
  { value: 'eu-west', label: '欧洲 · 法兰克福' },
];
const selected = ref<string[]>(['cn-north', 'ap-southeast']);
const status = ref('等待确认区域');
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      need-confirm
      collapse-tags
      confirm-button-text="应用区域"
      cancel-button-text="保持原值"
      :to-body="false"
      @change="status = `已应用 ${selected.length} 个区域`"
    >
      <h-option v-for="region in regions" :key="region.value" v-bind="region" />
    </h-select>
    <p class="docs-demo__status" role="status">{{ status }}</p>
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
