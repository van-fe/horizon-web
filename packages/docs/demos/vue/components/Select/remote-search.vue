<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

type ServiceOption = { value: string; label: string; description: string };

const serviceCatalog: ServiceOption[] = [
  { value: 'api-gateway', label: 'API Gateway', description: 'Platform · production' },
  { value: 'audit-service', label: 'Audit Service', description: 'Security · production' },
  { value: 'billing-api', label: 'Billing API', description: 'Commerce · production' },
  { value: 'catalog-indexer', label: 'Catalog Indexer', description: 'Search · staging' },
  { value: 'data-pipeline', label: 'Data Pipeline', description: 'Analytics · production' },
  { value: 'mobile-backend', label: 'Mobile Backend', description: 'Growth · production' },
];
const value = ref<string>();
const options = ref<ServiceOption[]>(serviceCatalog.slice(0, 4));
const loading = ref(false);
const status = ref('输入服务名开始检索');
let searchTimer: ReturnType<typeof setTimeout> | undefined;
let requestId = 0;

function searchServices(input: string) {
  requestId += 1;
  const currentRequest = requestId;
  if (searchTimer) clearTimeout(searchTimer);

  if (!input.trim()) {
    options.value = serviceCatalog.slice(0, 4);
    loading.value = false;
    status.value = '已恢复常用服务';
    return;
  }

  loading.value = true;
  status.value = `正在检索 “${input}”…`;
  searchTimer = setTimeout(() => {
    if (currentRequest !== requestId) return;
    const keyword = input.toLowerCase();
    options.value = serviceCatalog.filter(
      option =>
        option.label.toLowerCase().includes(keyword) ||
        option.description.toLowerCase().includes(keyword),
    );
    loading.value = false;
    status.value = options.value.length ? `找到 ${options.value.length} 项` : '没有匹配服务';
  }, 450);
}

onBeforeUnmount(() => {
  requestId += 1;
  if (searchTimer) clearTimeout(searchTimer);
});
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="value"
      show-search
      clearable
      :loading="loading"
      :hide-panel-when-show-search-and-empty-list="false"
      :to-body="false"
      placeholder="搜索服务"
      @search="searchServices"
    >
      <h-option v-for="option in options" :key="option.value" v-bind="option" />
      <template #empty><span class="empty-text">暂无匹配服务</span></template>
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

.empty-text {
  display: block;
  padding: 12px;
  color: var(--h-text-secondary);
  font-size: 13px;
  text-align: center;
}
</style>
