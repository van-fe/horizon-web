<script setup lang="ts">
import { ref } from 'vue';

const repositories = [
  { value: 'horizon-web', label: 'horizon-web' },
  { value: 'design-tokens', label: 'design-tokens' },
  { value: 'developer-portal', label: 'developer-portal' },
];
const value = ref<string>();
const query = ref('');
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="value"
      filterable
      clearable
      :to-body="false"
      placeholder="搜索仓库"
      @input="query = $event"
    >
      <h-option v-for="repository in repositories" :key="repository.value" v-bind="repository" />
      <template #empty>
        <h-empty :description="`没有找到 “${query || '当前关键字'}”`" />
      </template>
    </h-select>
    <p class="docs-demo__status">输入 “mobile” 查看空状态</p>
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
