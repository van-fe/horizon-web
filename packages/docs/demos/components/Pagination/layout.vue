<script setup lang="ts">
import { ref } from 'vue';

const selectedLayout = ref('pager, sizes, total');
const layouts = [
  { label: '仅页码', value: 'pager' },
  { label: '页码与每页数量', value: 'pager, sizes' },
  { label: '页码与快速跳转', value: 'pager, jumper' },
  { label: '页码与总数', value: 'pager, total' },
  { label: '完整布局', value: 'pager, jumper, total, sizes' },
];

const current = ref(4);
const pageSize = ref(10);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span>布局组合</span>
        <h-select v-model="selectedLayout">
          <h-option
            v-for="item in layouts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </h-select>
      </label>
    </div>
    <div class="layout-preview">
      <h-pagination
        v-model:current-page="current"
        v-model:page-size="pageSize"
        :total="248"
        :layout="selectedLayout"
        :show-range="false"
      />
    </div>
    <p class="docs-demo__status">第 {{ current }} 页 · 每页 {{ pageSize }} 条</p>
  </div>
</template>

<style scoped>
.layout-preview {
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
