<script setup lang="ts">
import { computed, ref } from 'vue';

const clusters = [
  { value: 'cn-prod-01', label: 'cn-prod-01', region: '上海', latency: '18 ms' },
  { value: 'sg-prod-02', label: 'sg-prod-02', region: '新加坡', latency: '42 ms' },
  { value: 'de-prod-01', label: 'de-prod-01', region: '法兰克福', latency: '86 ms' },
];
const value = ref('cn-prod-01');
const selected = computed(() => clusters.find(item => item.value === value.value));
</script>

<template>
  <div class="select-demo">
    <h-select v-model="value" :to-body="false" placeholder="选择目标集群">
      <h-option
        v-for="item in clusters"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :region="item.region"
        :latency="item.latency"
      />
      <template #optionRender="props">
        <span class="cluster-option">
          <span>
            <strong>{{ props?.label }}</strong>
            <small>{{ props?.region }}</small>
          </span>
          <small>{{ props?.latency }}</small>
        </span>
      </template>
    </h-select>
    <p class="docs-demo__status">{{ selected?.region }} · {{ selected?.latency }}</p>
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

.cluster-option,
.cluster-option > span {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
}

.cluster-option {
  justify-content: space-between;
}

.cluster-option small {
  color: var(--h-text-secondary);
}
</style>
