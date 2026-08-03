<script setup lang="ts">
import { ref } from 'vue';

const teams = ['Platform', 'Commerce', 'Growth', 'Security', 'Data', 'Quality'];
const regions = ['Shanghai', 'Singapore', 'Frankfurt', 'Virginia'];
const options = Array.from({ length: 120 }, (_, index) => {
  const number = String(index + 1).padStart(3, '0');
  return {
    value: `service-${number}`,
    label: `Service ${number}`,
    description: `${teams[index % teams.length]} · ${regions[index % regions.length]}`,
    disabled: (index + 1) % 11 === 0,
  };
});
const selected = ref<string[]>(['service-013', 'service-046']);
const reachCount = ref(0);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      collapse-tags
      collapse-tags-tooltip
      :options="options"
      description-position="bottom"
      :to-body="false"
      placeholder="搜索 120 个服务"
      @option-list-reach-bottom="reachCount += 1"
    />
    <p class="docs-demo__status">
      120 项 · 已选 {{ selected.length }} 项 · 触底 {{ reachCount }} 次
    </p>
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
