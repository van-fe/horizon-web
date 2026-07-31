<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
      >
        <template #treeNodeRender="{data}">
          {{ data.label }}
        </template>
      </h-tree-select>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/field-map-options.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
